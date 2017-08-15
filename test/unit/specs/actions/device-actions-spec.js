import {expect} from 'chai'
import sinon from 'sinon'
//
import factory from '../../factories'
import VuexActionTester from '../../helpers/vuex-action-tester.js'
//
import DeviceActions from '../../../../src/actions/device.js'
import * as MutationTypes from '../../../../src/mutation-types'

describe("Device actions", function () {

  beforeEach(function (done) {
    this.sandbox = sinon.sandbox.create()
    factory.create('device')
    .then(device => {
      this.device = device
      done()
    })
  })
  afterEach(function () {
    this.sandbox.restore()
  })

  describe("#webBluetoothAddDevice", function () {
    it('handles {name: \'ExampleName\'}', function (done) {
      var mock = this.sandbox.stub(navigator.bluetooth, "requestDevice").returns(undefined);
      var payload = {name: 'DeviceName'}
      var doneFunc = function(err) {
        if (err) {
          done(err)
          return
        }
        let expectedCallArguments = mock.getCalls()[0]
        let receivedArguments = expectedCallArguments.args[0]
        let error = undefined
        try {
          expect(mock.callCount).to.equal(1)
          expect(receivedArguments.filters).to.not.be.undefined
          expect(receivedArguments.filters).to.deep.include({name: 'DeviceName'})
          done()
        } catch(error) {
          console.info(error)
          done(error)
        }
      }
      var test = new VuexActionTester(DeviceActions.webBluetoothAddDevice, payload, [],[], doneFunc)
      test.run()
    })
    it('handles {namePrefix: \'Prefix\'}', function (done) {
      var mock = this.sandbox.stub(navigator.bluetooth, "requestDevice").returns(undefined);
      var payload = {namePrefix: 'Prefix'}
      var doneFunc = function(err) {
        if (err) {
          done(err)
          return
        }
        let expectedCallArguments = mock.getCalls()[0]
        let receivedArguments = expectedCallArguments.args[0]
        let error = undefined
        try {
          expect(mock.callCount).to.equal(1)
          expect(receivedArguments.filters).to.not.be.undefined
          expect(receivedArguments.filters).to.deep.include({namePrefix: 'Prefix'})
          done()
        } catch(error) {
          done(error)
        }
      }
      var test = new VuexActionTester(DeviceActions.webBluetoothAddDevice, payload, [],[], doneFunc)
      test.run()
    })
    it('handles {services: [\'heart_rate\',\'c48e6067-5295-48d3-8d5c-0395f61792b1\',0x1802]}', function (done) {
      var mock = this.sandbox.stub(navigator.bluetooth, "requestDevice").returns(undefined);
      var payload = {services: ['heart_rate','c48e6067-5295-48d3-8d5c-0395f61792b1',0x1802]}
      var doneFunc = function(err) {
        if (err) {
          done(err)
          return
        }
        let expectedCallArguments = mock.getCalls()[0]
        let receivedArguments = expectedCallArguments.args[0]
        let error = undefined
        try {
          expect(mock.callCount).to.equal(1)
          expect(receivedArguments.acceptAllDevices).to.not.be.undefined
          expect(receivedArguments.optionalServices).to.include('heart_rate')
          expect(receivedArguments.optionalServices).to.include('c48e6067-5295-48d3-8d5c-0395f61792b1')
          expect(receivedArguments.optionalServices).to.include(0x1802)
          done()
        } catch(error) {
          done(error)
        }
      }
      var test = new VuexActionTester(DeviceActions.webBluetoothAddDevice, payload, [],[], doneFunc)
      test.run()
    })
    it('adds device', function (done) {
      let mock = this.sandbox.stub(navigator.bluetooth, "requestDevice").returns(this.device);
      let payload = {}
      let mutations = [
        {
          type: MutationTypes.BLE_DEVICE_ADDED,
          validation: function (payload) {
            expect(payload.device).to.deep.equal(this.device)
          }.bind(this)
        }
      ]
      var test = new VuexActionTester(DeviceActions.webBluetoothAddDevice, payload, mutations,[],done)
      test.run()
    })
  })

  describe("#webBluetoothRemoveDevice", function () {
    it('removes device', function (done) {
      let payload = {device: this.device}
      let mutations = [
        {
          type: MutationTypes.BLE_DEVICE_REMOVE,
          validation: function (payload) {
            expect(payload.device).to.deep.equal(this.device)
          }.bind(this)
        }
      ]
      var test = new VuexActionTester(DeviceActions.webBluetoothAddDevice, payload, mutations,[],done)
      test.run()
    })
  })

  describe("#webBluetoothConnectDevice", function () {

  })

  describe("#webBluetoothDisconnectDevice", function () {

  })


})
