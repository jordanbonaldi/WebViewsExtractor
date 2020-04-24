/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//url:https://www.expedia.co.uk/user/account
// name: All your personal data

var segments = [];
var data = [];

Array.from(document.querySelectorAll(".segmented-list.results-list.remove-margin")).forEach((e) => Array.from(e.getElementsByClassName("segment")).forEach((s) => segments.push(s)));

var getCb = () => {
    try {
        Array.from(document.getElementById("multiple_creditcards_div").getElementsByClassName("cf")).forEach((e) => {
            if (e.id.includes("creditCard")) {
                var id = e.id.split("_")[3];
                data.push({
                    title: "Credit Card",
                    type: "cb",
                    value: e.getElementsByClassName("cc-mobile")[0].getElementsByClassName("cc-logos")[0].classList[1].replace("cc-", ""),
                    data: [document.getElementById("creditCard_cardNumber_div_" + id).innerText, document.getElementById("creditCard_cardDescription_div_" + id).innerText]
                })
            }
        })
    } catch (e) {
        var indexMonth = document.getElementById("creditCard_edit_div_0_expanded_expiration_month").options.selectedIndex;
        var indexyear = document.getElementById("creditCard_edit_div_0_expanded_expiration_year").options.selectedIndex;
        data.push({
            title: "Credit Card",
            type: "cb",
            value: "Visa",
            data: [document.getElementById("credit_cardNumber_0").innerText, document.getElementById("creditCard_edit_div_0_desc").value,
                `${document.getElementById("creditCard_edit_div_0_expanded_expiration_month").options[indexMonth].innerText} / ${document.getElementById("creditCard_edit_div_0_expanded_expiration_year").options[indexyear].innerText}`
            ],
        })
    }
};

var getPhoneNumber = () => {
    var index = document.getElementById("primaryCountryCode").options.selectedIndex;

    return `+ ${document.getElementById("primaryCountryCode").options[index].attributes["data-country-name"].value} ${document.getElementById("phone_number").value}`;
};

var getAddress = () => {
    var index = document.getElementById("country").options.selectedIndex;

    var getValue = (e) => document.getElementById(e).value === null ? "" : document.getElementById(e).value;

    data.push({
        title: "Address",
        type: "address",
        value: "Home Adress",
        data: [
            `${document.getElementById("country").options[index].innerText}, ${getValue("addressline1")}, ${getValue("addressline2")}, ${getValue("zip1")}, ${getValue("city1")}`
        ]
    })
};

var getPassport = () => {
    try {
        Array.from(document.getElementById("multiple_passport_div").getElementsByClassName("cf")).forEach((e) => {
            if (e.id.includes("passport")) {
                var id = e.id.split("_")[3];
                data.push({
                    title: "Passport",
                    type: "passport",
                    value: `${document.getElementById("passport_country_" + id).innerText} ${document.getElementById("passport_number_" + id).innerText}`,
                    data: []
                });
            }
        });
    } catch (e) {
        data.push({
            title: "Passport",
            type: "passport",
            value: `${document.getElementById("passport_country_0").innerText} ${document.getElementById("passport_number_0").innerText}`,
            data: []
        });
    }
};

var getPersonalInfo = () => {
    data.push({
        title: "Email",
        type: "profile",
        value: document.getElementById("hidden_new_email").value,
        data: []
    }, {
        title: "Name",
        type: "profile",
        value: `${document.getElementById("first_name").value} ${(document.getElementById("middle_name_label").value === null ? "" : `${document.getElementById("middle_name_label").value} `)} + ${document.getElementById("last_name").value}`,
        data: []
    }, {
        title: "BirthDate",
        type: "profile",
        value: document.getElementById("dob").value,
        data: []
    }, {
        title: "Phone Number",
        type: "profile",
        value: getPhoneNumber(),
        data: []
    });
    getAddress();
};

var functionName = [{
    name: "Personal Info",
    function: getPersonalInfo
}, {
    name: "Passports",
    function: getPassport
}, {
    name: "Payment Methods",
    function: getCb
}];

var launchPromise = (index) => new Promise((res) => {
    segments[index].getElementsByClassName("segment-info")[0].click();
    return setTimeout(res, 2000);
}).then(() => {
    try {
        let name = segments[index].getElementsByTagName("article")[0].attributes["data-announce-text"].value;
        let found = functionName.filter((e) => e.name === name)[0];

        if (found !== null)
            found.function();
    } catch(e) {}

    return new Promise((res) => setTimeout(res, 2000));
}).catch();

var recursivePromiseCall = (array, index) => {
    if (array.length <= index)
        return Promise.resolve("Done");

    return Promise.resolve(launchPromise(index)).then(() => recursivePromiseCall(array, index + 1));
};

recursivePromiseCall(segments, 0).then(() => Injector.promiseReceive(JSON.stringify(data)));