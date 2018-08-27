'use strict';


module.exports = function () {

    // Get the request-promise module
    var request = require("request-promise");

    // GET request to HTTP server
    module.getDeviceValue = function (endpoint, DeviceID) {

        var options = {
            method: 'GET',
            uri: endpoint + DeviceID,
            json: true // Automatically stringifies the body to JSON
        };

        return request(options);
    };
    return module;
};
