/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://mobile.twitter.com/settings/applications
// name: Connected Devices History

new Promise((res) => setTimeout(res, 5000)).then(() => {
    let data = [];
    Array.from(document.querySelectorAll('a[aria-haspopup=false]')).forEach((device) => {
        if (!device.href.includes('settings')) return;

        let texts = device.innerText.split('\n');

        data.push({
            title: 'devices history',
            type: "device",
            value:  device.href.includes('application') ? `Connected Application` : `Device ${texts.shift()} ${device.href.includes('application') ? texts[0] : texts.join(' ')}`,
            data: []
        })
    });

    return data;
}).then((data) =>
    new Promise((res) => {
        setTimeout(() => res(data), 1000);
    }).then((data) => Injector.promiseReceive(JSON.stringify(data)))
);