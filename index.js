// Generated by CoffeeScript 1.6.3
var getCallerFilename,
  __slice = [].slice;

getCallerFilename = function() {
  var err, oP, stack;
  oP = Error.prepareStackTrace;
  Error.prepareStackTrace = function(e, stack) {
    return stack;
  };
  err = new Error();
  stack = err.stack;
  Error.prepareStackTrace = oP;
  stack.shift();
  stack.shift();
  return stack[1].receiver.filename;
};

module.exports = function() {
  var callerDirectory, callerFile, mod, modFile, mods, modules, _i, _j, _len, _len1, _ref;
  modules = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  callerFile = getCallerFilename();
  callerDirectory = require('path').dirname(callerFile);
  if (modules.length === 0) {
    mods = {};
    _ref = require('fs').readdirSync(callerDirectory).filter(function(elem) {
      return elem.substr(elem.length - 3, elem.length) === '.js' && callerFile !== callerDirectory + "\\" + elem;
    });
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      modFile = _ref[_i];
      mod = modFile.substr(0, modFile.length - 3);
      mods[mod] = require(callerDirectory + "/" + mod);
    }
    return mods;
  } else {
    mods = {};
    for (_j = 0, _len1 = modules.length; _j < _len1; _j++) {
      mod = modules[_j];
      mods[mod] = require(mod);
    }
    return mods;
  }
};
