/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.agoda.com/account/ccof.html
// name: Agoda Credit Card

// Not working since agoda is using secured iframe and scraping inside is impossible

new Promise((res) => {
    return setTimeout(res, 5000);
}).then(() => {
    var data = [];

    Array.from(document.querySelectorAll('section')).forEach((card) => {
        if (!card.querySelector('i.ficon') || !card.querySelector('.card-name')) return;

        card.querySelector('i.ficon').click();

        let cbDetails = card.querySelector('div').innerText.split('\n');

        if (!data.filter((d) => d.data[0] === cbDetails[0])[0])
            data.push({
                title: "Credit Card",
                type: "cb",
                value: cbDetails[1],
                data: [cbDetails[0], cbDetails[2]]
            });
    });

    return data;
}).then((data) => Injector.promiseReceive(JSON.stringify(data)));


