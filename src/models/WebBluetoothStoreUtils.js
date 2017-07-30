const Cannonical128UUIDBase = '0000XXXX-0000-1000-8000-00805f9b34fb'

const WebBluetoothStoreUtils = {
  cannonicalUUIDFor16bitUUID: function (UUID16) {
    return Cannonical128UUIDBase.replace('XXXX', UUID16.toString(16))
  }
}

export default WebBluetoothStoreUtils
