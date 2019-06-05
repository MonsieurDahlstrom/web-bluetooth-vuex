import "@babel/polyfill"

import Vue from "vue"
import Vuex from "vuex"
import WebBluetoothModule from '../../../src'

Vue.use(Vuex)

import {expect} from 'chai'
import sinon from 'sinon'
//
import factory from '../../support/factories'

describe("Getters device", () => {

  beforeEach( function() {
    this.store = new Vuex.Store({state: {}, modules: {webBluetooth: WebBluetoothModule}})
  })

  describe("#device(deviceID)", function() {
    it('Exists', function() { expect(this.store.getters['webBluetooth/device']).to.exist})
    it('Returns stored devices', async function() {
      let device = await factory.create('device')
      this.store.state.webBluetooth.devices.push(device)
      let result = this.store.getters['webBluetooth/device'](device.id)
      expect(result).to.deep.equal(device)
    })
    it('Does not find none cached devices', async function() {
      let device = await factory.create('device')
      let result = this.store.getters['webBluetooth/device'](device.id)
      expect(result).to.be.undefined
    })

  })


})
