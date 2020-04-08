/* 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// url:https://secure.booking.com/mysettings.en-gb.html

var datas = [];

Array.from(document.getElementsByClassName('settings-item')).forEach(e => {
    try {
        var object = {};
        var type = e.getElementsByClassName('settings-item__label')[0].innerText;
        var control = e.querySelectorAll('.settings-control');

        var data = '';

        if (control != null && control[0].tagName === 'SELECT') {
            Array.from(control).forEach(a => {
                if (a.tagName === 'SELECT' && a.options[a.selectedIndex].text != null &&
                    !a.options[a.selectedIndex].value.includes('default')) {
                    data += ' ' + a.options[a.selectedIndex].text
                }

            });
        }
        else if (control[0].tagName === 'BUTTON' &&
            e.getElementsByClassName('settings-address__data')[0] != null) {
            object.type = 'address';
            data = e.getElementsByClassName('settings-address__data')[0].innerText.replace(/[\n\r]/g, ', ');
        } else
            data += control[0].value;

        if (data !== '') {
            object.title = 'Personal Data';
            object.type = object.type === 'address' ? object.type : 'profile';
            object.value = type;
            object.data = [data.trim()];
            datas.push(object);
        }
    } catch (e) {}
});

Injector.promiseReceive(JSON.stringify(datas))