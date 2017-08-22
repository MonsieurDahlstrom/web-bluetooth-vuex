'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webBluetoothStoreUtils = require('./web-bluetooth-store-utils');

var _webBluetoothStoreUtils2 = _interopRequireDefault(_webBluetoothStoreUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getters = {
  webBluetoothDevices: function webBluetoothDevices(state, getters) {
    return state.devices;
  },
  webBluetoothServicesForDevice: function webBluetoothServicesForDevice(state, getters) {
    return function (device) {
      return state.services.filter(function (service) {
        return service.device === device;
      });
    };
  },
  webBluetoothServiceForDevice: function webBluetoothServiceForDevice(state, getters) {
    return function (device, uuid) {
      return state.services.find(function (service) {
        return service.device === device && service.uuid === uuid;
      });
    };
  },
  webBluetoothCharacteristicsForService: function webBluetoothCharacteristicsForService(state, getters) {
    return function (service) {
      return state.characteristics.filter(function (characteristic) {
        return characteristic.service === service;
      });
    };
  },
  webBluetoothCharacteristicForService: function webBluetoothCharacteristicForService(state, getters) {
    return function (service, uuid) {
      return state.characteristics.filter(function (characteristic) {
        return characteristic.service === service && characteristic.uuid === uuid;
      });
    };
  }
};

exports.default = getters;
//# sourceMappingURL=getters.js.map