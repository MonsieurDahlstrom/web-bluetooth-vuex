'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = undefined;

var _WebBluetoothStoreDevice = require('./WebBluetoothStoreDevice');

var _WebBluetoothStoreDevice2 = _interopRequireDefault(_WebBluetoothStoreDevice);

var _mutationTypes = require('./mutation-types');

var mutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var actions = exports.actions = {
  webBluetoothPair: function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref, query) {
      var dispatch = _ref.dispatch,
          commit = _ref.commit;
      var requestParameters, device, webBluetoothDevice;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              requestParameters = {};
              // Was a device name set for the character

              if (query.name !== undefined) {
                requestParameters['filters'] = query.name;
              } else {
                requestParameters['acceptAllDevices'] = true;
              }
              // Does the query specify a collection of services to look for
              if (query.services !== undefined) {
                requestParameters['optionalServices'] = query.services.map(function (service) {
                  return service.uuid;
                });
              }
              // Perform Query
              _context.next = 5;
              return navigator.bluetooth.requestDevice(requestParameters);

            case 5:
              device = _context.sent;
              webBluetoothDevice = new _WebBluetoothStoreDevice2.default(device);

              commit(mutationTypes.BLE_DEVICE_ADDED, { device: webBluetoothDevice });
              // If services was specified, connect and discover them

              if (!(query.services !== undefined)) {
                _context.next = 12;
                break;
              }

              _context.next = 11;
              return dispatch('webBluetoothConnect', webBluetoothDevice);

            case 11:
              dispatch('webBluetoothDiscovery', { device: webBluetoothDevice, services: query.services });

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function webBluetoothPair(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return webBluetoothPair;
  }(),
  webBluetoothConnect: function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref3, webBluetoothDevice) {
      var dispatch = _ref3.dispatch,
          commit = _ref3.commit;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return webBluetoothDevice.connect();

            case 2:
              webBluetoothDevice.device.addEventListener('gattserverdisconnected', function (event) {
                dispatch('webBluetoothDisconnect', webBluetoothDevice);
              });
              commit(mutationTypes.BLE_DEVICE_UPDATED, { device: webBluetoothDevice });

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function webBluetoothConnect(_x3, _x4) {
      return _ref4.apply(this, arguments);
    }

    return webBluetoothConnect;
  }(),
  webBluetoothDisconnect: function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref5, bluetoothDevice) {
      var dispatch = _ref5.dispatch,
          commit = _ref5.commit;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!bluetoothDevice.gatt.connected) {
                _context3.next = 3;
                break;
              }

              _context3.next = 3;
              return bluetoothDevice.gatt.disconnect();

            case 3:
              commit(mutationTypes.BLE_DEVICE_REMOVED, { device: bluetoothDevice });

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function webBluetoothDisconnect(_x5, _x6) {
      return _ref6.apply(this, arguments);
    }

    return webBluetoothDisconnect;
  }()
};

/*
function anyNamedDevice () {
  // This is the closest we can get for now to get all devices.
  // https://github.com/WebBluetoothCG/web-bluetooth/issues/234
  return Array.from('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    .map(c => ({namePrefix: c}))
    .concat({name: ''})
}
*/

/*
discoverServicesForDevice ({ dispatch, commit }, bluetoothGatt) {
  return bluetoothGatt.getPrimaryServices()
  .then(services => {
    return Promise.mapSeries(services, function (service, index, length) {
      return dispatch('discoverCharacteristicsForService', service)
      .then(_ => {
        commit(mutationTypes.BLE_SERVICE_ADDED, {service: service})
      })
    })
  })
  .catch(err => console.error(err))
},
discoverCharacteristicsForService ({ dispatch, commit }, bluetoothService) {
  return bluetoothService.getCharacteristics()
  .then(characteristics => {
    return Promise.mapSeries(characteristics, function (characteristic, index, length) {
      return dispatch('configureCharacteristic', characteristic)
      .then(_ => {
        commit(mutationTypes.BLE_CHARACTERISTIC_ADDED, {characteristic: characteristic})
      })
    })
    .then(_ => { console.log('characteristics configured') })
  })
  .catch(err => console.error(err))
},
configureCharacteristic ({ dispatch, commit }, bluetoothCharacteristic) {
  return DiscoveryPromises.promiseForConfigurationOfCharacteristic(bluetoothCharacteristic)
  .catch(err => console.error(err))
},
*/
/*
function filterByUUID (objectsWithUUID) {
  var foundServices = []
  return objectsWithUUID.filter(item => {
    if (foundServices.includes(item.uuid)) {
      return false
    } else {
      foundServices.push(item.uuid)
      return true
    }
  })
}

// const BatteryCharacteristicUUID = '00002a1b-0000-1000-8000-00805f9b34fb'
// const BatteryServiceUUID = '0000180f-0000-1000-8000-00805f9b34fb'
const ColourPickerServiceUUID = '47CA46C0-848E-11E6-BDF4-0800200C9A66'.toLowerCase()
const ColourPickerCharacteristicUUID = 'AA9AB6CA-AF3F-45B2-8932-A5043412A2FA'.toLowerCase()

class CharacteristicListener {
  constructor () {
    this.characteristics = []
  }

  addCharacteristic (characteristic) {
    if (!this.characteristics.includes(characteristic)) {
      this.characteristics.push(characteristic)
      console.log(characteristic.addEventListener('characteristicvaluechanged', this.onCharacteristicEvent))
    }
    console.log(this.characteristics)
  }

  onCharacteristicEvent (ev) {
    const dataView = ev.target.value
    let data = []
    for (let i = 0; i < dataView.byteLength; i++) {
      data.push(dataView.getUint8(i))
    }
    console.log('CharacteristicListener onCharacteristicEvent')
    console.log('CharacteristicListener Characteristic: ' + ev.target.uuid + ' ' + data)
    console.log('CharacteristicListener characteristicvaluechanged: ' + ev.target.characteristicValueChanged)
  }

}

const characteristicListener = new CharacteristicListener()

*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2RldmljZS5qcyJdLCJuYW1lcyI6WyJtdXRhdGlvblR5cGVzIiwiYWN0aW9ucyIsIndlYkJsdWV0b290aFBhaXIiLCJxdWVyeSIsImRpc3BhdGNoIiwiY29tbWl0IiwicmVxdWVzdFBhcmFtZXRlcnMiLCJuYW1lIiwidW5kZWZpbmVkIiwic2VydmljZXMiLCJtYXAiLCJzZXJ2aWNlIiwidXVpZCIsIm5hdmlnYXRvciIsImJsdWV0b290aCIsInJlcXVlc3REZXZpY2UiLCJkZXZpY2UiLCJ3ZWJCbHVldG9vdGhEZXZpY2UiLCJCTEVfREVWSUNFX0FEREVEIiwid2ViQmx1ZXRvb3RoQ29ubmVjdCIsImNvbm5lY3QiLCJhZGRFdmVudExpc3RlbmVyIiwiQkxFX0RFVklDRV9VUERBVEVEIiwid2ViQmx1ZXRvb3RoRGlzY29ubmVjdCIsImJsdWV0b290aERldmljZSIsImdhdHQiLCJjb25uZWN0ZWQiLCJkaXNjb25uZWN0IiwiQkxFX0RFVklDRV9SRU1PVkVEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7SUFBWUEsYTs7Ozs7Ozs7QUFFTCxJQUFNQyw0QkFBVTtBQUNmQyxrQkFEZTtBQUFBLGlGQUN5QkMsS0FEekI7QUFBQSxVQUNLQyxRQURMLFFBQ0tBLFFBREw7QUFBQSxVQUNlQyxNQURmLFFBQ2VBLE1BRGY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWZDLCtCQUZlLEdBRUssRUFGTDtBQUduQjs7QUFDQSxrQkFBSUgsTUFBTUksSUFBTixLQUFlQyxTQUFuQixFQUE4QjtBQUM1QkYsa0NBQWtCLFNBQWxCLElBQStCSCxNQUFNSSxJQUFyQztBQUNELGVBRkQsTUFFTztBQUNMRCxrQ0FBa0Isa0JBQWxCLElBQXdDLElBQXhDO0FBQ0Q7QUFDRDtBQUNBLGtCQUFJSCxNQUFNTSxRQUFOLEtBQW1CRCxTQUF2QixFQUFrQztBQUNoQ0Ysa0NBQWtCLGtCQUFsQixJQUF3Q0gsTUFBTU0sUUFBTixDQUFlQyxHQUFmLENBQW1CO0FBQUEseUJBQVdDLFFBQVFDLElBQW5CO0FBQUEsaUJBQW5CLENBQXhDO0FBQ0Q7QUFDRDtBQWJtQjtBQUFBLHFCQWNBQyxVQUFVQyxTQUFWLENBQW9CQyxhQUFwQixDQUFrQ1QsaUJBQWxDLENBZEE7O0FBQUE7QUFjZlUsb0JBZGU7QUFlZkMsZ0NBZmUsR0FlTSxzQ0FBNEJELE1BQTVCLENBZk47O0FBZ0JuQlgscUJBQU9MLGNBQWNrQixnQkFBckIsRUFBdUMsRUFBQ0YsUUFBUUMsa0JBQVQsRUFBdkM7QUFDQTs7QUFqQm1CLG9CQWtCZmQsTUFBTU0sUUFBTixLQUFtQkQsU0FsQko7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxxQkFtQlhKLFNBQVMscUJBQVQsRUFBZ0NhLGtCQUFoQyxDQW5CVzs7QUFBQTtBQW9CakJiLHVCQUFTLHVCQUFULEVBQWtDLEVBQUNZLFFBQVFDLGtCQUFULEVBQTZCUixVQUFVTixNQUFNTSxRQUE3QyxFQUFsQzs7QUFwQmlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBdUJmVSxxQkF2QmU7QUFBQSxtRkF1QjRCRixrQkF2QjVCO0FBQUEsVUF1QlFiLFFBdkJSLFNBdUJRQSxRQXZCUjtBQUFBLFVBdUJrQkMsTUF2QmxCLFNBdUJrQkEsTUF2QmxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQXdCYlksbUJBQW1CRyxPQUFuQixFQXhCYTs7QUFBQTtBQXlCbkJILGlDQUFtQkQsTUFBbkIsQ0FBMEJLLGdCQUExQixDQUEyQyx3QkFBM0MsRUFBcUUsaUJBQVM7QUFDNUVqQix5QkFBUyx3QkFBVCxFQUFtQ2Esa0JBQW5DO0FBQ0QsZUFGRDtBQUdBWixxQkFBT0wsY0FBY3NCLGtCQUFyQixFQUF5QyxFQUFDTixRQUFRQyxrQkFBVCxFQUF6Qzs7QUE1Qm1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBOEJmTSx3QkE5QmU7QUFBQSxtRkE4QitCQyxlQTlCL0I7QUFBQSxVQThCV3BCLFFBOUJYLFNBOEJXQSxRQTlCWDtBQUFBLFVBOEJxQkMsTUE5QnJCLFNBOEJxQkEsTUE5QnJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkErQmZtQixnQkFBZ0JDLElBQWhCLENBQXFCQyxTQS9CTjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQWdDWEYsZ0JBQWdCQyxJQUFoQixDQUFxQkUsVUFBckIsRUFoQ1c7O0FBQUE7QUFrQ25CdEIscUJBQU9MLGNBQWM0QixrQkFBckIsRUFBeUMsRUFBQ1osUUFBUVEsZUFBVCxFQUF6Qzs7QUFsQ21CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsQ0FBaEI7O0FBc0NQOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQkEiLCJmaWxlIjoiZGV2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYkJsdWV0b290aFN0b3JlRGV2aWNlIGZyb20gJy4vV2ViQmx1ZXRvb3RoU3RvcmVEZXZpY2UnXHJcbmltcG9ydCAqIGFzIG11dGF0aW9uVHlwZXMgZnJvbSAnLi9tdXRhdGlvbi10eXBlcydcclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xyXG4gIGFzeW5jIHdlYkJsdWV0b290aFBhaXIgKHsgZGlzcGF0Y2gsIGNvbW1pdCB9LCBxdWVyeSkge1xyXG4gICAgdmFyIHJlcXVlc3RQYXJhbWV0ZXJzID0geyB9XHJcbiAgICAvLyBXYXMgYSBkZXZpY2UgbmFtZSBzZXQgZm9yIHRoZSBjaGFyYWN0ZXJcclxuICAgIGlmIChxdWVyeS5uYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmVxdWVzdFBhcmFtZXRlcnNbJ2ZpbHRlcnMnXSA9IHF1ZXJ5Lm5hbWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlcXVlc3RQYXJhbWV0ZXJzWydhY2NlcHRBbGxEZXZpY2VzJ10gPSB0cnVlXHJcbiAgICB9XHJcbiAgICAvLyBEb2VzIHRoZSBxdWVyeSBzcGVjaWZ5IGEgY29sbGVjdGlvbiBvZiBzZXJ2aWNlcyB0byBsb29rIGZvclxyXG4gICAgaWYgKHF1ZXJ5LnNlcnZpY2VzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmVxdWVzdFBhcmFtZXRlcnNbJ29wdGlvbmFsU2VydmljZXMnXSA9IHF1ZXJ5LnNlcnZpY2VzLm1hcChzZXJ2aWNlID0+IHNlcnZpY2UudXVpZClcclxuICAgIH1cclxuICAgIC8vIFBlcmZvcm0gUXVlcnlcclxuICAgIGxldCBkZXZpY2UgPSBhd2FpdCBuYXZpZ2F0b3IuYmx1ZXRvb3RoLnJlcXVlc3REZXZpY2UocmVxdWVzdFBhcmFtZXRlcnMpXHJcbiAgICB2YXIgd2ViQmx1ZXRvb3RoRGV2aWNlID0gbmV3IFdlYkJsdWV0b290aFN0b3JlRGV2aWNlKGRldmljZSlcclxuICAgIGNvbW1pdChtdXRhdGlvblR5cGVzLkJMRV9ERVZJQ0VfQURERUQsIHtkZXZpY2U6IHdlYkJsdWV0b290aERldmljZX0pXHJcbiAgICAvLyBJZiBzZXJ2aWNlcyB3YXMgc3BlY2lmaWVkLCBjb25uZWN0IGFuZCBkaXNjb3ZlciB0aGVtXHJcbiAgICBpZiAocXVlcnkuc2VydmljZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBhd2FpdCBkaXNwYXRjaCgnd2ViQmx1ZXRvb3RoQ29ubmVjdCcsIHdlYkJsdWV0b290aERldmljZSlcclxuICAgICAgZGlzcGF0Y2goJ3dlYkJsdWV0b290aERpc2NvdmVyeScsIHtkZXZpY2U6IHdlYkJsdWV0b290aERldmljZSwgc2VydmljZXM6IHF1ZXJ5LnNlcnZpY2VzfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGFzeW5jIHdlYkJsdWV0b290aENvbm5lY3QgKHsgZGlzcGF0Y2gsIGNvbW1pdCB9LCB3ZWJCbHVldG9vdGhEZXZpY2UpIHtcclxuICAgIGF3YWl0IHdlYkJsdWV0b290aERldmljZS5jb25uZWN0KClcclxuICAgIHdlYkJsdWV0b290aERldmljZS5kZXZpY2UuYWRkRXZlbnRMaXN0ZW5lcignZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZCcsIGV2ZW50ID0+IHtcclxuICAgICAgZGlzcGF0Y2goJ3dlYkJsdWV0b290aERpc2Nvbm5lY3QnLCB3ZWJCbHVldG9vdGhEZXZpY2UpXHJcbiAgICB9KVxyXG4gICAgY29tbWl0KG11dGF0aW9uVHlwZXMuQkxFX0RFVklDRV9VUERBVEVELCB7ZGV2aWNlOiB3ZWJCbHVldG9vdGhEZXZpY2V9KVxyXG4gIH0sXHJcbiAgYXN5bmMgd2ViQmx1ZXRvb3RoRGlzY29ubmVjdCAoeyBkaXNwYXRjaCwgY29tbWl0IH0sIGJsdWV0b290aERldmljZSkge1xyXG4gICAgaWYgKGJsdWV0b290aERldmljZS5nYXR0LmNvbm5lY3RlZCkge1xyXG4gICAgICBhd2FpdCBibHVldG9vdGhEZXZpY2UuZ2F0dC5kaXNjb25uZWN0KClcclxuICAgIH1cclxuICAgIGNvbW1pdChtdXRhdGlvblR5cGVzLkJMRV9ERVZJQ0VfUkVNT1ZFRCwge2RldmljZTogYmx1ZXRvb3RoRGV2aWNlfSlcclxuICB9XHJcbn1cclxuXHJcbi8qXHJcbmZ1bmN0aW9uIGFueU5hbWVkRGV2aWNlICgpIHtcclxuICAvLyBUaGlzIGlzIHRoZSBjbG9zZXN0IHdlIGNhbiBnZXQgZm9yIG5vdyB0byBnZXQgYWxsIGRldmljZXMuXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL1dlYkJsdWV0b290aENHL3dlYi1ibHVldG9vdGgvaXNzdWVzLzIzNFxyXG4gIHJldHVybiBBcnJheS5mcm9tKCcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWicpXHJcbiAgICAubWFwKGMgPT4gKHtuYW1lUHJlZml4OiBjfSkpXHJcbiAgICAuY29uY2F0KHtuYW1lOiAnJ30pXHJcbn1cclxuKi9cclxuXHJcbi8qXHJcbmRpc2NvdmVyU2VydmljZXNGb3JEZXZpY2UgKHsgZGlzcGF0Y2gsIGNvbW1pdCB9LCBibHVldG9vdGhHYXR0KSB7XHJcbiAgcmV0dXJuIGJsdWV0b290aEdhdHQuZ2V0UHJpbWFyeVNlcnZpY2VzKClcclxuICAudGhlbihzZXJ2aWNlcyA9PiB7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5tYXBTZXJpZXMoc2VydmljZXMsIGZ1bmN0aW9uIChzZXJ2aWNlLCBpbmRleCwgbGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBkaXNwYXRjaCgnZGlzY292ZXJDaGFyYWN0ZXJpc3RpY3NGb3JTZXJ2aWNlJywgc2VydmljZSlcclxuICAgICAgLnRoZW4oXyA9PiB7XHJcbiAgICAgICAgY29tbWl0KG11dGF0aW9uVHlwZXMuQkxFX1NFUlZJQ0VfQURERUQsIHtzZXJ2aWNlOiBzZXJ2aWNlfSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSlcclxuICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSlcclxufSxcclxuZGlzY292ZXJDaGFyYWN0ZXJpc3RpY3NGb3JTZXJ2aWNlICh7IGRpc3BhdGNoLCBjb21taXQgfSwgYmx1ZXRvb3RoU2VydmljZSkge1xyXG4gIHJldHVybiBibHVldG9vdGhTZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljcygpXHJcbiAgLnRoZW4oY2hhcmFjdGVyaXN0aWNzID0+IHtcclxuICAgIHJldHVybiBQcm9taXNlLm1hcFNlcmllcyhjaGFyYWN0ZXJpc3RpY3MsIGZ1bmN0aW9uIChjaGFyYWN0ZXJpc3RpYywgaW5kZXgsIGxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gZGlzcGF0Y2goJ2NvbmZpZ3VyZUNoYXJhY3RlcmlzdGljJywgY2hhcmFjdGVyaXN0aWMpXHJcbiAgICAgIC50aGVuKF8gPT4ge1xyXG4gICAgICAgIGNvbW1pdChtdXRhdGlvblR5cGVzLkJMRV9DSEFSQUNURVJJU1RJQ19BRERFRCwge2NoYXJhY3RlcmlzdGljOiBjaGFyYWN0ZXJpc3RpY30pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oXyA9PiB7IGNvbnNvbGUubG9nKCdjaGFyYWN0ZXJpc3RpY3MgY29uZmlndXJlZCcpIH0pXHJcbiAgfSlcclxuICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoZXJyKSlcclxufSxcclxuY29uZmlndXJlQ2hhcmFjdGVyaXN0aWMgKHsgZGlzcGF0Y2gsIGNvbW1pdCB9LCBibHVldG9vdGhDaGFyYWN0ZXJpc3RpYykge1xyXG4gIHJldHVybiBEaXNjb3ZlcnlQcm9taXNlcy5wcm9taXNlRm9yQ29uZmlndXJhdGlvbk9mQ2hhcmFjdGVyaXN0aWMoYmx1ZXRvb3RoQ2hhcmFjdGVyaXN0aWMpXHJcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpXHJcbn0sXHJcbiovXHJcbi8qXHJcbmZ1bmN0aW9uIGZpbHRlckJ5VVVJRCAob2JqZWN0c1dpdGhVVUlEKSB7XHJcbiAgdmFyIGZvdW5kU2VydmljZXMgPSBbXVxyXG4gIHJldHVybiBvYmplY3RzV2l0aFVVSUQuZmlsdGVyKGl0ZW0gPT4ge1xyXG4gICAgaWYgKGZvdW5kU2VydmljZXMuaW5jbHVkZXMoaXRlbS51dWlkKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvdW5kU2VydmljZXMucHVzaChpdGVtLnV1aWQpXHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuLy8gY29uc3QgQmF0dGVyeUNoYXJhY3RlcmlzdGljVVVJRCA9ICcwMDAwMmExYi0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmInXHJcbi8vIGNvbnN0IEJhdHRlcnlTZXJ2aWNlVVVJRCA9ICcwMDAwMTgwZi0wMDAwLTEwMDAtODAwMC0wMDgwNWY5YjM0ZmInXHJcbmNvbnN0IENvbG91clBpY2tlclNlcnZpY2VVVUlEID0gJzQ3Q0E0NkMwLTg0OEUtMTFFNi1CREY0LTA4MDAyMDBDOUE2NicudG9Mb3dlckNhc2UoKVxyXG5jb25zdCBDb2xvdXJQaWNrZXJDaGFyYWN0ZXJpc3RpY1VVSUQgPSAnQUE5QUI2Q0EtQUYzRi00NUIyLTg5MzItQTUwNDM0MTJBMkZBJy50b0xvd2VyQ2FzZSgpXHJcblxyXG5jbGFzcyBDaGFyYWN0ZXJpc3RpY0xpc3RlbmVyIHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICB0aGlzLmNoYXJhY3RlcmlzdGljcyA9IFtdXHJcbiAgfVxyXG5cclxuICBhZGRDaGFyYWN0ZXJpc3RpYyAoY2hhcmFjdGVyaXN0aWMpIHtcclxuICAgIGlmICghdGhpcy5jaGFyYWN0ZXJpc3RpY3MuaW5jbHVkZXMoY2hhcmFjdGVyaXN0aWMpKSB7XHJcbiAgICAgIHRoaXMuY2hhcmFjdGVyaXN0aWNzLnB1c2goY2hhcmFjdGVyaXN0aWMpXHJcbiAgICAgIGNvbnNvbGUubG9nKGNoYXJhY3RlcmlzdGljLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYXJhY3RlcmlzdGljdmFsdWVjaGFuZ2VkJywgdGhpcy5vbkNoYXJhY3RlcmlzdGljRXZlbnQpKVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codGhpcy5jaGFyYWN0ZXJpc3RpY3MpXHJcbiAgfVxyXG5cclxuICBvbkNoYXJhY3RlcmlzdGljRXZlbnQgKGV2KSB7XHJcbiAgICBjb25zdCBkYXRhVmlldyA9IGV2LnRhcmdldC52YWx1ZVxyXG4gICAgbGV0IGRhdGEgPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhVmlldy5ieXRlTGVuZ3RoOyBpKyspIHtcclxuICAgICAgZGF0YS5wdXNoKGRhdGFWaWV3LmdldFVpbnQ4KGkpKVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coJ0NoYXJhY3RlcmlzdGljTGlzdGVuZXIgb25DaGFyYWN0ZXJpc3RpY0V2ZW50JylcclxuICAgIGNvbnNvbGUubG9nKCdDaGFyYWN0ZXJpc3RpY0xpc3RlbmVyIENoYXJhY3RlcmlzdGljOiAnICsgZXYudGFyZ2V0LnV1aWQgKyAnICcgKyBkYXRhKVxyXG4gICAgY29uc29sZS5sb2coJ0NoYXJhY3RlcmlzdGljTGlzdGVuZXIgY2hhcmFjdGVyaXN0aWN2YWx1ZWNoYW5nZWQ6ICcgKyBldi50YXJnZXQuY2hhcmFjdGVyaXN0aWNWYWx1ZUNoYW5nZWQpXHJcbiAgfVxyXG5cclxufVxyXG5cclxuY29uc3QgY2hhcmFjdGVyaXN0aWNMaXN0ZW5lciA9IG5ldyBDaGFyYWN0ZXJpc3RpY0xpc3RlbmVyKClcclxuXHJcbiovXHJcbiJdfQ==