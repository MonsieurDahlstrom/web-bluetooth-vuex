import DeviceMutations from '../../src/mutations/device'
import * as MutationTypes from '../../src/mutation-types'

describe("DeviceMutations", function() {

  let device
  let state
  beforeEach(function() {
    device = {connected: false}
    state = {devices: [], services: [], characteristics: []}
  })

  describe('#DEVICE_ADDED', function() {
    it('changed state', function () {
      let payload = {device: device}
      DeviceMutations[MutationTypes.BLE_DEVICE_ADDED](state,payload)
      expect(state.devices.length).toBe(1)
    })
  })

  describe('#DEVICE_REMOVED', function() {
    it('changed state', function () {
      let payload = {device: device}
      state.devices.push(device)
      DeviceMutations[MutationTypes.BLE_DEVICE_REMOVED](state,payload)
      expect(state.devices.length).toBe(0)
    })
  })

  describe('#DEVICE_CONNECTED', function() {
    let device
    let state = {}
    beforeEach(function() {
      device = {connected: false}
    })
    it('changed state', function () {
      let payload = {device: device}
      DeviceMutations[MutationTypes.BLE_DEVICE_CONNECTED](state,payload)
      expect(device.connected).toBe(true)
    })
  })

  describe('#DEVICE_DISCONNECTED', function() {
    let device
    let state = {}
    beforeEach(function() {
      device = {connected: true}
    })
    it('changed state', function () {
      let payload = {device: device}
      DeviceMutations[MutationTypes.BLE_DEVICE_DISCONNECTED](state,payload)
      expect(device.connected).toBe(false)
    })
  })

})
