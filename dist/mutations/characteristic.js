'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var cov_1a0q1in91j = function () {
  var path = '/Users/mdahlstrom/Documents/GitHub/web-bluetooth-vuex-module/src/mutations/characteristic.js',
      hash = 'aeac1b47e70f001e33a3ef585818fdcb85f34e65',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/mdahlstrom/Documents/GitHub/web-bluetooth-vuex-module/src/mutations/characteristic.js',
    statementMap: {
      '0': {
        start: {
          line: 4,
          column: 34
        },
        end: {
          line: 26,
          column: 1
        }
      },
      '1': {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 14,
          column: 5
        }
      },
      '2': {
        start: {
          line: 8,
          column: 32
        },
        end: {
          line: 8,
          column: 80
        }
      },
      '3': {
        start: {
          line: 9,
          column: 6
        },
        end: {
          line: 13,
          column: 7
        }
      },
      '4': {
        start: {
          line: 10,
          column: 8
        },
        end: {
          line: 10,
          column: 53
        }
      },
      '5': {
        start: {
          line: 12,
          column: 8
        },
        end: {
          line: 12,
          column: 77
        }
      },
      '6': {
        start: {
          line: 18,
          column: 30
        },
        end: {
          line: 18,
          column: 75
        }
      },
      '7': {
        start: {
          line: 19,
          column: 4
        },
        end: {
          line: 23,
          column: 5
        }
      },
      '8': {
        start: {
          line: 20,
          column: 6
        },
        end: {
          line: 20,
          column: 48
        }
      },
      '9': {
        start: {
          line: 22,
          column: 6
        },
        end: {
          line: 22,
          column: 72
        }
      }
    },
    fnMap: {},
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 9,
            column: 6
          },
          end: {
            line: 13,
            column: 7
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 9,
            column: 6
          },
          end: {
            line: 13,
            column: 7
          }
        }, {
          start: {
            line: 9,
            column: 6
          },
          end: {
            line: 13,
            column: 7
          }
        }],
        line: 9
      },
      '1': {
        loc: {
          start: {
            line: 19,
            column: 4
          },
          end: {
            line: 23,
            column: 5
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 19,
            column: 4
          },
          end: {
            line: 23,
            column: 5
          }
        }, {
          start: {
            line: 19,
            column: 4
          },
          end: {
            line: 23,
            column: 5
          }
        }],
        line: 19
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0
    },
    f: {},
    b: {
      '0': [0, 0],
      '1': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var _ref;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _mutationTypes = require('../mutation-types');

var MutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CharacteristicMutatations = (cov_1a0q1in91j.s[0]++, (_ref = {}, (0, _defineProperty3.default)(_ref, MutationTypes.BLE_CHARACTERISTICS_DISCOVERED, function (state, characteristics) {
  cov_1a0q1in91j.s[1]++;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(characteristics), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var newCharacteristic = _step.value;

      var characteristicIndex = (cov_1a0q1in91j.s[2]++, state.characteristics.indexOf(newCharacteristic));
      cov_1a0q1in91j.s[3]++;
      if (characteristicIndex < 0) {
        cov_1a0q1in91j.b[0][0]++;
        cov_1a0q1in91j.s[4]++;

        state.characteristics.push(newCharacteristic);
      } else {
        cov_1a0q1in91j.b[0][1]++;
        cov_1a0q1in91j.s[5]++;

        state.characteristics.splice(characteristicIndex, 1, newCharacteristic);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}), (0, _defineProperty3.default)(_ref, MutationTypes.BLE_CHARACTERISTIC_CHANGED, function (state, characteristic) {
  var characteristicIndex = (cov_1a0q1in91j.s[6]++, state.characteristics.indexOf(characteristic));
  cov_1a0q1in91j.s[7]++;
  if (characteristicIndex < 0) {
    cov_1a0q1in91j.b[1][0]++;
    cov_1a0q1in91j.s[8]++;

    state.characteristics.push(characteristic);
  } else {
    cov_1a0q1in91j.b[1][1]++;
    cov_1a0q1in91j.s[9]++;

    state.characteristics.splice(characteristicIndex, 1, characteristic);
  }
}), _ref));

exports.default = CharacteristicMutatations;
//# sourceMappingURL=characteristic.js.map