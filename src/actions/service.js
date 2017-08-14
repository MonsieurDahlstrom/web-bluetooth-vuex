import * as MutationTypes from '../mutation-types'

const ServiceActions = {
  async webBluetoothDiscoverServices ({ dispatch, commit }, query) {
    let discoveredServices = []
    if (query.services === undefined) {
      var services = await query.device.gatt.getPrimaryServices()
      for (var service of services) {
        dispatch('webBluetoothDiscoverCharacteristics',{service: service})
        discoveredServices.push(service)
      }
    } else {
      for (let service of query.services) {
        let service = await query.device.gatt.getPrimaryService(service)
        dispatch('webBluetoothDiscoverCharacteristics',{service: service})
        discoveredServices.push(service)
      }
    }
    commit(MutationTypes.BLE_SERVICES_DISCOVERED, {services: discoveredServices})
  }
}

export default ServiceActions
