'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _DeviceMutatations;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _mutationTypes = require('../mutation-types');

var MutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeviceMutatations = (_DeviceMutatations = {}, (0, _defineProperty3.default)(_DeviceMutatations, MutationTypes.BLE_DEVICE_ADDED, function (state, payload) {
  var deviceIndex = state.devices.indexOf(payload.device);
  if (deviceIndex < 0) {
    state.devices.push(payload.device);
  } else {
    state.splice(deviceIndex, 1, payload.device);
  }
}), (0, _defineProperty3.default)(_DeviceMutatations, MutationTypes.BLE_DEVICE_REMOVED, function (state, payload) {
  var deviceIndex = state.devices.indexOf(payload.device);
  state.devices.splice(deviceIndex, 1);
}), (0, _defineProperty3.default)(_DeviceMutatations, MutationTypes.BLE_DEVICE_UPDATED, function (state, payload) {
  var deviceIndex = state.devices.indexOf(payload.device);
  if (deviceIndex < 0) {
    state.devices.push(payload.device);
  } else {
    state.devices.splice(deviceIndex, 1, payload.device);
  }
}), _DeviceMutatations);

exports.default = DeviceMutatations;
//# sourceMappingURL=device.js.map