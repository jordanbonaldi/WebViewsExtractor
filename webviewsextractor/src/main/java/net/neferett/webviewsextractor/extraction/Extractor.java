/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

package net.neferett.webviewsextractor.extraction;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import lombok.Data;
import net.neferett.webviewsextractor.scripts.Script;
import net.neferett.webviewsextractor.scripts.ScriptConstructor;
import net.neferett.webviewsinjector.services.LoginService;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.List;
import java.util.Map;

@Data
public class Extractor {

    protected final LoginService loginService;
    protected final String serviceName;
    protected final ScriptConstructor scriptConstructor;

    /**
     *
     * @param loginService Login Service to load javascript file injection on
     */
    protected Extractor(LoginService loginService) {
        this.loginService = loginService;
        this.serviceName = this.loginService.getName().toLowerCase().replace(".", "");
        this.scriptConstructor = new ScriptConstructor(this.serviceName);

        // Automatically detect and instantiate "ServiceName" scripts
        this.scriptConstructor.buildScripts();
    }

    /**
     *
     * Recursive injector of a list of scripts
     *
     * @param context Activity Context
     * @param index Script index position
     * @param script List of all scripts
     * @param callback Call back when extraction is done
     * @param extractionStatus Status of current extraction
     */
    protected void recursiveInject(
            Context context,
            int index,
            List<Script> script,
            ExtractionCallback callback,
            ExtractionStatus extractionStatus
    ) {
        if (index >= script.size())
            return;

        Status status = extractionStatus.getStatus();
        status.setTaskName(this.scriptToName(script.get(index)));

        Activity activity;

        if (context == null) activity = (Activity) this.loginService.getWebViewCreator().getWebView().getContext();
        else activity = (Activity) context;

        status.setFailed(false);
        status.setRemainingData(index + 1 >= script.size() ? 0 : script.size() - index - 1);

        activity.runOnUiThread(() ->
                loginService.getWebInjector().urlInjector(script.get(index).getUrl(), script.get(index).getContent(), (s) -> {

                    ExtractionStatus current = this.statusChecker(status, index + 1 >= script.size());

                    {
                        JSONArray array = null;

                        try {
                            array = new JSONArray(s);
                        } catch (JSONException json) {
                            status.setFailed(true);
                        }

                        current.getStatus().updateFailed();

                        callback.receiveData(array, current.getStatus());
                    }

                    recursiveInject(context, index + 1, script, callback, current);
                }, script.get(index).getLatency())
        );
    }

    /**
     *
     * Set if current status is finished
     *
     * @param status Current Status
     * @param isDone Is finished
     * @return ExtractionStatus
     */
    private ExtractionStatus statusChecker(Status status, boolean isDone) {
        ExtractionStatus current = isDone ? ExtractionStatus.DONE : ExtractionStatus.LOADING;

        current.getStatus().update(status);
        current.getStatus().setDone(isDone);

        return current;
    }

    /**
     * x
     * @param script Script to convert into string readable name
     * @return String
     */
    private String scriptToName(Script script) {
        for (Map.Entry<String, Script> set : this.scriptConstructor.getScriptList().entrySet())
            if (set.getValue().getFileName().equalsIgnoreCase(script.getFileName()))
                return set.getKey();
        return null;
    }
}
