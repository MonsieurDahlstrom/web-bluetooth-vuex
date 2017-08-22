import {expect} from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
//
import {factory, Service} from '../factories'
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
        describe('#webBluetoothDevices', function () {

          it('lists stored devices', function (done) {
            factory.create('device')
            .then(device => {
              let result = this.store.getters.webBluetoothDevices
              expect(result).to.be.an('Array')
              done()
            })
          })

        })

        describe('#webBluetoothServicesForDevice', function () {

          it('lists services', function (done) {
            factory.create('device',{},{services: [{uuid: 0x180F},{uuid: 0x180A}]})
            .then(device => {
              try {
                for (let service of Object.values(device.gatt.services)) {
                  service.device = device
                  this.store.state.WebBluetoothModule.services.push(service)
                }
                let result = this.store.getters.webBluetoothServicesForDevice(device)
                expect(result).to.be.an('Array')
                expect(result.length).to.equal(2)
                done()
              }catch (err) {
                done(err)
              }
            })
          })

        })

        describe('#webBluetoothServiceForDevice', function () {

          it('retrive uuid16 service', function (done) {
            factory.create('device',{},{services: [{uuid: 0x180F},{uuid: 0x180A}]})
            .then(device => {
              try {
                for (let service of Object.values(device.gatt.services)) {
                  service.device = device
                  this.store.state.WebBluetoothModule.services.push(service)
                }
                let uuid = BluetoothUUID.canonicalUUID(0x180F)
                let result = this.store.getters.webBluetoothServiceForDevice(device, uuid)
                expect(result instanceof Service).to.be.true
                done()
              }catch (err) {
                done(err)
              }
            })
          })

          it('retrive uuid128 service', function (done) {
            factory.create('device',{},{services: [{uuid: 0x180F}, {uuid: 0x180A}, {uuid: '0000fe59-0000-1000-8000-00805f9b34fb'}]})
            .then(device => {
              try {
                for (let service of Object.values(device.gatt.services)) {
                  service.device = device
                  this.store.state.WebBluetoothModule.services.push(service)
                }
                let result = this.store.getters.webBluetoothServiceForDevice(device,'0000fe59-0000-1000-8000-00805f9b34fb')
                expect(result instanceof Service).to.be.true
                done()
              } catch (err) {
                done(err)
              }
            })
          })

        })
      })
    })
  })

  describe("named exports", function () {
    it("VueBluetoothLEMixin", function () { expect(VueBluetoothLEMixin).to.not.be.undefined })
    it("VuexBluetoothLEModule", function () { expect(VuexBluetoothLEModule).to.not.be.undefined})
  })
})
