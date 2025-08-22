(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("antd"), require("icons"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "antd", "icons"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("antd"), require("icons")) : factory(root["React"], root["antd"], root["icons"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_antd__, __WEBPACK_EXTERNAL_MODULE__ant_design_icons__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/copy-to-clipboard/index.js":
/*!******************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/copy-to-clipboard/index.js ***!
  \******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var deselectCurrent = __webpack_require__(/*! toggle-selection */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/toggle-selection/index.js");
var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
};
var defaultMessage = "Copy to clipboard: #{key}, Enter";
function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}
function copy(text, options) {
  var debug,
    message,
    reselectPrevious,
    range,
    selection,
    mark,
    success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();
    range = document.createRange();
    selection = document.getSelection();
    mark = document.createElement("span");
    mark.textContent = text;
    // avoid screen readers from reading out loud the text
    mark.ariaHidden = "true";
    // reset user styles for span element
    mark.style.all = "unset";
    // prevents scrolling to the end of the page
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = "pre";
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function (e) {
      e.stopPropagation();
      if (options.format) {
        e.preventDefault();
        if (typeof e.clipboardData === "undefined") {
          // IE 11
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
          window.clipboardData.setData(format, text);
        } else {
          // all other browsers
          e.clipboardData.clearData();
          e.clipboardData.setData(options.format, text);
        }
      }
      if (options.onCopy) {
        e.preventDefault();
        options.onCopy(e.clipboardData);
      }
    });
    document.body.appendChild(mark);
    range.selectNodeContents(mark);
    selection.addRange(range);
    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(options.format || "text", text);
      options.onCopy && options.onCopy(window.clipboardData);
      success = true;
    } catch (err) {
      debug && console.error("unable to copy using clipboardData: ", err);
      debug && console.error("falling back to prompt");
      message = format("message" in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }
    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }
  return success;
}
module.exports = copy;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_Symbol.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_Symbol.js ***!
  \*********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_root.js");

/** Built-in value references. */
var _Symbol = root.Symbol;
module.exports = _Symbol;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_baseGetTag.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_baseGetTag.js ***!
  \*************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _Symbol = __webpack_require__(/*! ./_Symbol */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_Symbol.js"),
  getRawTag = __webpack_require__(/*! ./_getRawTag */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_getRawTag.js"),
  objectToString = __webpack_require__(/*! ./_objectToString */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
  undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
module.exports = baseGetTag;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_baseTrim.js":
/*!***********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_baseTrim.js ***!
  \***********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
}
module.exports = baseTrim;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_freeGlobal.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_freeGlobal.js ***!
  \*************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof __webpack_require__.g === "undefined" ? "undefined" : _typeof(__webpack_require__.g)) == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
module.exports = freeGlobal;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_getRawTag.js":
/*!************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_getRawTag.js ***!
  \************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _Symbol = __webpack_require__(/*! ./_Symbol */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
    tag = value[symToStringTag];
  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
module.exports = getRawTag;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_objectToString.js":
/*!*****************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_objectToString.js ***!
  \*****************************************************************************************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}
module.exports = objectToString;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_root.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_root.js ***!
  \*******************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_trimmedEndIndex.js":
/*!******************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_trimmedEndIndex.js ***!
  \******************************************************************************************************************/
/***/ (function(module) {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}
module.exports = trimmedEndIndex;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/debounce.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/debounce.js ***!
  \**********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isObject.js"),
  now = __webpack_require__(/*! ./now */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/now.js"),
  toNumber = __webpack_require__(/*! ./toNumber */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
  nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs,
      thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }
  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(),
      isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
module.exports = debounce;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isObject.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isObject.js ***!
  \**********************************************************************************************************/
/***/ (function(module) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}
module.exports = isObject;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isObjectLike.js":
/*!**************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isObjectLike.js ***!
  \**************************************************************************************************************/
/***/ (function(module) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && _typeof(value) == 'object';
}
module.exports = isObjectLike;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isSymbol.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isSymbol.js ***!
  \**********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_baseGetTag.js"),
  isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
module.exports = isSymbol;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/now.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/now.js ***!
  \*****************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function now() {
  return root.Date.now();
};
module.exports = now;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/throttle.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/throttle.js ***!
  \**********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var debounce = __webpack_require__(/*! ./debounce */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/debounce.js"),
  isObject = __webpack_require__(/*! ./isObject */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isObject.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
    trailing = true;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}
module.exports = throttle;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/toNumber.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/toNumber.js ***!
  \**********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/_baseTrim.js"),
  isObject = __webpack_require__(/*! ./isObject */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isObject.js"),
  isSymbol = __webpack_require__(/*! ./isSymbol */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
module.exports = toNumber;

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/toggle-selection/index.js":
/*!*****************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/toggle-selection/index.js ***!
  \*****************************************************************************************************************/
/***/ (function(module) {

module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;
  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }
  switch (active.tagName.toUpperCase()) {
    // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;
    default:
      active = null;
      break;
  }
  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' && selection.removeAllRanges();
    if (!selection.rangeCount) {
      ranges.forEach(function (range) {
        selection.addRange(range);
      });
    }
    active && active.focus();
  };
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);
      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }
      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names

  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }
      list.push(item);
    }
  };
  return list;
};
function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }
  return [content].join('\n');
} // Adapted from convert-source-map (MIT)

function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_copy/runtime.tsx":
/*!************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_copy/runtime.tsx ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! copy-to-clipboard */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/copy-to-clipboard/index.js");
/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
  var env = props.env,
    inputs = props.inputs,
    outputs = props.outputs,
    data = props.data;
  var runtime = env.runtime;
  if (runtime) {
    inputs['copy'](function (val, outputRels) {
      //数据处理
      //1、输入为函数
      if (Object.prototype.toString.call(val) === '[object Function]') {
        val = String(val);
      } else if (typeof val !== 'string') {
        //输入为数组，对象，布尔，null
        if (val === null) {
          val = 'null';
        } else if (val === undefined) {
          val = 'undefined';
        } else {
          val = JSON.stringify(val);
        }
      } else if (val === '') {
        val = ' ';
      }
      data.text = val;
      try {
        copy_to_clipboard__WEBPACK_IMPORTED_MODULE_0___default()(data.text);
        outputRels['success'](val);
      } catch (e) {
        outputRels['error'](e);
      }
    });
  }
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_download/runtime.ts":
/*!***************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_download/runtime.ts ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
var defaultFilename = 'download';
var getType = function getType(obj) {
  return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
};
var matchFilename = function matchFilename(url) {
  try {
    if (/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
      return url.substring(url.lastIndexOf('/') + 1);
    }
  } catch (error) {
    console.error(error);
  }
};
var download = function download(url, filename) {
  fetch(url).then(function (response) {
    return response.blob();
  }).then(function (blob) {
    var blobUrl = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.setAttribute('href', blobUrl);
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank');
    link.click();
    URL.revokeObjectURL(blobUrl);
  });
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var data = _a.data,
    env = _a.env,
    inputs = _a.inputs;
  var filename = data.filename,
    nameConfig = data.nameConfig;
  var runtime = env.runtime;
  if (runtime) {
    inputs['url'](function (val) {
      if (val) {
        if (nameConfig === 0 && getType(val) === 'String') {
          download(val, filename || matchFilename(val) || defaultFilename);
        } else if (nameConfig === 1 && getType(val) === 'Object') {
          var url = val.url,
            _filename = val.filename;
          download(url, _filename || defaultFilename);
        } else {
          console.error('[资源下载]：数据类型错误');
        }
      }
    });
  }
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_get-data/runtime.ts":
/*!***************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_get-data/runtime.ts ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var env = _a.env,
    data = _a.data,
    inputs = _a.inputs,
    outputs = _a.outputs,
    logger = _a.logger,
    onError = _a.onError;
  inputs['input'](function (val) {
    if (data.type === 'randomNumber') {
      outputs['result'](Math.random());
    } else if (data.type === 'randomString') {
      outputs['result'](new String(Math.random()));
    } else {
      outputs['result'](data.value);
    }
  });
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_merge/constants.ts":
/*!**************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_merge/constants.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var OutputIds = {
  Output: 'output'
};
var Schemas = {
  Follow: {
    type: 'follow'
  }
};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_merge/runtime.ts":
/*!************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_merge/runtime.ts ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_merge/constants.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_merge/utils.ts");
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var env = _a.env,
    data = _a.data,
    inputs = _a.inputs,
    outputs = _a.outputs;
  var runtime = env.runtime;
  var isMerge = data.isMerge;
  var inputNum = Object.keys(inputs).length;
  var list = [];
  var triggerKeys = new Set();
  var mergeStrategy = {
    Array: _utils__WEBPACK_IMPORTED_MODULE_1__.arrayMerge,
    Object: _utils__WEBPACK_IMPORTED_MODULE_1__.objMerge
  };
  if (runtime) {
    Object.keys(inputs).forEach(function (key, index) {
      inputs[key](function (val) {
        list[index] = val;
        triggerKeys.add(key);
        if (triggerKeys.size === inputNum) {
          var type = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.isSameInputType)(list);
          if (!!isMerge && !!type) {
            outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output](mergeStrategy[type](list));
          } else {
            outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output](__spreadArray([], list, true));
          }
          list = [];
          triggerKeys.clear();
        }
      });
    });
  }
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_merge/utils.ts":
/*!**********************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_merge/utils.ts ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayMerge: function() { return /* binding */ arrayMerge; },
/* harmony export */   getInputOrder: function() { return /* binding */ getInputOrder; },
/* harmony export */   getOutputSchema: function() { return /* binding */ getOutputSchema; },
/* harmony export */   getType: function() { return /* binding */ getType; },
/* harmony export */   isSameInputType: function() { return /* binding */ isSameInputType; },
/* harmony export */   objMerge: function() { return /* binding */ objMerge; }
/* harmony export */ });
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var SupportType = ['Array', 'Object'];
var isSameInputType = function isSameInputType(inputs) {
  var first = inputs[0],
    rest = inputs.slice(1);
  var type = getType(first);
  if (!type || !SupportType.includes(type)) return;
  var isSame = Object.values(rest).every(function (item) {
    return getType(item) === type;
  });
  return isSame ? type : null;
};
var getType = function getType(obj) {
  var _a;
  return (_a = Object.prototype.toString.call(obj).match(/\[object (.*)\]/)) === null || _a === void 0 ? void 0 : _a[1];
};
var arrayMerge = function arrayMerge(inputs) {
  var ret = new Set(inputs.reduce(function (pre, cur) {
    if (pre === void 0) {
      pre = [];
    }
    return __spreadArray(__spreadArray([], pre, true), cur, true);
  }, []));
  return Array.from(ret);
};
var objMerge = function objMerge(inputs) {
  var ret = inputs.reduce(function (pre, cur) {
    if (pre === void 0) {
      pre = {};
    }
    return __assign(__assign({}, pre), cur);
  }, {});
  return ret;
};
// 获取输入项序号
function getInputOrder(_a) {
  var _b;
  var input = _a.input;
  var ports = input.get();
  var id = (((_b = ports === null || ports === void 0 ? void 0 : ports.pop) === null || _b === void 0 ? void 0 : _b.call(ports)) || {}).id;
  return (Number(id.slice(5)) || 0) + 1;
}
// 获取输出schema
function getOutputSchema(data, input) {
  var _a;
  var res = {};
  var inputList = input.get() || [];
  var first = inputList[0],
    rest = inputList.slice(1);
  var firstSchema = (_a = input.get(first === null || first === void 0 ? void 0 : first.id)) === null || _a === void 0 ? void 0 : _a.schema;
  var firstSchemaJSON = JSON.stringify(firstSchema);
  // 1. 对象合并
  var isMergeObject = data.isMerge && (inputList || []).every(function (item) {
    var _a;
    var schema = (_a = input.get(item === null || item === void 0 ? void 0 : item.id)) === null || _a === void 0 ? void 0 : _a.schema;
    return (schema === null || schema === void 0 ? void 0 : schema.type) === 'object';
  });
  if (isMergeObject) {
    (inputList || []).forEach(function (item) {
      var _a;
      var schema = (_a = input.get(item === null || item === void 0 ? void 0 : item.id)) === null || _a === void 0 ? void 0 : _a.schema;
      Object.assign(res, schema === null || schema === void 0 ? void 0 : schema.properties);
    });
    return {
      type: 'object',
      properties: res
    };
  }
  // 2. 数组子项类型相同
  var isArraySameSchema = rest.every(function (item) {
    var _a;
    var schema = (_a = input.get(item === null || item === void 0 ? void 0 : item.id)) === null || _a === void 0 ? void 0 : _a.schema;
    return JSON.stringify(schema) === firstSchemaJSON;
  });
  if (isArraySameSchema) {
    return data.isMerge ? firstSchema : {
      type: 'array',
      items: firstSchema
    };
  }
  // 其他情形
  return {
    type: 'array',
    items: {
      type: 'any'
    }
  };
}


/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/expression.ts":
/*!*********************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/expression.ts ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runExpression: function() { return /* binding */ runExpression; }
/* harmony export */ });
var getCodeFromTemplate = function getCodeFromTemplate(template) {
  // const code = template.match(/(?<=\{)(.+?)(?=\})/g)
  var _a;
  // Safari 不支持正则表达式中的 lookbehind，可以改为使用捕获组来提取大括号内的内容：
  // 该代码在 Chrome 和 Safari 中都能够执行，并返回大括号内的内容列表。
  var code = (_a = template.match(/\{(.+?)\}/g)) === null || _a === void 0 ? void 0 : _a.map(function (match) {
    return match.slice(1, -1);
  });
  return code ? code[0] : "";
};
var sandbox = function sandbox(code) {
  var fn = new Function("context", "with(context){\n      if(typeof ".concat(code, " !== 'undefined'){\n        return ").concat(code, "\n      }else{\n        return ''\n      }\n  }"));
  return function (context) {
    return fn(context);
  };
};
var runSuccess = function runSuccess(ret) {
  return {
    success: ret
  };
};
var runFail = function runFail(err) {
  return {
    error: err
  };
};
var runExpression = function runExpression(tpl, context) {
  try {
    var code = getCodeFromTemplate(tpl);
    if (!code || code.endsWith(".")) {
      return runSuccess('');
    }
    var ret = sandbox(code)(context);
    if (typeof ret === 'undefined') {
      throw new Error("".concat(code, " is not defined"));
    }
    return runSuccess(ret);
  } catch (error) {
    return runFail([{
      message: error === null || error === void 0 ? void 0 : error.message,
      startLineNumber: 0,
      endLineNumber: "".concat(tpl).split("\n").length + 1,
      length: tpl.length + 1
    }]);
  }
};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/index.ts":
/*!****************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/index.ts ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runExpression: function() { return /* reexport safe */ _expression__WEBPACK_IMPORTED_MODULE_2__.runExpression; },
/* harmony export */   runJs: function() { return /* binding */ runJs; },
/* harmony export */   utils: function() { return /* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_1__["default"]; }
/* harmony export */ });
/* harmony import */ var _sandbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sandbox */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/sandbox.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/utils.ts");
/* harmony import */ var _expression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expression */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/expression.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }


function runJs(scriptText, model, props) {
  var _a;
  var _b = props || {},
    env = _b.env,
    _c = _b.callback,
    callback = _c === void 0 ? function () {} : _c;
  var isRuntime = (env === null || env === void 0 ? void 0 : env.runtime) && !((_a = env === null || env === void 0 ? void 0 : env.runtime) === null || _a === void 0 ? void 0 : _a.debug);
  if (_typeof(scriptText) === 'object') {
    scriptText = isRuntime ? (scriptText === null || scriptText === void 0 ? void 0 : scriptText.transformCode) || (scriptText === null || scriptText === void 0 ? void 0 : scriptText.code) : scriptText === null || scriptText === void 0 ? void 0 : scriptText.code;
  }
  var fn = null;
  if (model && model.length) {
    var sandBox = new _sandbox__WEBPACK_IMPORTED_MODULE_0__["default"]({
      module: true
    });
    var sourceStr = decodeURIComponent(scriptText);
    if (/export\s+default.*async.*function.*\(/g.test(sourceStr)) {
      fn = sandBox.compile("".concat(sourceStr.replace(/export\s+default.*function.*\(/g, 'async function _RT_(')));
    } else {
      fn = sandBox.compile("".concat(sourceStr.replace(/export\s+default.*function.*\(/g, 'function _RT_(')));
    }
  } else {
    var sandBox = new _sandbox__WEBPACK_IMPORTED_MODULE_0__["default"]();
    fn = sandBox.compile("".concat(decodeURIComponent(scriptText)));
  }
  return fn.run(model, callback);
}



/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/sandbox.ts":
/*!******************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/sandbox.ts ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var rawWindowInterval = window.setInterval;
var rawWindowClearInterval = window.clearInterval;
var rawWindowTimeout = window.setTimeout;
var rawWindowClearTimeout = window.clearTimeout;
var originWindow = window;
var constructableMap = new WeakMap();
function isConstructable(fn) {
  if (constructableMap.has(fn)) {
    return constructableMap.get(fn);
  }
  var constructableFunctionRegex = /^function\b\s[A-Z].*/;
  var classRegex = /^class\b/;
  var constructable = fn.prototype && fn.prototype.constructor === fn && Object.getOwnPropertyNames(fn.prototype).length > 1 || constructableFunctionRegex.test(fn.toString()) || classRegex.test(fn.toString());
  constructableMap.set(fn, constructable);
  return constructable;
}
var isCallable = function isCallable(fn) {
  return typeof fn === 'function';
};
var boundedMap = new WeakMap();
function isBoundedFunction(fn) {
  if (boundedMap.has(fn)) {
    return boundedMap.get(fn);
  }
  var bounded = fn.name.indexOf('bound ') === 0 && !fn.hasOwnProperty('prototype');
  boundedMap.set(fn, bounded);
  return bounded;
}
var functionBoundedValueMap = new WeakMap();
function getTargetValue(target, value) {
  var cachedBoundFunction = functionBoundedValueMap.get(value);
  if (cachedBoundFunction) {
    return cachedBoundFunction;
  }
  var boundValue = Function.prototype.bind.call(value, target);
  for (var key in value) {
    boundValue[key] = value[key];
  }
  if (value.hasOwnProperty('prototype') && !boundValue.hasOwnProperty('prototype')) boundValue.prototype = value.prototype;
  functionBoundedValueMap.set(value, boundValue);
  return boundValue;
}
var unscopables = {
  undefined: true,
  Array: true,
  Object: true,
  String: true,
  Boolean: true,
  Math: true,
  Number: true,
  Symbol: true,
  parseFloat: true,
  Float32Array: true
};
function getModuleScript(scriptText) {
  return "(\n                function(window, params, cb) {\n                    with(window) {\n                        return (".concat(scriptText, ")(...params, cb)\n                    }\n                }\n            )");
}
function getScript(scriptText) {
  return "(\n                function(window) {\n                    with(window){\n                        ".concat(scriptText, "\n                    } \n                }\n            ).bind(window.proxy)\n        ");
}
/**
 * 创建fakeWindow
 * @returns fakeWindow
 */
function createFakeWindow() {
  var fakeWindow = {};
  Object.getOwnPropertyNames(originWindow).forEach(function (key) {
    var descriptor = Object.getOwnPropertyDescriptor(originWindow, key);
    if (descriptor && !descriptor.configurable) {
      var hasGetter = Object.prototype.hasOwnProperty.call(descriptor, 'get');
      if (key === 'top' || key === 'parent' || key === 'self' || key === 'window') {
        descriptor.configurable = true;
        if (!hasGetter) {
          descriptor.writable = true;
        }
      }
      Object.defineProperty(fakeWindow, key, Object.freeze(descriptor));
    }
  });
  return fakeWindow;
}
/**
 * 将 window 的属性 p 拷贝到 fakeWindow
 * @param p
 * @param fakeWindow
 */
function copyFromWindow(p, fakeWindow) {
  var descriptor = Object.getOwnPropertyDescriptor(window, p);
  if (descriptor && descriptor.writable) {
    Object.defineProperty(fakeWindow, p, {
      configurable: descriptor.configurable,
      enumerable: descriptor.enumerable,
      writable: descriptor.writable,
      value: descriptor.value
    });
  }
}
var Sandbox = /** @class */function () {
  // @ts-ignore
  function Sandbox(options) {
    if (options === void 0) {
      options = {};
    }
    var _this = this;
    this.hasDisposed = false;
    this.fakeWindow = createFakeWindow();
    this.timeoutList = [];
    this.intervalList = [];
    this.options = {};
    this.options = options || {};
    this.proxy = new Proxy(window, {
      set: function set(target, key, value) {
        if (!_this.hasDisposed) {
          try {
            if (!_this.fakeWindow.hasOwnProperty(key) && target.hasOwnProperty(key)) {
              // @ts-ignore
              copyFromWindow(key, _this.fakeWindow);
            }
            // @ts-ignore
            _this.fakeWindow[key] = value; // 赋值
          } catch (error) {
            console.error('set-key-error', key, error);
            throw error;
          }
        }
        return true;
      },
      get: function get(target, key) {
        if (key === Symbol.unscopables) {
          return unscopables;
        }
        if (key === 'window' || key === 'self') {
          return _this.proxy;
        }
        if (key === 'document') {
          return undefined;
        }
        if (key === 'hasOwnProperty') {
          return target.hasOwnProperty;
        }
        if (key === 'eval') {
          return target.eval;
        }
        if (key === 'location') {
          return target.location;
        }
        try {
          // @ts-ignore
          var value = key in _this.fakeWindow ? _this.fakeWindow[key] : target[key];
          // 仅绑定 isCallable && !isBoundedFunction && !isConstructable 的函数对象，如 window.console、window.atob 这类，
          // 不然微应用中调用时会抛出 Illegal invocation 异常
          if (isCallable(value) && !isBoundedFunction(value) && !isConstructable(value)) {
            value = Function.prototype.bind.call(value, target);
            return getTargetValue(window, value);
          }
          return value;
        } catch (error) {
          console.error('get-key-error', key, error);
          throw error;
        }
      },
      has: function has(target, key) {
        // @ts-ignore
        if (_this.options.module) {
          //参数允许逃逸到函数局部变量
          if (key === 'params' || key === 'cb') {
            return false;
          }
        }
        return true; // 伪造属性的存在性阻止沙盒逃逸
      }
    });

    this.proxy.setTimeout = function (handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      if (!_this.hasDisposed) {
        var timeoutId = rawWindowTimeout.apply(void 0, __spreadArray([handler, timeout], args, false));
        // @ts-ignore
        _this.timeoutList.push(timeoutId);
        return timeoutId;
      } else {
        return 0;
      }
    };
    this.proxy.clearTimeout = function (timeoutId) {
      // @ts-ignore
      var timeoutIndex = _this.timeoutList.indexOf(timeoutId);
      if (timeoutIndex !== -1) {
        _this.timeoutList.splice(timeoutIndex, 1);
      }
      return rawWindowClearTimeout(timeoutId);
    };
    this.proxy.setInterval = function (handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      if (!_this.hasDisposed) {
        var intervalId = rawWindowInterval.apply(void 0, __spreadArray([handler, timeout], args, false));
        // @ts-ignore
        _this.intervalList.push(intervalId);
        return intervalId;
      } else {
        return 0;
      }
    };
    this.proxy.clearInterval = function (intervalId) {
      // @ts-ignore
      var intervalIndex = _this.intervalList.indexOf(intervalId);
      if (intervalIndex !== -1) {
        _this.intervalList.splice(intervalIndex, 1);
      }
      return rawWindowClearInterval(intervalId);
    };
    // @ts-ignore
    originWindow.proxy = this.proxy;
  }
  // @ts-ignore
  Sandbox.prototype.compile = function (scriptText) {
    if (this.hasDisposed) {
      throw new Error('sandbox has been destroyed');
    }
    // @ts-ignore
    var isModule = this.options.module;
    var scriptTextWithSandbox;
    if (isModule) {
      scriptTextWithSandbox = getModuleScript(scriptText);
    } else {
      scriptTextWithSandbox = getScript(scriptText);
    }
    var fn = originWindow.eval("".concat(scriptTextWithSandbox, ";//@ sourceURL=sandbox-code.js"));
    return {
      // @ts-ignore
      run: function run(model, cb) {
        try {
          if (isModule) {
            // @ts-ignore
            return fn(window.proxy, model, cb);
          } else {
            // @ts-ignore
            return fn(window.proxy);
          }
        } catch (err) {
          console.error("js sandbox error occur:", err);
          throw err;
        }
      }
    };
  };
  //沙箱销毁功能
  Sandbox.prototype.dispose = function () {
    this.timeoutList.forEach(function (timeoutId) {
      window.clearTimeout(timeoutId);
    });
    this.timeoutList = [];
    this.intervalList.forEach(function (intervalId) {
      return rawWindowClearInterval(intervalId);
    });
    this.intervalList = [];
    this.fakeWindow = createFakeWindow();
    this.options = {};
    // @ts-ignore
    delete originWindow.proxy;
    this.hasDisposed = true;
    console.log('Sandbox was successfully destroyed');
  };
  return Sandbox;
}();
/* harmony default export */ __webpack_exports__["default"] = (Sandbox);

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/utils.ts":
/*!****************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/utils.ts ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isEmailPrefix(str) {
  return /^[a-zA-Z]+[\d\w_-]*$/.test(str);
}
function isNumber(str) {
  return /^\d+$/.test(str);
}
function isCommaNumber(str) {
  return /^\d+(,\d+)*$/.test(str);
}
function numToPercent(num, bit) {
  if (num === void 0) return 'input error';
  return "".concat((num * 100).toFixed(bit || 2), "%");
}
function isUrl(url) {
  return /^((https?):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i.test(url);
}
function getCookies() {
  return document.cookie.split('; ').reduce(function (s, e) {
    var p = e.indexOf('=');
    s[e.slice(0, p)] = e.slice(p + 1);
    return s;
  }, {});
}
function getParams() {
  return location.search.slice(1).split('&').reduce(function (s, a) {
    var m = a.split('=');
    if (m[0]) {
      s[m[0]] = decodeURIComponent(m[1]);
    }
    return s;
  }, {});
}
var transformCodeByBabel = function transformCodeByBabel(val, props) {
  var _a = props || {},
    presets = _a.presets,
    errorCallback = _a.errorCallback,
    _b = _a.babelInstance,
    babelInstance = _b === void 0 ? window === null || window === void 0 ? void 0 : window.Babel : _b;
  if (typeof (babelInstance === null || babelInstance === void 0 ? void 0 : babelInstance.transform) !== 'function' || typeof val !== 'string') {
    return val;
  }
  var res = {
    code: val,
    transformCode: ''
  };
  try {
    var temp = decodeURIComponent(val);
    if (/export\s+default.*async.*function.*\(/g.test(temp)) {
      temp = temp.replace(/export\s+default.*function.*\(/g, '_RTFN_ = async function _RT_(');
    } else if (/export\s+default.*function.*\(/g.test(temp)) {
      temp = temp.replace(/export\s+default.*function.*\(/g, '_RTFN_ = function _RT_(');
    } else {
      temp = "_RTFN_ = ".concat(temp, " ");
    }
    res.transformCode = encodeURIComponent(babelInstance.transform(temp, {
      presets: presets || ['env'],
      comments: false
    }).code);
    res.transformCode = "".concat(encodeURIComponent("(function() { var _RTFN_; \n")).concat(res.transformCode).concat(encodeURIComponent("\n; return _RTFN_; })()"));
  } catch (e) {
    if (typeof errorCallback === 'function') {
      errorCallback(e);
    }
    return val;
  }
  return res;
};
/* harmony default export */ __webpack_exports__["default"] = ({
  isEmailPrefix: isEmailPrefix,
  isCommaNumber: isCommaNumber,
  numToPercent: numToPercent,
  isNumber: isNumber,
  isUrl: isUrl,
  getCookies: getCookies,
  getParams: getParams,
  transformCodeByBabel: transformCodeByBabel
});

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/runtime.ts":
/*!********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/runtime.ts ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _com_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./com-utils */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/com-utils/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/util.ts");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var env = _a.env,
    data = _a.data,
    inputs = _a.inputs,
    outputs = _a.outputs,
    logger = _a.logger,
    onError = _a.onError;
  var fns = data.fns,
    runImmediate = data.runImmediate;
  var runJSParams = {
    outputs: (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertObject2Array)(outputs)
  };
  try {
    if (runImmediate) {
      if (env.runtime) {
        (0,_com_utils__WEBPACK_IMPORTED_MODULE_0__.runJs)(fns, [runJSParams]);
      }
    }
    inputs['input'](function (val) {
      try {
        (0,_com_utils__WEBPACK_IMPORTED_MODULE_0__.runJs)(fns, [__assign(__assign({}, runJSParams), {
          inputs: (0,_util__WEBPACK_IMPORTED_MODULE_1__.convertObject2Array)(val)
        })]);
      } catch (ex) {
        onError === null || onError === void 0 ? void 0 : onError(ex);
        console.error('js计算组件运行错误.', ex);
        logger.error("".concat(ex));
      }
    });
  } catch (ex) {
    onError === null || onError === void 0 ? void 0 : onError(ex);
    console.error('js计算组件运行错误.', ex);
    logger.error("".concat(ex));
  }
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/util.ts":
/*!*****************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/util.ts ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertObject2Array: function() { return /* binding */ convertObject2Array; },
/* harmony export */   jsonToSchema: function() { return /* binding */ jsonToSchema; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function jsonToSchema(json) {
  var schema = {
    type: void 0
  };
  proItem({
    schema: schema,
    val: json
  });
  if (schema.type) {
    return schema;
  } else {
    return;
  }
}
function proItem(_c) {
  var schema = _c.schema,
    val = _c.val,
    key = _c.key,
    fromAry = _c.fromAry;
  if (Array.isArray(val)) {
    var items = {};
    if (key) {
      schema[key] = {
        type: 'array',
        items: items
      };
    } else {
      schema.type = 'array';
      schema.items = items;
    }
    proAry(items, val);
  } else {
    if (_typeof(val) === 'object' && val) {
      var nSchema = void 0;
      if (fromAry) {
        schema.type = 'object';
        nSchema = schema.properties = {};
      }
      var properties = fromAry ? nSchema : {};
      if (!fromAry) {
        if (key) {
          schema[key] = {
            type: 'object',
            properties: properties
          };
        } else {
          schema.type = 'object';
          schema.properties = properties;
        }
      }
      proObj(properties, val);
    } else {
      var type = val === null || val === void 0 ? 'any' : _typeof(val);
      if (key === void 0) {
        schema.type = type;
      } else {
        schema[key] = {
          type: type
        };
      }
    }
  }
}
function proObj(curSchema, obj) {
  Object.keys(obj).map(function (key) {
    return proItem({
      schema: curSchema,
      val: obj[key],
      key: key
    });
  });
}
function proAry(curSchema, ary) {
  var sample;
  if (ary.length > 0) {
    sample = ary[0];
  }
  proItem({
    schema: curSchema,
    val: sample,
    fromAry: true
  });
}
function convertObject2Array(input) {
  var result = [];
  Object.keys(input).sort(function (a, b) {
    var _c, _d;
    var _a = ((_c = a === null || a === void 0 ? void 0 : a.match(/\d+/g)) === null || _c === void 0 ? void 0 : _c[0]) || 0;
    var _b = ((_d = b === null || b === void 0 ? void 0 : b.match(/\d+/g)) === null || _d === void 0 ? void 0 : _d[0]) || 0;
    return +_a - +_b;
  }).forEach(function (key) {
    result.push(input[key]);
  });
  return result;
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_object-merge/constants.ts":
/*!*********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_object-merge/constants.ts ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var OutputIds = {
  Output: 'output'
};
var Schemas = {
  Follow: {
    type: 'follow'
  }
};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_object-merge/runtime.ts":
/*!*******************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_object-merge/runtime.ts ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_object-merge/constants.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var inputs = _a.inputs,
    outputs = _a.outputs,
    logger = _a.logger,
    onError = _a.onError;
  try {
    var valList_1 = [];
    var inputNum_1 = Object.keys(inputs).length;
    var triggerKeys_1 = new Set();
    var getOutputVal_1 = function getOutputVal_1() {
      var res = {};
      valList_1.forEach(function (val) {
        if (val && _typeof(val) === 'object' && !Array.isArray(val)) {
          res = __assign(__assign({}, res), val);
        }
      });
      return res;
    };
    Object.keys(inputs).forEach(function (key, index) {
      inputs[key](function (val) {
        triggerKeys_1.add(key);
        valList_1[index] = val;
        if (triggerKeys_1.size === inputNum_1) {
          outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Output](getOutputVal_1());
          triggerKeys_1.clear();
          valList_1 = [];
        }
      });
    });
  } catch (ex) {
    console.error('js计算组件运行错误.', ex);
    logger.error("".concat(ex));
    onError === null || onError === void 0 ? void 0 : onError(ex);
  }
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_schema-simulator/runtime.tsx":
/*!************************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_schema-simulator/runtime.tsx ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
//随机生成字符串
function randomString(e) {
  e = e || 32;
  var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = '';
  for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}
//生成随机数
function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return Min + Math.round(Rand * Range);
}
//生成随机布尔值
function GetRandomBoolean() {
  var bool = GetRandomNum(0, 1);
  if (bool === 0) {
    return false;
  } else {
    return true;
  }
}
//如果any的话，可以生成字符串、随机数、布尔值、{}和[]
function GetRandomAny(e) {
  var random = GetRandomNum(0, 4);
  switch (random) {
    //随机字符串
    case 0:
      return randomString(e.strLength);
    //随机数
    case 1:
      return GetRandomNum(e.numberRange[0], e.numberRange[1]);
    //随机布尔值
    case 2:
      return GetRandomBoolean();
    //空对象
    case 3:
      return {};
    case 4:
      return [];
  }
}
//递归计算最小单元schema
var minCulation = function minCulation(schema, data) {
  //如果不是数组和对象，是最小单元了，就可以生成最小模块了
  //考虑了schema.type写错或者不存在的情况，返回空对象
  if (schema === undefined) {
    return undefined;
  } else if (schema.type === 'string' || schema.type === 'number' || schema.type === 'boolean' || schema.type === 'any' || schema.type === undefined) {
    switch (schema.type) {
      case 'string':
        return randomString(data.strLength);
      case 'number':
        return GetRandomNum(data.numberRange[0], data.numberRange[1]);
      case 'boolean':
        return GetRandomBoolean();
      case 'any':
        return GetRandomAny(data);
      case undefined:
        return {};
    }
  } else if (schema.type === 'object' || schema.type === 'array') {
    if (schema.type === 'object') {
      //考虑对象中的properties写错或者不存在的情况，返回空对象
      if (schema.properties === undefined) {
        return {};
      } else {
        var keys = Object.keys(schema.properties);
        var vals = keys.map(function (e) {
          return minCulation(schema.properties[e], data);
        });
        var newObj = {};
        for (var i = 0; i < keys.length; i++) {
          newObj[keys[i]] = vals[i];
        }
        return newObj;
      }
    } else if (schema.type === 'array') {
      //考虑对象中的items写错或者不存在的情况，返回空数组
      if (schema.items === undefined) {
        return [];
      } else {
        var newArr = [];
        var items = schema.items;
        //for (let i = 0; i < 10; i++) {
        for (var i = 0; i < data.arrLength; i++) {
          newArr.push(minCulation(items, data));
        }
        return newArr;
      }
    }
  }
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var data = _a.data,
    env = _a.env,
    inputs = _a.inputs,
    outputs = _a.outputs;
  var runtime = env.runtime;
  if (runtime) {
    //触发输出
    inputs['mockTouch'](function (val, outputRels) {
      outputRels['outputData'](minCulation(data.outSchema, data));
    });
    //连接组件直接输出
    if (outputs['outputData']) {
      outputs['outputData'](minCulation(data.outSchema, data));
    }
  }
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-debounce/constants.ts":
/*!***********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-debounce/constants.ts ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var InputIds = {
  Trigger: 'trigger'
};
var OutputIds = {
  Trigger: 'trigger'
};
var Schemas = {
  Any: {
    type: 'any'
  }
};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-debounce/runtime.ts":
/*!*********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-debounce/runtime.ts ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-debounce/constants.ts");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/debounce */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
  var env = props.env,
    data = props.data,
    outputs = props.outputs,
    inputs = props.inputs;
  // 防抖
  var debounceOutput = lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(function (val) {
    outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Trigger](val);
  }, data.delay, data.isleading ? {
    leading: true
  } : void 0);
  if ((env === null || env === void 0 ? void 0 : env.runtime) && inputs) {
    inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](function (val) {
      debounceOutput(val);
    });
  }
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-delay/constants.ts":
/*!********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-delay/constants.ts ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var InputIds = {
  Trigger: 'trigger',
  Cancel: 'cancel'
};
var OutputIds = {
  Trigger: 'trigger'
};
var Schemas = {
  Any: {
    type: 'any'
  }
};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-delay/runtime.ts":
/*!******************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-delay/runtime.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-delay/constants.ts");

// TODO: 调试结束清除定时器
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
  var _a;
  var env = props.env,
    data = props.data,
    outputs = props.outputs,
    inputs = props.inputs;
  var timer;
  if ((env === null || env === void 0 ? void 0 : env.runtime) && inputs) {
    inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](function (val) {
      clearInterval(timer);
      timer = setTimeout(function () {
        outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](val);
      }, data.delay);
    });
    (_a = inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Cancel]) === null || _a === void 0 ? void 0 : _a.call(inputs, function () {
      clearTimeout(timer);
    });
  }
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-loop/constants.ts":
/*!*******************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-loop/constants.ts ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var InputIds = {
  Trigger: 'trigger',
  Cancel: 'cancel'
};
var OutputIds = {
  Trigger: 'trigger'
};
var Schemas = {
  Any: {
    type: 'any'
  }
};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-loop/runtime.ts":
/*!*****************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-loop/runtime.ts ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-loop/constants.ts");

// TODO: 调试结束清除定时器
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
  var _a;
  var env = props.env,
    data = props.data,
    outputs = props.outputs,
    inputs = props.inputs;
  var timer;
  if ((env === null || env === void 0 ? void 0 : env.runtime) && inputs) {
    inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](function (val) {
      clearInterval(timer);
      if (data.immediate) {
        outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](val);
      }
      timer = setInterval(function () {
        outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](val);
      }, data.delay);
    });
    (_a = inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Cancel]) === null || _a === void 0 ? void 0 : _a.call(inputs, function () {
      clearInterval(timer);
    });
  }
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-throttle/constants.ts":
/*!***********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-throttle/constants.ts ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputIds: function() { return /* binding */ InputIds; },
/* harmony export */   OutputIds: function() { return /* binding */ OutputIds; },
/* harmony export */   Schemas: function() { return /* binding */ Schemas; }
/* harmony export */ });
var InputIds = {
  Trigger: 'trigger'
};
var OutputIds = {
  Trigger: 'trigger'
};
var Schemas = {
  Any: {
    type: 'any'
  }
};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-throttle/runtime.ts":
/*!*********************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-throttle/runtime.ts ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-throttle/constants.ts");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/throttle */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/node_modules/lodash/throttle.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(props) {
  var env = props.env,
    data = props.data,
    outputs = props.outputs,
    inputs = props.inputs;
  // 节流
  var throttleOutput = lodash_throttle__WEBPACK_IMPORTED_MODULE_1___default()(function (val) {
    outputs[_constants__WEBPACK_IMPORTED_MODULE_0__.OutputIds.Trigger](val);
  }, data.delay);
  if ((env === null || env === void 0 ? void 0 : env.runtime) && inputs) {
    inputs[_constants__WEBPACK_IMPORTED_MODULE_0__.InputIds.Trigger](function (val) {
      throttleOutput(val);
    });
  }
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_type-change/rt.tsx":
/*!**************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_type-change/rt.tsx ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var data = _a.data,
    outputs = _a.outputs,
    inputs = _a.inputs,
    onError = _a.onError;
  inputs['from'](function (val, relOutpus) {
    var _a;
    var script = (_a = data.exchange) === null || _a === void 0 ? void 0 : _a.script;
    if (script) {
      var fn = void 0,
        returnVal = void 0,
        isOk = void 0;
      try {
        eval("fn = ".concat(script));
        returnVal = fn(val);
        isOk = true;
      } catch (ex) {
        console.error(ex);
        onError("\u6570\u636E\u8F6C\u6362\u9519\u8BEF:".concat(ex.message), ex);
      }
      if (isOk) {
        outputs['to'](returnVal);
      }
    } else {
      onError('未配置转换规则');
    }
  });
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/constants.ts":
/*!**************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/constants.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlignEnum: function() { return /* binding */ AlignEnum; },
/* harmony export */   DefaultEvent: function() { return /* binding */ DefaultEvent; },
/* harmony export */   Location: function() { return /* binding */ Location; }
/* harmony export */ });
/**
 * Data
 * @param title      标题
 * @param hideTitle  隐藏标题
 * @param width      抽屉宽度
 * @param height     抽屉高度
 * @param placement  弹出位置
 * @param useFooter  是否使用工具条
 * @param footerLayout 工具条布局
 * @param footerBtns 操作项
 * @param closable   是否显示右上角关闭按钮
 * @param maskClosable 点击蒙层关闭
 */
var Location;
(function (Location) {
  Location["FRONT"] = "front";
  Location["BACK"] = "back";
})(Location || (Location = {}));
var DefaultEvent = ['ok', 'cancel'];
var AlignEnum;
(function (AlignEnum) {
  AlignEnum["Unset"] = "unset";
  AlignEnum["FlexStart"] = "flex-start";
  AlignEnum["Center"] = "center";
  AlignEnum["FlexEnd"] = "flex-end";
})(AlignEnum || (AlignEnum = {}));

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/runtime.tsx":
/*!*************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/runtime.tsx ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/constants.ts");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./runtime.less */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/runtime.less");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_runtime_less__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var _b;
  var env = _a.env,
    _env = _a._env,
    data = _a.data,
    slots = _a.slots,
    outputs = _a.outputs;
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var isMobile = ((_b = env === null || env === void 0 ? void 0 : env.canvas) === null || _b === void 0 ? void 0 : _b.type) === 'mobile';
  //关闭按钮点击事件
  var handleClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _env.currentScenes.close();
  }, []);
  //取消按钮点击事件
  var handleCancel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (env.runtime) {
      var index = data.footerBtns.findIndex(function (item) {
        return item.id === 'cancel';
      });
      var autoClose = data.footerBtns[index].autoClose;
      if (autoClose) {
        _env.currentScenes.close();
        outputs['cancel']();
      } else {
        outputs['cancel']();
      }
    }
  }, []);
  //确认按钮点击事件
  var handleOk = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (env.runtime) {
      var okFn = outputs['ok'];
      okFn(); ////TODO 获取当前连接数
    }
  }, []);
  //普通按钮点击事件
  var handleCommon = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id) {
    if (env.runtime) {
      outputs[id]();
    }
  }, []);
  var _onClick = function onClick(id) {
    if (id === 'ok') {
      handleOk();
    } else if (id === 'cancel') {
      handleCancel();
    } else {
      handleCommon(id);
    }
  };
  var renderFooter = function renderFooter() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "data-toolbar": true,
      className: isMobile ? (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().mobileFooter) : "toolbar",
      style: {
        justifyContent: data.footerLayout || _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexEnd
      }
    }, (data.footerBtns || []).map(function (item) {
      var _a;
      var title = item.title,
        id = item.id,
        type = item.type,
        visible = item.visible,
        useIcon = item.useIcon,
        location = item.location,
        icon = item.icon,
        showText = item.showText;
      var Icon = useIcon && _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ && ((_a = _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__[icon]) === null || _a === void 0 ? void 0 : _a.render());
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
        onClick: function onClick() {
          return _onClick(id);
        },
        "data-handler-button": id,
        key: id,
        type: type,
        hidden: !visible,
        className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default()["footer-btns"])
      }, useIcon && location !== _constants__WEBPACK_IMPORTED_MODULE_1__.Location.BACK && Icon, showText && env.i18n(title), useIcon && location === _constants__WEBPACK_IMPORTED_MODULE_1__.Location.BACK && Icon);
    }));
  };
  //调试态
  var debugDrawer = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().debugMask),
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Drawer, {
    visible: true,
    title: data.hideTitle ? undefined : env.i18n(data.title),
    width: data.width || 520,
    height: isMobile ? '100%' : data.height !== 0 ? data.height : 800,
    closable: data.closable,
    footer: data.useFooter ? renderFooter() : null,
    onClose: handleClose,
    mask: false,
    bodyStyle: data.bodyStyle,
    placement: isMobile ? 'bottom' : data.placement,
    maskClosable: data.maskClosable,
    getContainer: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().slotContainer)
  }, slots['body'].render())));
  //预览和发布态
  var publishDrawer = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Drawer, {
    visible: true,
    title: data.hideTitle ? undefined : env.i18n(data.title),
    width: data.width || 520,
    height: isMobile ? '100%' : data.height !== 0 ? data.height : 800,
    closable: data.closable,
    footer: data.useFooter ? renderFooter() : null,
    onClose: handleClose,
    bodyStyle: data.bodyStyle,
    placement: isMobile ? 'bottom' : data.placement,
    maskClosable: data.maskClosable,
    getContainer: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().slotContainer)
  }, slots['body'].render())));
  //编辑态
  var editDrawer = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().antdDrawer),
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Drawer, {
    visible: true,
    title: data.hideTitle ? undefined : env.i18n(data.title),
    closable: data.closable,
    footer: data.useFooter ? renderFooter() : null,
    onClose: handleClose,
    mask: false,
    bodyStyle: data.bodyStyle,
    maskClosable: data.maskClosable,
    style: {
      height: data.height !== 0 ? data.height : 800,
      width: data.width !== 0 ? data.width : 520
    },
    getContainer: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().slotContainer)
  }, slots['body'].render())));
  //调试态
  if (env.runtime && env.runtime.debug) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().mask)
    }, debugDrawer);
    //编辑态
  } else if (env.edit) {
    return editDrawer;
  }
  //预览态 (发布态)
  return publishDrawer;
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/image/runtime.tsx":
/*!************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/image/runtime.tsx ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime.less */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/image/runtime.less");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_runtime_less__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var data = _a.data,
    inputs = _a.inputs,
    outputs = _a.outputs;
  var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(data.uri),
    src = _b[0],
    setSrc = _b[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setSrc(data.uri);
  }, [data.uri]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    inputs["setSrc"](function (src) {
      if (!src || typeof src !== "string") return;
      setSrc(src);
    });
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_1___default().imageWrapper),
    style: data.style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    style: {
      display: "block",
      width: "100%",
      height: "100%",
      objectFit: "contain"
    },
    src: src
  }));
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/edit/util.ts":
/*!*******************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/edit/util.ts ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getColOutputId: function() { return /* binding */ getColOutputId; },
/* harmony export */   getRowOutputId: function() { return /* binding */ getRowOutputId; }
/* harmony export */ });
/**
 * @description 获取列的outputId
 * @param colId
 * @returns
 */
function getColOutputId(colId) {
  return "col_output_".concat(colId);
}
/**
 * @description 获取行的outputId
 * @param rowId
 * @returns
 */
function getRowOutputId(rowId) {
  return "row_output_".concat(rowId);
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/runtime.tsx":
/*!******************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/runtime.tsx ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit/util */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/edit/util.ts");
/* harmony import */ var _css_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css.less */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/css.less");
/* harmony import */ var _css_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_less__WEBPACK_IMPORTED_MODULE_2__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};



/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var env = props.env,
    data = props.data,
    slots = props.slots,
    inputs = props.inputs,
    outputs = props.outputs;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_css_less__WEBPACK_IMPORTED_MODULE_2___default().layout),
    style: data.style
  }, data.rows.map(function (row, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Row, {
      key: row.id,
      row: row,
      props: props,
      onClick: function onClick() {
        var _a;
        return (_a = outputs['click']) === null || _a === void 0 ? void 0 : _a.call(outputs, true);
      }
    });
  }));
});
function Row(_a) {
  var _b;
  var row = _a.row,
    props = _a.props;
  var data = props.data,
    slots = props.slots,
    env = props.env,
    outputs = props.outputs;
  var cols = row.cols;
  /** 与响应式对象解耦，防止修改源对象 */
  var style = JSON.parse(JSON.stringify((_b = row === null || row === void 0 ? void 0 : row.style) !== null && _b !== void 0 ? _b : {}));
  if (row.height === 'auto') {
    style.flex = 1;
  } else if (typeof row.height === 'number') {
    style.height = row.height;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_css_less__WEBPACK_IMPORTED_MODULE_2___default().row),
    style: style,
    onClick: function onClick() {
      var _a;
      return (_a = outputs[(0,_edit_util__WEBPACK_IMPORTED_MODULE_1__.getRowOutputId)(row === null || row === void 0 ? void 0 : row.id)]) === null || _a === void 0 ? void 0 : _a.call(outputs, true);
    }
  }, cols.map(function (col, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Col, {
      key: col.id,
      col: col,
      row: row,
      props: props
    });
  }));
}
function Col(_a) {
  var _b, _c, _d, _e;
  var col = _a.col,
    row = _a.row,
    props = _a.props;
  var env = props.env,
    slots = props.slots,
    data = props.data,
    outputs = props.outputs;
  /** 与响应式对象解耦，防止下方修改源对象 */
  var style = JSON.parse(JSON.stringify((_b = col === null || col === void 0 ? void 0 : col.style) !== null && _b !== void 0 ? _b : {}));
  if (col.width === 'auto') {
    style.flex = 1;
  } else if (typeof col.width === 'number') {
    style.width = col.width;
  }
  /** 获取col的布局属性，优先级为col > row > data */
  var layoutStyle = __assign(__assign(__assign({}, (_c = data === null || data === void 0 ? void 0 : data.layout) !== null && _c !== void 0 ? _c : {}), (_d = row === null || row === void 0 ? void 0 : row.layout) !== null && _d !== void 0 ? _d : {}), (_e = col === null || col === void 0 ? void 0 : col.layout) !== null && _e !== void 0 ? _e : {});
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_css_less__WEBPACK_IMPORTED_MODULE_2___default().col),
    style: style,
    onClick: function onClick() {
      var _a;
      return (_a = outputs[(0,_edit_util__WEBPACK_IMPORTED_MODULE_1__.getColOutputId)(col === null || col === void 0 ? void 0 : col.id)]) === null || _a === void 0 ? void 0 : _a.call(outputs, true);
    }
  }, slots[col.id].render({
    style: layoutStyle
  }));
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/list-view/runtime.tsx":
/*!****************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/list-view/runtime.tsx ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css.less */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/list-view/css.less");
/* harmony import */ var _css_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_less__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (_a) {
  var env = _a.env,
    data = _a.data,
    slots = _a.slots,
    inputs = _a.inputs;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    inputs['setValue'](function (ds) {
      data.value = ds;
    });
  }, []);
  return React.createElement("div", {
    className: (_css_less__WEBPACK_IMPORTED_MODULE_1___default().listView)
  }, data.items.map(function (item, index) {
    return slots[item.id].render();
  }));
});

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/constants.ts":
/*!*************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/constants.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlignEnum: function() { return /* binding */ AlignEnum; },
/* harmony export */   DefaultEvent: function() { return /* binding */ DefaultEvent; },
/* harmony export */   Location: function() { return /* binding */ Location; }
/* harmony export */ });
/**
 * Data
 * @param title      标题
 * @param closable   是否显示右上角关闭按钮
 * @param centered   是否设置垂直居中
 * @param useFooter  是否使用工具条
 * @param width      弹窗宽度
 * @param hideTitle  隐藏标题
 * @param bodyStyle  对话框样式
 * @param footerLayout 工具条布局
 * @param footerBtns 操作项
 * @param maskClosable 点击蒙层关闭
 */
var Location;
(function (Location) {
  Location["FRONT"] = "front";
  Location["BACK"] = "back";
})(Location || (Location = {}));
var DefaultEvent = ['ok', 'cancel'];
var AlignEnum;
(function (AlignEnum) {
  AlignEnum["Unset"] = "unset";
  AlignEnum["FlexStart"] = "flex-start";
  AlignEnum["Center"] = "center";
  AlignEnum["FlexEnd"] = "flex-end";
})(AlignEnum || (AlignEnum = {}));

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/runtime.tsx":
/*!************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/runtime.tsx ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/constants.ts");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./runtime.less */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/runtime.less");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_runtime_less__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var _b;
  var env = _a.env,
    _env = _a._env,
    data = _a.data,
    slots = _a.slots,
    outputs = _a.outputs;
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var isMobile = ((_b = env === null || env === void 0 ? void 0 : env.canvas) === null || _b === void 0 ? void 0 : _b.type) === 'mobile';
  //关闭按钮点击事件
  var handleClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    _env.currentScenes.close();
  }, []);
  //取消按钮点击事件
  var handleCancel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (env.runtime) {
      var index = data.footerBtns.findIndex(function (item) {
        return item.id === 'cancel';
      });
      var autoClose = data.footerBtns[index].autoClose;
      if (autoClose) {
        _env.currentScenes.close();
        outputs['cancel']();
      } else {
        outputs['cancel']();
      }
    }
  }, []);
  //确认按钮点击事件
  var handleOk = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (env.runtime) {
      var okFn = outputs['ok'];
      okFn(); ////TODO 获取当前连接数
    }
  }, []);
  //普通按钮点击事件
  var handleCommon = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (id) {
    if (env.runtime) {
      outputs[id]();
    }
  }, []);
  var _onClick = function onClick(id) {
    if (id === 'ok') {
      handleOk();
    } else if (id === 'cancel') {
      handleCancel();
    } else {
      handleCommon(id);
    }
  };
  var renderFooter = function renderFooter() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "data-toolbar": true,
      className: isMobile ? (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().mobileFooter) : "toolbar",
      style: {
        justifyContent: data.footerLayout || _constants__WEBPACK_IMPORTED_MODULE_1__.AlignEnum.FlexEnd,
        display: 'flex'
      }
    }, (data.footerBtns || []).map(function (item) {
      var _a;
      var title = item.title,
        id = item.id,
        type = item.type,
        visible = item.visible,
        useIcon = item.useIcon,
        location = item.location,
        icon = item.icon,
        showText = item.showText;
      var Icon = useIcon && _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ && ((_a = _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__[icon]) === null || _a === void 0 ? void 0 : _a.render());
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
        onClick: function onClick() {
          return _onClick(id);
        },
        "data-handler-button": id,
        key: id,
        type: type,
        hidden: !visible
      }, useIcon && location !== _constants__WEBPACK_IMPORTED_MODULE_1__.Location.BACK && Icon, showText && env.i18n(title), useIcon && location === _constants__WEBPACK_IMPORTED_MODULE_1__.Location.BACK && Icon);
    }));
  };
  //调试态
  var debugPopup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().debugMask),
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    visible: true,
    title: data.hideTitle ? undefined : env.i18n(data.title),
    width: isMobile ? '100%' : data.width,
    footer: data.useFooter ? renderFooter() : null,
    onCancel: handleClose,
    centered: data.centered,
    bodyStyle: data.bodyStyle,
    maskClosable: data.maskClosable,
    wrapClassName: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().container),
    closable: data.closable,
    getContainer: ref.current ? function () {
      return ref.current;
    } : false
  }, slots['body'].render()));
  //预览态（发布态）
  var publishPopup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    visible: true,
    title: data.hideTitle ? undefined : env.i18n(data.title),
    width: isMobile ? '100%' : data.width,
    footer: data.useFooter ? renderFooter() : null,
    onCancel: handleClose,
    centered: data.centered,
    bodyStyle: data.bodyStyle,
    maskClosable: data.maskClosable,
    wrapClassName: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().container),
    closable: data.closable,
    getContainer: ref.current ? function () {
      return ref.current;
    } : false
  }, slots['body'].render()));
  //编辑态
  var editPopup = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().antdMask),
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    visible: true,
    title: data.hideTitle ? undefined : env.i18n(data.title),
    width: isMobile ? '100%' : data.width,
    footer: data.useFooter ? renderFooter() : null,
    onCancel: handleClose,
    mask: false,
    transitionName: "",
    bodyStyle: data.bodyStyle,
    wrapClassName: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().container),
    closable: data.closable,
    getContainer: false
  }, slots['body'].render()));
  //调试态
  if (env.runtime && env.runtime.debug) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: (_runtime_less__WEBPACK_IMPORTED_MODULE_4___default().mask)
    }, debugPopup);
    //编辑态
  } else if (env.edit) {
    return editPopup;
  }
  //预览态 (发布态)
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return publishPopup;
  }, []);
}

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/rectangle/runtime.tsx":
/*!****************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/rectangle/runtime.tsx ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css.less */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/rectangle/css.less");
/* harmony import */ var _css_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_less__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (_a) {
  var env = _a.env,
    data = _a.data,
    slots = _a.slots,
    inputs = _a.inputs,
    outputs = _a.outputs;
  var onClick = function onClick() {
    outputs["click"]();
  };
  // useEffect(() => {
  //   inputs["setValue"]((ds) => {
  //     data.value = ds;
  //   });
  // }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_css_less__WEBPACK_IMPORTED_MODULE_1___default().rectangle),
    onClick: onClick
  }, data.asSlot ? slots["container"].render() : null);
});

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/shape/runtime.tsx":
/*!************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/shape/runtime.tsx ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime.less */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/shape/runtime.less");
/* harmony import */ var _runtime_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_runtime_less__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_a) {
  var data = _a.data;
  var type = data.type,
    clipPath = data.clipPath;
  var shapeStyles = {};
  switch (type) {
    case 'rectangle':
      break;
    case 'circle':
      shapeStyles.borderRadius = '50%';
      break;
    case 'triangle':
      shapeStyles.clipPath = clipPath || "polygon(50% 0%, 0% 100%, 100% 100%)";
      break;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_1___default().wrapper),
    "data-item-type": "wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: shapeStyles,
    className: (_runtime_less__WEBPACK_IMPORTED_MODULE_1___default().shape),
    "data-item-type": "shape"
  }));
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/runtime.less":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/runtime.less ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".mask-643dc {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  background-color: rgba(0, 0, 0, 0.45);\n  z-index: 1000;\n}\n.debugMask-c376f .ant-drawer {\n  position: absolute;\n}\n.antdDrawer-b01d3 .ant-drawer {\n  position: unset;\n}\n.footer-btns-7d79e {\n  margin-left: 8px;\n}\n.toolbar-a19ba {\n  flex-direction: row;\n  flex-flow: row wrap;\n  display: flex;\n}\n.slotContainer-a3f99 {\n  height: 100%;\n  overflow: auto;\n}\n.mobileFooter-37445.mobileFooter-37445 {\n  flex-direction: column-reverse;\n  display: flex;\n  align-items: center;\n}\n.mobileFooter-37445.mobileFooter-37445 button {\n  width: 100%;\n  margin: 4px 0px !important;\n}\n", ""]);
// Exports
exports.locals = {
	"mask": "mask-643dc",
	"debugMask": "debugMask-c376f",
	"antdDrawer": "antdDrawer-b01d3",
	"footer-btns": "footer-btns-7d79e",
	"toolbar": "toolbar-a19ba",
	"slotContainer": "slotContainer-a3f99",
	"mobileFooter": "mobileFooter-37445"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/image/runtime.less":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/image/runtime.less ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".imageWrapper-7fcf4 {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  -o-object-fit: contain;\n     object-fit: contain;\n  line-height: 0px;\n}\n", ""]);
// Exports
exports.locals = {
	"imageWrapper": "imageWrapper-7fcf4"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/css.less":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/css.less ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".layout-905c9 {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.row-a7e69 {\n  display: flex;\n  flex-direction: row;\n}\n.row-a7e69:not(:first-of-type) {\n  margin-top: -1px;\n}\n.col-2b824 {\n  position: relative;\n  overflow: hidden;\n}\n.col-2b824:not(:first-of-type) {\n  margin-left: -1px;\n}\n", ""]);
// Exports
exports.locals = {
	"layout": "layout-905c9",
	"row": "row-a7e69",
	"col": "col-2b824"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/list-view/css.less":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/list-view/css.less ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".listView-1d373 {\n  width: 100%;\n  height: 100%;\n  display: flex;\n}\n", ""]);
// Exports
exports.locals = {
	"listView": "listView-1d373"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/runtime.less":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/runtime.less ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".mask-42577 {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  background-color: rgba(0, 0, 0, 0.45);\n  z-index: 1000;\n}\n.mask-42577 .ant-modal-wrap {\n  position: absolute;\n}\n.container-f14cc .ant-modal-close {\n  position: absolute !important;\n}\n.container-f14cc .ant-modal-title {\n  margin-right: 30px;\n}\n.container-f14cc .ant-modal-header {\n  padding: 16px 24px;\n  border-bottom: 1px solid #f0f0f0;\n}\n.container-f14cc .ant-modal-body {\n  padding: 24px;\n  overflow: auto;\n}\n.container-f14cc .ant-modal-footer {\n  padding: 10px 16px;\n  border-top: 1px solid #f0f0f0;\n}\n.container-f14cc .ant-modal-footer .toolbar {\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  flex-flow: row wrap;\n}\n.antdMask-61216 .ant-modal-wrap {\n  overflow: unset;\n  position: unset;\n}\n.antdMask-61216 .ant-modal {\n  top: 0px;\n  padding: unset;\n}\n.debugMask-47033 .ant-modal-mask {\n  position: unset;\n}\n.mobileFooter-f967b.mobileFooter-f967b {\n  flex-direction: column-reverse;\n  display: flex;\n  align-items: center;\n}\n.mobileFooter-f967b.mobileFooter-f967b button {\n  width: 100%;\n  margin: 4px 0px !important;\n}\n", ""]);
// Exports
exports.locals = {
	"mask": "mask-42577",
	"container": "container-f14cc",
	"antdMask": "antdMask-61216",
	"debugMask": "debugMask-47033",
	"mobileFooter": "mobileFooter-f967b"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/rectangle/css.less":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/rectangle/css.less ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".rectangle-c414b {\n  border: 1px solid #ccc;\n  width: 100%;\n  height: 100%;\n}\n", ""]);
// Exports
exports.locals = {
	"rectangle": "rectangle-c414b"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/shape/runtime.less":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/shape/runtime.less ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".wrapper-c8852 {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.shape-d08c6 {\n  flex-grow: 1;\n  aspect-ratio: 1;\n  width: 100%;\n  height: 100%;\n  background: #000;\n}\n", ""]);
// Exports
exports.locals = {
	"wrapper": "wrapper-c8852",
	"shape": "shape-d08c6"
};
module.exports = exports;


/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/runtime.less":
/*!**************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/runtime.less ***!
  \**************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./runtime.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/runtime.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/image/runtime.less":
/*!*************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/image/runtime.less ***!
  \*************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./runtime.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/image/runtime.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/css.less":
/*!***************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/css.less ***!
  \***************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./css.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/css.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/list-view/css.less":
/*!*************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/list-view/css.less ***!
  \*************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./css.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/list-view/css.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/runtime.less":
/*!*************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/runtime.less ***!
  \*************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./runtime.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/runtime.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/rectangle/css.less":
/*!*************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/rectangle/css.less ***!
  \*************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./css.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/rectangle/css.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/shape/runtime.less":
/*!*************************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/shape/runtime.less ***!
  \*************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var api = __webpack_require__(/*! !../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!../../../../../../../usr/local/lib/node_modules/@fangzhou/stark/node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!./runtime.less */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!./node_modules/less-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/shape/runtime.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_antd__;

/***/ }),

/***/ "@ant-design/icons":
/*!************************!*\
  !*** external "icons" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__ant_design_icons__;

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"} ***!
  \**************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!***********************************************************************************************!*\
  !*** ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/.temp-pub/entryRt.js ***!
  \***********************************************************************************************/
__webpack_require__.r(__webpack_exports__);
var comlibRT = window['__comlibs_rt_'];
if (!comlibRT) {
  comlibRT = window['__comlibs_rt_'] = [];
}
var comAray = [];
var comLib = {
  id: '7182',
  title: '基础组件库',
  author: 'Fangzhou Team',
  icon: '',
  version: '1.0.29',
  comAray: comAray
};
comlibRT.push(comLib);
var comDef;
/* harmony default export */ __webpack_exports__["default"] = (comLib);
comDef = {
  "title": "矩形",
  "namespace": "mybricks.basic-comlib.rectangle",
  "author": "CheMingjun",
  "author_name": "CheMingjun",
  "version": "1.0.0",
  "description": "矩形",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "setStyle",
    "title": "设置样式",
    "schema": {
      "type": "string"
    }
  }, {
    "id": "rotate",
    "title": "旋转",
    "schema": {
      "type": "number"
    },
    "rels": ["rotateCompleted"]
  }],
  "outputs": [{
    "id": "click",
    "title": "点击",
    "schema": {
      "type": "string"
    }
  }, {
    "id": "rotateCompleted",
    "title": "旋转完成",
    "schema": {
      "type": "boolean"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/rectangle/runtime.tsx */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/rectangle/runtime.tsx")["default"]);
comAray.push(comDef);
comDef = {
  "title": "形状",
  "namespace": "mybricks.normal-pc.shape",
  "version": "1.0.1",
  "description": "形状",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2250%22%20fill%3D%22%23555555%22%2F%3E%0A%3C%2Fsvg%3E%0A",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.tsx"
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/shape/runtime.tsx */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/shape/runtime.tsx")["default"]);
comAray.push(comDef);
comDef = {
  "title": "布局",
  "visibility": false,
  "namespace": "mybricks.basic-comlib.layout-grid",
  "author": "CheMingjun",
  "author_name": "CheMingjun",
  "version": "1.0.1",
  "description": "列表",
  "runtime": "./runtime.tsx",
  "runtime.edit": "./edit/runtime.tsx",
  "data": "./data.json",
  "editors": "./edit/editors.tsx",
  "slots": [{
    "id": "col0",
    "title": "内容（竖向排列）"
  }],
  "outputs": [{
    "id": "click",
    "title": "点击"
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/runtime.tsx */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/layout-grid/runtime.tsx")["default"]);
comAray.push(comDef);
comDef = {
  "title": "循环列表",
  "visibility": false,
  "namespace": "mybricks.basic-comlib.list-view",
  "author": "CheMingjun",
  "author_name": "CheMingjun",
  "version": "1.0.0",
  "description": "循环列表",
  "runtime": "./runtime.tsx",
  "data": "./data.json",
  "editors": "./editors.tsx",
  "slots": [{
    "id": "item0",
    "title": "项目1"
  }],
  "inputs": [{
    "id": "setValue",
    "title": "当前数据",
    "schema": {
      "type": "string"
    }
  }],
  "outputs": [{
    "id": "click",
    "title": "点击",
    "schema": {
      "type": "string"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/list-view/runtime.tsx */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/list-view/runtime.tsx")["default"]);
comAray.push(comDef);
comDef = {
  "title": "图片",
  "visibility": false,
  "namespace": "mybricks.basic-comlib.image",
  "author": "CheMingjun",
  "author_name": "车明君",
  "version": "1.0.10",
  "description": "图片",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221637211051160%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%22116733%22%20width%3D%2232%22%20height%3D%2232%22%3E%3Cpath%20d%3D%22M896%20626.592a16%2016%200%200%200-7.68-13.664l-172.448-105.088a16%2016%200%200%200-20.704%203.52l-76%2092.608-1.024%201.152a16%2016%200%200%201-22.624%200.032l-252.832-252.064a16.032%2016.032%200%200%200-22.08-0.512l-187.36%20170.656a15.936%2015.936%200%200%200-5.248%2011.84V800h768v-173.408z%22%20p-id%3D%22116734%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M800%20320m-64%200a64%2064%200%201%200%20128%200%2064%2064%200%201%200-128%200Z%22%20p-id%3D%22116735%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M32%20128v768h960V128H32z%20m896%20704H96V192h832v640z%22%20p-id%3D%22116736%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "setSrc",
    "title": "图片链接",
    "schema": {
      "type": "string"
    }
  }],
  "outputs": [{
    "id": "click",
    "title": "点击",
    "schema": {
      "type": "string"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/image/runtime.tsx */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/image/runtime.tsx")["default"]);
comAray.push(comDef);
comDef = {
  "title": "对话框",
  "visibility": false,
  "namespace": "mybricks.basic-comlib.popup",
  "author": "CheMingjun",
  "author_name": "车明君",
  "version": "1.0.10",
  "description": "对话框",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.ts",
  "upgrade": "./upgrade.ts",
  "slots": [{
    "id": "body",
    "title": "内容"
  }],
  "outputs": [{
    "id": "ok",
    "title": "确定"
  }, {
    "id": "cancel",
    "title": "取消"
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/runtime.tsx */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/popup/runtime.tsx")["default"]);
comAray.push(comDef);
comDef = {
  "title": "抽屉",
  "visibility": false,
  "namespace": "mybricks.basic-comlib.drawer",
  "author": "HuangQiuyun",
  "author_name": "黄秋云",
  "version": "1.0.2",
  "description": "抽屉",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.ts",
  "slots": [{
    "id": "body",
    "title": "内容"
  }],
  "outputs": [{
    "id": "ok",
    "title": "确定"
  }, {
    "id": "cancel",
    "title": "取消"
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/runtime.tsx */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/drawer/runtime.tsx")["default"]);
comAray.push(comDef);
comDef = {
  "title": "类型转换",
  "namespace": "mybricks.core-comlib.type-change",
  "author": "CheMingjun",
  "author_name": "车明君",
  "version": "1.0.0",
  "description": "类型转换",
  "icon": "data:image/svg+xml,%3Csvg%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%2229627%22%20width%3D%2232%22%20height%3D%2232%22%3E%3Cpath%20d%3D%22M821.9%20442.3c15.6%200%2029.6-9.4%2035.6-23.8s2.7-31-8.3-42L672.8%20200.1c-5.8-5.8-15.3-5.8-21.1%200l-33.4%2033.4c-5.8%205.8-5.8%2015.3%200%2021.1l110.6%20110.6H170.6c-8.2%200-14.8%206.6-14.8%2014.8v47.5c0%208.1%206.6%2014.8%2014.8%2014.8h651.3z%20m29.8%20139H200.6c-15.6%200-29.6%209.4-35.6%2023.8s-2.7%2031%208.3%2042l176.4%20176.4c5.8%205.8%2015.3%205.8%2021.1%200l33.4-33.4c5.8-5.8%205.8-15.3%200-21.1L293.6%20658.4h558.1c8.3%200%2014.9-6.7%2014.9-14.9v-47.1c0.1-8.4-6.6-15.1-14.9-15.1z%20m0%200%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "runtime": "./rt.tsx",
  "editors": "./editors.tsx",
  "rtType": "js",
  "inputs": [{
    "id": "from",
    "title": "从",
    "schema": {
      "type": "follow"
    },
    "rels": ["to"]
  }],
  "outputs": [{
    "id": "to",
    "title": "到",
    "schema": {
      "type": "follow"
    },
    "conMax": 1,
    "editable": true
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_type-change/rt.tsx */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_type-change/rt.tsx")["default"]);
comAray.push(comDef);
comDef = {
  "title": "构造数据",
  "namespace": "mybricks.basic-comlib._get-data",
  "version": "1.0.0",
  "description": "生成数据",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3Csvg%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%2233945%22%20width%3D%2232%22%20height%3D%2232%22%3E%3Cpath%20d%3D%22M213.333333%20128h85.333334v85.333333H213.333333v213.333334a85.333333%2085.333333%200%200%201-85.333333%2085.333333%2085.333333%2085.333333%200%200%201%2085.333333%2085.333333v213.333334h85.333334v85.333333H213.333333c-45.653333-11.52-85.333333-38.4-85.333333-85.333333v-170.666667a85.333333%2085.333333%200%200%200-85.333333-85.333333H0v-85.333334h42.666667a85.333333%2085.333333%200%200%200%2085.333333-85.333333V213.333333a85.333333%2085.333333%200%200%201%2085.333333-85.333333m597.333334%200a85.333333%2085.333333%200%200%201%2085.333333%2085.333333v170.666667a85.333333%2085.333333%200%200%200%2085.333333%2085.333333h42.666667v85.333334h-42.666667a85.333333%2085.333333%200%200%200-85.333333%2085.333333v170.666667a85.333333%2085.333333%200%200%201-85.333333%2085.333333h-85.333334v-85.333333h85.333334v-213.333334a85.333333%2085.333333%200%200%201%2085.333333-85.333333%2085.333333%2085.333333%200%200%201-85.333333-85.333333V213.333333h-85.333334V128h85.333334m-298.666667%20512a42.666667%2042.666667%200%200%201%2042.666667%2042.666667%2042.666667%2042.666667%200%200%201-42.666667%2042.666666%2042.666667%2042.666667%200%200%201-42.666667-42.666666%2042.666667%2042.666667%200%200%201%2042.666667-42.666667m-170.666667%200a42.666667%2042.666667%200%200%201%2042.666667%2042.666667%2042.666667%2042.666667%200%200%201-42.666667%2042.666666%2042.666667%2042.666667%200%200%201-42.666666-42.666666%2042.666667%2042.666667%200%200%201%2042.666666-42.666667m341.333334%200a42.666667%2042.666667%200%200%201%2042.666666%2042.666667%2042.666667%2042.666667%200%200%201-42.666666%2042.666666%2042.666667%2042.666667%200%200%201-42.666667-42.666666%2042.666667%2042.666667%200%200%201%2042.666667-42.666667z%22%20fill%3D%22%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "rtType": "js-autorun",
  "inputs": [{
    "id": "input",
    "title": "获取",
    "schema": {
      "type": "any"
    },
    "rels": ["result"]
  }],
  "outputs": [{
    "id": "result",
    "title": "输出",
    "schema": {
      "type": "object"
    },
    "editable": true
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_get-data/runtime.ts */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_get-data/runtime.ts")["default"]);
comAray.push(comDef);
comDef = {
  "title": "JS计算",
  "namespace": "mybricks.basic-comlib._muilt-inputJs",
  "version": "1.0.2",
  "description": "JS计算",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3Csvg%20class%3D%22icon%22%20viewBox%3D%220%200%201025%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%2234100%22%20width%3D%2232%22%20height%3D%2232%22%3E%3Cpath%20d%3D%22M1024%20627.2c-12.8-70.4-57.6-131.2-195.2-185.6-48-22.4-99.2-38.4-115.2-73.6-6.4-22.4-6.4-32-3.2-44.8%209.6-41.6%2057.6-54.4%2099.2-41.6%2025.6%206.4%2048%2025.6%2064%2057.6%2067.2-44.8%2067.2-44.8%20112-73.6-16-25.6-25.6-38.4-38.4-51.2-41.6-44.8-96-67.2-182.4-67.2l-44.8%206.4c-44.8%209.6-86.4%2035.2-112%2064-73.6%2083.2-51.2%20227.2%2035.2%20288%2089.6%2067.2%20217.6%2080%20233.6%20140.8%2016%2076.8-57.6%2099.2-128%2089.6-51.2-12.8-80-38.4-112-86.4l-118.4%2067.2c12.8%2032%2028.8%2044.8%2051.2%2070.4%20112%20112%20395.2%20108.8%20446.4-64%203.2-6.4%2016-44.8%206.4-105.6-1.6%206.4%201.6%209.6%201.6%209.6zM440%20158.4h-144v376c0%2080%203.2%20153.6-9.6%20176-22.4%2044.8-76.8%2038.4-102.4%2032C156.8%20729.6%20144%20713.6%20128%20688c-3.2-9.6-6.4-16-6.4-16L3.2%20745.6c19.2%2041.6%2048%2076.8%2086.4%2099.2%2054.4%2032%20128%2044.8%20208%2025.6%2051.2-16%2092.8-44.8%20118.4-89.6%2032-60.8%2025.6-134.4%2025.6-217.6V161.6c-1.6%200-1.6-3.2-1.6-3.2z%22%20fill%3D%22%23707070%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "ai": "./ai.ts",
  "rtType": "js-autorun",
  "inputs": [{
    "id": "input",
    "title": "输入项",
    "schema": [{
      "name": "inputValue0",
      "title": "参数0",
      "type": "follow"
    }]
  }],
  "outputs": [{
    "id": "output0",
    "title": "输出项0",
    "schema": {
      "type": "number"
    },
    "editable": true
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/runtime.ts */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_muilt-inputJs/runtime.ts")["default"]);
comAray.push(comDef);
comDef = {
  "title": "延迟执行",
  "namespace": "mybricks.normal-pc.timer-delay",
  "version": "1.0.0",
  "rtType": "js",
  "description": "延迟执行",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20t%3D%221629808038012%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20p-id%3D%222123%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%2F%3E%3C%2Fdefs%3E%3Cpath%20d%3D%22M542.117647%20121.976471V60.235294h90.352941V0h-240.941176v60.235294H481.882353v61.741177c-235.038118%2015.661176-421.647059%20211.305412-421.647059%20450.258823C60.235294%20821.368471%20262.866824%201024%20512%201024S963.764706%20821.368471%20963.764706%20572.235294c0-238.953412-186.608941-434.597647-421.647059-450.258823zM512%20963.764706C296.116706%20963.764706%20120.470588%20788.118588%20120.470588%20572.235294S296.116706%20180.705882%20512%20180.705882%20903.529412%20356.352%20903.529412%20572.235294%20727.883294%20963.764706%20512%20963.764706zM542.117647%20542.117647h240.941177v60.235294H481.882353V361.411765h60.235294v180.705882z%22%20p-id%3D%222124%22%20fill%3D%22%23555555%22%2F%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "trigger",
    "title": "触发",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "trigger",
    "title": "执行",
    "schema": {
      "type": "any"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-delay/runtime.ts */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-delay/runtime.ts")["default"]);
comAray.push(comDef);
comDef = {
  "title": "循环执行",
  "namespace": "mybricks.normal-pc.timer-loop",
  "version": "1.0.0",
  "rtType": "js",
  "description": "循环执行",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "icon": "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20t%3D%221663849830120%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222843%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M192%20789.333333a21.24%2021.24%200%200%201-12.8-4.28%20344.513333%20344.513333%200%200%201-99.333333-118A341.246667%20341.246667%200%200%201%20384%20170.666667h256q6.36%200%2012.733333%200.233333l-49.153333-49.146667a21.333333%2021.333333%200%200%201%2030.173333-30.173333l85.333334%2085.333333a21.333333%2021.333333%200%200%201%200%2030.173334l-85.333334%2085.333333a21.333333%2021.333333%200%200%201-30.173333-30.173333l48.666667-48.666667Q646.126667%20213.333333%20640%20213.333333H384c-164.666667%200-298.666667%20134-298.666667%20298.666667%200%2094.833333%2043.546667%20181.933333%20119.48%20238.966667A21.333333%2021.333333%200%200%201%20192%20789.333333z%20m228.433333%20143.06a21.333333%2021.333333%200%200%200%200-30.173333l-49.153333-49.146667q6.366667%200.233333%2012.733333%200.233334H640a341.46%20341.46%200%200%200%20304.146667-496.42%20344.513333%20344.513333%200%200%200-99.333334-118%2021.333333%2021.333333%200%201%200-25.626666%2034.113333C895.12%20330.066667%20938.666667%20417.166667%20938.666667%20512c0%20164.666667-134%20298.666667-298.666667%20298.666667H384q-6.12%200-12.246667-0.246667l48.666667-48.666667a21.333333%2021.333333%200%200%200-30.173333-30.173333l-85.333334%2085.333333a21.333333%2021.333333%200%200%200%200%2030.173334l85.333334%2085.333333a21.333333%2021.333333%200%200%200%2030.173333%200zM768%20512c0-70.58-57.42-128-128-128-33.546667%200-70.666667%2013.38-99.246667%2035.78a146.466667%20146.466667%200%200%200-28.753333%2029.6%20146.466667%20146.466667%200%200%200-28.753333-29.6C454.666667%20397.38%20417.546667%20384%20384%20384c-70.58%200-128%2057.42-128%20128s57.42%20128%20128%20128c33.546667%200%2070.666667-13.38%2099.246667-35.78a146.466667%20146.466667%200%200%200%2028.753333-29.6%20146.466667%20146.466667%200%200%200%2028.753333%2029.6C569.333333%20626.62%20606.453333%20640%20640%20640c70.58%200%20128-57.42%20128-128z%20m-42.666667%200a85.426667%2085.426667%200%200%201-85.333333%2085.333333c-48%200-106.666667-39.373333-106.666667-85.333333s58.666667-85.333333%20106.666667-85.333333a85.426667%2085.426667%200%200%201%2085.333333%2085.333333z%20m-234.666666%200c0%2045.96-58.666667%2085.333333-106.666667%2085.333333a85.333333%2085.333333%200%200%201%200-170.666666c48%200%20106.666667%2039.373333%20106.666667%2085.333333z%22%20fill%3D%22%23555555%22%20p-id%3D%222844%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "trigger",
    "title": "触发",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "trigger",
    "title": "执行",
    "schema": {
      "type": "any"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-loop/runtime.ts */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-loop/runtime.ts")["default"]);
comAray.push(comDef);
comDef = {
  "title": "防抖",
  "namespace": "mybricks.normal-pc.timer-debounce",
  "version": "1.0.1",
  "rtType": "js",
  "description": "防抖",
  "author": "HuangQiuyun",
  "author_name": "黄秋云",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221678173929706%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%228323%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M778.666667%20576h-42.666667a53.333333%2053.333333%200%200%201%200-106.666667h42.666667a53.333333%2053.333333%200%200%201%200%20106.666667zM970.666667%20576h-42.666667a53.333333%2053.333333%200%200%201%200-106.666667h42.666667a53.333333%2053.333333%200%200%201%200%20106.666667z%22%20fill%3D%22%23555555%22%20p-id%3D%228324%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M170.709333%20864.042667a53.333333%2053.333333%200%200%201-47.488-28.970667%20662.826667%20662.826667%200%200%201-66.389333-335.146667%20546.133333%20546.133333%200%200%201%20115.669333-320.896l2.090667-2.304a66.602667%2066.602667%200%200%201%2070.272-21.333333c40.704%2012.8%2053.973333%2057.728%2066.005333%20110.677333%2010.752%2047.189333%2023.253333%20120.874667%2040.576%20238.933334a481.109333%20481.109333%200%200%200%2020.736%2091.221333%20415.36%20415.36%200%200%200%2023.125334-91.562667c8.533333-55.168%2021.802667-115.2%2073.002666-128a75.562667%2075.562667%200%200%201%2073.557334%2024.448%20311.893333%20311.893333%200%200%201%2030.250666%2036.693334c5.205333%206.997333%2013.269333%2017.834667%2018.474667%2023.424a53.333333%2053.333333%200%200%201-14.549333%20104.661333%2098.133333%2098.133333%200%200%201-75.221334-45.653333v0.426666a476.928%20476.928%200%200%201-37.717333%20133.504c-29.269333%2059.733333-66.218667%2072.149333-92.16%2072.149334h-0.256c-25.344%200-61.226667-12.074667-88.32-68.821334a497.664%20497.664%200%200%201-36.352-137.173333c-6.058667-41.344-20.48-139.349333-34.133333-207.786667a555.946667%20555.946667%200%200%200%206.357333%20473.6%2053.333333%2053.333333%200%200%201-47.402667%2077.738667z%22%20fill%3D%22%23555555%22%20p-id%3D%228325%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.tsx",
  "upgrade": "./upgrade.ts",
  "inputs": [{
    "id": "trigger",
    "title": "触发",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "trigger",
    "title": "执行",
    "schema": {
      "type": "any"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-debounce/runtime.ts */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-debounce/runtime.ts")["default"]);
comAray.push(comDef);
comDef = {
  "title": "节流",
  "namespace": "mybricks.normal-pc.timer-throttle",
  "version": "1.0.0",
  "rtType": "js",
  "description": "节流",
  "author": "HuangQiuyun",
  "author_name": "黄秋云",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221678174141177%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%228900%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M512%20962.56c249.856%200%20450.56-200.704%20450.56-450.56S761.856%2061.44%20512%2061.44%2061.44%20262.144%2061.44%20512s200.704%20450.56%20450.56%20450.56z%20m0-53.248C292.864%20909.312%20114.688%20731.136%20114.688%20512S292.864%20114.688%20512%20114.688%20909.312%20292.864%20909.312%20512%20731.136%20909.312%20512%20909.312z%22%20fill%3D%22%23555555%22%20p-id%3D%228901%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M856.064%20512c0%2014.336-12.288%2026.624-26.624%2026.624s-26.624-12.288-26.624-26.624c0-161.792-131.072-290.816-290.816-290.816-14.336%200-26.624-12.288-26.624-26.624s12.288-26.624%2026.624-26.624c190.464%200%20344.064%20153.6%20344.064%20344.064zM167.936%20512c0-14.336%2012.288-26.624%2026.624-26.624s26.624%2012.288%2026.624%2026.624c0%20161.792%20131.072%20290.816%20290.816%20290.816%2014.336%200%2026.624%2012.288%2026.624%2026.624s-12.288%2026.624-26.624%2026.624c-190.464%200-344.064-153.6-344.064-344.064z%22%20fill%3D%22%23555555%22%20p-id%3D%228902%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M194.56%20485.376h636.928c18.432%200%2026.624%208.192%2026.624%2026.624s-8.192%2026.624-26.624%2026.624H194.56c-18.432%200-26.624-8.192-26.624-26.624s8.192-26.624%2026.624-26.624z%22%20fill%3D%22%23555555%22%20p-id%3D%228903%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M405.504%20512c0%2059.392%2047.104%20106.496%20106.496%20106.496s106.496-47.104%20106.496-106.496-47.104-106.496-106.496-106.496-106.496%2047.104-106.496%20106.496z%22%20fill%3D%22%23555555%22%20p-id%3D%228904%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "trigger",
    "title": "触发",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "trigger",
    "title": "执行",
    "schema": {
      "type": "any"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-throttle/runtime.ts */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_timer-throttle/runtime.ts")["default"]);
comAray.push(comDef);
comDef = {
  "title": "数据合并",
  "namespace": "mybricks.normal-pc.data.merge",
  "version": "1.0.0",
  "rtType": "js",
  "description": "异步数据组合",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "icon": "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20t%3D%221670318352118%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222170%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M260.352%20431.658667C163.669333%20431.658667%2085.333333%20353.706667%2085.333333%20259.285333%2085.333333%20164.906667%20163.669333%2085.333333%20260.352%2085.333333c96.64%200%20174.976%2077.866667%20174.976%20173.994667%200%2096.085333-80%20172.288-174.976%20172.288z%20m0-246.912c-41.685333%200-75.008%2033.152-75.008%2074.581333%200%2041.386667%2033.322667%2074.538667%2075.008%2074.538667%2041.642667%200%2074.965333-33.109333%2074.965333-74.538667%200-41.429333-34.986667-74.581333-74.965333-74.581333zM765.354667%20933.717333c-96.682667%200-175.018667-77.909333-175.018667-173.994666%200-96.128%2078.336-172.330667%20174.976-172.330667%2096.682667%200%20175.018667%2077.866667%20175.018667%20173.994667%200%2096.085333-80%20172.330667-175.018667%20172.330666z%20m0-246.912c-41.685333%200-75.008%2033.152-75.008%2074.581334%200%2041.386667%2033.28%2074.538667%2075.008%2074.538666%2041.642667%200%2074.965333-33.109333%2074.965333-74.538666%200-41.429333-34.986667-74.581333-75.008-74.581334z%22%20p-id%3D%222171%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M260.352%20938.666667a48.981333%2048.981333%200%200%201-50.005333-49.706667V386.901333c0-28.16%2021.674667-49.706667%2050.005333-49.706666%2028.330667%200%2049.962667%2021.546667%2049.962667%2049.706666v502.058667c0%2026.496-23.296%2049.706667-49.962667%2049.706667z%22%20p-id%3D%222172%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M640.341333%20811.093333c-331.690667%200-426.666667-280.021333-429.994666-427.52%200-28.16%2021.674667-49.706667%2048.341333-51.370666a51.2%2051.2%200%200%201%2051.626667%2048.085333c0%2013.226667%2013.354667%20329.728%20331.690666%20329.728%2028.330667%200%2050.005333%2021.546667%2050.005334%2049.706667s-23.338667%2051.370667-51.669334%2051.370666z%22%20p-id%3D%222173%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i0%22%20class%3D%22%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "inputs": [{
    "id": "input0",
    "title": "输入项0",
    "schema": {
      "type": "follow"
    }
  }, {
    "id": "input1",
    "title": "输入项1",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "output",
    "title": "输出项",
    "schema": {
      "type": "array",
      "items": {
        "type": "any"
      }
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_merge/runtime.ts */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_merge/runtime.ts")["default"]);
comAray.push(comDef);
comDef = {
  "title": "对象合并",
  "namespace": "mybricks.normal-pc.object-merge",
  "version": "1.0.0",
  "rtType": "js",
  "description": "对象合并",
  "author": "Mybricks",
  "author_name": "Mybricks",
  "icon": "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20t%3D%221663212159484%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%221673%22%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cpath%20d%3D%22M725.333333%20490.666667a64%2064%200%201%201%2064%2064%2064%2064%200%200%201-64-64m-85.333333%200a149.333333%20149.333333%200%201%200%20149.333333-149.333334%20149.333333%20149.333333%200%200%200-149.333333%20149.333334z%22%20fill%3D%22%23555555%22%20p-id%3D%221674%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M277.33333301%20490.666667m-1e-8%20106.666666a106.666667%20106.666667%200%201%200%200-213.333333%20106.666667%20106.666667%200%201%200%200%20213.333333Z%22%20fill%3D%22%23555555%22%20p-id%3D%221675%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M320%20746.666667m0%20106.666666a106.666667%20106.666667%200%201%200%200-213.333333%20106.666667%20106.666667%200%201%200%200%20213.333333Z%22%20fill%3D%22%23555555%22%20p-id%3D%221676%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M320%20234.666667m0%20106.666666a106.666667%20106.666667%200%201%200%200-213.333333%20106.666667%20106.666667%200%201%200%200%20213.333333Z%22%20fill%3D%22%23555555%22%20p-id%3D%221677%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M341.333333%20512l0-42.666667%20384%200%200%2042.666667z%22%20fill%3D%22%23555555%22%20p-id%3D%221678%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M357.504%20282.709333l30.165333-30.16533299%20225.06666699%20225.06666699-30.165333%2030.165333z%22%20fill%3D%22%23555555%22%20p-id%3D%221679%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M582.016%20465.92l30.165333%2030.165333-228.693333%20228.693334-30.165333-30.16533401z%22%20fill%3D%22%23555555%22%20p-id%3D%221680%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "inputs": [{
    "id": "input0",
    "title": "输入项0",
    "schema": {
      "type": "follow"
    }
  }],
  "outputs": [{
    "id": "output",
    "title": "输出项",
    "schema": {
      "type": "any"
    }
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_object-merge/runtime.ts */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_object-merge/runtime.ts")["default"]);
comAray.push(comDef);
comDef = {
  "title": "资源下载",
  "namespace": "mybricks.normal-pc.download",
  "version": "1.0.0",
  "rtType": "js",
  "author": "MyBricks",
  "author_name": "MyBricks",
  "data": "./data.json",
  "runtime": "./runtime.ts",
  "editors": "./editors.ts",
  "icon": "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20standalone%3D%22no%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20t%3D%221670318507335%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%225572%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M955.076923%20610.461538h-59.076923c-15.753846%200-29.538462%2013.784615-29.538462%2029.538462v196.923077c0%2015.753846-13.784615%2029.538462-29.538461%2029.538461h-649.846154c-15.753846%200-29.538462-13.784615-29.538461-29.538461v-196.923077c0-15.753846-13.784615-29.538462-29.538462-29.538462h-59.076923c-15.753846%200-29.538462%2013.784615-29.538462%2029.538462V905.846154c0%2043.323077%2035.446154%2078.769231%2078.769231%2078.769231h787.692308c43.323077%200%2078.769231-35.446154%2078.769231-78.769231V640c0-15.753846-13.784615-29.538462-29.538462-29.538462zM492.307692%20740.430769c11.815385%2011.815385%2029.538462%2011.815385%2041.353846%200l265.846154-265.846154c11.815385-11.815385%2011.815385-29.538462%200-41.353846l-41.353846-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846%200l-110.276923%20110.276923c-11.815385%2011.815385-33.476923%203.938462-33.476923-13.784615V68.923077C571.076923%2053.169231%20555.323077%2039.384615%20541.538462%2039.384615h-59.076924c-15.753846%200-29.538462%2013.784615-29.538461%2029.538462v417.476923c0%2017.723077-21.661538%2025.6-33.476923%2013.784615l-110.276923-110.276923c-11.815385-11.815385-29.538462-11.815385-41.353846%200L226.461538%20433.230769c-11.815385%2011.815385-11.815385%2029.538462%200%2041.353846L492.307692%20740.430769z%22%20p-id%3D%225573%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i18%22%20class%3D%22selected%22%20fill%3D%22%23555555%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "inputs": [{
    "id": "url",
    "title": "资源地址",
    "schema": {
      "type": "string"
    }
  }],
  "outputs": [],
  "slots": []
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_download/runtime.ts */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_download/runtime.ts")["default"]);
comAray.push(comDef);
comDef = {
  "title": "数据模拟器",
  "namespace": "mybricks.normal-pc.dataSimulator",
  "version": "1.0.0",
  "rtType": "js-autorun",
  "description": "根据schema数据生成的数据模拟器",
  "author": "huangQiuyun",
  "author_name": "黄秋云",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221667821292965%22%20class%3D%22icon%22%20viewBox%3D%220%200%201196%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222210%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i11%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M164.19270808%20142.85937475h632.8125v738.2812505h-632.8125z%22%20fill%3D%22%23EEEEEE%22%20p-id%3D%222211%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i12%22%20class%3D%22%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M797.00520808%20670.203125a26.36718725%2026.36718725%200%200%200-26.36718725%2026.36718725v158.203125h-580.07812475V302.72363256h580.07812475V327.42968775a26.36718725%2026.36718725%200%201%200%2052.73437525%200v-158.203125c0-29.08300807-23.62500025-52.73437525-52.73437525-52.73437525h-580.07812475c-29.08300807%200-52.73437525%2023.65136719-52.73437525%2052.73437525v685.5468745c0%2029.109375%2023.65136719%2052.73437525%2052.73437525%2052.73437525h580.07812475a52.73437525%2052.73437525%200%200%200%2052.73437525-52.73437525v-158.203125a26.36718725%2026.36718725%200%200%200-26.367188-26.36718725z%20m-26.36718725-500.97656225v80.76269532h-580.07812475V169.22656275h580.07812475z%22%20fill%3D%22%23555555%22%20p-id%3D%222212%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i8%22%20class%3D%22%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M643.17903671%20485.63281275a26.36718725%2026.36718725%200%201%200%200-52.73437525H589.36360651v-52.39160131a26.36718725%2026.36718725%200%200%200-52.73437449%200V432.8984375h-104.36132863v-52.39160131a26.36718725%2026.36718725%200%200%200-52.73437449%200V432.8984375h-54.26367188a26.36718725%2026.36718725%200%200%200%200%2052.73437525h54.26367188v80.18261668h-54.26367188a26.36718725%2026.36718725%200%201%200%200%2052.73437526h54.26367188V696.57031225h-54.26367188a26.36718725%2026.36718725%200%201%200%200%2052.73437525h54.26367188v28.582031a26.36718725%2026.36718725%200%201%200%2052.73437449%200V749.3046875h104.36132863v28.582031a26.36718725%2026.36718725%200%201%200%2052.73437449%200V749.3046875h53.8154302a26.36718725%2026.36718725%200%201%200%200-52.73437525H589.36360651v-78.02050756h53.8154302a26.36718725%2026.36718725%200%201%200%200-52.73437526H589.36360651V485.63281275h53.8154302z%20m-106.54980469%20210.9374995h-104.36132863v-78.02050756h104.36132863V696.57031225z%20m0-130.75488282h-104.36132863V485.63281275h104.36132863v80.18261668zM1056.19466146%20528.29492188a25.25976537%2025.25976537%200%200%200%204.11328125-6.35449194c0.97558568-2.45214844%201.31835963-5.03613307%201.55566431-7.64648463%200.07910156-0.79101563%200.47460938-1.47656275%200.47460938-2.29394531v-0.07910156a25.97167943%2025.97167943%200%200%200-7.72558619-18.58886719l-104.65136719-104.62500025a26.34082031%2026.34082031%200%201%200-37.28320287%2037.28320363L972.29427058%20485.63281275h-198.94042969c-14.63378906%200-26.36718725%2011.81249975-26.36718725%2026.36718725s11.73339818%2026.36718725%2026.36718725%2026.36718725h199.96875l-60.93457006%2062.30566431a26.28808568%2026.28808568%200%200%200%200.47460938%2037.28320287%2026.36718725%2026.36718725%200%200%200%2037.28320287-0.47460937l104.38769556-106.89257787%200.1054685-0.07910156%200.15820312-0.15820313c0.6328125-0.55371094%200.89648412-1.34472656%201.3974612-2.05664062z%22%20fill%3D%22%23555555%22%20p-id%3D%222213%22%20data-spm-anchor-id%3D%22a313x.7781069.0.i9%22%20class%3D%22%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "editors": "./editors.tsx",
  "inputs": [{
    "id": "mockTouch",
    "title": "触发模拟",
    "schema": {
      "type": "any"
    },
    "rels": ["outputData"]
  }],
  "outputs": [{
    "id": "outputData",
    "title": "模拟数据",
    "schema": {
      "type": "follow"
    },
    "conMax": 1,
    "editable": true
  }]
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_schema-simulator/runtime.tsx */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_schema-simulator/runtime.tsx")["default"]);
comAray.push(comDef);
comDef = {
  "title": "复制",
  "namespace": "mybricks.normal-pc.copy",
  "version": "1.0.0",
  "rtType": "js",
  "description": "复制功能",
  "author": "HuangQiuyun",
  "author_name": "黄秋云",
  "icon": "data:image/svg+xml,%3Csvg%20t%3D%221677729304737%22%20class%3D%22icon%22%20viewBox%3D%220%200%201025%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222580%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Cpath%20d%3D%22M89.087%20992c-31.478%200-57.087-25.591-57.087-57.062l0-725.015c0-31.478%2025.612-57.09%2057.087-57.09l330.922%200%20239.715%20239.713%200%20542.364c0%2031.476-25.614%2057.09-57.09%2057.09l-513.546-0.001zM85.744%20938.292l520.233%200%200-490.04-241.673%200%200-241.672-278.559%200%200%20731.711zM418.019%20394.508l167.658%200-167.658-167.655%200%20167.655zM726.82%20871.191l0-53.742%20211.466%200%200-490.03-241.676%200%200-241.672-332.208%200c1.734-29.932%2026.62-53.747%2056.962-53.747l330.917%200%20239.747%20239.715%200%20542.395c0%2031.48-25.61%2057.081-57.09%2057.081l-208.118%200zM750.328%20273.674l167.62%200-167.62-167.664%200%20167.664z%22%20fill%3D%22%23555555%22%20p-id%3D%222581%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E",
  "data": "./data.json",
  "runtime": "./runtime.tsx",
  "inputs": [{
    "id": "copy",
    "title": "复制",
    "schema": {
      "type": "follow"
    },
    "rels": ["success", "error"]
  }],
  "outputs": [{
    "id": "success",
    "title": "成功",
    "schema": {
      "type": "string"
    }
  }, {
    "id": "error",
    "title": "失败",
    "schema": {
      "type": "string"
    }
  }],
  "slots": []
};
comDef.runtime = (__webpack_require__(/*! ../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_copy/runtime.tsx */ "../../../../../../Users/zhupengqiang/work-fe/mybricks/comlib-basic/src/_copy/runtime.tsx")["default"]);
comAray.push(comDef);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=rt.js.map