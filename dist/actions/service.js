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

      var discoveredServices, services, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, service, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _service, _service2;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('webBluetoothDiscoverServices');
              discoveredServices = [];

              if (!(query.services === undefined)) {
                _context.next = 27;
                break;
              }

              _context.next = 5;
              return query.device.gatt.getPrimaryServices();

            case 5:
              services = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 9;

              for (_iterator = (0, _getIterator3.default)(services); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                service = _step.value;

                dispatch('webBluetoothDiscoverCharacteristics', { service: service });
                discoveredServices.push(service);
              }
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](9);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 17:
              _context.prev = 17;
              _context.prev = 18;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 20:
              _context.prev = 20;

              if (!_didIteratorError) {
                _context.next = 23;
                break;
              }

              throw _iteratorError;

            case 23:
              return _context.finish(20);

            case 24:
              return _context.finish(17);

            case 25:
              _context.next = 56;
              break;

            case 27:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 30;
              _iterator2 = (0, _getIterator3.default)(query.services);

            case 32:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 42;
                break;
              }

              _service = _step2.value;
              _context.next = 36;
              return query.device.gatt.getPrimaryService(_service2);

            case 36:
              _service2 = _context.sent;

              dispatch('webBluetoothDiscoverCharacteristics', { service: _service2 });
              discoveredServices.push(_service2);

            case 39:
              _iteratorNormalCompletion2 = true;
              _context.next = 32;
              break;

            case 42:
              _context.next = 48;
              break;

            case 44:
              _context.prev = 44;
              _context.t1 = _context['catch'](30);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t1;

            case 48:
              _context.prev = 48;
              _context.prev = 49;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 51:
              _context.prev = 51;

              if (!_didIteratorError2) {
                _context.next = 54;
                break;
              }

              throw _iteratorError2;

            case 54:
              return _context.finish(51);

            case 55:
              return _context.finish(48);

            case 56:
              commit(MutationTypes.BLE_SERVICES_DISCOVERED, { services: discoveredServices });

            case 57:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[9, 13, 17, 25], [18,, 20, 24], [30, 44, 48, 56], [49,, 51, 55]]);
    }));

    function webBluetoothDiscoverServices(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return webBluetoothDiscoverServices;
  }()
};

exports.default = ServiceActions;