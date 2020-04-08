/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// url:https://myaccount.google.com/yourdata/maps

var a = [];
var max = 2;
Array.from(document.getElementById("i4").children).forEach((e) => {
    if(max <= 0)
        return;

    a.push({
        title: "Labeled address",
        type: "address",
        value: e.querySelector(".WtmMlb span").innerText.trim().replace(":", ""),
        data: [e.querySelector(".WtmMlb .HXbYec").innerText.trim()]
    });

    max--;
});

Injector.promiseReceive(JSON.stringify(a));