/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.thetrainline.com/my-account/address-book
//latency:5
var data = [];

Array.from(document.getElementsByClassName("_zjunba")).forEach(addr => {
    data.push({
        title: "Addresses book",
        type: "address",
        value: addr.getElementsByClassName("_1d6eubdNaN")[0].innerText,
        data: [
            addr.getElementsByClassName("_4lzv1t")[1].innerText,
            addr.getElementsByClassName("_4lzv1t")[2].innerText]
    });
});

Injector.promiseReceive(JSON.stringify(data));