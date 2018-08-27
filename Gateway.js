'use strict';

var express = require('express');
var request = require('request');
var httpModule = require('./lib/http-module')();
var msAccess = require('./lib/msaccess-module')();
var Orchestrator = require('./Orchestrator')();
var Query = require('./Query');
var Device = require('./Device');
var protocol = require('./Protocol');
var app = express();


//Define username and password of IoT-Ticket
const username = '********';
const password = '********';

//Define queries to get instances from KB
var MyDevices = "query=PREFIX iii:<http://www.semanticweb.org/mahmoodp/ontologies/2018/1/Resources#> SELECT * WHERE {?inst a iii:Device.?inst iii:name ?name.?inst iii:id ?id.?inst iii:dataType ?dataType.?inst iii:endpoint ?endpoint.?inst iii:Protocol ?Protocol.}";
var MyQueries = "query=PREFIX iii:<http://www.semanticweb.org/mahmoodp/ontologies/2018/1/Resources#> SELECT * WHERE { ?inst a iii:Query. ?inst iii:name ?name. ?inst iii:queryContext ?queryContext. ?inst iii:dataType ?dataType. ?inst iii:Database_MS ?Database_MS.}";



//define array for the resources
var Query_array = [];
var Device_array = [];



// Function to write values to IoT-Ticket
function WriteValue(name, path, value) {

    var ValueToWrite = [{
        'name': name,
        'path': path,
        'v': value
    }];

    var options = {
        method: 'POST',
        body: ValueToWrite,
        json: true,
        url: 'https://' + username + ':' + password + '@my.iot-ticket.com/api/v1/process/write/fc8c04f415e745569f58c2b16355903e',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    request(options, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            // Print out the response body
            console.log("Value was written to datanode");
            console.log(res.body);
        }
        else {
            console.log(res.body);
            console.log("error: " + err);
        }
    });
}




setTimeout(function () {


    Orchestrator.KBQuery(MyDevices, function (body) {
        for (var i = 0; i < body.results.bindings.length; i++) {
            var D_name = body.results.bindings[i].name.value;
            var D_id = body.results.bindings[i].id.value;
            var D_endpoint = body.results.bindings[i].endpoint.value;
            var D_dataType = body.results.bindings[i].dataType.value;
            var D_Protocol = body.results.bindings[i].Protocol.value;
            Device_array[i] = new Device(D_name, D_endpoint, D_id, D_dataType, D_Protocol);
        }
    });

    Orchestrator.KBQuery(MyQueries, function (body) {
        for (var j = 0; j < body.results.bindings.length; j++) {
            var Q_name     = body.results.bindings[j].name.value;
            var Q_Context  = body.results.bindings[j].queryContext.value;
            var Q_dataType = body.results.bindings[j].dataType.value;
            var Q_Database = body.results.bindings[j].Database_MS.value;
            Query_array[j] = new Query(Q_name, Q_Context, Q_dataType, Q_Database);
        }
    });




}, 1000);




setTimeout(function () {


    msAccess.DatabaseQuery(Query_array[0].getQuery(), function (data) {
        var value = data[0].NoFinishedOrders;
       // WriteValue(Query_array[0].getName(), 'LineData', value);
    });

    /*msAccess.DatabaseQuery(Query_array[1].getQuery(), function (data) {
        var value = data[0].NoPendingOrders;
        WriteValue(Query_array[1].getName(), 'LineData', value);
    });

    httpModule.getDeviceValue(Device_array[0].getEndPoint(),Device_array[0].getId())
        .then(function (data) {
            // POST succeeded...
            WriteValue(Device_array[0].getName() ,'LineData',data.v);*!/
            console.log(data.v);
        })
        .catch(function (err) {
            console.log(err);
        });


    httpModule.getDeviceValue(Device_array[1].getEndPoint(),Device_array[1].getId())
        .then(function (data) {
            // POST succeeded...
            WriteValue(Device_array[1].getName() ,'LineData',data.v);*!/
            console.log(data.v);
        })
        .catch(function (err) {
            console.log(err);
        });*/

}, 3000);







