import {expect} from 'chai'
import sinon from 'sinon'
//
import factory from '../../factories'
//
import DeviceMutations from '../../../../src/mutations/device'
import * as MutationTypes from '../../../../src/mutation-types'

describe("DeviceMutations", function() {

  beforeEach(function(done) {
    factory.create('device')
    .then(device => {
      this.sandbox = sinon.sandbox.create()
      this.device = device
      this.state = {devices: [], services: [], characteristics: []}
      done()
    })
  })
  afterEach(function () {
    this.sandbox.restore()
  })

  describe('#DEVICE_ADDED', function() {
    it('changed state', function () {
      let payload = {device: this.device}
      DeviceMutations[MutationTypes.BLE_DEVICE_ADDED](this.state,payload)
      expect(this.state.devices.length).to.equal(1)
    })
  })

  describe.only('#DEVICE_REMOVED', function() {
    it('changed state', function () {
      this.state.devices.push(this.device)
      let payload = {device: this.device}
      DeviceMutations[MutationTypes.BLE_DEVICE_REMOVED](this.state,payload)
      expect(this.state.devices.length).to.equal(0)
    })
  })

  describe('#BLE_DEVICE_UPDATED', function() {
    it('changed state', function () {
      var spliceSpy = this.sandbox.spy(this.state.devices, "splice")
      this.state.devices.push(this.device)
      let payload = {device: this.device}
      DeviceMutations[MutationTypes.BLE_DEVICE_UPDATED](this.state,payload)
      expect(this.state.devices.length).to.equal(1)
      expect(spliceSpy.callCount).to.equal(1)
    })
  })

})
