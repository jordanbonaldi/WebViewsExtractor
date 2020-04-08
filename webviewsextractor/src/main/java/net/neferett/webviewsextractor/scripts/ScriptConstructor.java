/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

package net.neferett.webviewsextractor.scripts;

import lombok.Data;
import lombok.SneakyThrows;
import net.neferett.webviewsextractor.R;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class ScriptConstructor {

    /**
     * Constructor field
     */
    private final String serviceName;

    private Map<String, Script> scriptList = new HashMap<>();

    private List<String> allowedFiles() {
        List<String> list = new ArrayList<>();

        for (Field field : R.raw.class.getFields())
            if (field.getName().contains(this.serviceName))
                list.add(field.getName());

        return list;
    }

    /**
     * Warning only one _ is authorised as separator of login service an script name.
     */
    @SneakyThrows
    public void buildScripts() {
        for (String e : this.allowedFiles())
            if (this.scriptList.put(e.split("_")[1], new Script(e)) != null)
                throw new IllegalStateException("Duplicate key");

        for (Script script : this.scriptList.values())
            script.evaluate();
    }

}
