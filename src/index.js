import DeviceActions from './actions/device'
import ServiceActions from './actions/service'
import CharacteristicActions from './actions/characteristic'
//
import DeviceMutatations from './mutations/device'
import ServiceMutations from './mutations/service'
import CharacteristicMutations from './mutations/characteristic'

const state = {
  devices: [],
  services: [],
  characteristics: []
}

const getters = {
  webBluetoothDevices: state => state.devices,
  webBluetoothServicesForDevice: (state) => (device, service) => device.getPrimaryService(service),
  webBluetoothServicesForDevice: (state) => (device) => state.services.filter((service) => service.device === device),
  webBluetoothCharacteristicsForService: (state) => (service) => state.characteristics.filter((characteristic) => characteristic.service === service)
}

const actions = Object.assign({}, DeviceActions, ServiceActions, CharacteristicActions)

const mutations = Object.assign({}, DeviceMutatations, ServiceMutations, CharacteristicMutations)

export default {
  state,
  getters,
  actions,
  mutations
}
