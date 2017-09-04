import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const DeviceMutatations = {
  [MutationTypes.BLE_DEVICE_ADDED] (state, payload) {
    const deviceIndex = state.devices.indexOf(payload.device)
    if (deviceIndex < 0) {
      state.devices.push(payload.device)
    } else {
      state.devices.splice(deviceIndex,1,payload.device)
    }
  },
  [MutationTypes.BLE_DEVICE_REMOVED] (state, payload) {
    const deviceIndex = state.devices.indexOf(payload.device)
    let services = state.services.filter(service => service.device === payload.device)
    let characteristics = state.characteristics.filter(characteristic => services.includes(characteristic.service))
    for(let characterToDelete of characteristics) {
      let characteristicIndex = state.characteristics.indexOf(characterToDelete)
      state.characteristics.splice(characteristicIndex,1)
    }
    for(let serviceToDelete of services) {
      let serviceIndex = state.services.indexOf(serviceToDelete)
      state.services.splice(serviceIndex,1)
    }
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
