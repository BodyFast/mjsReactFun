/* */ 
var baseGet = require("../internal/baseGet"),
    baseSlice = require("../internal/baseSlice"),
    isIndex = require("../internal/isIndex"),
    isKey = require("../internal/isKey"),
    isString = require("../lang/isString"),
    last = require("../array/last"),
    support = require("../support"),
    toPath = require("../internal/toPath");
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function has(object, path) {
  if (object == null) {
    return false;
  }
  var result = hasOwnProperty.call(object, path);
  if (!result && !isKey(path)) {
    path = toPath(path);
    object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
    path = last(path);
    result = object != null && hasOwnProperty.call(object, path);
  }
  return result || (support.nonEnumStrings && isString(object) && isIndex(path, object.length));
}
module.exports = has;
