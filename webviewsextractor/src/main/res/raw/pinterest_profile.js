/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.pinterest.co.uk/settings/edit/
// name: Pinterest private data

new Promise((res) => setTimeout(res, 5000)).then(() => {
    Injector.promiseReceive(JSON.stringify([
        {
            title: "Email address",
            type: "profile",
            value: document.getElementById("email").value,
            data: []
        },
        {
            title: "Country",
            type: "profile",
            value: document.getElementById("country").options[document.getElementById("country").selectedIndex].innerText,
            data: []
        },
        {
            title: "Language",
            type: "profile",
            value: document.getElementById("locale").options[document.getElementById("locale").selectedIndex].innerText,
            data: []
        },
        {
            title: "Gender",
            type: "profile",
            value: document.getElementById("custom").checked ? 'Non binary' : document.getElementById("male").checked ? 'Male' : 'Female',
            data: []
        }
    ]));
});