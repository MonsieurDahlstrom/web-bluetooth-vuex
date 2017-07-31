import * as MutationTypes from '../mutation-types'

const CharacteristicActions = {
  async webBluetoothDiscoverCharacteristics({ dispatch, commit }, query) {
    console.log('webBluetoothDiscoverCharacteristics')
    let discoveredCharacteristics = []
    if (query.characteristics === undefined) {
      var characteristics = await query.service.getCharacteristics()
      for (var characteristic of characteristics) {
        dispatch('webBluetoothConfigureCharacteristic', {characteristic: characteristic})
        discoveredCharacteristics.push(characteristic)
      }
    } else {
      for (let characteristicUUID of query.characteristics) {
        var characteristic = await query.service.getCharacteristic(characteristicUUID)
        dispatch('webBluetoothConfigureCharacteristic', {characteristic: characteristic})
        discoveredCharacteristics.push(characteristic)
      }
    }
    commit(MutationTypes.BLE_CHARACTERISTICS_DISCOVERED, {characteristics: discoveredCharacteristics})
  },
  async webBluetoothConfigureCharacteristic({ dispatch, commit }, query) {
    console.log('webBluetoothConfigureCharacteristic')
    let characteristic = query.characteristic
    if(characteristic.properties.read || characteristic.properties.notify || characteristic.properties.indicate) {
      characteristic.addEventListener('characteristicvaluechanged', event => {
        dispatch('webBluetoothUpdateCharacteristic', {characteristic: characteristic, value: event.target.value})
      })
    }
    if (characteristic.properties.read) {
      await characteristic.readValue()
    }
    if (characteristic.properties.notify || characteristic.properties.indicate) {
      await characteristic.startNotifications()
    }
    commit(MutationTypes.BLE_CHARACTERISTIC_CHANGED, {characteristic: characteristic})
  },
  async webBluetoothWriteCharacteristic({ dispatch, commit }, query) {
  },
  async webBluetoothUpdateCharacteristic({ dispatch, commit }, query) {
  },
}

export default CharacteristicActions
