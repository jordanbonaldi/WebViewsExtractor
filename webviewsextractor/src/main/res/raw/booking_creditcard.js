/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// url:https://secure.booking.com/mysettings.en-gb.html

var datas = [];

Array.from(document.getElementsByClassName("settings-table__body")[0].getElementsByClassName("settings-table__row")).forEach(e => {
    try {
        var cbtype = e.getElementsByClassName("settings-icon")[0].getAttribute("data-title");
        var cbnb = e.getElementsByClassName("settings-text--ltr")[0].innerText;
        var cbname = e.getElementsByClassName("settings-table__card-name")[0].innerText;
        var cbdate = e.getElementsByClassName("settings-text--ltr")[1].innerText;
        datas.push({
            title: "Credit Card",
            type: "cb",
            value: cbtype == null ? "Visa" : cbtype,
            data: [cbnb, cbname, cbdate],
        });
    } catch (e) {}
});

Injector.promiseReceive(JSON.stringify(datas));