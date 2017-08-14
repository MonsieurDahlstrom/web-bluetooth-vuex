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
              discoveredServices = [];

              if (!(query.services === undefined)) {
                _context.next = 26;
                break;
              }

              _context.next = 4;
              return query.device.gatt.getPrimaryServices();

            case 4:
              services = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 8;

              for (_iterator = (0, _getIterator3.default)(services); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                service = _step.value;

                dispatch('webBluetoothDiscoverCharacteristics', { service: service });
                discoveredServices.push(service);
              }
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](8);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 16:
              _context.prev = 16;
              _context.prev = 17;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 19:
              _context.prev = 19;

              if (!_didIteratorError) {
                _context.next = 22;
                break;
              }

              throw _iteratorError;

            case 22:
              return _context.finish(19);

            case 23:
              return _context.finish(16);

            case 24:
              _context.next = 55;
              break;

            case 26:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 29;
              _iterator2 = (0, _getIterator3.default)(query.services);

            case 31:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 41;
                break;
              }

              _service = _step2.value;
              _context.next = 35;
              return query.device.gatt.getPrimaryService(_service2);

            case 35:
              _service2 = _context.sent;

              dispatch('webBluetoothDiscoverCharacteristics', { service: _service2 });
              discoveredServices.push(_service2);

            case 38:
              _iteratorNormalCompletion2 = true;
              _context.next = 31;
              break;

            case 41:
              _context.next = 47;
              break;

            case 43:
              _context.prev = 43;
              _context.t1 = _context['catch'](29);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t1;

            case 47:
              _context.prev = 47;
              _context.prev = 48;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 50:
              _context.prev = 50;

              if (!_didIteratorError2) {
                _context.next = 53;
                break;
              }

              throw _iteratorError2;

            case 53:
              return _context.finish(50);

            case 54:
              return _context.finish(47);

            case 55:
              commit(MutationTypes.BLE_SERVICES_DISCOVERED, { services: discoveredServices });

            case 56:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[8, 12, 16, 24], [17,, 19, 23], [29, 43, 47, 55], [48,, 50, 54]]);
    }));

    function webBluetoothDiscoverServices(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return webBluetoothDiscoverServices;
  }()
};

exports.default = ServiceActions;
//# sourceMappingURL=service.js.map