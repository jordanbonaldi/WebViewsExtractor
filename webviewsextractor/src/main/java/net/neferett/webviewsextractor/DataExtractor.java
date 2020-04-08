/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
package net.neferett.webviewsextractor;

import android.content.Context;
import net.neferett.webviewsextractor.extraction.ExtractionCallback;
import net.neferett.webviewsextractor.extraction.ExtractionStatus;
import net.neferett.webviewsextractor.extraction.Extractor;
import net.neferett.webviewsextractor.extraction.Status;
import net.neferett.webviewsextractor.scripts.Script;
import net.neferett.webviewsinjector.services.LoginService;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DataExtractor extends Extractor {

    /**
     *
     * @param loginService Login Service to load javascript file injection on
     */
    public DataExtractor(LoginService loginService) {
        super(loginService);
    }

    /**
     * Injecting All Scripts of Selected LoginService
     * @param context Activity Context
     * @param extractionCallback Callback when each script finishes
     */
    public void injectAll(Context context, ExtractionCallback extractionCallback) {
        ExtractionStatus.STARTED.getStatus().setAmountOfData(this.scriptConstructor.getScriptList().size());
        this.recursiveInject(context, 0, new ArrayList<>(this.scriptConstructor.getScriptList().values()),
                extractionCallback, ExtractionStatus.STARTED);
    }

    /**
     * Injecting All by List of Scripts
     * @param context Activity Context
     * @param extractionCallback Callback when each script finishes
     * @param scripts List Of Scripts
     */
    public void injectAllScripts(Context context, ExtractionCallback extractionCallback, List<Script> scripts) {
        this.recursiveInject(context, 0, scripts, extractionCallback, ExtractionStatus.STARTED);
    }

    /**
     * Injecting All by Array of Scripts using var args
     * @param context Activity Context
     * @param extractionCallback Callback when each script finishes
     * @param scripts Array of script using var args
     */
    public void injectAllScripts(Context context, ExtractionCallback extractionCallback, Script ... scripts) {
        this.recursiveInject(context, 0, Arrays.asList(scripts), extractionCallback, ExtractionStatus.STARTED);
    }

    /**
     * Injecting All by Array of scripts names using var args
     * @param context Activity Context
     * @param extractionCallback Callback when each script finishes
     * @param scriptsNames Array of string script names using var args
     */
    public void injectAllScripts(Context context, ExtractionCallback extractionCallback, String ... scriptsNames) {
        this.recursiveInject(context, 0, this.buildScriptListFromNames(Arrays.asList(scriptsNames)), extractionCallback, ExtractionStatus.STARTED);
    }

    /**
     * Injecting All by List of String script names
     * @param context Activity Context
     * @param extractionCallback Callback when each script finishes
     * @param scriptsNames List Of string script names
     */
    public void injectAllScriptsByListName(Context context, ExtractionCallback extractionCallback, List<String> scriptsNames) {
        this.recursiveInject(context, 0, this.buildScriptListFromNames(scriptsNames), extractionCallback, ExtractionStatus.STARTED);
    }

    /**
     * Injection by Script Name
     * @param name Script name
     * @param extractionCallback Callback after extraction
     */
    public void injectScriptByName(String name, ExtractionCallback extractionCallback) {
        Script script = this.scriptConstructor.getScriptList().get(name);

        if (script == null)
            return;

        this.loginService.getWebInjector().urlInjector(script.getUrl(), script.getContent(), s -> {
            JSONArray jsonArray;

            try {
                jsonArray = new JSONArray(s);
            } catch (JSONException ignored) {
                jsonArray = null;
            }

            extractionCallback.receiveData(
                    jsonArray,
                    new Status(
                            ExtractionStatus.DONE.name(),
                            jsonArray == null ? 1 : 0,
                            jsonArray != null ? 1 : 0,
                            0,
                            jsonArray == null
                    )
            );
        });
    }

    /**
     * Converting List<String> into List<Script>
     * @param names List of script names
     * @return List<String>
     */
    public List<Script> buildScriptListFromNames(List<String> names) {
        List<Script> scriptList = new ArrayList<>();

        for (String name : names)
            if (this.scriptConstructor.getScriptList().containsKey(name))
                scriptList.add(this.scriptConstructor.getScriptList().get(name));

        return scriptList;
    }

    /**
     * Getting Script List Names
     * @return List<String>
     */
    public List<String> getStringScripts() {
        return new ArrayList<>(this.getScriptConstructor().getScriptList().keySet());
    }

    /**
     * Getting Script List
     * @return List<Script>
     */
    public List<Script> getScripts() {
        return new ArrayList<>(this.getScriptConstructor().getScriptList().values());
    }
}
