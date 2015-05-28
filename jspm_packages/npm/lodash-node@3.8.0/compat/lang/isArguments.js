/* */ 
var isArrayLike = require("../internal/isArrayLike"),
    isObjectLike = require("../internal/isObjectLike"),
    support = require("../support");
var argsTag = '[object Arguments]';
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var objToString = objectProto.toString;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
}
if (!support.argsTag) {
  isArguments = function(value) {
    return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };
}
module.exports = isArguments;
