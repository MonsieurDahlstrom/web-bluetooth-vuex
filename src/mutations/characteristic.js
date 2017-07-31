import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const CharacteristicMutatations = {

  [MutationTypes.BLE_CHARACTERISTICS_DISCOVERED] (state, payload) {
    console.log('BLE_CHARACTERISTICS_DISCOVERED')
    for (var characteristic of payload.characteristics) {
      var characteristicIndex = state.characteristics.indexOf(characteristic)
      if (characteristicIndex < 0) {
        state.characteristics.push(characteristic)
      } else {
        state.characteristics.splice(characteristicIndex,1,characteristic)
      }
    }
  },

  [MutationTypes.BLE_CHARACTERISTIC_CHANGED] (state, payload) {
    console.log('BLE_CHARACTERISTIC_CHANGED')
    var characteristicIndex = state.characteristics.indexOf(payload.characteristic)
    if (characteristicIndex < 0) {
      state.characteristics.push(payload.characteristic)
    } else {
      state.characteristics.splice(characteristicIndex,1,payload.characteristic)
    }
  }

}

export default CharacteristicMutatations
