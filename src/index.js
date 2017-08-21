import DeviceActions from './actions/device'
import ServiceActions from './actions/service'
import CharacteristicActions from './actions/characteristic'
//
import DeviceMutatations from './mutations/device'
import ServiceMutations from './mutations/service'
import CharacteristicMutations from './mutations/characteristic'
//
import getters from './getters.js'
import WebBluetoothStoreUtils from './web-bluetooth-store-utils.js'

const state = {
  devices: [],
  services: [],
  characteristics: []
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
