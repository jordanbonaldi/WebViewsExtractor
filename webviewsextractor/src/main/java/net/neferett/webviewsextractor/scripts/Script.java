/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

package net.neferett.webviewsextractor.scripts;

import net.neferett.webviewsextractor.DataExtractor;
import lombok.Data;
import lombok.SneakyThrows;

import java.io.InputStream;

@Data
public class Script {

    /*
        Constructor field
     */
    private final String fileName;

    private String url;
    private String content;
    private int latency;

    /*
        Automated file builder

        File must be placed on res/raw/
        Using the following norm in lower case: <login_service>_<script_name>.js
        e.g. google_creditcard.js
     */
    @SneakyThrows
    private void buildFile() {
        InputStream stream = DataExtractor.class.getClassLoader()
                .getResourceAsStream("res/raw/" + this.fileName + ".js");

        int size = stream.available();
        byte[] buffer = new byte[size];

        int i = stream.read(buffer);

        if (i <= 0)
            throw new Exception("Unreadable file");

        stream.close();

        this.content = new String(buffer);
    }

    /**
     *
     * @param parameter Generic allowance of getting script special static data
     * @return String
     */
    private String getParsedParameter(String parameter) {
        String found = "";
        for (String line : this.content.split("\n"))
            if (line.contains("// " + parameter + ":") || line.contains("//" + parameter + ":"))
                found = line.replaceAll("// " + parameter + ":", "").replaceAll("//" + parameter + ":", "");

        return found;
    }

    private void parseUrl() {
        String lat = this.getParsedParameter("latency");
        this.latency = lat.equals("") ? 0 : Integer.parseInt(lat.trim()); // Not Compulsory
        this.url = this.getParsedParameter("url"); // Compulsory
    }

    public void evaluate() {
        this.buildFile();
        this.parseUrl();
    }
}
