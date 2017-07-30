import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const ServiceMutatations = {
  [MutationTypes.BLE_SERVICE_DISCOVERED] (state, payload) {
    state.services.push(payload.service)
    payload.device.services.push(payload.service)
  }
}
export default ServiceMutatations
