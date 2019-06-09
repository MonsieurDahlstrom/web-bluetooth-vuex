import {expect} from 'chai'
import sinon from 'sinon'
//
import factory from '../../support/factories'
//
import DeviceMutations from '../../../src/mutations/device'
import * as MutationTypes from '../../../src/mutation-types'

describe("Mutations device", function() {

  beforeEach( async function() {
    this.sandbox = sinon.createSandbox()
    this.state = {devices: [], services: [], characteristics: []}
    this.device = await factory.create('device',{},{services: [{uuid: 0x180F},{uuid: 0x180A}]});
  })
  afterEach(function () {
    this.sandbox.restore()
  })

  describe('#DEVICE_ADDED', function() {
    it('add device', function () {
      DeviceMutations[MutationTypes.BLE_DEVICE_ADDED](this.state,this.device)
      expect(this.state.devices.length).to.equal(1)
    })
    it('avoids duplicates', function () {
      this.state.devices.push(this.device)
      DeviceMutations[MutationTypes.BLE_DEVICE_ADDED](this.state,this.device)
      expect(this.state.devices.length).to.equal(1)
    })
  })


  describe('#DEVICE_REMOVED', function() {
    it('Removes device', function () {
      this.state.devices.push(this.device)
      DeviceMutations[MutationTypes.BLE_DEVICE_REMOVED](this.state,this.device)
      expect(this.state.devices.length).to.equal(0)
    })
    it('Removes associated services', async function () {
      this.state.devices.push(this.device)
      const services = await this.device.gatt.getPrimaryServices()
      for(const service of services) {
        service.device = this.device
        this.state.services.push(service)
      }
      expect(this.state.services.length).to.equal(2)
      DeviceMutations[MutationTypes.BLE_DEVICE_REMOVED](this.state,this.device)
      expect(this.state.services.length).to.equal(0)
    })
    it('Removes associated characteristics', async function () {
      this.state.devices.push(this.device)
      const services = await this.device.gatt.getPrimaryServices()
      for(const service of services) {
        service.device = this.device
        let characteristic = await factory.create('characteristic')
        characteristic.service = service
        service.characteristics.set(characteristic.uuid, characteristic)
        this.state.services.push(service)
        this.state.characteristics.push(characteristic)
      }
      expect(this.state.characteristics.length).to.equal(2)
      DeviceMutations[MutationTypes.BLE_DEVICE_REMOVED](this.state,this.device)
      expect(this.state.characteristics.length).to.equal(0)
    })
    it('Device not cached in vuex', function () {
      DeviceMutations[MutationTypes.BLE_DEVICE_REMOVED](this.state,this.device)
      expect(this.state.devices.length).to.equal(0)
    })
  })

  describe('#BLE_DEVICE_UPDATED', function() {
    it('updates cached device', function () {
      var spliceSpy = this.sandbox.spy(this.state.devices, "splice")
      this.state.devices.push(this.device)
      DeviceMutations[MutationTypes.BLE_DEVICE_UPDATED](this.state,this.device)
      expect(this.state.devices.length).to.equal(1)
      expect(spliceSpy.callCount).to.equal(1)
    })
    it('skips none cached device', function () {
      var spliceSpy = this.sandbox.spy(this.state.devices, "splice")
      DeviceMutations[MutationTypes.BLE_DEVICE_UPDATED](this.state,this.device)
      expect(this.state.devices.length).to.equal(0)
      expect(spliceSpy.callCount).to.equal(0)
    })
  })

  describe('#BLE_DEVICE_DISCONNECTED', function() {
    it('removes associated services', async function() {
      this.state.devices.push(this.device)
      const services = await this.device.gatt.getPrimaryServices()
      for(const service of services) {
        service.device = this.device
        this.state.services.push(service)
      }
      //
      expect(this.state.services.length).to.equal(2)
      DeviceMutations[MutationTypes.BLE_DEVICE_DISCONNECTED](this.state,this.device)
      expect(this.state.services.length).to.equal(0)
    })
    it('removes associated characteristic', async function() {
      this.state.devices.push(this.device)
      const services = await this.device.gatt.getPrimaryServices()
      for(const service of services) {
        service.device = this.device
        let characteristic = await factory.create('characteristic')
        characteristic.service = service
        service.characteristics.set(characteristic.uuid, characteristic)
        this.state.services.push(service)
        this.state.characteristics.push(characteristic)
      }
      //
      expect(this.state.characteristics.length).to.equal(2)
      DeviceMutations[MutationTypes.BLE_DEVICE_DISCONNECTED](this.state,this.device)
      expect(this.state.characteristics.length).to.equal(0)
    })
  })
  /*
  describe("#BLE_DEVICE_ADVERTISMENT_UPDATED")

  */
})
