import {expect} from 'chai'
//
import Vue from 'vue'
import Vuex from 'vuex'
//
import {VueBluetoothLEMixin, VuexBluetoothLEModule} from '../../../src'
import WebBluetoothModule from '../../../src'

Vue.use(Vuex)

describe("WebBluetoothModule", function() {

  describe("default export", function () {
    describe("adding module to store", function() {
      it("does not throw", function () {
        expect(() => new Vuex.Store({state: { }, modules: {WebBluetoothModule}})).to.not.throw()
      })
      describe('getters', function () {
        beforeEach(function() {
          this.store = new Vuex.Store({state: { }, modules: {WebBluetoothModule}})
        })
        it('#webBluetoothDevices', function () {
          expect(this.store.getters.webBluetoothDevices).to.be.an('array')
        })
        it("#webBluetoothServicesForDevice", function () {
          expect(this.store.getters.webBluetoothServicesForDevice).to.be.an('function')
        })
        it("#webBluetoothServiceForDevice", function () {
          expect(this.store.getters.webBluetoothServiceForDevice).to.be.an('function')
        })
        it("#webBluetoothCharacteristicsForService", function () {
          expect(this.store.getters.webBluetoothCharacteristicsForService).to.be.an('function')
        })
        it("#webBluetoothCharacteristicForService", function () {
          expect(this.store.getters.webBluetoothCharacteristicForService).to.be.an('function')
        })
      })
    })
  })

  describe("named exports", function () {
    it("VueBluetoothLEMixin", function () { expect(VueBluetoothLEMixin).to.not.be.undefined })
    it("VuexBluetoothLEModule", function () { expect(VuexBluetoothLEModule).to.not.be.undefined})
  })
})
