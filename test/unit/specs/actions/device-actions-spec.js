import {expect} from 'chai'
import sinon from 'sinon'
//
import factory from '../../factories'
import VuexActionTester from '../../helpers/vuex-action-tester.js'
//
import DeviceActions from '../../../../src/actions/device.js'

describe("Device actions", function () {

  let navigator
  beforeEach(function (done) {
    navigator = {
      bluetooth: {
        requestDevice: function (params) {}
      }
    }
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
    it('', function (done) {
      let mock = this.sandbox.stub(navigator.bluetooth, "requestDevice").returns(this.device);
      let payload = {}
      var test = new VuexActionTester(DeviceActions.webBluetoothAddDevice, payload,[],[],done)
      test.run()
    })
  })

  describe("#webBluetoothRemoveDevice", function () {

  })

  describe("#webBluetoothConnectDevice", function () {

  })

  describe("#webBluetoothDisconnectDevice", function () {

  })


})
