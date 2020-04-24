/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.instagram.com/accounts/edit/
//name: All your personal data

var data = [];

Array.from(document.querySelectorAll('.eE-OA')).forEach((inputs) => {
    if ((inputs.querySelector('input') === null && inputs.querySelector('textarea') === null) ||
        (
            (inputs.querySelector('input') !== null && inputs.querySelector('input').value === "") ||
            (inputs.querySelector('input') === null && inputs.querySelector('textarea').innerHTML === "")
        )
    ) return;
    data.push({
        title: inputs.querySelector('aside').innerText,
        type: 'profile',
        value: inputs.querySelector('input') !== null ? inputs.querySelector('input').value : inputs.querySelector('textarea').innerHTML,
        data: []
    })
});

Injector.promiseReceive(JSON.stringify(data));