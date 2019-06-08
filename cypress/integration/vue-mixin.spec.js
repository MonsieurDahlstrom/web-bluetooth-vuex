import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import WebBluetoothModule, { VueBluetoothLEMixin } from '../../src'

import {expect} from 'chai'

describe("VueBluetoothLEMixin", function() {

  beforeEach(function() {
    const store = new Vuex.Store({state: { }, modules: {webBluetooth: WebBluetoothModule}})
    this.store = store
    this.component = new Vue({
      store,
      mixins: [VueBluetoothLEMixin]
    })
  })

  it("is exported", function () {
    expect(VueBluetoothLEMixin).to.not.be.undefined
  })

  describe('has convinence methods for parsing characteristic data', function() {
    it('stringForCharacteristicValue', function() {
      expect(this.component.stringForCharacteristicValue).to.be.an('function')
    })
  })

  describe('Common service UUID', function() {

    describe('Device Information Service', function() {
      it('Device Information Service UUID', function() {
        expect(this.component.deviceInformationServiceUUID).to.be.an('string')
      })
      it('PNP ID', function() {
        expect(this.component.pnpIdUUID).to.be.an('string')
      })
      it('Regulatory Certification Data List', function() {
        expect(this.component.regulatoryCertificationDataListUUID).to.be.an('string')
      })
      it('System ID', function() {
        expect(this.component.systemIdUUID).to.be.an('string')
      })
      it('Software Revision', function() {
        expect(this.component.softwareRevisionUUID).to.be.an('string')
      })
      it('Firmware Revision', function() {
        expect(this.component.firmwareRevisionUUID).to.be.an('string')
      })
      it('Hardware Revision', function() {
        expect(this.component.hardwareRevisionUUID).to.be.an('string')
      })
      it('Serial Number', function() {
        expect(this.component.serialNumberUUID).to.be.an('string')
      })
      it('Model Number', function() {
        expect(this.component.modelNumberUUID).to.be.an('string')
      })
      it('Manufacturer name', function() {
        expect(this.component.manufacturerNameUUID).to.be.an('string')
      })
    })

    describe('Battery Service', function() {
      it('Battery Service UUID', function() {
        expect(this.component.batteryServiceUUID).to.be.an('string')
      })
      it('Level', function() {
        expect(this.component.batteryLevelUUID).to.be.an('string')
      })
      it('Level State', function() {
        expect(this.component.batteryLevelStateUUID).to.be.an('string')
      })
      it('Power State', function() {
        expect(this.component.batteryPowerStateUUID).to.be.an('string')
      })
    })

  })
})
