'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _webBluetoothStoreUtils = require('./web-bluetooth-store-utils.js');

var _webBluetoothStoreUtils2 = _interopRequireDefault(_webBluetoothStoreUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  devices: [],
  services: [],
  characteristics: []
};

var getters = {
  webBluetoothDevices: function webBluetoothDevices(state) {
    return state.devices;
  },
  webBluetoothServicesForDevice: function webBluetoothServicesForDevice(state) {
    return function (device) {
      return state.services.filter(function (service) {
        return service.device === device;
      });
    };
  },
  webBluetoothServiceForDevice: function webBluetoothServiceForDevice(state) {
    return function (device, uuid) {
      return state.services.filter(function (service) {
        return service.device === device && service.uuid === uid;
      });
    };
  },
  webBluetoothCharacteristicsForService: function webBluetoothCharacteristicsForService(state) {
    return function (service) {
      return state.characteristics.filter(function (characteristic) {
        return characteristic.service === service;
      });
    };
  },
  webBluetoothCharacteristicForService: function webBluetoothCharacteristicForService(state) {
    return function (service, uuid) {
      return state.characteristics.filter(function (characteristic) {
        return characteristic.service === service && characteristic.uuid === uuid;
      });
    };
  }
};

var actions = (0, _assign2.default)({}, _device2.default, _service2.default, _characteristic2.default);

var mutations = (0, _assign2.default)({}, _device4.default, _service4.default, _characteristic4.default);

var VuexBluetoothLEModule = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

module.exports.VueBluetoothLEMixin = _webBluetoothStoreUtils2.default;
module.exports.VuexBluetoothLEModule = VuexBluetoothLEModule;
exports.default = VuexBluetoothLEModule;
//# sourceMappingURL=index.js.map