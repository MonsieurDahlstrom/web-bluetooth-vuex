import factory from 'factory-girl';
import ServiceFactory from '../factories/service-factory'
import DeviceFactory from '../factories/device-factory'
import ServiceMutations from '../../src/mutations/service'
import * as MutationTypes from '../../src/mutation-types'

describe("ServiceMutations", function() {

  let device
  let service
  let state
  beforeEach(function(done) {
    state = {devices: [], services: [], characteristics: []}
    factory.build('device')
    .then(result => {
      device = result
      return factory.build('service')
    })
    .then(result => {
      service = result
      done()
    })
  })

  describe('#SERVICE_DISCOVERED', function() {
    it('changed state', function () {
      let payload = {device: device, service: service}
      ServiceMutations[MutationTypes.BLE_SERVICE_DISCOVERED](state,payload)
      expect(state.services.length).toBe(1)
      expect(device.services.length).toBe(1)
    })
  })

})
