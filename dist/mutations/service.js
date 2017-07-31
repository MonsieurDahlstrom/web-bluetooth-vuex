'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _ServiceMutatations;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _mutationTypes = require('../mutation-types');

var MutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceMutatations = (_ServiceMutatations = {}, (0, _defineProperty3.default)(_ServiceMutatations, MutationTypes.BLE_SERVICES_DISCOVERED, function (state, payload) {
  console.log('BLE_SERVICES_DISCOVERED');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(payload.services), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var service = _step.value;

      var serviceIndex = state.services.indexOf(service);
      if (serviceIndex < 0) {
        state.services.push(service);
      } else {
        state.services.splice(serviceIndex, 1, service);
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
}), (0, _defineProperty3.default)(_ServiceMutatations, MutationTypes.BLE_SERVICE_CHANGED, function (state, payload) {
  console.log('BLE_SERVICE_CHANGED');
  var serviceIndex = state.services.indexOf(payload.service);
  if (serviceIndex < 0) {
    state.services.push(payload.service);
  } else {
    state.services.splice(serviceIndex, 1, payload.service);
  }
}), _ServiceMutatations);
exports.default = ServiceMutatations;