import * as MutationTypes from '../mutation-types'

const ServiceActions = {
  async webBluetoothDiscovery ({ dispatch, commit }, query) {
    if (query.services === undefined) {
      await query.device.discoverServices()
    } else {
      for (let service of query.services) {
        await query.device.discoverService(service)
      }
    }
    commit(mutationTypes.BLE_DEVICE_UPDATED, {device: query.device})
  }
}

export default ServiceActions
