/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.thetrainline.com/my-account/bookings/past
//latency:5
var data = [];

refundedExtract = (booking) => {
    data.push({
        title: 'Refunded booking',
        type: 'booking',
        value: `Travel from ${booking.getElementsByClassName('_1feszwe')[0].innerText} to ${booking.getElementsByClassName('_d6ndc4')[0].innerText}`,
        data: [booking.getElementsByClassName('_13f1ph1')[0].innerText]
    })
};

Array.from(document.getElementsByClassName('_176qh4j')).forEach(booking => {
    let refunded = booking.getAttribute('data-test-state') === 'VOIDED';

    if (refunded)
        return refundedExtract(booking);

    data.push({
        title: 'Trainline booking',
        type: 'booking',
        value: booking.querySelector('div[data-test=trip-header-title]').innerText.replace('\n', ' ').replace('\r', ' '),
        data: [
            booking.getElementsByClassName('_fo39di9')[0].innerText,
            booking.getElementsByClassName('_fo39di9')[1] != null ?
                booking.getElementsByClassName('_fo39di9')[1].innerText : 'Single ticket',
            booking.getElementsByClassName('_fxqwji')[0].innerText
        ]
    })


});

Injector.promiseReceive(JSON.stringify(data));