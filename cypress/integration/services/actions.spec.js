import {expect} from 'chai'
import sinon from 'sinon'
//
import factory, {Service,Device} from '../../support/factories'
import VuexActionTester from '../../support/vuex-action-tester.js'
//
import ServiceActions from '../../../src/actions/service.js'
import * as MutationTypes from '../../../src/mutation-types'

describe("Actions services", function () {

  beforeEach(async function () {
    this.sandbox = sinon.createSandbox()
    this.device = await factory.create('device',{},{services: [{uuid: 0x180F},{uuid: 0x180A}]});
  })
  afterEach(function () {
    this.sandbox.restore()
  })

  describe("#discoverServices", function () {

    describe("Specific service", function () {
      it('finds service', function (done) {
        let uuid = BluetoothUUID.canonicalUUID(0x180F)
        let payload = {device: this.device, uuid: uuid}
        let dispatches = [
          {
            type: 'discoverCharacteristics',
            validation: function (payload) {
              expect(payload.service instanceof Service)
            }.bind(this)
          }
        ]
        let mutations = [
          {
            type: MutationTypes.BLE_SERVICE_ADDED,
            validation: function (payload) {
              expect(payload instanceof Service)
            }.bind(this)
          }
        ]
        var test = new VuexActionTester(ServiceActions.discoverServices, payload, mutations,dispatches,done)
        test.run()
      })
      it('may not find service', function (done) {
        let uuid = BluetoothUUID.canonicalUUID(0x180D)
        let payload = {device: this.device, uuid: uuid}
        var test = new VuexActionTester(ServiceActions.discoverServices, payload, [], [], done)
        test.run()
      })
    })
    describe("All services", function () {
      it( "may find no services", function(done) {
        let stub = sinon.stub(this.device.gatt,'getPrimaryServices').returns([])
        let payload = {device: this.device}
        var test = new VuexActionTester(ServiceActions.discoverServices, payload, [], [], done)
        test.run()
      })
      it('finds services', function (done) {
        let payload = {device: this.device}
        let dispatches = [
          {
            type: 'discoverCharacteristics',
            validation: function (payload) {
              expect(payload.service instanceof Service)
            }.bind(this)
          },
          {
            type: 'discoverCharacteristics',
            validation: function (payload) {
              expect(payload.service instanceof Service)
            }.bind(this)
          }
        ]
        let mutations = [
          {
            type: MutationTypes.BLE_SERVICE_ADDED,
            validation: function (payload) {
              expect(payload instanceof Service)
            }.bind(this)
          },
          {
            type: MutationTypes.BLE_SERVICE_ADDED,
            validation: function (payload) {
              expect(payload instanceof Service)
            }.bind(this)
          }
        ]
        var test = new VuexActionTester(ServiceActions.discoverServices, payload, mutations,dispatches,done)
        test.run()
      })
    })
  })

  describe("#removeService", function () {
    it('removes service', function (done) {
      let payload = {device: this.device, uuid: 0x180F}
      let mutations = [
        {
          type: MutationTypes.BLE_SERVICE_REMOVED,
          validation: function (payload) {
            expect(payload instanceof Service)
          }.bind(this)
        }
      ]
      var test = new VuexActionTester(ServiceActions.removeService, payload, mutations, [], done)
      test.run()
    })
  })
})
