import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const ServiceMutatations = {

  [MutationTypes.BLE_SERVICES_DISCOVERED] (state, payload) {
    console.log('BLE_SERVICES_DISCOVERED')
    for(var service of payload.services) {
      var serviceIndex = state.services.indexOf(service)
      if (serviceIndex < 0) {
        state.services.push(service)
      } else {
        state.services.splice(serviceIndex,1,service)
      }
    }
  },

  [MutationTypes.BLE_SERVICE_CHANGED] (state, payload) {
    console.log('BLE_SERVICE_CHANGED')
    var serviceIndex = state.services.indexOf(payload.service)
    if (serviceIndex < 0) {
      state.services.push(payload.service)
    } else {
      state.services.splice(serviceIndex,1,payload.service)
    }
  }

}
export default ServiceMutatations
