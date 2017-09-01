'use strict';

exports.__esModule = true;

var _autorun = require('./autorun');

var _autorun2 = _interopRequireDefault(_autorun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (condition, effect) {
    if (typeof condition !== 'function' || typeof effect !== 'function') {
        throw new Error('condition or effect is not function');
    }
    return (0, _autorun2['default'])(function () {
        if (condition()) {
            effect();
        }
    });
};