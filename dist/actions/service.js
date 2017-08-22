'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mutationTypes = require('../mutation-types');

var MutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceActions = {
  webBluetoothDiscoverServices: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref, query) {
      var dispatch = _ref.dispatch,
          commit = _ref.commit;

      var discoveredServices, services, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, service;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              discoveredServices = [];
              _context.next = 3;
              return query.device.gatt.getPrimaryServices();

            case 3:
              services = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 7;

              for (_iterator = (0, _getIterator3.default)(services); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                service = _step.value;

                dispatch('webBluetoothDiscoverCharacteristics', { service: service });
                commit(MutationTypes.BLE_SERVICE_ADDED, service);
              }
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](7);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 15:
              _context.prev = 15;
              _context.prev = 16;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 18:
              _context.prev = 18;

              if (!_didIteratorError) {
                _context.next = 21;
                break;
              }

              throw _iteratorError;

            case 21:
              return _context.finish(18);

            case 22:
              return _context.finish(15);

            case 23:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[7, 11, 15, 23], [16,, 18, 22]]);
    }));

    function webBluetoothDiscoverServices(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return webBluetoothDiscoverServices;
  }(),
  webBluetoothDiscoverService: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref3, query) {
      var dispatch = _ref3.dispatch,
          commit = _ref3.commit;
      var service;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return query.device.gatt.getPrimaryService(query.uuid);

            case 2:
              service = _context2.sent;

              if (service) {
                dispatch('webBluetoothDiscoverCharacteristics', { service: service });
                commit(MutationTypes.BLE_SERVICE_ADDED, service);
              }

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function webBluetoothDiscoverService(_x3, _x4) {
      return _ref4.apply(this, arguments);
    }

    return webBluetoothDiscoverService;
  }(),
  webBluetoothRemoveService: function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref5, service) {
      var dispatch = _ref5.dispatch,
          commit = _ref5.commit;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (service) {
                if (service.GattServiceAddedCallback) {}
                if (service.GattServiceChangedCallback) {}
                if (service.GattServiceRemovedCallback) {}
                dispatch('webBluetoothRemoveCharacteristics', { service: service });
                commit(MutationTypes.BLE_SERVICE_REMOVED, service);
              }

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function webBluetoothRemoveService(_x5, _x6) {
      return _ref6.apply(this, arguments);
    }

    return webBluetoothRemoveService;
  }()
};

exports.default = ServiceActions;
//# sourceMappingURL=service.js.map