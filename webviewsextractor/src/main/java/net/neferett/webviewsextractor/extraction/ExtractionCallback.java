/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

package net.neferett.webviewsextractor.extraction;

import org.json.JSONArray;

public interface ExtractionCallback {
    /**
     * Call back when data is extracted
     * @param data JSONArray of extracted data, following the model of Model CLass
     * @param status Status of extracted data containing remaining data to extract...
     */
    void receiveData(JSONArray data, Status status);
}
