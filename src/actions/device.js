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
  async addDevice ({ dispatch, commit }, query) {
    var requestParameters = { }
    // Was a device name set for the character
    if(query.name || query.namePrefix || query.anyDevices) {
      var filters = []
      if (query.name) {
        filters.push({name: query.name})
      }
      if (query.namePrefix) {
        filters.push({namePrefix: query.namePrefix})
      }
      if (query.anyDevices) {
        requestParameters['acceptAllDevices'] = true
      }
      if(filters.length > 0)
        requestParameters.filters = filters
      requestParameters.optionalServices = query.services
    } else {
      requestParameters.filters = [{ services: query.services }]
    }
    // Perform Query
    let device = await navigator.bluetooth.requestDevice(requestParameters)
    if (device) {
      commit(mutationTypes.BLE_DEVICE_ADDED, device)
    }
  },

  async removeDevice ({dispatch, commit}, query) {
    if (query.device.gatt.connected) {
      query.device.removeEventListener('gattserverdisconnected', query.device.GattDisconnectionCallback)
      query.device.removeEventListener('advertisementreceived', query.device.GattAdvertismentCallback)
      await query.device.gatt.disconnect()
    }
    commit(mutationTypes.BLE_DEVICE_REMOVED, query.device)
  },

  async connectDevice ({ dispatch, commit }, payload) {
    if (!payload.device.gatt.connected) {
      await payload.device.gatt.connect()
      payload.device.GattDisconnectionCallback = (event) => {
        payload.device.removeEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback)
        payload.device.removeEventListener('advertisementreceived', payload.device.GattAdvertismentCallback)
        commit(mutationTypes.BLE_DEVICE_DISCONNECTED, payload.device)
        commit(mutationTypes.BLE_DEVICE_UPDATED, payload.device)
      }
      payload.device.addEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback)
    }
    commit(mutationTypes.BLE_DEVICE_UPDATED, payload.device)
  },

  async disconnectDevice ({ dispatch, commit }, payload) {
    if (payload.device.gatt.connected) {
      payload.device.removeEventListener('gattserverdisconnected', payload.device.GattDisconnectionCallback)
      payload.device.removeEventListener('advertisementreceived', payload.device.GattAdvertismentCallback)
      await payload.device.gatt.disconnect()
      commit(mutationTypes.BLE_DEVICE_DISCONNECTED, payload.device)
    }
    commit(mutationTypes.BLE_DEVICE_UPDATED, payload.device)
  }

  /**
  async watchAdvertisments ({ dispatch, commit }, query) {
    if (query.device.gatt.connected) {
      //Add listener for RSSI
      query.device.GattAdvertismentCallback = (event) => {
        commit(mutationTypes.BLE_DEVICE_ADVERTISMENT_UPDATED, {device: payload.device})
        dispatch('webBluetoothDeviceAdvertisment', {advertisment: event})
      }
      query.device.addEventListener('advertisementreceived', query.device.GattAdvertismentCallback)
      await query.device.watchAdvertisements()
      commit(mutationTypes.BLE_DEVICE_UPDATED, {device: query.device})
    }
  },
  **/
}

export default DeviceActions
