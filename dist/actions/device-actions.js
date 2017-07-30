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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2RldmljZS1hY3Rpb25zLmpzIl0sIm5hbWVzIjpbIm11dGF0aW9uVHlwZXMiLCJhY3Rpb25zIiwid2ViQmx1ZXRvb3RoUGFpciIsInF1ZXJ5IiwiZGlzcGF0Y2giLCJjb21taXQiLCJyZXF1ZXN0UGFyYW1ldGVycyIsIm5hbWUiLCJ1bmRlZmluZWQiLCJzZXJ2aWNlcyIsIm1hcCIsInNlcnZpY2UiLCJ1dWlkIiwibmF2aWdhdG9yIiwiYmx1ZXRvb3RoIiwicmVxdWVzdERldmljZSIsImRldmljZSIsIndlYkJsdWV0b290aERldmljZSIsIkJMRV9ERVZJQ0VfQURERUQiLCJ3ZWJCbHVldG9vdGhDb25uZWN0IiwiY29ubmVjdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJCTEVfREVWSUNFX1VQREFURUQiLCJ3ZWJCbHVldG9vdGhEaXNjb25uZWN0IiwiYmx1ZXRvb3RoRGV2aWNlIiwiZ2F0dCIsImNvbm5lY3RlZCIsImRpc2Nvbm5lY3QiLCJCTEVfREVWSUNFX1JFTU9WRUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztJQUFZQSxhOzs7Ozs7OztBQUVMLElBQU1DLDRCQUFVO0FBQ2ZDLGtCQURlO0FBQUEsaUZBQ3lCQyxLQUR6QjtBQUFBLFVBQ0tDLFFBREwsUUFDS0EsUUFETDtBQUFBLFVBQ2VDLE1BRGYsUUFDZUEsTUFEZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFZkMsK0JBRmUsR0FFSyxFQUZMO0FBR25COztBQUNBLGtCQUFJSCxNQUFNSSxJQUFOLEtBQWVDLFNBQW5CLEVBQThCO0FBQzVCRixrQ0FBa0IsU0FBbEIsSUFBK0JILE1BQU1JLElBQXJDO0FBQ0QsZUFGRCxNQUVPO0FBQ0xELGtDQUFrQixrQkFBbEIsSUFBd0MsSUFBeEM7QUFDRDtBQUNEO0FBQ0Esa0JBQUlILE1BQU1NLFFBQU4sS0FBbUJELFNBQXZCLEVBQWtDO0FBQ2hDRixrQ0FBa0Isa0JBQWxCLElBQXdDSCxNQUFNTSxRQUFOLENBQWVDLEdBQWYsQ0FBbUI7QUFBQSx5QkFBV0MsUUFBUUMsSUFBbkI7QUFBQSxpQkFBbkIsQ0FBeEM7QUFDRDtBQUNEO0FBYm1CO0FBQUEscUJBY0FDLFVBQVVDLFNBQVYsQ0FBb0JDLGFBQXBCLENBQWtDVCxpQkFBbEMsQ0FkQTs7QUFBQTtBQWNmVSxvQkFkZTtBQWVmQyxnQ0FmZSxHQWVNLHNDQUE0QkQsTUFBNUIsQ0FmTjs7QUFnQm5CWCxxQkFBT0wsY0FBY2tCLGdCQUFyQixFQUF1QyxFQUFDRixRQUFRQyxrQkFBVCxFQUF2QztBQUNBOztBQWpCbUIsb0JBa0JmZCxNQUFNTSxRQUFOLEtBQW1CRCxTQWxCSjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQW1CWEosU0FBUyxxQkFBVCxFQUFnQ2Esa0JBQWhDLENBbkJXOztBQUFBO0FBb0JqQmIsdUJBQVMsdUJBQVQsRUFBa0MsRUFBQ1ksUUFBUUMsa0JBQVQsRUFBNkJSLFVBQVVOLE1BQU1NLFFBQTdDLEVBQWxDOztBQXBCaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUF1QmZVLHFCQXZCZTtBQUFBLG1GQXVCNEJGLGtCQXZCNUI7QUFBQSxVQXVCUWIsUUF2QlIsU0F1QlFBLFFBdkJSO0FBQUEsVUF1QmtCQyxNQXZCbEIsU0F1QmtCQSxNQXZCbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBd0JiWSxtQkFBbUJHLE9BQW5CLEVBeEJhOztBQUFBO0FBeUJuQkgsaUNBQW1CRCxNQUFuQixDQUEwQkssZ0JBQTFCLENBQTJDLHdCQUEzQyxFQUFxRSxpQkFBUztBQUM1RWpCLHlCQUFTLHdCQUFULEVBQW1DYSxrQkFBbkM7QUFDRCxlQUZEO0FBR0FaLHFCQUFPTCxjQUFjc0Isa0JBQXJCLEVBQXlDLEVBQUNOLFFBQVFDLGtCQUFULEVBQXpDOztBQTVCbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUE4QmZNLHdCQTlCZTtBQUFBLG1GQThCK0JDLGVBOUIvQjtBQUFBLFVBOEJXcEIsUUE5QlgsU0E4QldBLFFBOUJYO0FBQUEsVUE4QnFCQyxNQTlCckIsU0E4QnFCQSxNQTlCckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQStCZm1CLGdCQUFnQkMsSUFBaEIsQ0FBcUJDLFNBL0JOO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEscUJBZ0NYRixnQkFBZ0JDLElBQWhCLENBQXFCRSxVQUFyQixFQWhDVzs7QUFBQTtBQWtDbkJ0QixxQkFBT0wsY0FBYzRCLGtCQUFyQixFQUF5QyxFQUFDWixRQUFRUSxlQUFULEVBQXpDOztBQWxDbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxDQUFoQjs7QUFzQ1A7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStCQSIsImZpbGUiOiJkZXZpY2UtYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWJCbHVldG9vdGhTdG9yZURldmljZSBmcm9tICcuL1dlYkJsdWV0b290aFN0b3JlRGV2aWNlJ1xyXG5pbXBvcnQgKiBhcyBtdXRhdGlvblR5cGVzIGZyb20gJy4vbXV0YXRpb24tdHlwZXMnXHJcblxyXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcclxuICBhc3luYyB3ZWJCbHVldG9vdGhQYWlyICh7IGRpc3BhdGNoLCBjb21taXQgfSwgcXVlcnkpIHtcclxuICAgIHZhciByZXF1ZXN0UGFyYW1ldGVycyA9IHsgfVxyXG4gICAgLy8gV2FzIGEgZGV2aWNlIG5hbWUgc2V0IGZvciB0aGUgY2hhcmFjdGVyXHJcbiAgICBpZiAocXVlcnkubmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJlcXVlc3RQYXJhbWV0ZXJzWydmaWx0ZXJzJ10gPSBxdWVyeS5uYW1lXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXF1ZXN0UGFyYW1ldGVyc1snYWNjZXB0QWxsRGV2aWNlcyddID0gdHJ1ZVxyXG4gICAgfVxyXG4gICAgLy8gRG9lcyB0aGUgcXVlcnkgc3BlY2lmeSBhIGNvbGxlY3Rpb24gb2Ygc2VydmljZXMgdG8gbG9vayBmb3JcclxuICAgIGlmIChxdWVyeS5zZXJ2aWNlcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJlcXVlc3RQYXJhbWV0ZXJzWydvcHRpb25hbFNlcnZpY2VzJ10gPSBxdWVyeS5zZXJ2aWNlcy5tYXAoc2VydmljZSA9PiBzZXJ2aWNlLnV1aWQpXHJcbiAgICB9XHJcbiAgICAvLyBQZXJmb3JtIFF1ZXJ5XHJcbiAgICBsZXQgZGV2aWNlID0gYXdhaXQgbmF2aWdhdG9yLmJsdWV0b290aC5yZXF1ZXN0RGV2aWNlKHJlcXVlc3RQYXJhbWV0ZXJzKVxyXG4gICAgdmFyIHdlYkJsdWV0b290aERldmljZSA9IG5ldyBXZWJCbHVldG9vdGhTdG9yZURldmljZShkZXZpY2UpXHJcbiAgICBjb21taXQobXV0YXRpb25UeXBlcy5CTEVfREVWSUNFX0FEREVELCB7ZGV2aWNlOiB3ZWJCbHVldG9vdGhEZXZpY2V9KVxyXG4gICAgLy8gSWYgc2VydmljZXMgd2FzIHNwZWNpZmllZCwgY29ubmVjdCBhbmQgZGlzY292ZXIgdGhlbVxyXG4gICAgaWYgKHF1ZXJ5LnNlcnZpY2VzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgYXdhaXQgZGlzcGF0Y2goJ3dlYkJsdWV0b290aENvbm5lY3QnLCB3ZWJCbHVldG9vdGhEZXZpY2UpXHJcbiAgICAgIGRpc3BhdGNoKCd3ZWJCbHVldG9vdGhEaXNjb3ZlcnknLCB7ZGV2aWNlOiB3ZWJCbHVldG9vdGhEZXZpY2UsIHNlcnZpY2VzOiBxdWVyeS5zZXJ2aWNlc30pXHJcbiAgICB9XHJcbiAgfSxcclxuICBhc3luYyB3ZWJCbHVldG9vdGhDb25uZWN0ICh7IGRpc3BhdGNoLCBjb21taXQgfSwgd2ViQmx1ZXRvb3RoRGV2aWNlKSB7XHJcbiAgICBhd2FpdCB3ZWJCbHVldG9vdGhEZXZpY2UuY29ubmVjdCgpXHJcbiAgICB3ZWJCbHVldG9vdGhEZXZpY2UuZGV2aWNlLmFkZEV2ZW50TGlzdGVuZXIoJ2dhdHRzZXJ2ZXJkaXNjb25uZWN0ZWQnLCBldmVudCA9PiB7XHJcbiAgICAgIGRpc3BhdGNoKCd3ZWJCbHVldG9vdGhEaXNjb25uZWN0Jywgd2ViQmx1ZXRvb3RoRGV2aWNlKVxyXG4gICAgfSlcclxuICAgIGNvbW1pdChtdXRhdGlvblR5cGVzLkJMRV9ERVZJQ0VfVVBEQVRFRCwge2RldmljZTogd2ViQmx1ZXRvb3RoRGV2aWNlfSlcclxuICB9LFxyXG4gIGFzeW5jIHdlYkJsdWV0b290aERpc2Nvbm5lY3QgKHsgZGlzcGF0Y2gsIGNvbW1pdCB9LCBibHVldG9vdGhEZXZpY2UpIHtcclxuICAgIGlmIChibHVldG9vdGhEZXZpY2UuZ2F0dC5jb25uZWN0ZWQpIHtcclxuICAgICAgYXdhaXQgYmx1ZXRvb3RoRGV2aWNlLmdhdHQuZGlzY29ubmVjdCgpXHJcbiAgICB9XHJcbiAgICBjb21taXQobXV0YXRpb25UeXBlcy5CTEVfREVWSUNFX1JFTU9WRUQsIHtkZXZpY2U6IGJsdWV0b290aERldmljZX0pXHJcbiAgfVxyXG59XHJcblxyXG4vKlxyXG5mdW5jdGlvbiBhbnlOYW1lZERldmljZSAoKSB7XHJcbiAgLy8gVGhpcyBpcyB0aGUgY2xvc2VzdCB3ZSBjYW4gZ2V0IGZvciBub3cgdG8gZ2V0IGFsbCBkZXZpY2VzLlxyXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJCbHVldG9vdGhDRy93ZWItYmx1ZXRvb3RoL2lzc3Vlcy8yMzRcclxuICByZXR1cm4gQXJyYXkuZnJvbSgnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonKVxyXG4gICAgLm1hcChjID0+ICh7bmFtZVByZWZpeDogY30pKVxyXG4gICAgLmNvbmNhdCh7bmFtZTogJyd9KVxyXG59XHJcbiovXHJcblxyXG4vKlxyXG5kaXNjb3ZlclNlcnZpY2VzRm9yRGV2aWNlICh7IGRpc3BhdGNoLCBjb21taXQgfSwgYmx1ZXRvb3RoR2F0dCkge1xyXG4gIHJldHVybiBibHVldG9vdGhHYXR0LmdldFByaW1hcnlTZXJ2aWNlcygpXHJcbiAgLnRoZW4oc2VydmljZXMgPT4ge1xyXG4gICAgcmV0dXJuIFByb21pc2UubWFwU2VyaWVzKHNlcnZpY2VzLCBmdW5jdGlvbiAoc2VydmljZSwgaW5kZXgsIGxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gZGlzcGF0Y2goJ2Rpc2NvdmVyQ2hhcmFjdGVyaXN0aWNzRm9yU2VydmljZScsIHNlcnZpY2UpXHJcbiAgICAgIC50aGVuKF8gPT4ge1xyXG4gICAgICAgIGNvbW1pdChtdXRhdGlvblR5cGVzLkJMRV9TRVJWSUNFX0FEREVELCB7c2VydmljZTogc2VydmljZX0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0pXHJcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpXHJcbn0sXHJcbmRpc2NvdmVyQ2hhcmFjdGVyaXN0aWNzRm9yU2VydmljZSAoeyBkaXNwYXRjaCwgY29tbWl0IH0sIGJsdWV0b290aFNlcnZpY2UpIHtcclxuICByZXR1cm4gYmx1ZXRvb3RoU2VydmljZS5nZXRDaGFyYWN0ZXJpc3RpY3MoKVxyXG4gIC50aGVuKGNoYXJhY3RlcmlzdGljcyA9PiB7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5tYXBTZXJpZXMoY2hhcmFjdGVyaXN0aWNzLCBmdW5jdGlvbiAoY2hhcmFjdGVyaXN0aWMsIGluZGV4LCBsZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIGRpc3BhdGNoKCdjb25maWd1cmVDaGFyYWN0ZXJpc3RpYycsIGNoYXJhY3RlcmlzdGljKVxyXG4gICAgICAudGhlbihfID0+IHtcclxuICAgICAgICBjb21taXQobXV0YXRpb25UeXBlcy5CTEVfQ0hBUkFDVEVSSVNUSUNfQURERUQsIHtjaGFyYWN0ZXJpc3RpYzogY2hhcmFjdGVyaXN0aWN9KVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICAgIC50aGVuKF8gPT4geyBjb25zb2xlLmxvZygnY2hhcmFjdGVyaXN0aWNzIGNvbmZpZ3VyZWQnKSB9KVxyXG4gIH0pXHJcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpXHJcbn0sXHJcbmNvbmZpZ3VyZUNoYXJhY3RlcmlzdGljICh7IGRpc3BhdGNoLCBjb21taXQgfSwgYmx1ZXRvb3RoQ2hhcmFjdGVyaXN0aWMpIHtcclxuICByZXR1cm4gRGlzY292ZXJ5UHJvbWlzZXMucHJvbWlzZUZvckNvbmZpZ3VyYXRpb25PZkNoYXJhY3RlcmlzdGljKGJsdWV0b290aENoYXJhY3RlcmlzdGljKVxyXG4gIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKVxyXG59LFxyXG4qL1xyXG4vKlxyXG5mdW5jdGlvbiBmaWx0ZXJCeVVVSUQgKG9iamVjdHNXaXRoVVVJRCkge1xyXG4gIHZhciBmb3VuZFNlcnZpY2VzID0gW11cclxuICByZXR1cm4gb2JqZWN0c1dpdGhVVUlELmZpbHRlcihpdGVtID0+IHtcclxuICAgIGlmIChmb3VuZFNlcnZpY2VzLmluY2x1ZGVzKGl0ZW0udXVpZCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3VuZFNlcnZpY2VzLnB1c2goaXRlbS51dWlkKVxyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIGNvbnN0IEJhdHRlcnlDaGFyYWN0ZXJpc3RpY1VVSUQgPSAnMDAwMDJhMWItMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiJ1xyXG4vLyBjb25zdCBCYXR0ZXJ5U2VydmljZVVVSUQgPSAnMDAwMDE4MGYtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiJ1xyXG5jb25zdCBDb2xvdXJQaWNrZXJTZXJ2aWNlVVVJRCA9ICc0N0NBNDZDMC04NDhFLTExRTYtQkRGNC0wODAwMjAwQzlBNjYnLnRvTG93ZXJDYXNlKClcclxuY29uc3QgQ29sb3VyUGlja2VyQ2hhcmFjdGVyaXN0aWNVVUlEID0gJ0FBOUFCNkNBLUFGM0YtNDVCMi04OTMyLUE1MDQzNDEyQTJGQScudG9Mb3dlckNhc2UoKVxyXG5cclxuY2xhc3MgQ2hhcmFjdGVyaXN0aWNMaXN0ZW5lciB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgdGhpcy5jaGFyYWN0ZXJpc3RpY3MgPSBbXVxyXG4gIH1cclxuXHJcbiAgYWRkQ2hhcmFjdGVyaXN0aWMgKGNoYXJhY3RlcmlzdGljKSB7XHJcbiAgICBpZiAoIXRoaXMuY2hhcmFjdGVyaXN0aWNzLmluY2x1ZGVzKGNoYXJhY3RlcmlzdGljKSkge1xyXG4gICAgICB0aGlzLmNoYXJhY3RlcmlzdGljcy5wdXNoKGNoYXJhY3RlcmlzdGljKVxyXG4gICAgICBjb25zb2xlLmxvZyhjaGFyYWN0ZXJpc3RpYy5hZGRFdmVudExpc3RlbmVyKCdjaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZCcsIHRoaXMub25DaGFyYWN0ZXJpc3RpY0V2ZW50KSlcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY2hhcmFjdGVyaXN0aWNzKVxyXG4gIH1cclxuXHJcbiAgb25DaGFyYWN0ZXJpc3RpY0V2ZW50IChldikge1xyXG4gICAgY29uc3QgZGF0YVZpZXcgPSBldi50YXJnZXQudmFsdWVcclxuICAgIGxldCBkYXRhID0gW11cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVZpZXcuYnl0ZUxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGRhdGEucHVzaChkYXRhVmlldy5nZXRVaW50OChpKSlcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKCdDaGFyYWN0ZXJpc3RpY0xpc3RlbmVyIG9uQ2hhcmFjdGVyaXN0aWNFdmVudCcpXHJcbiAgICBjb25zb2xlLmxvZygnQ2hhcmFjdGVyaXN0aWNMaXN0ZW5lciBDaGFyYWN0ZXJpc3RpYzogJyArIGV2LnRhcmdldC51dWlkICsgJyAnICsgZGF0YSlcclxuICAgIGNvbnNvbGUubG9nKCdDaGFyYWN0ZXJpc3RpY0xpc3RlbmVyIGNoYXJhY3RlcmlzdGljdmFsdWVjaGFuZ2VkOiAnICsgZXYudGFyZ2V0LmNoYXJhY3RlcmlzdGljVmFsdWVDaGFuZ2VkKVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IGNoYXJhY3RlcmlzdGljTGlzdGVuZXIgPSBuZXcgQ2hhcmFjdGVyaXN0aWNMaXN0ZW5lcigpXHJcblxyXG4qL1xyXG4iXX0=