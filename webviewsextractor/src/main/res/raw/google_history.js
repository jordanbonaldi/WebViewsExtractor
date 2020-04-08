/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// url:https://www.google.com/maps/timeline?pb

new Promise((res) => setTimeout(res, 2000)).then(() => {
    document.querySelector(".nugget-title").click();
}).then(() => {
    var tab = [];
    var types = ["Most Visited", "Visited", "Unconfirmed"];
    var b = 0;

    Array.from(document.getElementsByClassName("visited-place-card")).forEach((e) => {
        var style = e.querySelector(".image");

        if (style !== null && e.querySelector(".image").style.cssText === "")
            return;

        if (style === null)
            b++;

        var type = types[b];

        var title = e.querySelector(".title").innerText;

        var dates;
        try {
            dates = Array.from(e.querySelector(".subtitle")
                .children[1].getElementsByTagName("span"))
                .map((e) => e.innerText);

            if (dates.length === 0)
                dates = Array.from(e.querySelector(".subtitle").getElementsByTagName("span")).map((e) => e.innerText).join(" ");
        } catch (exception) {
            dates = null;
        }


        if (dates !== null && Array.isArray(dates))
            dates = dates.filter((e) => e.match("-?\\d+(\\.\\d+)?"));
        tab.push({
           title: type,
           type: "address",
           value: title,
           data: dates === null ? [] : Array.isArray(dates) ? dates : [dates.trim()]
        });

    });

    Injector.promiseReceive(JSON.stringify(tab));
}).catch((e) => Injector.promiseReceive(e));