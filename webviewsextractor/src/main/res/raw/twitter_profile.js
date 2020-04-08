/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://twitter.com/settings/profile
new Promise((res) => setTimeout(res, 5000)).then(() => {
    Injector.promiseReceive(JSON.stringify([
        {
            title: "Nickname",
            type: "profile",
            value: document.querySelector("input[name=name]").value,
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
        },
        {
            title: "Date of Birth",
            type: "profile",
            value: document.querySelector(".css-1dbjc4n.r-779j7e.r-23eiwj").querySelector("div[dir=auto].r-jwli3a").innerText,
            data: []
        }
    ]));
});