/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.instagram.com/session/login_activity/
//latency:3
// name: Connected Devices History

var data = [];

Array.from(document.querySelectorAll('div')).forEach((div) => {
    if (div.getAttribute('aria-labelledby') === null) return;

    var devicesTexts = div.innerText.split('\n');
    if (devicesTexts.length !== 2) return;

    var activity = devicesTexts[1].split('Â·');

    if (activity.length !== 2) return;

    data.push({
        title: activity[1].trim(),
        type: 'device',
        value: devicesTexts[0],
        data: [activity[0].trim()]
    })
});

Injector.promiseReceive(JSON.stringify(data));