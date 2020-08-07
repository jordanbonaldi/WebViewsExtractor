/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://mobile.twitter.com/settings/profile
// name: All your personal data

new Promise((res) => setTimeout(res, 5000)).then(() => {
    Injector.promiseReceive(JSON.stringify([
        {
            title: "displayname",
            type: "profile",
            value: document.querySelector("input[name=displayName]").value,
            data: []
        },
        {
            title: "Bio",
            type: "profile",
            value: document.querySelector("textarea[name=description]").value,
            data: []
        },
        {
            title: "URL",
            type: "profile",
            value: document.querySelector("input[name=url]").value,
            data: []
        }
    ]));
});