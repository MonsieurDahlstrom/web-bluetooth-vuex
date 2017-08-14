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
                _context.next = 26;
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

              for (_iterator = (0, _getIterator3.default)(characteristics); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                characteristic = _step.value;

                dispatch('webBluetoothConfigureCharacteristic', { characteristic: characteristic });
                discoveredCharacteristics.push(characteristic);
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
              _iterator2 = (0, _getIterator3.default)(query.characteristics);

            case 31:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 41;
                break;
              }

              characteristicUUID = _step2.value;
              _context.next = 35;
              return query.service.getCharacteristic(characteristicUUID);

            case 35:
              characteristic = _context.sent;

              dispatch('webBluetoothConfigureCharacteristic', { characteristic: characteristic });
              discoveredCharacteristics.push(characteristic);

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
              commit(MutationTypes.BLE_CHARACTERISTICS_DISCOVERED, { characteristics: discoveredCharacteristics });

            case 56:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[8, 12, 16, 24], [17,, 19, 23], [29, 43, 47, 55], [48,, 50, 54]]);
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