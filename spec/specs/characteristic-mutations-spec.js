import factory from 'factory-girl'
import ServiceFactory from '../factories/service-factory'
import CharacteristicFactory from '../factories/characteristic-factory'

import CharacteristicMutations from '../../src/mutations/characteristic'
import * as MutationTypes from '../../src/mutation-types'

describe("CharacteristicMutations", function() {

  let service
  let characteristic
  let state
  beforeEach(function() {
    service = factory.build('service')
    characteristic = factory.build('characteristic')
    state = {devices: [], services: [], characteristics: []}
  })

  describe('#BLE_CHARACTERISTIC_DISCOVERED', function() {
    it('changed state', function () {
      let payload = {service: service, characteristic: characteristic}
      CharacteristicMutations[MutationTypes.BLE_CHARACTERISTIC_DISCOVERED](state,payload)
      expect(state.characteristics.length).toBe(1)
      expect(service.characteristics.length).toBe(1)
    })
  })


  describe('#BLE_CHARACTERISTIC_VALUE_CHANGED', function() {
    it('changed state', function () {
      let payload = {service: service, value:'SpecValue,1,1'}
      CharacteristicMutations[MutationTypes.BLE_CHARACTERISTIC_VALUE_CHANGED](state,payload)
      expect(characteristic.value).toBe('SpecValue,1,1')
    })
  })

})
