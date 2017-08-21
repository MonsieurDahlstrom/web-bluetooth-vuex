const getters = {
  webBluetoothDevices: (state, getters) =>  {
    return state.devices
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
    return state.characteristics.filter((characteristic) => characteristic.service === service && characteristic.uuid === uuid)
  }
}

export default getters
