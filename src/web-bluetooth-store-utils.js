const WebBluetoothStoreUtils = {
  computed: {
    /*
      Device information service and characteristics
    */
    deviceInformationServiceUUID: function (device) {
      return BluetoothUUID.canonicalUUID(0x180A)
    },
    pnpIdUUID: function (device) {
      return BluetoothUUID.canonicalUUID(0x2A50)
    },
    regulatoryCertificationDataListUUID: function (device) {
      return BluetoothUUID.canonicalUUID(0x2A2A)
    },
    systemIdUUID: function (device) {
      return BluetoothUUID.canonicalUUID(0x2A23)
    },
    softwareRevisionUUID: function (device) {
      return BluetoothUUID.canonicalUUID(0x2A28)
    },
    firmwareRevisionUUID: function (device) {
      return BluetoothUUID.canonicalUUID(0x2A26)
    },
    hardwareRevisionUUID: function (device) {
      return BluetoothUUID.canonicalUUID(0x2A27)
    },
    serialNumberUUID: function (device) {
      return BluetoothUUID.canonicalUUID(0x2A25)
    },
    modelNumberUUID: function (device) {
      return BluetoothUUID.canonicalUUID(0x2A24)
    },
    manufacturerNameUUID: function (device) {
      return BluetoothUUID.canonicalUUID(0x2A29)
    },
    /*
      Battery service and characteristics
    */
    batteryServiceUUID: function () {
      return BluetoothUUID.canonicalUUID(0x180F)
    },
    batteryLevelUUID: function () {
      return BluetoothUUID.canonicalUUID(0x2A19)
    },
    batteryLevelStateUUID: function () {
      return BluetoothUUID.canonicalUUID(0x2A1B)
    },
    batteryPowerStateUUID: function () {
      return BluetoothUUID.canonicalUUID(0x2A1A)
    }
  },
  methods: {
    stringForCharacteristicValue: function (dataview) {
      var text = ''
      for (var i = 0, l = dataview.byteLength; i < l; i++) {
        text += String.fromCharCode(dataview.getUint8(i))
      }
      return text
    }
  }
}

export default WebBluetoothStoreUtils
