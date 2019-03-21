
//Config ES6
require("babel-polyfill")
require("babel-register")

// patch console to adding timestamp
require("console-stamp")(console)

require('./src/index');
