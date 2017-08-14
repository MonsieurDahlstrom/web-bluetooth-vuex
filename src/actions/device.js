import * as mutationTypes from '../mutation-types'

const DeviceActions = {

  /*
  TODO: Change the implemntation to cover all the filter options:
  {services: ['heart_rate']},
  {services: [0x1802, 0x1803]},
  {services: ['c48e6067-5295-48d3-8d5c-0395f61792b1']},
  {name: 'ExampleName'},
  {namePrefix: 'Prefix'}
  */
  async webBluetoothDiscoverDevice ({ dispatch, commit }, query) {
    var requestParameters = { }
    // Was a device name set for the character
    if (query.name !== undefined) {
      requestParameters['filters'] = [{name: query.name}]
    } else {
      requestParameters['acceptAllDevices'] = true
    }
    // Does the query specify a collection of services to look for
    if (query.services !== undefined) {
      requestParameters['optionalServices'] = query.services.map(service => service.uuid)
    }
    // Perform Query
    let device = await navigator.bluetooth.requestDevice(requestParameters)
    //Add listener for RSSI
    device.GattAdvertismentCallback = function (event) {
      dispatch('webBluetoothDeviceAdvertisment', {advertisment: event})
    }
    device.addEventListener('advertisementreceived', device.GattAdvertismentCallback)
    commit(mutationTypes.BLE_DEVICE_ADDED, {device: device})
  },

  async webBluetoothConnectDevice ({ dispatch, commit }, payload) {
    await payload.device.gatt.connect()
    payload.device.GattDisconnectionCallback = function(event) {
      dispatch('webBluetoothDisconnectDevice', {device: event.currentTarget})
    }
    payload.device.addEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback)
    commit(mutationTypes.BLE_DEVICE_UPDATED, {device: payload.device})
  },

  async webBluetoothDisconnectDevice ({ dispatch, commit }, payload) {
    if (payload.device.gatt.connected) {
      payload.device.removeEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback)
      payload.device.removeEventListener('advertisementreceived', payload.device.GattAdvertismentCallback)
      await payload.device.gatt.disconnect()
    }
    commit(mutationTypes.BLE_DEVICE_UPDATED, {device: payload.device})
  }
}

export default DeviceActions

/*
function anyNamedDevice () {
  // This is the closest we can get for now to get all devices.
  // https://github.com/WebBluetoothCG/web-bluetooth/issues/234
  return Array.from('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    .map(c => ({namePrefix: c}))
    .concat({name: ''})
}
*/

/*
discoverServicesForDevice ({ dispatch, commit }, bluetoothGatt) {
  return bluetoothGatt.getPrimaryServices()
  .then(services => {
    return Promise.mapSeries(services, function (service, index, length) {
      return dispatch('discoverCharacteristicsForService', service)
      .then(_ => {
        commit(mutationTypes.BLE_SERVICE_ADDED, {service: service})
      })
    })
  })
  .catch(err => console.error(err))
},
discoverCharacteristicsForService ({ dispatch, commit }, bluetoothService) {
  return bluetoothService.getCharacteristics()
  .then(characteristics => {
    return Promise.mapSeries(characteristics, function (characteristic, index, length) {
      return dispatch('configureCharacteristic', characteristic)
      .then(_ => {
        commit(mutationTypes.BLE_CHARACTERISTIC_ADDED, {characteristic: characteristic})
      })
    })
    .then(_ => { console.log('characteristics configured') })
  })
  .catch(err => console.error(err))
},
configureCharacteristic ({ dispatch, commit }, bluetoothCharacteristic) {
  return DiscoveryPromises.promiseForConfigurationOfCharacteristic(bluetoothCharacteristic)
  .catch(err => console.error(err))
},
*/
/*
function filterByUUID (objectsWithUUID) {
  var foundServices = []
  return objectsWithUUID.filter(item => {
    if (foundServices.includes(item.uuid)) {
      return false
    } else {
      foundServices.push(item.uuid)
      return true
    }
  })
}

// const BatteryCharacteristicUUID = '00002a1b-0000-1000-8000-00805f9b34fb'
// const BatteryServiceUUID = '0000180f-0000-1000-8000-00805f9b34fb'
const ColourPickerServiceUUID = '47CA46C0-848E-11E6-BDF4-0800200C9A66'.toLowerCase()
const ColourPickerCharacteristicUUID = 'AA9AB6CA-AF3F-45B2-8932-A5043412A2FA'.toLowerCase()

class CharacteristicListener {
  constructor () {
    this.characteristics = []
  }

  addCharacteristic (characteristic) {
    if (!this.characteristics.includes(characteristic)) {
      this.characteristics.push(characteristic)
      console.log(characteristic.addEventListener('characteristicvaluechanged', this.onCharacteristicEvent))
    }
    console.log(this.characteristics)
  }

  onCharacteristicEvent (ev) {
    const dataView = ev.target.value
    let data = []
    for (let i = 0; i < dataView.byteLength; i++) {
      data.push(dataView.getUint8(i))
    }
    console.log('CharacteristicListener onCharacteristicEvent')
    console.log('CharacteristicListener Characteristic: ' + ev.target.uuid + ' ' + data)
    console.log('CharacteristicListener characteristicvaluechanged: ' + ev.target.characteristicValueChanged)
  }

}

const characteristicListener = new CharacteristicListener()

*/
