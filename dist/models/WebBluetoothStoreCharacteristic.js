'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebBluetoothStoreCharacteristic = function () {
  function WebBluetoothStoreCharacteristic(characteristic) {
    (0, _classCallCheck3.default)(this, WebBluetoothStoreCharacteristic);

    _vue2.default.set(this, 'characteristic', characteristic);
    _vue2.default.set(this, 'value', undefined);
  }

  (0, _createClass3.default)(WebBluetoothStoreCharacteristic, [{
    key: 'configure',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _this = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.characteristic.addEventListener('characteristicvaluechanged', function (event) {
                  _vue2.default.set(_this, 'value', event.target.value);
                });

                if (!this.characteristic.properties.read) {
                  _context.next = 10;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return this.characteristic.readValue();

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](2);

                console.error('Could not read value for ' + this.characteristic.uuid + '  error: ' + _context.t0);

              case 10:
                if (!(this.characteristic.properties.notify || this.characteristic.properties.indicate)) {
                  _context.next = 19;
                  break;
                }

                _context.prev = 11;
                _context.next = 14;
                return this.characteristic.startNotifications();

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t1 = _context['catch'](11);

                console.error('Could not start notifications for ' + this.characteristic.uuid + '  error: ' + _context.t1);

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 7], [11, 16]]);
      }));

      function configure() {
        return _ref.apply(this, arguments);
      }

      return configure;
    }()
  }, {
    key: 'writeValue',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(dataUInt8Array) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.characteristic.writeValue(dataUInt8Array);

              case 3:
                _vue2.default.set(this, 'value', dataUInt8Array);
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);

                console.error('Could not write data for ' + this.characteristic.uuid + '  error: ' + _context2.t0);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function writeValue(_x) {
        return _ref2.apply(this, arguments);
      }

      return writeValue;
    }()
  }]);
  return WebBluetoothStoreCharacteristic;
}();

exports.default = WebBluetoothStoreCharacteristic;