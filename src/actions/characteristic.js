import * as MutationTypes from '../mutation-types'

const CharacteristicActions = {
  async webBluetoothDiscoverCharacteristics({ dispatch, commit }, query) {
    let discoveredCharacteristics = []
    if (query.characteristics === undefined) {
      var characteristics = await query.service.getCharacteristics()
      for (var characteristic of characteristics) {
        await dispatch('webBluetoothConfigureCharacteristic', {characteristic: characteristic})
        discoveredCharacteristics.push(characteristic)
      }
    } else {
      for (let characteristicUUID of query.characteristics) {
        var characteristic = await query.service.getCharacteristic(characteristicUUID)
        await dispatch('webBluetoothConfigureCharacteristic', {characteristic: characteristic})
        discoveredCharacteristics.push(characteristic)
      }
    }
    commit(MutationTypes.BLE_CHARACTERISTICS_DISCOVERED,discoveredCharacteristics)
  },
  async webBluetoothConfigureCharacteristic({ dispatch, commit }, query) {
    let characteristic = query.characteristic
    if(characteristic.properties.read || characteristic.properties.notify || characteristic.properties.indicate) {
      characteristic.addEventListener('characteristicvaluechanged', event => {
        dispatch('webBluetoothUpdateCharacteristic', {characteristic: query.characteristic})
      })
    }
    if (characteristic.properties.read) {
      await characteristic.readValue()
    }
    if (characteristic.properties.notify || characteristic.properties.indicate) {
      await characteristic.startNotifications()
    }
    commit(MutationTypes.BLE_CHARACTERISTIC_CHANGED, characteristic)
  },
  async webBluetoothWriteCharacteristic({ dispatch, commit }, query) {
    try {
      await query.characteristic.writeValue(query.value)
    } catch (e) {
      console.error(e)
    } finally {
      commit(MutationTypes.BLE_CHARACTERISTIC_CHANGED, query.characteristic)
    }
  },
  async webBluetoothUpdateCharacteristic({ dispatch, commit }, query) {
    commit(MutationTypes.BLE_CHARACTERISTIC_CHANGED, query.characteristic)
  }
}

export default CharacteristicActions
