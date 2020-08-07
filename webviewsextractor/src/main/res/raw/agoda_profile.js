/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.agoda.com/account/profile.html
// name: Agoda personal data

var profile = document.querySelectorAll('section.user-details-panel')[0].innerText.split('\n');

Injector.promiseReceive(JSON.stringify([
    {
        title: "fullname",
        type: "profile",
        value: profile[2],
        data: []
    },
    {
        title: "email",
        type: "profile",
        value: profile[4],
        data: []
    },
    {
        title: "Phone number",
        type: "profile",
        value: profile[6],
        data: []
    }
]));