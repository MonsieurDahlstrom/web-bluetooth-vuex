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
    let characteristics = state.characteristics.filter(characteristic => services.include(characteristic.service))
    for(characteristic of characteristics) {
      let characteristicIndex = state.characteristics.indexOf(characteristic)
      state.characteristics.splice(characteristicIndex,1)
    }
    for(service of services) {
      let serviceIndex = state.services.indexOf(service)
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
