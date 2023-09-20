// open the dB

var fs = require('fs');
//var async = require("async");
var dbpath = 'data/MDT_810-0042-270.db';
var db = "";
var msg = "";

var sqlite3 = require('sqlite3').verbose();
db = new sqlite3.Database(dbpath, function(){
    console.log("CL350 MDSS Database opened successfully!");
});