import WebBluetoothStoreUtils from './web-bluetooth-store-utils'

const getters = {
  webBluetoothDevices: (state, getters) =>  {
    return state.devices
  },
  webBluetoothDevice: (state, getters) => (deviceAddress) => {
    return state.devices.find(device => device.id === deviceAddress)
  },
  webBluetoothServicesForDevice: (state, getters) => (device) => {
    return state.services.filter((service) => {
      return service.device === device
    })
  },
  webBluetoothServiceForDevice: (state, getters) => (device, uuid) => {
    return state.services.find((service) => service.device === device && service.uuid === uuid)
  },
  webBluetoothCharacteristicsForService: (state, getters) => (service) => {
    return state.characteristics.filter((characteristic) => characteristic.service === service)
  },
  webBluetoothCharacteristicForService: (state, getters) => (service, uuid) => {
    return state.characteristics.find((characteristic) => characteristic.service === service && characteristic.uuid === uuid)
  }
}

export default getters