'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var cov_1z1arjq62i = function () {
  var path = '/Users/mdahlstrom/Documents/GitHub/web-bluetooth-vuex-module/src/index.js',
      hash = 'a54adf988d537be5a9358494c06f2698bf84c30c',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/mdahlstrom/Documents/GitHub/web-bluetooth-vuex-module/src/index.js',
    statementMap: {
      '0': {
        start: {
          line: 12,
          column: 14
        },
        end: {
          line: 16,
          column: 1
        }
      },
      '1': {
        start: {
          line: 18,
          column: 16
        },
        end: {
          line: 18,
          column: 87
        }
      },
      '2': {
        start: {
          line: 20,
          column: 18
        },
        end: {
          line: 20,
          column: 97
        }
      },
      '3': {
        start: {
          line: 22,
          column: 30
        },
        end: {
          line: 27,
          column: 1
        }
      },
      '4': {
        start: {
          line: 29,
          column: 0
        },
        end: {
          line: 29,
          column: 59
        }
      },
      '5': {
        start: {
          line: 30,
          column: 0
        },
        end: {
          line: 30,
          column: 60
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    },
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var _device = require('./actions/device');

var _device2 = _interopRequireDefault(_device);

var _service = require('./actions/service');

var _service2 = _interopRequireDefault(_service);

var _characteristic = require('./actions/characteristic');

var _characteristic2 = _interopRequireDefault(_characteristic);

var _device3 = require('./mutations/device');

var _device4 = _interopRequireDefault(_device3);

var _service3 = require('./mutations/service');

var _service4 = _interopRequireDefault(_service3);

var _characteristic3 = require('./mutations/characteristic');

var _characteristic4 = _interopRequireDefault(_characteristic3);

var _getters = require('./getters.js');

var _getters2 = _interopRequireDefault(_getters);

var _webBluetoothStoreUtils = require('./web-bluetooth-store-utils.js');

var _webBluetoothStoreUtils2 = _interopRequireDefault(_webBluetoothStoreUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = (cov_1z1arjq62i.s[0]++, {
  devices: [],
  services: [],
  characteristics: []
});

var actions = (cov_1z1arjq62i.s[1]++, (0, _assign2.default)({}, _device2.default, _service2.default, _characteristic2.default));

var mutations = (cov_1z1arjq62i.s[2]++, (0, _assign2.default)({}, _device4.default, _service4.default, _characteristic4.default));

var VuexBluetoothLEModule = (cov_1z1arjq62i.s[3]++, {
  state: state,
  getters: _getters2.default,
  actions: actions,
  mutations: mutations
});

cov_1z1arjq62i.s[4]++;
module.exports.VueBluetoothLEMixin = _webBluetoothStoreUtils2.default;
cov_1z1arjq62i.s[5]++;
module.exports.VuexBluetoothLEModule = VuexBluetoothLEModule;
exports.default = VuexBluetoothLEModule;
//# sourceMappingURL=index.js.map