/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://uk.hotels.com/account/bookingslist.html

var i = 0;
var data = [];

const getData = (document) => {
    data.push({
        title: "Booking at " + document.querySelector(".hotel-details > h2 > a").innerText,
        type: "booking",
        value: document.querySelector(".hotel-details > h2 > a").innerText,
        data: [
            document.querySelector(".hotel-address").innerText.replace(/[\n\r]+/g, " "),
            document.querySelector("#check-in-date-info").innerText.replace("\n", ": "),
            document.querySelector("#check-out-date-info").innerText.replace("\n", ": "),
            document.querySelector("#your-stay-info").innerText.replace(/[\n\r]+/g, ": "),
            document.querySelector(".total-amount-item").innerText.replace(/[\n\r]+/g, ": "),
            document.querySelector(".detail-description").innerText.replace(/[\n\r]+/g, ", "),
            document.querySelector(".payment-card").innerText,
            document.getElementsByClassName("room-description")[0].innerText
        ]
    });
};
new Promise((res, err) => {
    Array.from(document.getElementsByClassName("card-wrapper")).forEach(e => {
        var link = e.getElementsByClassName("hotel-link")[0];
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", link);
        ifrm.setAttribute("code", i);
        ifrm.style.width = "640px";
        ifrm.style.height = "480px";
        document.body.appendChild(ifrm);
        i++;
    });
    setTimeout(res, 5000 * i)
}).then(() => {
    Array.from(document.getElementsByClassName("card-wrapper")).forEach(e => {
        i--;
        getData(document.querySelector(`iframe[code=${i}]`).contentWindow.document);
    });
}).then(() => Injector.promiseReceive(JSON.stringify(data)));