'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DeviceMutatations;

var _mutationTypes = require('../mutation-types');

var MutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DeviceMutatations = (_DeviceMutatations = {}, _defineProperty(_DeviceMutatations, MutationTypes.BLE_DEVICE_ADDED, function (state, payload) {
  state.devices.push(payload.device);
}), _defineProperty(_DeviceMutatations, MutationTypes.BLE_DEVICE_REMOVED, function (state, payload) {
  var deviceIndex = state.devices.indexOf(payload.device);
  state.devices.splice(deviceIndex, 1);
}), _defineProperty(_DeviceMutatations, MutationTypes.BLE_DEVICE_CONNECTED, function (state, payload) {
  Vue.set(payload.device, 'connected', true);
}), _defineProperty(_DeviceMutatations, MutationTypes.BLE_DEVICE_DISCONNECTED, function (state, payload) {
  Vue.set(payload.device, 'connected', false);
}), _DeviceMutatations);

exports.default = DeviceMutatations;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tdXRhdGlvbnMvZGV2aWNlLmpzIl0sIm5hbWVzIjpbIk11dGF0aW9uVHlwZXMiLCJEZXZpY2VNdXRhdGF0aW9ucyIsIkJMRV9ERVZJQ0VfQURERUQiLCJzdGF0ZSIsInBheWxvYWQiLCJkZXZpY2VzIiwicHVzaCIsImRldmljZSIsIkJMRV9ERVZJQ0VfUkVNT1ZFRCIsImRldmljZUluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsIkJMRV9ERVZJQ0VfQ09OTkVDVEVEIiwiVnVlIiwic2V0IiwiQkxFX0RFVklDRV9ESVNDT05ORUNURUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0lBQVlBLGE7Ozs7OztBQUVaLElBQU1DLGtGQUNIRCxjQUFjRSxnQkFEWCxZQUM4QkMsS0FEOUIsRUFDcUNDLE9BRHJDLEVBQzhDO0FBQ2hERCxRQUFNRSxPQUFOLENBQWNDLElBQWQsQ0FBbUJGLFFBQVFHLE1BQTNCO0FBQ0QsQ0FIRyx1Q0FJSFAsY0FBY1Esa0JBSlgsWUFJZ0NMLEtBSmhDLEVBSXVDQyxPQUp2QyxFQUlnRDtBQUNsRCxNQUFNSyxjQUFjTixNQUFNRSxPQUFOLENBQWNLLE9BQWQsQ0FBc0JOLFFBQVFHLE1BQTlCLENBQXBCO0FBQ0FKLFFBQU1FLE9BQU4sQ0FBY00sTUFBZCxDQUFxQkYsV0FBckIsRUFBa0MsQ0FBbEM7QUFDRCxDQVBHLHVDQVFIVCxjQUFjWSxvQkFSWCxZQVFrQ1QsS0FSbEMsRUFReUNDLE9BUnpDLEVBUWtEO0FBQ3BEUyxNQUFJQyxHQUFKLENBQVFWLFFBQVFHLE1BQWhCLEVBQXVCLFdBQXZCLEVBQW1DLElBQW5DO0FBQ0QsQ0FWRyx1Q0FXSFAsY0FBY2UsdUJBWFgsWUFXcUNaLEtBWHJDLEVBVzRDQyxPQVg1QyxFQVdxRDtBQUN2RFMsTUFBSUMsR0FBSixDQUFRVixRQUFRRyxNQUFoQixFQUF1QixXQUF2QixFQUFtQyxLQUFuQztBQUNELENBYkcsc0JBQU47O2tCQWdCZU4saUIiLCJmaWxlIjoiZGV2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTXV0YXRpb25UeXBlcyBmcm9tICcuLi9tdXRhdGlvbi10eXBlcydcclxuXHJcbmNvbnN0IERldmljZU11dGF0YXRpb25zID0ge1xyXG4gIFtNdXRhdGlvblR5cGVzLkJMRV9ERVZJQ0VfQURERURdIChzdGF0ZSwgcGF5bG9hZCkge1xyXG4gICAgc3RhdGUuZGV2aWNlcy5wdXNoKHBheWxvYWQuZGV2aWNlKVxyXG4gIH0sXHJcbiAgW011dGF0aW9uVHlwZXMuQkxFX0RFVklDRV9SRU1PVkVEXSAoc3RhdGUsIHBheWxvYWQpIHtcclxuICAgIGNvbnN0IGRldmljZUluZGV4ID0gc3RhdGUuZGV2aWNlcy5pbmRleE9mKHBheWxvYWQuZGV2aWNlKVxyXG4gICAgc3RhdGUuZGV2aWNlcy5zcGxpY2UoZGV2aWNlSW5kZXgsIDEpXHJcbiAgfSxcclxuICBbTXV0YXRpb25UeXBlcy5CTEVfREVWSUNFX0NPTk5FQ1RFRF0gKHN0YXRlLCBwYXlsb2FkKSB7XHJcbiAgICBWdWUuc2V0KHBheWxvYWQuZGV2aWNlLCdjb25uZWN0ZWQnLHRydWUpXHJcbiAgfSxcclxuICBbTXV0YXRpb25UeXBlcy5CTEVfREVWSUNFX0RJU0NPTk5FQ1RFRF0gKHN0YXRlLCBwYXlsb2FkKSB7XHJcbiAgICBWdWUuc2V0KHBheWxvYWQuZGV2aWNlLCdjb25uZWN0ZWQnLGZhbHNlKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGV2aWNlTXV0YXRhdGlvbnNcclxuIl19