'use strict';

// creating device class and attributes
var Device = function Device(name,endpoint,id,dataType,protocol) {
    this.name_ = name;
    this.endpoint_  = endpoint;
    this.id_   = id;
    this.dataType_ = dataType;
    this.protocol_ = protocol;
    };

// get name attribute
Device.prototype.getName = function(){
    return this.name_ ;
};

// get endpoint attribute
Device.prototype.getEndPoint = function(){
    return this.endpoint_ ;
};

// get device ID attribute
Device.prototype.getId = function () {
    return this.id_ ;
};

// get data type attribute
Device.prototype.dataType = function () {
    return this.dataType_ ;
};

// get protocol attribute
Device.prototype.protocol = function () {
    return this.protocol_ ;
};


module.exports = Device;

