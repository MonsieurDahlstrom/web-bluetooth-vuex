import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const CharacteristicMutatations = {
  [MutationTypes.BLE_CHARACTERISTIC_DISCOVERED] (state, payload) {
    state.services.push(payload.service)
    payload.device.services.push(payload.service)
  },
  [MutationTypes.BLE_CHARACTERISTIC_VALUE_CHANGED] (state, payload) {
    state.services.push(payload.service)
    payload.device.services.push(payload.service)
  }
}

export default CharacteristicMutatations
