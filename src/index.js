import DeviceActions from './actions/device'
import ServiceActions from './actions/service'
import CharacteristicActions from './actions/characteristic'
//
import DeviceMutatations from './mutations/device'
import ServiceMutations from './mutations/service'
import CharacteristicMutations from './mutations/characteristic'
//
import Getters from './getters.js'
import VueBluetoothLEMixin from './web-bluetooth-store-utils.js'




const WebBluetoothState = {
  devices: [],
  services: [],
  characteristics: []
}

const Actions = Object.assign({}, DeviceActions, ServiceActions, CharacteristicActions)

const Mutations = Object.assign({}, DeviceMutatations, ServiceMutations, CharacteristicMutations)

const VuexModule = {
  state: WebBluetoothState,
  mutations: Mutations,
  actions: Actions,
  getters: Getters,
  namespaced: true
}

export { VueBluetoothLEMixin as VueBluetoothLEMixin, VuexModule as VuexBluetoothLEModule }
export default VuexModule
