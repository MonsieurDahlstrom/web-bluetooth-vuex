'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mutationTypes = require('../mutation-types');

var mutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeviceActions = {
  webBluetoothDiscoverDevice: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref, query) {
      var dispatch = _ref.dispatch,
          commit = _ref.commit;
      var requestParameters, device;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              requestParameters = {};

              if (query.name !== undefined) {
                requestParameters['filters'] = [{ name: query.name }];
              } else {
                requestParameters['acceptAllDevices'] = true;
              }

              if (query.services !== undefined) {
                requestParameters['optionalServices'] = query.services.map(function (service) {
                  return service.uuid;
                });
              }
              _context.next = 5;
              return navigator.bluetooth.requestDevice(requestParameters);

            case 5:
              device = _context.sent;

              device.GattAdvertismentCallback = function (event) {
                dispatch('webBluetoothDeviceAdvertisment', { advertisment: event });
              };
              device.addEventListener('advertisementreceived', device.GattAdvertismentCallback);
              commit(mutationTypes.BLE_DEVICE_ADDED, { device: device });

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function webBluetoothDiscoverDevice(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return webBluetoothDiscoverDevice;
  }(),
  webBluetoothConnectDevice: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref3, payload) {
      var dispatch = _ref3.dispatch,
          commit = _ref3.commit;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return payload.device.gatt.connect();

            case 2:
              payload.device.GattDisconnectionCallback = function (event) {
                dispatch('webBluetoothDisconnectDevice', { device: event.currentTarget });
              };
              payload.device.addEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback);
              commit(mutationTypes.BLE_DEVICE_UPDATED, { device: payload.device });

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function webBluetoothConnectDevice(_x3, _x4) {
      return _ref4.apply(this, arguments);
    }

    return webBluetoothConnectDevice;
  }(),
  webBluetoothDisconnectDevice: function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref5, payload) {
      var dispatch = _ref5.dispatch,
          commit = _ref5.commit;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!payload.device.gatt.connected) {
                _context3.next = 5;
                break;
              }

              payload.device.removeEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback);
              payload.device.removeEventListener('advertisementreceived', payload.device.GattAdvertismentCallback);
              _context3.next = 5;
              return payload.device.gatt.disconnect();

            case 5:
              commit(mutationTypes.BLE_DEVICE_UPDATED, { device: payload.device });

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function webBluetoothDisconnectDevice(_x5, _x6) {
      return _ref6.apply(this, arguments);
    }

    return webBluetoothDisconnectDevice;
  }()
};

exports.default = DeviceActions;
//# sourceMappingURL=device.js.map