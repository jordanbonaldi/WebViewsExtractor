/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://m.facebook.com/settings/account/
// name: All your personal data

Injector.promiseReceive(JSON.stringify([
    {
        title: "Complete Name",
        type: "profile",
        value: document.getElementsByClassName("fcg")[0].innerText,
        data: []
    },
    {
        title: "Email address",
        type: "profile",
        value: document.getElementsByClassName("fcg")[1].innerText,
        data: []
    }
]));