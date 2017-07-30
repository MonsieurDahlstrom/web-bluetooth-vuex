import * as DeviceActions from './actions/device'
import * as ServiceActions from './actions/service'
//
import DeviceMutatations from './mutations/device'
var ServiceMutations = {}
var CharacteristicMutations = {}

const state = {
  devices: [],
  services: [],
  characteristics: []
}

const getters = {
  webBluetoothDevices: state => state.devices,
  webBluetoothServices: state => state.services,
  webBluetoothCharacteristics: state => state.characteristics
}

const actions = Object.assign({}, DeviceActions, ServiceActions)

const mutations = Object.assign({}, DeviceMutatations, ServiceMutations, CharacteristicMutations)

export default {
  state,
  getters,
  actions,
  mutations
}
