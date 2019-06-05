import "@babel/polyfill"
import chai, {expect} from 'chai'
import sinon from 'sinon'
import chaiSinon from 'sinon-chai'

chai.use(chaiSinon)

import factory, {Characteristic} from '../../support/factories'
import VuexActionTester from '../../support/vuex-action-tester.js'

import CharacteristicActions from '../../../src/actions/characteristic.js'
import * as MutationTypes from '../../../src/mutation-types'

describe("Actions characteristics", function () {

  beforeEach( async function() {
    this.sandbox = sinon.createSandbox()
    this.service = await factory.create('service',{},{characteristics: [{uuid: 0x2A19},{uuid: 0x2A1B}]});
    this.characteristic = await factory.create('characteristic')
  })
  afterEach(function() {
    this.sandbox.restore()
  })

  describe("#discoverCharacteristics", function () {
    describe("service with characteristics", function() {
      it("discovers all characteristics", function(done) {
        let dispatches = [
          {
            type: 'configureCharacteristic',
            validation: function (payload) {
              expect(payload instanceof Characteristic)
            }.bind(this)
          },
          {
            type: 'configureCharacteristic',
            validation: function (payload) {
              expect(payload instanceof Characteristic)
            }.bind(this)
          }
        ];
        let mutations = [
          {
            type: MutationTypes.BLE_CHARACTERISTICS_DISCOVERED,
            validation: function (payload) {
              expect(payload).to.be.an('array')
              expect(payload.length).to.equal(2)
            }.bind(this)
          }
        ]
        const payload = {service: this.service}
        var test = new VuexActionTester(CharacteristicActions.discoverCharacteristics, payload, mutations,dispatches,done)
        test.run()
      })
      it("discovers one characteristic", function(done) {
        let dispatches = [
          {
            type: 'configureCharacteristic',
            validation: function (payload) {
              expect(payload instanceof Characteristic)
            }.bind(this)
          }
        ];
        let mutations = [
          {
            type: MutationTypes.BLE_CHARACTERISTICS_DISCOVERED,
            validation: function (payload) {
              expect(payload).to.be.an('array')
              expect(payload.length).to.equal(1)
            }.bind(this)
          }
        ]
        const payload = {service: this.service, characteristics: ['00002a19-0000-1000-8000-00805f9b34fb']}
        var test = new VuexActionTester(CharacteristicActions.discoverCharacteristics, payload, mutations,dispatches,done)
        test.run()
      })
    })

    describe("service without characteristics", function() {
      it('discover all characteristic', function(done) {
        this.service.characteristics = new Map()
        const payload = {service: this.service}
        var test = new VuexActionTester(CharacteristicActions.discoverCharacteristics, payload, [],[],done)
        test.run()
      })
      it("discover one characteristic", function(done) {
        this.service.characteristics = new Map()
        const payload = {service: this.service, characteristics: ['00002a19-0000-1000-8000-00805f9b34fb']}
        var test = new VuexActionTester(CharacteristicActions.discoverCharacteristics, payload, [], [],done)
        test.run()
      })
    })

  })

  describe("#configureCharacteristic", function () {
    it("no properties set", function(done) {
      var test = new VuexActionTester(CharacteristicActions.configureCharacteristic, this.characteristic, [],[],done)
      test.run()
    })
    it("Characteristic with read properties", function(done) {
      this.characteristic.properties.read = true
      let mutations = [
        {
          type: MutationTypes.BLE_CHARACTERISTIC_CHANGED,
          validation: function (payload) {
            expect(payload).to.deep.equal(this.characteristic)
          }.bind(this)
        }
      ]
      var test = new VuexActionTester(CharacteristicActions.configureCharacteristic, this.characteristic, mutations,[],done)
      test.run()
    })
    it("Characteristic with write property", function (done) {
      var test = new VuexActionTester(CharacteristicActions.configureCharacteristic, this.characteristic, [],[],done)
      test.run()
    })
    it("Characteristic with indicate", function(done) {
      this.characteristic.properties.indicate = true
      let startNotificationsSpy = this.sandbox.spy(this.characteristic, 'startNotifications')
      let eventListenerSpy = this.sandbox.spy(this.characteristic, 'addEventListener')
      let testDone = () => {
        try {
          expect(startNotificationsSpy).to.have.been.called;
          expect(eventListenerSpy).to.have.been.called;
          done()
        } catch(err) {
            done(err)
        }
      }
      var test = new VuexActionTester(CharacteristicActions.configureCharacteristic, this.characteristic, [],[],testDone)
      test.run()
    })
    it("Characteristic with notify", function(done) {
      this.characteristic.properties.notify = true
      let startNotificationsSpy = this.sandbox.spy(this.characteristic, 'startNotifications')
      let eventListenerSpy = this.sandbox.spy(this.characteristic, 'addEventListener')
      let testDone = () => {
        try {
          expect(startNotificationsSpy).to.have.been.called;
          expect(eventListenerSpy).to.have.been.called;
          done()
        } catch(err) {
            done(err)
        }
      }
      var test = new VuexActionTester(CharacteristicActions.configureCharacteristic, this.characteristic, [],[],testDone)
      test.run()
    })
  })

  describe("#writeCharacteristic", function () {
    it("write successful", function(done) {
      const writeValueSpy = this.sandbox.spy(this.characteristic, 'writeValue')
      const testDone = () => {
        try {
          expect(writeValueSpy).to.have.been.called
          done()
        } catch(e) {
          done(e)
        }
      }
      let mutations = [
        {
          type: MutationTypes.BLE_CHARACTERISTIC_CHANGED,
          validation: function (payload) {
            expect(payload).to.deep.equal(this.characteristic)
          }.bind(this)
        }
      ]
      const payload = {characteristic: this.characteristic, value: new Uint8Array(1)}
      const test = new VuexActionTester(CharacteristicActions.writeCharacteristic, payload, mutations,[],testDone)
      test.run()
    })
    it("write fails", function(done) {
      const writeValueSpy = this.sandbox.stub(this.characteristic, 'writeValue').throws("Write Failed")
      const payload = {characteristic: this.characteristic, value: new Uint8Array(1)}
      const testDone = () => {
        try {
          expect(writeValueSpy).to.have.been.called
          done()
        } catch(e) {
          done(e)
        }
      }
      const test = new VuexActionTester(CharacteristicActions.writeCharacteristic, payload, [],[],testDone)
      test.run()
    })
  })

  describe("#updateCharacteristic", function () {
    it("Characteristic refreshed", function(done) {
      let mutations = [
        {
          type: MutationTypes.BLE_CHARACTERISTIC_CHANGED,
          validation: function (payload) {
            expect(payload).to.deep.equal(this.characteristic)
          }.bind(this)
        }
      ]
      const test = new VuexActionTester(CharacteristicActions.updateCharacteristic, this.characteristic, mutations, [], done)
      test.run()
    })
  })
})
