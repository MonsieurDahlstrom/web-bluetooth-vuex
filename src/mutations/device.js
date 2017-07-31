import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const DeviceMutatations = {
  [MutationTypes.BLE_DEVICE_ADDED] (state, payload) {
    const deviceIndex = state.devices.indexOf(payload.device)
    if (deviceIndex < 0) {
      state.devices.push(payload.device)
    } else {
      state.splice(deviceIndex,1,payload.device)
    }
  },
  [MutationTypes.BLE_DEVICE_REMOVED] (state, payload) {
    const deviceIndex = state.devices.indexOf(payload.device)
    state.devices.splice(deviceIndex, 1)
  },
  [MutationTypes.BLE_DEVICE_UPDATED] (state, payload) {
    const deviceIndex = state.devices.indexOf(payload.device)
    if (deviceIndex < 0) {
      state.devices.push(payload.device)
    } else {
      state.devices.splice(deviceIndex,1,payload.device)
    }
  }
}

export default DeviceMutatations
