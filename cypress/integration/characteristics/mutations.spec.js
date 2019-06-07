import chai, {expect} from 'chai'
import sinon from 'sinon'
import chaiSinon from 'sinon-chai'

chai.use(chaiSinon)

//
import factory from '../../support/factories'
//
import CharacteristicMutations from '../../../src/mutations/characteristic'
import * as MutationTypes from '../../../src/mutation-types'

describe("CharacteristicMutations", function() {

  beforeEach( async function() {
    try {
      this.sandbox = sinon.createSandbox()
      this.state = {devices: [], services: [], characteristics: []}
      this.service = await factory.create('service')
      this.characteristic = await factory.create('characteristic');
    } catch (err) {
      console.log(err)
    }
  })
  afterEach(function() {
    this.sandbox.restore()
  })

  describe('#BLE_CHARACTERISTIC_DISCOVERED', function() {
    it('adds new characteristic', function () {
      let payload = [this.characteristic]
      CharacteristicMutations[MutationTypes.BLE_CHARACTERISTICS_DISCOVERED](this.state,payload)
      expect(this.state.characteristics.length).to.equal(1)
    })
    it('splice existing characteristic', function () {
      var spliceSpy = this.sandbox.spy(this.state.characteristics, "splice")
      let payload = [this.characteristic]
      this.state.characteristics.push(this.characteristic)
      CharacteristicMutations[MutationTypes.BLE_CHARACTERISTICS_DISCOVERED](this.state,payload)
      expect(this.state.characteristics.length).to.equal(1)
      expect(spliceSpy).to.have.been.called
    })
  })


  describe('#BLE_CHARACTERISTIC_VALUE_CHANGED', function() {
    it('changed state', function () {
      var spliceSpy = this.sandbox.spy(this.state.characteristics, "splice")
      this.state.characteristics.push(this.characteristic)
      CharacteristicMutations[MutationTypes.BLE_CHARACTERISTIC_CHANGED](this.state,this.characteristic)
      expect(this.state.characteristics.length).to.equal(1)
      expect(spliceSpy).to.have.been.called
    })
  })

})
