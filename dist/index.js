'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _device = require('./actions/device');

var DeviceActions = _interopRequireWildcard(_device);

var _service = require('./actions/service');

var ServiceActions = _interopRequireWildcard(_service);

var _device2 = require('./mutations/device');

var _device3 = _interopRequireDefault(_device2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ServiceMutations = {};
//var CharacteristicMutations = {}

//
var state = {
  devices: [],
  services: [],
  characteristics: []
};

var getters = {
  webBluetoothDevices: function webBluetoothDevices(state) {
    return state.devices;
  },
  webBluetoothServices: function webBluetoothServices(state) {
    return state.services;
  },
  webBluetoothCharacteristics: function webBluetoothCharacteristics(state) {
    return state.characteristics;
  }
};

var actions = Object.assign({}, DeviceActions.actions, ServiceActions.actions);

var mutations = Object.assign({}, _device3.default, ServiceMutations, CharacteristicMutations);

exports.default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEZXZpY2VBY3Rpb25zIiwiU2VydmljZUFjdGlvbnMiLCJTZXJ2aWNlTXV0YXRpb25zIiwic3RhdGUiLCJkZXZpY2VzIiwic2VydmljZXMiLCJjaGFyYWN0ZXJpc3RpY3MiLCJnZXR0ZXJzIiwid2ViQmx1ZXRvb3RoRGV2aWNlcyIsIndlYkJsdWV0b290aFNlcnZpY2VzIiwid2ViQmx1ZXRvb3RoQ2hhcmFjdGVyaXN0aWNzIiwiYWN0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsIm11dGF0aW9ucyIsIkNoYXJhY3RlcmlzdGljTXV0YXRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7SUFBWUEsYTs7QUFDWjs7SUFBWUMsYzs7QUFFWjs7Ozs7Ozs7QUFDQSxJQUFJQyxtQkFBbUIsRUFBdkI7QUFDQTs7QUFIQTtBQUtBLElBQU1DLFFBQVE7QUFDWkMsV0FBUyxFQURHO0FBRVpDLFlBQVUsRUFGRTtBQUdaQyxtQkFBaUI7QUFITCxDQUFkOztBQU1BLElBQU1DLFVBQVU7QUFDZEMsdUJBQXFCO0FBQUEsV0FBU0wsTUFBTUMsT0FBZjtBQUFBLEdBRFA7QUFFZEssd0JBQXNCO0FBQUEsV0FBU04sTUFBTUUsUUFBZjtBQUFBLEdBRlI7QUFHZEssK0JBQTZCO0FBQUEsV0FBU1AsTUFBTUcsZUFBZjtBQUFBO0FBSGYsQ0FBaEI7O0FBTUEsSUFBTUssVUFBVUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JiLGNBQWNXLE9BQWhDLEVBQXlDVixlQUFlVSxPQUF4RCxDQUFoQjs7QUFFQSxJQUFNRyxZQUFZRixPQUFPQyxNQUFQLENBQWMsRUFBZCxvQkFBcUNYLGdCQUFyQyxFQUF1RGEsdUJBQXZELENBQWxCOztrQkFFZTtBQUNiWixjQURhO0FBRWJJLGtCQUZhO0FBR2JJLGtCQUhhO0FBSWJHO0FBSmEsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIERldmljZUFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zL2RldmljZSdcclxuaW1wb3J0ICogYXMgU2VydmljZUFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zL3NlcnZpY2UnXHJcbi8vXHJcbmltcG9ydCBEZXZpY2VNdXRhdGF0aW9ucyBmcm9tICcuL211dGF0aW9ucy9kZXZpY2UnXHJcbnZhciBTZXJ2aWNlTXV0YXRpb25zID0ge31cclxuLy92YXIgQ2hhcmFjdGVyaXN0aWNNdXRhdGlvbnMgPSB7fVxyXG5cclxuY29uc3Qgc3RhdGUgPSB7XHJcbiAgZGV2aWNlczogW10sXHJcbiAgc2VydmljZXM6IFtdLFxyXG4gIGNoYXJhY3RlcmlzdGljczogW11cclxufVxyXG5cclxuY29uc3QgZ2V0dGVycyA9IHtcclxuICB3ZWJCbHVldG9vdGhEZXZpY2VzOiBzdGF0ZSA9PiBzdGF0ZS5kZXZpY2VzLFxyXG4gIHdlYkJsdWV0b290aFNlcnZpY2VzOiBzdGF0ZSA9PiBzdGF0ZS5zZXJ2aWNlcyxcclxuICB3ZWJCbHVldG9vdGhDaGFyYWN0ZXJpc3RpY3M6IHN0YXRlID0+IHN0YXRlLmNoYXJhY3RlcmlzdGljc1xyXG59XHJcblxyXG5jb25zdCBhY3Rpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgRGV2aWNlQWN0aW9ucy5hY3Rpb25zLCBTZXJ2aWNlQWN0aW9ucy5hY3Rpb25zKVxyXG5cclxuY29uc3QgbXV0YXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgRGV2aWNlTXV0YXRhdGlvbnMsIFNlcnZpY2VNdXRhdGlvbnMsIENoYXJhY3RlcmlzdGljTXV0YXRpb25zKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHN0YXRlLFxyXG4gIGdldHRlcnMsXHJcbiAgYWN0aW9ucyxcclxuICBtdXRhdGlvbnNcclxufVxyXG4iXX0=