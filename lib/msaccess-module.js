
'use strict';

module.exports = function() {

    var ADODB = require('node-adodb');

//database connection
    ADODB.debug = true;
    var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source= C:\\Local\\mahmoodp\\Data\\dbs\\FestoMES_Latest_after_error.accdb;Persist Security Info=False;');


// Query to DB
    module.DatabaseQuery = function(query,callback){
        connection
            .query(query)
            .on('done', function(data) {
                return callback(data);
            })
            .on('fail', function(error) {
                console.log(error);
                return callback(error);
            });
    };

   return module;
};
