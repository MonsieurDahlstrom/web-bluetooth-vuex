const Cannonical128UUIDBase = '0000XXXX-0000-1000-8000-00805f9b34fb'
// DFU by Nordic Semiconductor
const DFU_BASE = '0000xxxx-0000-1000-8000-00805f9b34fb'
export const DFUSecure = DFU_BASE.replace('xxxx', 'fe59')
const DFU_CHAR_BASE = '8ec9xxxx-f315-4f60-9fb8-838830daea50'
// Control Point is notify, write
export const DFUSecureControlPoint = DFU_CHAR_BASE.replace('xxxx', '0001')
// Packet is Write No Response
export const DFUSecurePacket = DFU_CHAR_BASE.replace('xxxx', '0002')

const WebBluetoothStoreUtils = {
  methods: {
    disService: function (device) {
      var DeviceInformationUUID = BluetoothUUID.canonicalUUID(0x180A)
      return this.$store.getters.webBluetoothServicesForDevice(device).find((service) => service.uuid === DeviceInformationUUID)
    },
    dfuService: function (device) {
      return this.$store.getters.webBluetoothServicesForDevice(device).find((service) => service.uuid === DFUSecure)
    },
    valueForCharacteristicUUID: function (service, uuid) {
      var characteristic = this.$store.getters.webBluetoothCharacteristicsForService(service).find((characteristic) => characteristic.uuid === uuid)
      return characteristic.value
    },
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
