/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.thetrainline.com/my-account/saved-passengers
//latency:5
var data = [];

Array.from(document.getElementsByClassName("_uptyki")).forEach((passenger) => {
    data.push({
        title: "Saved Passenger",
        type: "profile",
        value: passenger.getElementsByClassName("_16lb9ur")[0].innerText,
        data: [passenger.getElementsByClassName("_ivbdc4")[0].innerText]
    });
});

Injector.promiseReceive(JSON.stringify(data));