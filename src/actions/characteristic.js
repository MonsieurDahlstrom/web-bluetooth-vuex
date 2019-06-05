import * as MutationTypes from '../mutation-types'

const CharacteristicActions = {
  /**
    Query May consits of properties
    service mandatory
    characteristics optional
  **/
  async discoverCharacteristics({ dispatch, commit }, query) {
    let discoveredCharacteristics = []
    if (query.characteristics === undefined) {
      var characteristics = await query.service.getCharacteristics()
      for (var characteristic of characteristics) {
        await dispatch('configureCharacteristic', characteristic)
        discoveredCharacteristics.push(characteristic)
      }
    } else {
      for (let characteristicUUID of query.characteristics) {
        var characteristic = await query.service.getCharacteristic(characteristicUUID)
        if(characteristic) {
          await dispatch('configureCharacteristic', characteristic)
          discoveredCharacteristics.push(characteristic)
        }
      }
    }
    if(discoveredCharacteristics.length > 0)
      commit(MutationTypes.BLE_CHARACTERISTICS_DISCOVERED,discoveredCharacteristics)
  },
  async configureCharacteristic({ dispatch, commit }, characteristicToConfigure) {
    // Add an event listener that is triggered when the peripheral writes
    // a new value to this characteristic.
    if(
      characteristicToConfigure.properties.read ||
      characteristicToConfigure.properties.notify ||
      characteristicToConfigure.properties.indicate
    ) {
      characteristicToConfigure.addEventListener('characteristicvaluechanged', event => {
        dispatch('updateCharacteristic', characteristicToConfigure)
      })
    }
    // If allowed to read the characteristic value, trigger an inital data read
    // subsquent reads will be managed through events
    if (characteristicToConfigure.properties.read) {
      await characteristicToConfigure.readValue()
      commit(MutationTypes.BLE_CHARACTERISTIC_CHANGED, characteristicToConfigure)
    }
    // if allowed to subscribe to value change events, subscribe to the events
    // posted by the
    if (characteristicToConfigure.properties.notify || characteristicToConfigure.properties.indicate) {
      await characteristicToConfigure.startNotifications()
    }
  },
  async writeCharacteristic({ dispatch, commit }, query) {
    if(!query.characteristic || !query.value) return
    try {
      await query.characteristic.writeValue(query.value)
      commit(MutationTypes.BLE_CHARACTERISTIC_CHANGED, query.characteristic)
    } catch (e) {
      //console.error(e)
    }
  },
  async updateCharacteristic({ dispatch, commit }, characteristic) {
    commit(MutationTypes.BLE_CHARACTERISTIC_CHANGED, characteristic)
  }
}

export default CharacteristicActions
