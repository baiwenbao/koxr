'use strict';

exports.__esModule = true;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _autorun = require('./autorun');

var _autorun2 = _interopRequireDefault(_autorun);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _manager = require('./manager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var observer = function observer(Target) {
    var _Target$prototype = Target.prototype,
        render = _Target$prototype.render,
        componentWillMount = _Target$prototype.componentWillMount,
        componentDidMount = _Target$prototype.componentDidMount;

    if (!render) {
        return function (_PureComponent) {
            (0, _inherits3['default'])(_class, _PureComponent);

            function _class() {
                (0, _classCallCheck3['default'])(this, _class);
                return (0, _possibleConstructorReturn3['default'])(this, (_class.__proto__ || (0, _getPrototypeOf2['default'])(_class)).apply(this, arguments));
            }

            (0, _createClass3['default'])(_class, [{
                key: 'componentWillMount',
                value: function componentWillMount() {
                    var _this2 = this;

                    (0, _manager.beginCollect)(function () {
                        _this2.forceUpdate();
                    });
                }
            }, {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    (0, _manager.endCollect)();
                }
            }, {
                key: 'render',
                value: function render() {
                    return _react2['default'].createElement(Target, this.props);
                }
            }]);
            return _class;
        }(_util2['default']);
    } else {
        Target.prototype.componentWillMount = function () {
            var _this3 = this;

            componentWillMount && componentWillMount();
            (0, _manager.beginCollect)(function () {
                _this3.forceUpdate();
            });
        };
        Target.prototype.componentDidMount = function () {
            componentDidMount && componentDidMount();
            (0, _manager.endCollect)();
        };
    }
    return Target;
};

exports['default'] = observer;