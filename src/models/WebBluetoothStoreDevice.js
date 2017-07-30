import Vue from 'vue'
import WebBluetoothStoreService from './WebBluetoothStoreService'
import WebBluetoothStoreUtils from './WebBluetoothStoreUtils'

export default class WebBluetoothStoreDevice {

  constructor (bluetoothDevice) {
    Vue.set(this, 'device', bluetoothDevice)
    Vue.set(this, 'gatt', bluetoothDevice.gatt)
    Vue.set(this, 'connected', false)
    Vue.set(this, 'name', bluetoothDevice.name)
    Vue.set(this, 'id', bluetoothDevice.id)
  }

  async connect () {
    await this.gatt.connect()
    Vue.set(this, 'connected', true)
    await this.discoverServices()
  }

  async discoverService (metadata) {
    try {
      var service = await this.gatt.getPrimaryService(metadata.uuid)
      var webBluetoothService = new WebBluetoothStoreService(service)
      if (metadata.characteristics && metadata.characteristics.length > 0) {
        for (let characteristicUUID of metadata.characteristics) {
          await webBluetoothService.discoverCharacteristic(characteristicUUID)
        }
      } else {
        await webBluetoothService.discoverCharacteristics()
      }
      Vue.set(this, metadata.uuid, webBluetoothService)
    } catch (error) {
      console.error('Could not retrive characteristic ' + metadata.uuid + ' because: ' + error)
    }
  }

  async discoverServices () {
    // Retrive the intended collection of services
    var serviceCollection = await this.gatt.getPrimaryServices()
    // Setup the discovered services
    for (let bleservice of serviceCollection) {
      var webBluetoothService = new WebBluetoothStoreService(bleservice)
      await webBluetoothService.discoverCharacteristics()
      Vue.set(this, bleservice.uuid, webBluetoothService)
    }
  }

  serviceFor16bit (UUID16) {
    return this[WebBluetoothStoreUtils.cannonicalUUIDFor16bitUUID(UUID16)]
  }

  handleError (context, error) {
    console.error('Prototype: ' + context + ' ' + error)
  }

}
