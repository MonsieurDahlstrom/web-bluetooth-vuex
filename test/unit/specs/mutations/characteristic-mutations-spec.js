import {expect} from 'chai'
import sinon from 'sinon'
//
import factory from '../../factories'
//
import CharacteristicMutations from '../../../../src/mutations/characteristic'
import * as MutationTypes from '../../../../src/mutation-types'

describe("CharacteristicMutations", function() {

  beforeEach(function(done) {
    this.sandbox = sinon.sandbox.create()
    this.state = {devices: [], services: [], characteristics: []}
    factory.create('service')
    .then(service => {
      this.service = service
      return factory.create('characteristic')
      .then(characteristic => {
        this.characteristic = characteristic
      })
    })
    .then(() => {
      done()
    })
  })
  afterEach(function () {
    this.sandbox.restore()
  })

  describe('#BLE_CHARACTERISTIC_DISCOVERED', function() {
    it('adds new characteristic', function () {
      let payload = {characteristics:[this.characteristic]}
      CharacteristicMutations[MutationTypes.BLE_CHARACTERISTICS_DISCOVERED](this.state,payload)
      expect(this.state.characteristics.length).to.equal(1)
    })
    it('splice existing characteristic', function () {
      var spliceSpy = this.sandbox.spy(this.state.characteristics, "splice")
      let payload = {characteristics:[this.characteristic]}
      this.state.characteristics.push(this.characteristic)
      CharacteristicMutations[MutationTypes.BLE_CHARACTERISTICS_DISCOVERED](this.state,payload)
      expect(this.state.characteristics.length).to.equal(1)
      expect(spliceSpy.callCount).to.equal(1)
    })
  })


  describe('#BLE_CHARACTERISTIC_VALUE_CHANGED', function() {
    it('changed state', function () {
      var spliceSpy = this.sandbox.spy(this.state.characteristics, "splice")
      this.state.characteristics.push(this.characteristic)
      let payload = {characteristic: this.characteristic, value:'SpecValue,1,1'}
      CharacteristicMutations[MutationTypes.BLE_CHARACTERISTIC_CHANGED](this.state,payload)
      expect(this.state.characteristics.length).to.equal(1)
      expect(spliceSpy.callCount).to.equal(1)
    })
  })

})
