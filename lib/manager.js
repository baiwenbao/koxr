"use strict";

exports.__esModule = true;
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
        curObserver.key = key;
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
    var filterRepeatAction = Array.from(new Set(observerCollecter));
    var observers = filterRepeatAction.reduce(function (prev, next) {
        return prev.concat(store[next]);
    }, []);
    var filterObservers = Array.from(new Set(observers));
    filterObservers.forEach(function (fn) {
        var context = fn.context;

        fn.result = fn.call(context);
    });
    clearObserverCollecter();
};

var trigger = exports.trigger = function trigger(key) {
    observerCollect(key);
    setTimeout(triggerObserver, 0);
};