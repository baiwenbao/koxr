'use strict';

exports.__esModule = true;

var _manager = require('./manager');

exports['default'] = function (fn, context) {
    (0, _manager.beginCollect)(fn, context);
    fn.call(context);
    (0, _manager.endCollect)();
    return function () {
        (0, _manager.dispose)(fn.key, fn);
    };
};