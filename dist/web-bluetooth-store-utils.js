'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Cannonical128UUIDBase = '0000XXXX-0000-1000-8000-00805f9b34fb';

var DFU_BASE = '0000xxxx-0000-1000-8000-00805f9b34fb';
var DFUSecure = exports.DFUSecure = DFU_BASE.replace('xxxx', 'fe59');
var DFU_CHAR_BASE = '8ec9xxxx-f315-4f60-9fb8-838830daea50';
var DFUSecureControlPoint = exports.DFUSecureControlPoint = DFU_CHAR_BASE.replace('xxxx', '0001');
var DFUSecurePacket = exports.DFUSecurePacket = DFU_CHAR_BASE.replace('xxxx', '0002');

var WebBluetoothStoreUtils = {
  methods: {
    cannonicalUUIDFor16bitUUID: function cannonicalUUIDFor16bitUUID(UUID16) {
      return Cannonical128UUIDBase.replace('XXXX', UUID16.toString(16));
    },
    disService: function disService(device) {
      var DeviceInformationUUID = this.cannonicalUUIDFor16bitUUID(0x180A);
      return this.$store.getters.webBluetoothServicesForDevice(device).find(function (service) {
        return service.uuid === DeviceInformationUUID;
      });
    },
    dfuService: function dfuService(device) {
      return this.$store.getters.webBluetoothServicesForDevice(device).find(function (service) {
        return service.uuid === DFU_BASE;
      });
    },
    valueForCharacteristicUUID: function valueForCharacteristicUUID(service, uuid) {
      var characteristic = this.$store.getters.webBluetoothCharacteristicsForService(service).find(function (characteristic) {
        return characteristic.uuid === uuid;
      });
      return characteristic.value;
    },
    stringForCharacteristicValue: function stringForCharacteristicValue(dataview) {
      var text = '';
      for (var i = 0, l = dataview.byteLength; i < l; i++) {
        text += String.fromCharCode(dataview.getUint8(i));
      }
      return text;
    }
  }
};

exports.default = WebBluetoothStoreUtils;
//# sourceMappingURL=web-bluetooth-store-utils.js.map