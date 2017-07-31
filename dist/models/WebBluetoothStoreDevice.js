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

var _WebBluetoothStoreService = require('./WebBluetoothStoreService');

var _WebBluetoothStoreService2 = _interopRequireDefault(_WebBluetoothStoreService);

var _WebBluetoothStoreUtils = require('./WebBluetoothStoreUtils');

var _WebBluetoothStoreUtils2 = _interopRequireDefault(_WebBluetoothStoreUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebBluetoothStoreDevice = function () {
  function WebBluetoothStoreDevice(bluetoothDevice) {
    (0, _classCallCheck3.default)(this, WebBluetoothStoreDevice);

    _vue2.default.set(this, 'device', bluetoothDevice);
    _vue2.default.set(this, 'gatt', bluetoothDevice.gatt);
    _vue2.default.set(this, 'connected', false);
    _vue2.default.set(this, 'name', bluetoothDevice.name);
    _vue2.default.set(this, 'id', bluetoothDevice.id);
  }

  (0, _createClass3.default)(WebBluetoothStoreDevice, [{
    key: 'connect',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.gatt.connect();

              case 2:
                _vue2.default.set(this, 'connected', true);
                _context.next = 5;
                return this.discoverServices();

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connect() {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: 'discoverService',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(metadata) {
        var service, webBluetoothService, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, characteristicUUID;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.gatt.getPrimaryService(metadata.uuid);

              case 3:
                service = _context2.sent;
                webBluetoothService = new _WebBluetoothStoreService2.default(service);

                if (!(metadata.characteristics && metadata.characteristics.length > 0)) {
                  _context2.next = 34;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 9;
                _iterator = (0, _getIterator3.default)(metadata.characteristics);

              case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 18;
                  break;
                }

                characteristicUUID = _step.value;
                _context2.next = 15;
                return webBluetoothService.discoverCharacteristic(characteristicUUID);

              case 15:
                _iteratorNormalCompletion = true;
                _context2.next = 11;
                break;

              case 18:
                _context2.next = 24;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2['catch'](9);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 24:
                _context2.prev = 24;
                _context2.prev = 25;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 27:
                _context2.prev = 27;

                if (!_didIteratorError) {
                  _context2.next = 30;
                  break;
                }

                throw _iteratorError;

              case 30:
                return _context2.finish(27);

              case 31:
                return _context2.finish(24);

              case 32:
                _context2.next = 36;
                break;

              case 34:
                _context2.next = 36;
                return webBluetoothService.discoverCharacteristics();

              case 36:
                _vue2.default.set(this, metadata.uuid, webBluetoothService);
                _context2.next = 42;
                break;

              case 39:
                _context2.prev = 39;
                _context2.t1 = _context2['catch'](0);

                console.error('Could not retrive characteristic ' + metadata.uuid + ' because: ' + _context2.t1);

              case 42:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 39], [9, 20, 24, 32], [25,, 27, 31]]);
      }));

      function discoverService(_x) {
        return _ref2.apply(this, arguments);
      }

      return discoverService;
    }()
  }, {
    key: 'discoverServices',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var serviceCollection, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, bleservice, webBluetoothService;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.gatt.getPrimaryServices();

              case 2:
                serviceCollection = _context3.sent;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context3.prev = 6;
                _iterator2 = (0, _getIterator3.default)(serviceCollection);

              case 8:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context3.next = 17;
                  break;
                }

                bleservice = _step2.value;
                webBluetoothService = new _WebBluetoothStoreService2.default(bleservice);
                _context3.next = 13;
                return webBluetoothService.discoverCharacteristics();

              case 13:
                _vue2.default.set(this, bleservice.uuid, webBluetoothService);

              case 14:
                _iteratorNormalCompletion2 = true;
                _context3.next = 8;
                break;

              case 17:
                _context3.next = 23;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3['catch'](6);
                _didIteratorError2 = true;
                _iteratorError2 = _context3.t0;

              case 23:
                _context3.prev = 23;
                _context3.prev = 24;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 26:
                _context3.prev = 26;

                if (!_didIteratorError2) {
                  _context3.next = 29;
                  break;
                }

                throw _iteratorError2;

              case 29:
                return _context3.finish(26);

              case 30:
                return _context3.finish(23);

              case 31:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 19, 23, 31], [24,, 26, 30]]);
      }));

      function discoverServices() {
        return _ref3.apply(this, arguments);
      }

      return discoverServices;
    }()
  }, {
    key: 'serviceFor16bit',
    value: function serviceFor16bit(UUID16) {
      return this[_WebBluetoothStoreUtils2.default.cannonicalUUIDFor16bitUUID(UUID16)];
    }
  }, {
    key: 'handleError',
    value: function handleError(context, error) {
      console.error('Prototype: ' + context + ' ' + error);
    }
  }]);
  return WebBluetoothStoreDevice;
}();

exports.default = WebBluetoothStoreDevice;