/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// url:https://myaccount.google.com/device-activity

var devices = [];
var parseData = (index) => {
    var buttonClick = Array.from(document.querySelectorAll("a[role=button].fpEbhf"))[1]; // Click button OK

    if (buttonClick === null)
        return new Promise((res) => res("OK"));

    buttonClick.click();

    return new Promise((res) => setTimeout(res, 100)).then(() => {
        var ipData = [];
        Array.from(document.getElementsByClassName("t79L9d")[0].getElementsByClassName("Qrf1M")).forEach((e) => {
            var data = e.innerText.split("\n").map((a) => a.trim());
            var location = data.length === 1 ? e.querySelector("span").innerText : data[0];
            var lastConnection = data.length === 1 ? e.getElementsByClassName("cPrmpd")[0].innerText : data[2];
            var ip = data.length === 1 ? null : data[1];

            ipData.push(`
                ${(ip === null ? "" : `${ip} - `)} ${location} - ${lastConnection}`
            );
        });

        devices.push({
            title: `Device: ${document.getElementsByClassName("fUcIn")[index]}`,
            type: "device",
            value: document.getElementsByClassName("bCaYpf")[0].innerText.trim(),
            data: [
                ...ipData,
                "now - " + document.getElementsByClassName("tHVeec")[0].children[0].innerText
            ]
        });
    });
};

var launchPromise = (index) => new Promise((res, err) => {
    document.querySelectorAll("div[role=listitem]")[index]
        .querySelector("a[role=button]").click();
    setTimeout(() => parseData(index).then(() => setTimeout(res, 2000))
        .then(() => document.querySelector("div[data-back-url=device-activity] div[role=button]").click()
        ), 2000);
});

var recursivePromiseCall = (array, index) => {
    if (array.length <= index)
        return Promise.resolve("Done");

    return Promise.resolve(launchPromise(index)).then((e) => recursivePromiseCall(array, index + 1));
};

var array = Array.from(document.querySelectorAll("div[role=listitem]"));

recursivePromiseCall(array, 0).then(() => Injector.promiseReceive(JSON.stringify(devices))).catch(() => Injector.promiseReceive("null"));