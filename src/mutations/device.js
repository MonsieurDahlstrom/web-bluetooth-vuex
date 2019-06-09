import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const DeviceMutatations = {
  [MutationTypes.BLE_DEVICE_ADDED] (state, device) {
    const storedDevice = state.devices.find(storedDevice => storedDevice.id === device.id)
    const storedDeviceIndex = state.devices.indexOf(storedDevice)
    if (storedDeviceIndex < 0)
      state.devices.push(device)
    else
      Vue.set(state.devices, storedDeviceIndex, device)
  },
  [MutationTypes.BLE_DEVICE_REMOVED] (state, device) {
    // determine if vuex has cached device, otherwise return
    const storedDevice = state.devices.find(storedDevice => storedDevice.id === device.id)
    const storedDeviceIndex = state.devices.indexOf(storedDevice)
    if(storedDeviceIndex < 0)return
    // find vuex cached services for the device
    const services = state.services.filter(service => service.device.id === device.id)
    // find characteristics for vuex
    const characteristics = state.characteristics.filter(characteristic => services.includes(characteristic.service))
    // remove characteristics
    for(const characterToDelete of characteristics) {
      const characteristicIndex = state.characteristics.indexOf(characterToDelete)
      state.characteristics.splice(characteristicIndex,1)
    }
    // remove services
    for(const serviceToDelete of services) {
      const serviceIndex = state.services.indexOf(serviceToDelete)
      state.services.splice(serviceIndex,1)
    }
    // remove device
    state.devices.splice(storedDeviceIndex, 1)
  },
  [MutationTypes.BLE_DEVICE_UPDATED] (state, device) {
    // determine if vuex has cached device, otherwise return
    const storedDevice = state.devices.find(storedDevice => storedDevice.id === device.id)
    const storedDeviceIndex = state.devices.indexOf(storedDevice)
    if(storedDeviceIndex < 0)return
    Vue.set(state.devices, storedDeviceIndex, device)
  },
  [MutationTypes.BLE_DEVICE_DISCONNECTED] (state, device) {
    // find vuex cached services for the device
    const services = state.services.filter(service => service.device.id === device.id)
    // find characteristics for vuex
    const characteristics = state.characteristics.filter(characteristic => services.includes(characteristic.service))
    // remove characteristics
    for(const characterToDelete of characteristics) {
      const characteristicIndex = state.characteristics.indexOf(characterToDelete)
      state.characteristics.splice(characteristicIndex,1)
    }
    // remove services
    for(const serviceToDelete of services) {
      const serviceIndex = state.services.indexOf(serviceToDelete)
      state.services.splice(serviceIndex,1)
    }
    const storedDeviceIndex = state.devices.indexOf(device)
    Vue.set(state.devices, storedDeviceIndex, device)
  }
}

export default DeviceMutatations
