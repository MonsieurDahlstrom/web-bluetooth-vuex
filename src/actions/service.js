import * as MutationTypes from '../mutation-types'

const ServiceActions = {

  async webBluetoothDiscoverServices ({ dispatch, commit }, query) {
    let discoveredServices = []
    var services = await query.device.gatt.getPrimaryServices()
    for (var service of services) {
      dispatch('webBluetoothDiscoverCharacteristics',{service: service})
      commit(MutationTypes.BLE_SERVICE_ADDED, service)
    }
  },

  async webBluetoothDiscoverService ({ dispatch, commit }, query) {
    let service = await query.device.gatt.getPrimaryService(query.serviceUUID)
    if (service) {
      dispatch('webBluetoothDiscoverCharacteristics',{service: service})
      commit(MutationTypes.BLE_SERVICE_ADDED, service)
    }
  },

  async webBluetoothRemoveService ({ dispatch, commit }, service) {
    if (service) {
      if (service.GattServiceAddedCallback) {

      }
      if (service.GattServiceChangedCallback) {

      }
      if (service.GattServiceRemovedCallback) {

      }
      dispatch('webBluetoothRemoveCharacteristics',{service: service})
      commit(MutationTypes.BLE_SERVICE_REMOVED, service)
    }
  }

}

export default ServiceActions
