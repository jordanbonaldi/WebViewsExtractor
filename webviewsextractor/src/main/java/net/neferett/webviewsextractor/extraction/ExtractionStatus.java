/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

package net.neferett.webviewsextractor.extraction;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ExtractionStatus {

    STARTED(new Status("Extraction started")),
    LOADING(new Status("Extraction in progress")),
    DONE(new Status("Extraction done"));

    private final Status status;
}
