import * as MutationTypes from '../mutation-types'

const ServiceActions = {

  async discoverServices ({ dispatch, commit, getters}, query) {
    if (query.uuid) {
      const service = await query.device.gatt.getPrimaryService(query.uuid);
      if (!service) return
      dispatch('discoverCharacteristics',{service: service})
      commit(MutationTypes.BLE_SERVICE_ADDED, service)
    } else {
      const services = await query.device.gatt.getPrimaryServices()
      for (const service of services) {
        dispatch('discoverCharacteristics',{service: service})
        commit(MutationTypes.BLE_SERVICE_ADDED, service)
      }
    }
  },

  async removeService ({ dispatch, commit }, service) {
    if (service) {
      commit(MutationTypes.BLE_SERVICE_REMOVED, service)
    }
  }

}

export default ServiceActions
