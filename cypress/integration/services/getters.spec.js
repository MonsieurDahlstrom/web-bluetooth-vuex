import "@babel/polyfill"

import Vue from "vue"
import Vuex from "vuex"
import WebBluetoothModule from '../../../src'

Vue.use(Vuex)

import {expect} from 'chai'
import sinon from 'sinon'
//
import factory from '../../support/factories'

describe("Getters services", () => {

  beforeEach( async function() {
    this.store = new Vuex.Store({state: {}, modules: {webBluetooth: WebBluetoothModule}})
    this.device = await factory.create('device',{},{services: [{uuid: 0x180F},{uuid: 0x180A}]});
  })
  afterEach( function () {
    this.store = undefined
    this.device = undefined
  })

  describe("#servicesForDevice(deviceID)", function () {
    it('Exists', function() { expect(this.store.getters['webBluetooth/servicesForDevice']).to.exist})
    it("stored services", async function () {
      let services = await this.device.gatt.getPrimaryServices()
      for(const service of services)
        this.store.state.webBluetooth.services.push(service);
      this.store.state.webBluetooth.devices.push(this.device)
      let result = this.store.getters['webBluetooth/servicesForDevice'](this.device.id)
      expect(result.length).to.equal(2)
    })
    it("no stored services", function() {
      this.store.state.webBluetooth.devices.push(this.device)
      let result = this.store.getters['webBluetooth/servicesForDevice'](this.device.id)
      expect(result.length).to.equal(0)
    })
    it("device id not stored", function() {
      let result = this.store.getters['webBluetooth/servicesForDevice'](this.device.id)
      expect(result.length).to.equal(0)
    })
  })

  describe("#serviceForDevice(deviceID,uuid)", function () {
    it('Exists', function() { expect(this.store.getters['webBluetooth/serviceForDevice']).to.exist})
    it("device not stored", async function() {
      let services = await this.device.gatt.getPrimaryServices()
      let result = this.store.getters['webBluetooth/serviceForDevice'](this.device.id,services[0].uuid)
      expect(result).to.be.undefined
    })
    it("no stored services", async function() {
      let services = await this.device.gatt.getPrimaryServices()
      this.store.state.webBluetooth.devices.push(this.device)
      let result = this.store.getters['webBluetooth/serviceForDevice'](this.device.id,services[0].uuid)
      expect(result).to.be.undefined
    })
    it("stored services", async function () {
      let services = await this.device.gatt.getPrimaryServices()
      services[0].device = this.device
      this.store.state.webBluetooth.services.push(services[0])
      this.store.state.webBluetooth.devices.push(this.device)
      let result = this.store.getters['webBluetooth/serviceForDevice'](this.device.id,services[0].uuid)
      expect(result).to.deep.equal(services[0])
    })

  })

})
