'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Cannonical128UUIDBase = '0000XXXX-0000-1000-8000-00805f9b34fb';

var WebBluetoothStoreUtils = {
  cannonicalUUIDFor16bitUUID: function cannonicalUUIDFor16bitUUID(UUID16) {
    return Cannonical128UUIDBase.replace('XXXX', UUID16.toString(16));
  }
};

exports.default = WebBluetoothStoreUtils;