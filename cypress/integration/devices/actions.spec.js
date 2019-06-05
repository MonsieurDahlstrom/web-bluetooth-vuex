import "@babel/polyfill"

import chai, {expect} from 'chai'
import sinon from 'sinon'
import chaiSinon from 'sinon-chai'

chai.use(chaiSinon)

//
import factory from '../../support/factories'
import VuexActionTester from '../../support/vuex-action-tester.js'
//
import DeviceActions from '../../../src/actions/device.js'
import * as MutationTypes from '../../../src/mutation-types'



describe("Actions device", function () {

  beforeEach(async function () {
    this.sandbox = sinon.createSandbox()
    this.device = await factory.create('device')
  })
  afterEach(function () {
    this.sandbox.restore()
  })

  describe("#addDevice", function () {
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
          done(error)
        }
      }
      var test = new VuexActionTester(DeviceActions.addDevice, payload, [],[], doneFunc)
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
      var test = new VuexActionTester(DeviceActions.addDevice, payload, [],[], doneFunc)
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
      var test = new VuexActionTester(DeviceActions.addDevice, payload, [],[], doneFunc)
      test.run()
    })
    it('handles {optionalServices: [\'heart_rate\',\'c48e6067-5295-48d3-8d5c-0395f61792b1\',0x1802]}', function (done) {
      var mock = this.sandbox.stub(navigator.bluetooth, "requestDevice").returns(undefined);
      var payload = {optionalServices: ['heart_rate','c48e6067-5295-48d3-8d5c-0395f61792b1',0x1802]}
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
      var test = new VuexActionTester(DeviceActions.addDevice, payload, [],[], doneFunc)
      test.run()
    })
    it('adds device', function (done) {
      let mock = this.sandbox.stub(navigator.bluetooth, "requestDevice").returns(this.device);
      let payload = {}
      let mutations = [
        {
          type: MutationTypes.BLE_DEVICE_ADDED,
          validation: function (payload) {
            expect(this.device).to.deep.equal(this.device)
          }.bind(this)
        }
      ]
      var test = new VuexActionTester(DeviceActions.addDevice, payload, mutations,[],done)
      test.run()
    })
  })

  describe("#removeDevice", function () {
    it('removes device', function (done) {
      let payload = {device: this.device}
      let mutations = [
        {
          type: MutationTypes.BLE_DEVICE_REMOVED,
          validation: (payload) => {
            expect(this.device).to.deep.equal(this.device)
          }
        }
      ]
      var test = new VuexActionTester(DeviceActions.removeDevice, payload, mutations,[],done)
      test.run()
    })
    it('removes connection listeners', function (done) {
      this.device.gatt.connected = true
      let payload = {device: this.device}
      let removeEventListenerSpy = this.sandbox.spy(this.device,'removeEventListener')
      let verifyResults = function(err) {
        if (err) {
          done(err)
          return
        }
        expect(removeEventListenerSpy.callCount).to.equal(2)
        done()
      }
      let mutations = [
        {
          type: MutationTypes.BLE_DEVICE_REMOVED,
          validation: (payload) => {
            expect(this.device).to.deep.equal(this.device)
          }
        }
      ]
      var test = new VuexActionTester(DeviceActions.removeDevice, payload, mutations,[],verifyResults)
      test.run()
    })
  })

  describe("#connectDevice", function () {
    it('connects device', function (done) {
      let spy = this.sandbox.spy(this.device.gatt, 'connect')
      let payload = {device: this.device}
      let mutations = [
        {
          type: MutationTypes.BLE_DEVICE_UPDATED,
          validation: function (payload) {
            expect(this.device).to.deep.equal(this.device)
            expect(spy.callCount).to.equal(1)
          }.bind(this)
        }
      ]
      var test = new VuexActionTester(DeviceActions.connectDevice, payload, mutations,[],done)
      test.run()
    })
    it('checks connected state', function (done) {
      this.device.gatt.connected = true
      let spy = this.sandbox.spy(this.device.gatt, 'connect')
      let payload = {device: this.device}
      let mutations = [
        {
          type: MutationTypes.BLE_DEVICE_UPDATED,
          validation: function (payload) {
            expect(this.device).to.deep.equal(this.device)
            expect(spy).to.not.have.been.called
          }.bind(this)
        }
      ]
      var test = new VuexActionTester(DeviceActions.connectDevice, payload, mutations,[],done)
      test.run()
    })
  })

  describe("#disconnectDevice", function () {
    it('check disconnection state', function (done) {
      this.device.gatt.connected = false
      let payload = {device: this.device}
      let spy = this.sandbox.spy(this.device.gatt, 'disconnect')
      let mutations = [
        {
          type: MutationTypes.BLE_DEVICE_UPDATED,
          validation: function (payload) {
            expect(this.device).to.deep.equal(this.device)
          }.bind(this)
        }
      ]
      let spyValidations = function() {
        try {
          expect(spy).to.not.have.been.called
          done()
        } catch(err) {
          done(err)
        }
      }
      var test = new VuexActionTester(DeviceActions.disconnectDevice, payload, mutations,[],spyValidations)
      test.run()
    })
    it('disconnects device', function (done) {
      let spy = this.sandbox.spy(this.device.gatt, 'disconnect')
      let mutations = [
        {
          type: MutationTypes.BLE_DEVICE_UPDATED,
          validation: function (payload) {
            expect(this.device).to.deep.equal(this.device)
            expect(spy.callCount).to.equal(1)
          }.bind(this)
        }
      ]
      this.device.gatt.connected = true
      let payload = {device: this.device}
      var test = new VuexActionTester(DeviceActions.disconnectDevice, payload, mutations,[],done)
      test.run()
    })
  })

  /**
  TODO: Renabled the tests when watchAdvertisments has been
  **/
  describe.skip("#watchAdvertisments", function () {
    it('check disconnection state', function (done) {
      this.device.gatt.connected = false
      let payload = {device: this.device}
      var test = new VuexActionTester(DeviceActions.webBluetoothWatchAdvertisments, payload, [],[],done)
      test.run()
    })
    it('attaches event listener if connected', function (done) {
      let spy = this.sandbox.spy(this.device, 'watchAdvertisements')
      let mutations = [
        {
          type: MutationTypes.BLE_DEVICE_UPDATED,
          validation: function (payload) {
            expect(this.device).to.deep.equal(this.device)
            expect(spy.callCount).to.equal(1)
          }.bind(this)
        }
      ]
      this.device.gatt.connected = true
      let payload = {device: this.device}
      var test = new VuexActionTester(DeviceActions.webBluetoothWatchAdvertisments, payload, mutations,[],done)
      test.run()
    })
  })

})