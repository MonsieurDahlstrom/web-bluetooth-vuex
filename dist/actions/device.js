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
  webBluetoothAddDevice: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref, query) {
      var dispatch = _ref.dispatch,
          commit = _ref.commit;
      var requestParameters, filters, device;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              requestParameters = {};

              if (query.name || query.namePrefix) {
                filters = [];

                if (query.name) {
                  filters.push({ name: query.name });
                }
                if (query.namePrefix) {
                  filters.push({ namePrefix: query.namePrefix });
                }
                requestParameters.filters = filters;
                requestParameters.optionalServices = query.services;
              } else {
                requestParameters['acceptAllDevices'] = true;
                requestParameters.optionalServices = query.services;
              }

              if (query.optionalServices !== undefined) {
                requestParameters['optionalServices'] = query.optionalServices.map(function (service) {
                  return service.uuid;
                });
              }
              _context.next = 5;
              return navigator.bluetooth.requestDevice(requestParameters);

            case 5:
              device = _context.sent;

              if (device) {
                commit(mutationTypes.BLE_DEVICE_ADDED, { device: device });
              }

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function webBluetoothAddDevice(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return webBluetoothAddDevice;
  }(),
  webBluetoothWatchAdvertisments: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref3, query) {
      var dispatch = _ref3.dispatch,
          commit = _ref3.commit;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!query.device.gatt.connected) {
                _context2.next = 6;
                break;
              }

              query.device.GattAdvertismentCallback = function (event) {
                dispatch('webBluetoothDeviceAdvertisment', { advertisment: event });
              };
              query.device.addEventListener('advertisementreceived', query.device.GattAdvertismentCallback);
              _context2.next = 5;
              return query.device.watchAdvertisements();

            case 5:
              commit(mutationTypes.BLE_DEVICE_UPDATED, { device: query.device });

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function webBluetoothWatchAdvertisments(_x3, _x4) {
      return _ref4.apply(this, arguments);
    }

    return webBluetoothWatchAdvertisments;
  }(),
  webBluetoothRemoveDevice: function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref5, query) {
      var dispatch = _ref5.dispatch,
          commit = _ref5.commit;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!query.device.gatt.connected) {
                _context3.next = 5;
                break;
              }

              query.device.removeEventListener('gattserverdisconnected', query.device.GattDisconnectionCallback);
              query.device.removeEventListener('advertisementreceived', query.device.GattAdvertismentCallback);
              _context3.next = 5;
              return query.device.gatt.disconnect();

            case 5:
              commit(mutationTypes.BLE_DEVICE_REMOVED, { device: query.device });

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function webBluetoothRemoveDevice(_x5, _x6) {
      return _ref6.apply(this, arguments);
    }

    return webBluetoothRemoveDevice;
  }(),
  webBluetoothConnectDevice: function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref7, payload) {
      var dispatch = _ref7.dispatch,
          commit = _ref7.commit;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (payload.device.gatt.connected) {
                _context4.next = 6;
                break;
              }

              _context4.next = 3;
              return payload.device.gatt.connect();

            case 3:
              payload.device.GattDisconnectionCallback = function (event) {
                dispatch('webBluetoothDisconnectDevice', { device: event.currentTarget });
              };
              payload.device.addEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback);
              commit(mutationTypes.BLE_DEVICE_UPDATED, { device: payload.device });

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function webBluetoothConnectDevice(_x7, _x8) {
      return _ref8.apply(this, arguments);
    }

    return webBluetoothConnectDevice;
  }(),
  webBluetoothDisconnectDevice: function () {
    var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref9, payload) {
      var dispatch = _ref9.dispatch,
          commit = _ref9.commit;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!payload.device.gatt.connected) {
                _context5.next = 6;
                break;
              }

              payload.device.removeEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback);
              payload.device.removeEventListener('advertisementreceived', payload.device.GattAdvertismentCallback);
              _context5.next = 5;
              return payload.device.gatt.disconnect();

            case 5:
              commit(mutationTypes.BLE_DEVICE_UPDATED, { device: payload.device });

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function webBluetoothDisconnectDevice(_x9, _x10) {
      return _ref10.apply(this, arguments);
    }

    return webBluetoothDisconnectDevice;
  }()
};

exports.default = DeviceActions;
//# sourceMappingURL=device.js.map