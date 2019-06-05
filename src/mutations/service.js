import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const ServiceMutatations = {

  [MutationTypes.BLE_SERVICE_ADDED] (state, service) {
    var serviceIndex = state.services.indexOf(service)
    if (serviceIndex < 0) {
      state.services.push(service)
    } else {
      state.services.splice(serviceIndex,1,service)
    }
  },

  [MutationTypes.BLE_SERVICE_UPDATED] (state, service) {
    var serviceIndex = state.services.indexOf(service)
    if(serviceIndex < 0) return
    state.services.splice(serviceIndex,1, service)
  },

  [MutationTypes.BLE_SERVICE_REMOVED] (state, service) {
    var serviceIndex = state.services.indexOf(service)
    if(serviceIndex < 0) return
    const characteristics = state.characteristics.filter(characteristic => service === characteristic.service)
    for(const characteristic of characteristics) {
      const characteristicIndex = state.characteristics.indexOf(characteristic)
      state.characteristics.splice(characteristicIndex,1)
    }
    state.services.splice(serviceIndex,1)
  }

}
export default ServiceMutatations
