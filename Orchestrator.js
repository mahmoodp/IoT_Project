'use strict';

module.exports = function() {

    var express = require('express');
    var request = require('request');
    var app = express();



// function for Send query to knowledge base and get the results
    module.KBQuery = function (query,callback) {
        var optionsKB = {
            method: 'post',
            body: "",
            json: true, // Use,If you are sending JSON data
            url: "http://localhost:3030/IoT_Project/",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/sparql-results+json,*/*;q=0.9'
            }
        };
        optionsKB.body = query;
        request(optionsKB, function (err, res, body) {
            if (err) {
                console.log('Error :', err);
            }
            else {
                callback(body);
            }
        });
    };
    return module;
};








