const getters = {
  device: (state, getters) => (deviceID) => {
    return state.devices.find(device => device.id === deviceID)
  },
  servicesForDevice: (state, getters) => (deviceID) => {
    return state.services.filter((service) => {
      return service.device.id === deviceID
    })
  },
  serviceForDevice: (state, getters) => (deviceID, uuid) => {
    return state.services.find((service) => service.device.id === deviceID && service.uuid === uuid)
  },
  characteristicsForService: (state, getters) => (service) => {
    return state.characteristics.filter((characteristic) => characteristic.service === service)
  },
  characteristicForService: (state, getters) => (service, uuid) => {
    return state.characteristics.find((characteristic) => characteristic.service === service && characteristic.uuid === uuid)
  }
}

export default getters
