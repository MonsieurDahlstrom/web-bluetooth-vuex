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

var CharacteristicActions = {
  webBluetoothDiscoverCharacteristics: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref, query) {
      var dispatch = _ref.dispatch,
          commit = _ref.commit;

      var discoveredCharacteristics, characteristics, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, characteristic, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, characteristicUUID;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              discoveredCharacteristics = [];

              if (!(query.characteristics === undefined)) {
                _context.next = 34;
                break;
              }

              _context.next = 4;
              return query.service.getCharacteristics();

            case 4:
              characteristics = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 8;
              _iterator = (0, _getIterator3.default)(characteristics);

            case 10:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 18;
                break;
              }

              characteristic = _step.value;
              _context.next = 14;
              return dispatch('webBluetoothConfigureCharacteristic', { characteristic: characteristic });

            case 14:
              discoveredCharacteristics.push(characteristic);

            case 15:
              _iteratorNormalCompletion = true;
              _context.next = 10;
              break;

            case 18:
              _context.next = 24;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context['catch'](8);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 24:
              _context.prev = 24;
              _context.prev = 25;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 27:
              _context.prev = 27;

              if (!_didIteratorError) {
                _context.next = 30;
                break;
              }

              throw _iteratorError;

            case 30:
              return _context.finish(27);

            case 31:
              return _context.finish(24);

            case 32:
              _context.next = 64;
              break;

            case 34:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 37;
              _iterator2 = (0, _getIterator3.default)(query.characteristics);

            case 39:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 50;
                break;
              }

              characteristicUUID = _step2.value;
              _context.next = 43;
              return query.service.getCharacteristic(characteristicUUID);

            case 43:
              characteristic = _context.sent;
              _context.next = 46;
              return dispatch('webBluetoothConfigureCharacteristic', { characteristic: characteristic });

            case 46:
              discoveredCharacteristics.push(characteristic);

            case 47:
              _iteratorNormalCompletion2 = true;
              _context.next = 39;
              break;

            case 50:
              _context.next = 56;
              break;

            case 52:
              _context.prev = 52;
              _context.t1 = _context['catch'](37);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t1;

            case 56:
              _context.prev = 56;
              _context.prev = 57;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 59:
              _context.prev = 59;

              if (!_didIteratorError2) {
                _context.next = 62;
                break;
              }

              throw _iteratorError2;

            case 62:
              return _context.finish(59);

            case 63:
              return _context.finish(56);

            case 64:
              commit(MutationTypes.BLE_CHARACTERISTICS_DISCOVERED, { characteristics: discoveredCharacteristics });

            case 65:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[8, 20, 24, 32], [25,, 27, 31], [37, 52, 56, 64], [57,, 59, 63]]);
    }));

    function webBluetoothDiscoverCharacteristics(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return webBluetoothDiscoverCharacteristics;
  }(),
  webBluetoothConfigureCharacteristic: function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref3, query) {
      var dispatch = _ref3.dispatch,
          commit = _ref3.commit;
      var characteristic;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              characteristic = query.characteristic;

              if (characteristic.properties.read || characteristic.properties.notify || characteristic.properties.indicate) {
                characteristic.addEventListener('characteristicvaluechanged', function (event) {
                  dispatch('webBluetoothUpdateCharacteristic', { characteristic: characteristic, value: event.target.value });
                });
              }

              if (!characteristic.properties.read) {
                _context2.next = 5;
                break;
              }

              _context2.next = 5;
              return characteristic.readValue();

            case 5:
              if (!(characteristic.properties.notify || characteristic.properties.indicate)) {
                _context2.next = 8;
                break;
              }

              _context2.next = 8;
              return characteristic.startNotifications();

            case 8:
              commit(MutationTypes.BLE_CHARACTERISTIC_CHANGED, { characteristic: characteristic });

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function webBluetoothConfigureCharacteristic(_x3, _x4) {
      return _ref4.apply(this, arguments);
    }

    return webBluetoothConfigureCharacteristic;
  }(),
  webBluetoothWriteCharacteristic: function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref5, query) {
      var dispatch = _ref5.dispatch,
          commit = _ref5.commit;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function webBluetoothWriteCharacteristic(_x5, _x6) {
      return _ref6.apply(this, arguments);
    }

    return webBluetoothWriteCharacteristic;
  }(),
  webBluetoothUpdateCharacteristic: function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref7, query) {
      var dispatch = _ref7.dispatch,
          commit = _ref7.commit;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function webBluetoothUpdateCharacteristic(_x7, _x8) {
      return _ref8.apply(this, arguments);
    }

    return webBluetoothUpdateCharacteristic;
  }()
};

exports.default = CharacteristicActions;
//# sourceMappingURL=characteristic.js.map