'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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
    state.devices.splice(deviceIndex, 1, payload.device);
  }
}), (0, _defineProperty3.default)(_DeviceMutatations, MutationTypes.BLE_DEVICE_REMOVED, function (state, payload) {
  var deviceIndex = state.devices.indexOf(payload.device);
  var services = state.services.filter(function (service) {
    return service.device === payload.device;
  });
  var characteristics = state.characteristics.filter(function (characteristic) {
    return services.includes(characteristic.service);
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(characteristics), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var characterToDelete = _step.value;

      var characteristicIndex = state.characteristics.indexOf(characterToDelete);
      state.characteristics.splice(characteristicIndex, 1);
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(services), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var serviceToDelete = _step2.value;

      var serviceIndex = state.services.indexOf(serviceToDelete);
      state.services.splice(serviceIndex, 1);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

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