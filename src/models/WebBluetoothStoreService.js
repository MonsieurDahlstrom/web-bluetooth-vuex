import Vue from 'vue'
import WebBluetoothStoreCharacteristic from './WebBluetoothStoreCharacteristic'
import WebBluetoothStoreUtils from './WebBluetoothStoreUtils'

export default class WebBluetoothStoreService {
  /*
    service should be a BluetoothRemoteGATTService instance
  */
  constructor (service) {
    Vue.set(this, 'service', service)
  }

  async discoverCharacteristic (uuid) {
    try {
      var characteristic = await this.service.getCharacteristic(uuid)
      await this.initaliseCharacteristic(characteristic)
    } catch (error) {
      console.error('Could not retrive characteristic ' + uuid + ' because: ' + error)
    }
  }

  async discoverCharacteristics (characteristicsToDiscover = undefined) {
    var characteristicCollection = await this.service.getCharacteristics()
    for (let characteristic of characteristicCollection) {
      await this.initaliseCharacteristic(characteristic)
    }
  }

  async initaliseCharacteristic (characteristic) {
    var webBluetoothStoreCharacteristic = new WebBluetoothStoreCharacteristic(characteristic)
    await webBluetoothStoreCharacteristic.configure()
    Vue.set(this, characteristic.uuid, webBluetoothStoreCharacteristic)
  }

  characteristicFor16bit (UUID16) {
    return this[WebBluetoothStoreUtils.cannonicalUUIDFor16bitUUID(UUID16)]
  }

}
