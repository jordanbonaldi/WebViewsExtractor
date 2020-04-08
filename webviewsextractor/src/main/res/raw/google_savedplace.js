/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// url:https://www.google.com/maps/

var tab = [];
var current;

var parseData = () => {
    Array.from(document.querySelectorAll('.ml-place-list-list-item')).forEach(e => {
        var title, type, other = '';
        try {
            title = e.getElementsByClassName('ml-entity-list-item-title')[0].innerText.trim();
            type = e.getElementsByClassName('ml-entity-category')[0].innerText.trim();
            other = e.getElementsByClassName('ml-entity-list-item-info-line')[0].innerText.trim();
        } catch (e) {}

        tab.push({
            title: current,
            type: 'address',
            value: title,
            data: other === '' ? [type] : [type, other]
        });
    });
};

var launch_promise = (index) => new Promise((res, err) => {
    var button = document.querySelectorAll('button.ml-common-list-item')[index];
    current = button.getElementsByClassName('ml-common-list-item-title ml-ellipsis')[0].innerText;

    tab[current] = [];
    button.click();

    setTimeout(res, 2000);
}).then(() => {
    parseData();
    document.querySelector('.ml-place-list-details-header > button').click();
    return new Promise((res, err) => setTimeout(res, 2000))
});

var recusive_promise_call = (array, index) => {
    if (array.length <= index)
        return Promise.resolve(new Promise(() => Injector.promiseReceive(JSON.stringify(tab)))
            .catch(() => Injector.promiseReceive('null')));

    return Promise.resolve(launch_promise(index)).then(() => recusive_promise_call(array, index + 1))
        .catch(() => Injector.promiseReceive('null'));
};

var create_inject = (inject) =>
    new Promise((res, err) => {
        inject();
        setTimeout(res, 2000);
    });

new Promise((res, err) => {
   setTimeout(res, 2000);
}).then(() => {
    create_inject(() => document.querySelector('button > .ml-icon-hamburger').click())
        .then(() => create_inject(() => document.querySelector('button .ml-icon-personal-places').click()))
        .then(() => {
            var array = Array.from(document.querySelectorAll('button.ml-common-list-item'));
            return recusive_promise_call(array, 0)
        }).catch(() => Injector.promiseReceive('null'));
});