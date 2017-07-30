import Vue from 'vue'

export default class WebBluetoothStoreCharacteristic {

  constructor (characteristic) {
    Vue.set(this, 'characteristic', characteristic)
    Vue.set(this, 'value', undefined)
  }

  async configure () {
    this.characteristic.addEventListener('characteristicvaluechanged', event => {
      Vue.set(this, 'value', event.target.value)
    })
    if (this.characteristic.properties.read) {
      try {
        await this.characteristic.readValue()
      } catch (error) {
        console.error('Could not read value for ' + this.characteristic.uuid + '  error: ' + error)
      }
    }
    if (this.characteristic.properties.notify || this.characteristic.properties.indicate) {
      try {
        await this.characteristic.startNotifications()
      } catch (error) {
        console.error('Could not start notifications for ' + this.characteristic.uuid + '  error: ' + error)
      }
    }
  }

  async writeValue (dataUInt8Array) {
    try {
      await this.characteristic.writeValue(dataUInt8Array)
      Vue.set(this, 'value', dataUInt8Array)
    } catch (error) {
      console.error('Could not write data for ' + this.characteristic.uuid + '  error: ' + error)
    }
  }
}
