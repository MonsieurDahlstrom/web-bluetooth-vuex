import Vue from "vue"
import Vuex from "vuex"
import WebBluetoothModule from '../../../src'

Vue.use(Vuex)

import {expect} from 'chai'
import sinon from 'sinon'
//
import factory from '../../support/factories'

describe("Getters characteristics", () => {

  beforeEach( async function() {
    this.sandbox = sinon.createSandbox()
    this.store = new Vuex.Store({state: {}, modules: {webBluetooth: WebBluetoothModule}})
    this.service = await factory.create('service',{},{characteristics: [{uuid: 0x2A19},{uuid: 0x2A1B}]});
  })

  describe("#characteristicsForService(service)", function() {
    it('Exists', function() { expect(this.store.getters['webBluetooth/characteristicsForService']).to.exist})
    it('Returns discovered characteristics', async function() {
      let characteristics = await this.service.getCharacteristics()
      for(const characteristic of characteristics)
        this.store.state.webBluetooth.characteristics.push(characteristic);
      this.store.state.webBluetooth.services.push(this.service)
      let result = this.store.getters['webBluetooth/characteristicsForService'](this.service)
      expect(result).to.be.an('array')
      expect(result.length).to.equal(2)
    })
    it('Does not return characteristic not discovered', async function() {
      this.store.state.webBluetooth.services.push(this.service)
      let result = this.store.getters['webBluetooth/characteristicsForService'](this.service)
      expect(result).to.be.an('array')
      expect(result).to.be.empty
    })

  })

  describe("#characteristicForService(service,uuid)", function() {
    it('Exists', function() { expect(this.store.getters['webBluetooth/characteristicForService']).to.exist})
    it('Returns discovered characteristic', async function() {
      let characteristics = await this.service.getCharacteristics('00002a19-0000-1000-8000-00805f9b34fb')
      let characteristic = characteristics.next().value
      this.store.state.webBluetooth.characteristics.push(characteristic);
      this.store.state.webBluetooth.services.push(this.service)
      let result = this.store.getters['webBluetooth/characteristicForService'](this.service, characteristic.uuid)
      expect(result).to.deep.equal(characteristic)
    })
    it('Does not return characteristic not discovered', async function() {
      let characteristics = await this.service.getCharacteristics('00002a19-0000-1000-8000-00805f9b34fb')
      let characteristic = characteristics.next().value
      this.store.state.webBluetooth.services.push(this.service)
      let result = this.store.getters['webBluetooth/characteristicForService'](this.service, characteristic.uuid)
      expect(result).to.be.undefined
    })
  })

})
