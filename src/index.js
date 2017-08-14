import DeviceActions from './actions/device'
import ServiceActions from './actions/service'
import CharacteristicActions from './actions/characteristic'
//
import DeviceMutatations from './mutations/device'
import ServiceMutations from './mutations/service'
import CharacteristicMutations from './mutations/characteristic'
import WebBluetoothStoreUtils from './web-bluetooth-store-utils.js'

const state = {
  devices: [],
  services: [],
  characteristics: []
}

const getters = {
  webBluetoothDevices: state => state.devices,
  webBluetoothServicesForDevice: (state) => (device) => state.services.filter((service) => service.device === device),
  webBluetoothServiceForDevice: (state) => (device, uuid) => state.services.filter((service) => service.device === device && service.uuid === uid),
  webBluetoothCharacteristicsForService: (state) => (service) => state.characteristics.filter((characteristic) => characteristic.service === service),
  webBluetoothCharacteristicForService: (state) => (service,uuid) => state.characteristics.filter((characteristic) => characteristic.service === service && characteristic.uuid === uuid)
}

const actions = Object.assign({}, DeviceActions, ServiceActions, CharacteristicActions)

const mutations = Object.assign({}, DeviceMutatations, ServiceMutations, CharacteristicMutations)

const VuexBluetoothLEModule = {
  state,
  getters,
  actions,
  mutations
}

module.exports.VueBluetoothLEMixin = WebBluetoothStoreUtils
module.exports.VuexBluetoothLEModule = VuexBluetoothLEModule
export default VuexBluetoothLEModule
