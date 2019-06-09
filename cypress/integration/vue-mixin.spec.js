import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import WebBluetoothModule, { WebBluetoothMixin } from '../../src'

import {expect} from 'chai'

describe("VueBluetoothLEMixin", function() {

  beforeEach(function() {
    const store = new Vuex.Store({state: { }, modules: {webBluetooth: WebBluetoothModule}})
    this.store = store
    this.component = new Vue({
      store,
      mixins: [WebBluetoothMixin]
    })
  })

  it("is exported", function () {
    expect(WebBluetoothMixin).to.not.be.undefined
  })

  describe('has convinence methods for parsing characteristic data', function() {
    it('stringForCharacteristicValue', function() {
      expect(this.component.stringForCharacteristicValue).to.be.an('function')
    })
  })

  describe('Common service UUID', function() {

    describe('Device Information Service', function() {
      it("set in vue component", function() {
        expect(this.component.deviceInformationService).to.not.be.undefined
      })
      it('Device Information Service UUID', function() {
        expect(this.component.deviceInformationService.uuid).to.be.an('string')
      })

      describe("characteristics", function() {
        it('PNP ID', function() {
          expect(this.component.deviceInformationService.PnpId.uuid).to.be.an('string')
        })
        it('Regulatory Certification Data List', function() {
          expect(this.component.deviceInformationService.RegulatoryCertificationDataList.uuid).to.be.an('string')
        })
        it('System ID', function() {
          expect(this.component.deviceInformationService.SystemId.uuid).to.be.an('string')
        })
        it('Software Revision', function() {
          expect(this.component.deviceInformationService.SoftwareRevision.uuid).to.be.an('string')
        })
        it('Firmware Revision', function() {
          expect(this.component.deviceInformationService.FirmwareRevision.uuid).to.be.an('string')
        })
        it('Hardware Revision', function() {
          expect(this.component.deviceInformationService.HardwareRevision.uuid).to.be.an('string')
        })
        it('Serial Number', function() {
          expect(this.component.deviceInformationService.SerialNumber.uuid).to.be.an('string')
        })
        it('Model Number', function() {
          expect(this.component.deviceInformationService.ModelNumber.uuid).to.be.an('string')
        })
        it('Manufacturer name', function() {
          expect(this.component.deviceInformationService.ManufacturerName.uuid).to.be.an('string')
        })
      })

    })

    describe('Battery Service', function() {
      it("set in vue component", function() {
        expect(this.component.batteryService).to.not.be.undefined
      })
      it('Battery Service UUID', function() {
        expect(this.component.batteryService.uuid).to.be.an('string')
      })

      describe("characteristics", function(){
        it('Level', function() {
          expect(this.component.batteryService.uuid).to.be.an('string')
        })
        it('Level State', function() {
          expect(this.component.batteryService.LevelState.uuid).to.be.an('string')
        })
        it('Power State', function() {
          expect(this.component.batteryService.PowerState.uuid).to.be.an('string')
        })
      })

    })
  })
})
