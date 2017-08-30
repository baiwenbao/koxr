'use strict';

exports.__esModule = true;
exports.observableArray = exports.observableValue = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _manager = require('./manager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var obId = 0;

var observableValue = exports.observableValue = function observableValue(target, key) {
    key = key || 'obId' + ++obId;
    var cache = target;
    return function () {
        if (arguments.length === 0) {
            (0, _manager.collect)(key);
            return cache;
        }
        if ((arguments.length <= 0 ? undefined : arguments[0]) !== cache) {
            cache = arguments.length <= 0 ? undefined : arguments[0];
            (0, _manager.trigger)(key);
        }
    };
};

var observableArrayFuncs = function observableArrayFuncs(target, key) {
    var prototype = {};
    var arr = target();
    var methods = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];
    methods.forEach(function (method) {
        prototype[method] = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            arr[method].apply(arr, args);
            (0, _manager.trigger)(key);
            return arr;
        };
    });
    prototype.destory = function () {
        arr.length = 0;
        (0, _manager.trigger)(key);
        return arr;
    };
    return prototype;
};

var observableArray = exports.observableArray = function observableArray(target) {
    var key = 'obId' + ++obId;
    var obTarget = observableValue(target, key);
    var proto = observableArrayFuncs(obTarget, key);
    var __proto__ = obTarget.__proto__;

    if (__proto__) {
        obTarget.__proto__ = proto;
    } else {
        (0, _assign2['default'])(obTarget, proto);
    }
    return obTarget;
};

exports['default'] = function (arg) {
    if (Array.isArray(arg)) {
        return observableArray(arg);
    } else {
        return observableValue(arg);
    }
};