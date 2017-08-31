import * as mutationTypes from '../mutation-types'

const DeviceActions = {

  /*
    action launches the bluetooth native dialog to find devices in the proxmity
    the query can contain the following keys:
      * name
      * namePrefix
      * services - Setting services without a name or namePrefix will not return any results
      * optionalServices
  */
  async webBluetoothAddDevice ({ dispatch, commit }, query) {
    var requestParameters = { }
    // Was a device name set for the character
    if(query.name || query.namePrefix) {
      var filters = []
      if (query.name) {
        filters.push({name: query.name})
      }
      if (query.namePrefix) {
        filters.push({namePrefix: query.namePrefix})
      }
      requestParameters.filters = filters
      requestParameters.optionalServices = query.services
    } else{
      requestParameters['acceptAllDevices'] = true
      requestParameters.optionalServices = query.services
    }
    // Does the query specify a collection of optional services to look for
    if (query.optionalServices !== undefined) {
      requestParameters['optionalServices'] = query.optionalServices.map(service => service.uuid)
    }
    // Perform Query
    let device = await navigator.bluetooth.requestDevice(requestParameters)
    if (device) {
      commit(mutationTypes.BLE_DEVICE_ADDED, {device: device})
    }
  },

  async webBluetoothWatchAdvertisments ({ dispatch, commit }, query) {
    if (query.device.gatt.connected) {
      //Add listener for RSSI
      query.device.GattAdvertismentCallback = function (event) {
        dispatch('webBluetoothDeviceAdvertisment', {advertisment: event})
      }
      query.device.addEventListener('advertisementreceived', query.device.GattAdvertismentCallback)
      await query.device.watchAdvertisements()
      commit(mutationTypes.BLE_DEVICE_UPDATED, {device: query.device})
    }
  },

  async webBluetoothRemoveDevice ({ dispatch, commit }, query) {
    if (query.device.gatt.connected) {
      query.device.removeEventListener('gattserverdisconnected', query.device.GattDisconnectionCallback)
      query.device.removeEventListener('advertisementreceived', query.device.GattAdvertismentCallback)
      await query.device.gatt.disconnect()
    }
    commit(mutationTypes.BLE_DEVICE_REMOVED, {device: query.device})
  },

  async webBluetoothConnectDevice ({ dispatch, commit }, payload) {
    if (!payload.device.gatt.connected) {
      await payload.device.gatt.connect()
      payload.device.GattDisconnectionCallback = function(event) {
        dispatch('webBluetoothDisconnectDevice', {device: event.currentTarget})
      }
      payload.device.addEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback)
      commit(mutationTypes.BLE_DEVICE_UPDATED, {device: payload.device})
    }
  },

  async webBluetoothDisconnectDevice ({ dispatch, commit }, payload) {
    if (payload.device.gatt.connected) {
      payload.device.removeEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback)
      payload.device.removeEventListener('advertisementreceived', payload.device.GattAdvertismentCallback)
      await payload.device.gatt.disconnect()
      commit(mutationTypes.BLE_DEVICE_UPDATED, {device: payload.device})
    }
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
