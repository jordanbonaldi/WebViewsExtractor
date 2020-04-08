/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.thetrainline.com/my-account/payment-methods
//latency:5
var data = [];

Array.from(document.querySelectorAll('div[data-test=payment-card')).forEach(cb => {
    data.push({
        title: 'Credit Card',
        type: 'cb',
        value: cb.getElementsByClassName('_1fys87g')[0].innerText,
        data: [
            cb.getElementsByClassName('_2q0mvb')[0].innerText,
            cb.getElementsByClassName('_1jm7y6h')[0].innerText,
            cb.getElementsByClassName('_1jm7y6h')[1].innerText
        ],
    });
});

Injector.promiseReceive(JSON.stringify(data));