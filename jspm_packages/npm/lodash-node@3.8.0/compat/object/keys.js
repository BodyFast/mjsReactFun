/* */ 
var isArrayLike = require("../internal/isArrayLike"),
    isNative = require("../lang/isNative"),
    isObject = require("../lang/isObject"),
    shimKeys = require("../internal/shimKeys"),
    support = require("../support");
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object != null && object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) || (typeof object == 'function' ? support.enumPrototypes : isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};
module.exports = keys;
