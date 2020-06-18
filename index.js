
const BopIt = require("./bopit.js");
global.glob = require("glob");
global.fs = require("fs");
global.getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};
global.BOPIT = new BopIt();