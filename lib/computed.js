'use strict';

exports.__esModule = true;

var _manager = require('./manager');

exports['default'] = function (fn, context) {
    (0, _manager.beginCollect)(fn, context);
    fn.result = fn.call(context);
    (0, _manager.endCollect)();
    return function () {
        var result = fn.result;

        if (result) {
            return result;
        }
        return fn.call(fn.context);
    };
};