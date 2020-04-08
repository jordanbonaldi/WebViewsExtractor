/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

package net.neferett.webviewsextractor.model;

import lombok.Data;

import java.util.List;

/*
 * Model Class to test extraction
 */
@Data
public class Model {
    private final String title;
    private final String type;
    private final String value;
    private final List<String> data;
}
