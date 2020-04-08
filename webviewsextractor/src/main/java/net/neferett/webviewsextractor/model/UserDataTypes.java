/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

package net.neferett.webviewsextractor.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import net.neferett.webviewsextractor.R;

@AllArgsConstructor
@Getter
public enum UserDataTypes {

    LOCATION("location", R.drawable.ic_map_location),
    DEVICE("device", R.drawable.ic_smartphone_8),
    ADDRESS("address", R.drawable.ic_map_1),
    PROFILE("profile", R.drawable.ic_user_3),
    BOOKING("booking", R.drawable.ic_briefcase),
    PASSPORT("passport", R.drawable.ic_id_card_3),
    CB("cb", R.drawable.ic_visa);

    private final String type;
    private final int res;

    /**
     *
     * @param name String of logo you want to get
     * @return UserDataTypes
     */
    public static UserDataTypes getUserDataType(String name) {
        for (UserDataTypes type : UserDataTypes.values())
            if (type.getType().equalsIgnoreCase(name))
                return type;
        return null;
    }
}