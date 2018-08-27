'use strict';

// creating Query class and attributes
var Query = function Query(name,query,dataType,database) {
    this.name_ = name;
    this.query_ = query;
    this.dataType_ = dataType;
    this.database_ = database;
    };

// get name attribute
Query.prototype.getName = function(){
    return this.name_ ;
};

// get query attribute
Query.prototype.getQuery = function () {
    return this.query_ ;
};

// get data type attribute
Query.prototype.getDataType = function () {
    return this.dataType_ ;
};

// get database type attribute
Query.prototype.getDatabase = function () {
    return this.database_ ;
};

module.exports = Query;

