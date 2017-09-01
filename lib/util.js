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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallowCompare = require('react/lib/shallowCompare');

var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PureComponent = function (_Component) {
    (0, _inherits3['default'])(PureComponent, _Component);

    function PureComponent() {
        (0, _classCallCheck3['default'])(this, PureComponent);
        return (0, _possibleConstructorReturn3['default'])(this, (PureComponent.__proto__ || (0, _getPrototypeOf2['default'])(PureComponent)).apply(this, arguments));
    }

    (0, _createClass3['default'])(PureComponent, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            console.log((0, _shallowCompare2['default'])(this, nextProps, nextState));
            (0, _shallowCompare2['default'])(this, nextProps, nextState);
        }
    }]);
    return PureComponent;
}(_react.Component);

exports['default'] = _react2['default'].PureComponent || PureComponent;