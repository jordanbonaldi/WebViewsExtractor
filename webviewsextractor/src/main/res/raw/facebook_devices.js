/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://m.facebook.com/settings/security_login/sessions/
// name: Connected Devices History

var data = [];

Array.from(document.getElementsByClassName("_3cu5")).forEach((device) => {
    var _device = device.getElementsByClassName("_4n7b")[0].innerText.split("·").join("\n").trim().split("\n");
    data.push({
        title: `devices history`,
        type: "device",
        value: `${_device[0].trim()} ${_device[1].trim()}`,
        data: [
            _device[2].trim(),
            _device[3] != null ? _device[3].trim() : _device[3]
        ]
    });
});

Injector.promiseReceive(JSON.stringify(data));