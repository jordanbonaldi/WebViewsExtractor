/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://uk.hotels.com/profile/settings.html

Injector.promiseReceive(JSON.stringify([
    {
        title: "Fullname",
        type: "profile",
        value: document.querySelectorAll(".item-option-content > p")[0].innerText,
        data: []
    },
    {
        title: "Phone number",
        type: "profile",
        value: document.querySelectorAll(".item-option-content > p")[2].innerText,
        data: []
    },
    {
        title: "Email address",
        type: "profile",
        value: document.querySelectorAll(".item-option-content > p")[3].innerText,
        data: []
    }
]));

