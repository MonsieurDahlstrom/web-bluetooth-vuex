/*
  Device information service and characteristics
*/
const DeviceInformationService =  {
  uuid: BluetoothUUID.canonicalUUID(0x180A),
  PnpId: {
    uuid: BluetoothUUID.canonicalUUID(0x2A50)
  },
  RegulatoryCertificationDataList: {
    uuid: BluetoothUUID.canonicalUUID(0x2A2A)
  },
  SystemId: {
    uuid: BluetoothUUID.canonicalUUID(0x2A23)
  },
  SoftwareRevision: {
    uuid: BluetoothUUID.canonicalUUID(0x2A28)
  },
  FirmwareRevision: {
    uuid: BluetoothUUID.canonicalUUID(0x2A26)
  },
  HardwareRevision: {
    uuid: BluetoothUUID.canonicalUUID(0x2A27)
  },
  SerialNumber: {
    uuid: BluetoothUUID.canonicalUUID(0x2A25)
  },
  ModelNumber: {
    uuid: BluetoothUUID.canonicalUUID(0x2A24)
  },
  ManufacturerName: {
    uuid: BluetoothUUID.canonicalUUID(0x2A29)
  }
}

/*
  Battery service and characteristics
*/
const BatteryService = {
  uuid: BluetoothUUID.canonicalUUID(0x180F),
  Level: {
    uuid: BluetoothUUID.canonicalUUID(0x2A19)
  },
  LevelState: {
    uuid: BluetoothUUID.canonicalUUID(0x2A1B)
  },
  PowerState: {
    uuid: BluetoothUUID.canonicalUUID(0x2A1A)
  }
}

const WebBluetoothMixin = {
  data() {
    return { deviceInformationService: DeviceInformationService, batteryService: BatteryService }
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

export default WebBluetoothMixin
