/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.thetrainline.com/my-account/personal-details
//latency:5
// name: All your personal data

Injector.promiseReceive(JSON.stringify([
    {
        title: "First Name",
        type: "profile",
        value: document.getElementById("firstName").value,
        data: []
    },
    {
        title: "Last name",
        type: "profile",
        value: document.getElementById("lastName").value,
        data: []
    },
    {
        title: "Email address",
        type: "profile",
        value: document.getElementById("email").value,
        data: []
    }
]));