'use strict';

exports.__esModule = true;
exports.trigger = exports.triggerObserver = exports.dispose = exports.collect = exports.endCollect = exports.beginCollect = exports.observerCollect = undefined;

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var store = {};
var curObserver = void 0;
var observerCollecter = [];

var observerCollect = exports.observerCollect = function observerCollect(key) {
    observerCollecter.push(key);
};

var clearObserverCollecter = function clearObserverCollecter() {
    observerCollecter = [];
};

var beginCollect = exports.beginCollect = function beginCollect(fn, context) {
    curObserver = fn;
    fn.context = context;
};

var endCollect = exports.endCollect = function endCollect() {
    curObserver = null;
};

var collect = exports.collect = function collect(key) {
    store[key] = store[key] || [];
    var stack = store[key];
    if (curObserver && !stack.includes(curObserver)) {
        stack.push(curObserver);
        curObserver.keys = curObserver.keys || [];
        curObserver.keys.push(key);
    }
};

var dispose = exports.dispose = function dispose(key, fn) {
    var stack = store[key];
    if (!stack.includes(fn)) return;
    var index = stack.indexOf(fn);
    stack.splice(index, 1);
};

var triggerObserver = exports.triggerObserver = function triggerObserver() {
    if (!observerCollecter.length) return;
    var filterRepeatAction = (0, _from2['default'])(new _set2['default'](observerCollecter));
    var observers = filterRepeatAction.reduce(function (arr, key) {
        return arr.concat(store[key]);
    }, []);
    var filterObservers = (0, _from2['default'])(new _set2['default'](observers));
    filterObservers.forEach(function (fn) {
        if (typeof fn !== 'function') {
            return;
        }
        var context = fn.context;

        fn.result = fn.call(context);
    });
    clearObserverCollecter();
};

var trigger = exports.trigger = function trigger(key) {
    observerCollect(key);
    setTimeout(triggerObserver, 0);
};