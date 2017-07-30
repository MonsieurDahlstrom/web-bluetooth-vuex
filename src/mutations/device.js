import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const DeviceMutatations = {
  [MutationTypes.BLE_DEVICE_ADDED] (state, payload) {
    state.devices.push(payload.device)
  },
  [MutationTypes.BLE_DEVICE_REMOVED] (state, payload) {
    const deviceIndex = state.devices.indexOf(payload.device)
    state.devices.splice(deviceIndex, 1)
  },
  [MutationTypes.BLE_DEVICE_CONNECTED] (state, payload) {
    Vue.set(payload.device,'connected',true)
  },
  [MutationTypes.BLE_DEVICE_DISCONNECTED] (state, payload) {
    Vue.set(payload.device,'connected',false)
  }
}

export default DeviceMutatations
