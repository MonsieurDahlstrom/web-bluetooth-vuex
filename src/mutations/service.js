import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const ServiceMutatations = {

  [MutationTypes.BLE_SERVICE_ADDED] (state, service) {
    if (service) {
      var serviceIndex = state.services.indexOf(service)
      if (serviceIndex < 0) {
        state.services.push(service)
      } else {
        state.services.splice(serviceIndex,1,service)
      }
    }
  },

  [MutationTypes.BLE_SERVICE_CHANGED] (state, service) {
    if (service) {
      var serviceIndex = state.services.indexOf(service)
      if (serviceIndex) {
        state.services.splice(serviceIndex,1, service)
      }
    }
  },

  [MutationTypes.BLE_SERVICE_REMOVED] (state, service) {
    if (service) {
      var serviceIndex = state.services.indexOf(service)
      if (service) {
        state.services.splice(serviceIndex,1)
      }
    }
  }

}
export default ServiceMutatations
