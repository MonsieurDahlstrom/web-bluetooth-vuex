import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const CharacteristicMutatations = {

  [MutationTypes.BLE_CHARACTERISTICS_DISCOVERED] (state, characteristics) {
    characteristics.forEach(el => {
      var characteristicIndex = state.characteristics.findIndex(entry => {
        return entry === el
      })
      if (characteristicIndex < 0) {
        state.characteristics.push(el)
      } else {
        state.characteristics.splice(characteristicIndex,1,el)
      }
    })
  },

  [MutationTypes.BLE_CHARACTERISTIC_CHANGED] (state, characteristic) {
    var characteristicIndex = state.characteristics.findIndex(entry => {
      return entry === characteristic
    })
    if (characteristicIndex < 0) {
      state.characteristics.push(characteristic)
    } else {
      state.characteristics.splice(characteristicIndex,1,characteristic)
    }
  }

}

export default CharacteristicMutatations
