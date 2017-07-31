'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _WebBluetoothStoreCharacteristic = require('./WebBluetoothStoreCharacteristic');

var _WebBluetoothStoreCharacteristic2 = _interopRequireDefault(_WebBluetoothStoreCharacteristic);

var _WebBluetoothStoreUtils = require('./WebBluetoothStoreUtils');

var _WebBluetoothStoreUtils2 = _interopRequireDefault(_WebBluetoothStoreUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebBluetoothStoreService = function () {
  function WebBluetoothStoreService(service) {
    (0, _classCallCheck3.default)(this, WebBluetoothStoreService);

    _vue2.default.set(this, 'service', service);
  }

  (0, _createClass3.default)(WebBluetoothStoreService, [{
    key: 'discoverCharacteristic',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(uuid) {
        var characteristic;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.service.getCharacteristic(uuid);

              case 3:
                characteristic = _context.sent;
                _context.next = 6;
                return this.initaliseCharacteristic(characteristic);

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                console.error('Could not retrive characteristic ' + uuid + ' because: ' + _context.t0);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function discoverCharacteristic(_x) {
        return _ref.apply(this, arguments);
      }

      return discoverCharacteristic;
    }()
  }, {
    key: 'discoverCharacteristics',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var characteristicsToDiscover = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        var characteristicCollection, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, characteristic;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.service.getCharacteristics();

              case 2:
                characteristicCollection = _context2.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 6;
                _iterator = (0, _getIterator3.default)(characteristicCollection);

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 15;
                  break;
                }

                characteristic = _step.value;
                _context2.next = 12;
                return this.initaliseCharacteristic(characteristic);

              case 12:
                _iteratorNormalCompletion = true;
                _context2.next = 8;
                break;

              case 15:
                _context2.next = 21;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2['catch'](6);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 21:
                _context2.prev = 21;
                _context2.prev = 22;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 24:
                _context2.prev = 24;

                if (!_didIteratorError) {
                  _context2.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context2.finish(24);

              case 28:
                return _context2.finish(21);

              case 29:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 17, 21, 29], [22,, 24, 28]]);
      }));

      function discoverCharacteristics() {
        return _ref2.apply(this, arguments);
      }

      return discoverCharacteristics;
    }()
  }, {
    key: 'initaliseCharacteristic',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(characteristic) {
        var webBluetoothStoreCharacteristic;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                webBluetoothStoreCharacteristic = new _WebBluetoothStoreCharacteristic2.default(characteristic);
                _context3.next = 3;
                return webBluetoothStoreCharacteristic.configure();

              case 3:
                _vue2.default.set(this, characteristic.uuid, webBluetoothStoreCharacteristic);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function initaliseCharacteristic(_x3) {
        return _ref3.apply(this, arguments);
      }

      return initaliseCharacteristic;
    }()
  }, {
    key: 'characteristicFor16bit',
    value: function characteristicFor16bit(UUID16) {
      return this[_WebBluetoothStoreUtils2.default.cannonicalUUIDFor16bitUUID(UUID16)];
    }
  }]);
  return WebBluetoothStoreService;
}();

exports.default = WebBluetoothStoreService;