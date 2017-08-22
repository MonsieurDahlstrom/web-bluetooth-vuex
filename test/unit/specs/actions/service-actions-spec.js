import {expect} from 'chai'
import sinon from 'sinon'
//
import {factory,Service,Device} from '../../factories'
import VuexActionTester from '../../helpers/vuex-action-tester.js'
//
import ServiceActions from '../../../../src/actions/service.js'
import * as MutationTypes from '../../../../src/mutation-types'

describe("Service actions", function () {

  before(function () {
    this.sandbox = sinon.sandbox.create()
  })
  beforeEach(function (done) {
    factory.create('device', {name: 'blink'}, {services: [{uuid: 0x180F},{uuid: 0x180A}]})
    .then(device => {
      this.device = device
      done()
    })
  })
  afterEach(function () {
    this.device = undefined
    this.sandbox.restore()
  })

  describe("#webBluetoothDiscoverServices", function () {
    it('finds services', function (done) {
      let payload = {device: this.device}
      let dispatches = [
        {
          type: 'webBluetoothDiscoverCharacteristics',
          validation: function (payload) {
            expect(payload.service instanceof Service)
          }.bind(this)
        },
        {
          type: 'webBluetoothDiscoverCharacteristics',
          validation: function (payload) {
            expect(payload.service instanceof Service)
          }.bind(this)
        }
      ]
      let mutations = [
        {
          type: MutationTypes.BLE_SERVICE_ADDED,
          validation: function (payload) {
            expect(payload.service instanceof Service)
          }.bind(this)
        },
        {
          type: MutationTypes.BLE_SERVICE_ADDED,
          validation: function (payload) {
            expect(payload.service instanceof Service)
          }.bind(this)
        }
      ]
      var test = new VuexActionTester(ServiceActions.webBluetoothDiscoverServices, payload, mutations,dispatches,done)
      test.run()
    })
    it('serviceadded')
    it('servicechanged')
    it('serviceremoved')
  })
  describe("webBluetoothDiscoverService", function () {
    it('finds service', function (done) {
      let uuid = BluetoothUUID.canonicalUUID(0x180F)
      let payload = {device: this.device, uuid: uuid}
      let dispatches = [
        {
          type: 'webBluetoothDiscoverCharacteristics',
          validation: function (payload) {
            expect(payload.service instanceof Service)
          }.bind(this)
        }
      ]
      let mutations = [
        {
          type: MutationTypes.BLE_SERVICE_ADDED,
          validation: function (payload) {
            expect(payload.service instanceof Service)
          }.bind(this)
        }
      ]
      var test = new VuexActionTester(ServiceActions.webBluetoothDiscoverService, payload, mutations,dispatches,done)
      test.run()
    })
    it('does not find service', function (done) {
      let uuid = BluetoothUUID.canonicalUUID(0x180D)
      let payload = {device: this.device, uuid: uuid}
      var test = new VuexActionTester(ServiceActions.webBluetoothDiscoverService, payload, [], [], done)
      test.run()
    })
    it('serviceadded')
    it('servicechanged')
    it('serviceremoved')
  })
  describe("#webBluetoothRemoveService", function () {
    it('removes service', function (done) {
      let payload = {device: this.device, uuid: 0x180F}
      let dispatches = [
        {
          type: 'webBluetoothRemoveCharacteristics',
          validation: function (payload) {
            expect(payload.service instanceof Service)
          }.bind(this)
        }
      ]
      let mutations = [
        {
          type: MutationTypes.BLE_SERVICE_REMOVED,
          validation: function (payload) {
            expect(payload.service instanceof Service)
          }.bind(this)
        }
      ]
      var test = new VuexActionTester(ServiceActions.webBluetoothRemoveService, payload, mutations, dispatches, done)
      test.run()
    })
    it('serviceadded')
    it('servicechanged')
    it('serviceremoved')
  })
})
