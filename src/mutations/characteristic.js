import Vue from 'vue'
import * as MutationTypes from '../mutation-types'

const CharacteristicMutatations = {

  [MutationTypes.BLE_CHARACTERISTICS_DISCOVERED] (state, characteristics) {
    for (var newCharacteristic of characteristics) {
      var characteristicIndex = state.characteristics.indexOf(newCharacteristic)
      if (characteristicIndex < 0) {
        state.characteristics.push(newCharacteristic)
      } else {
        state.characteristics.splice(characteristicIndex,1,newCharacteristic)
      }
    }
  },

  [MutationTypes.BLE_CHARACTERISTIC_CHANGED] (state, characteristic) {
    var characteristicIndex = state.characteristics.indexOf(characteristic)
    if (characteristicIndex < 0) {
      state.characteristics.push(characteristic)
    } else {
      state.characteristics.splice(characteristicIndex,1,characteristic)
    }
  }

}

export default CharacteristicMutatations
