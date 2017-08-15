import {expect} from 'chai'
import sinon from 'sinon'
//
import factory from '../../factories'
//
import ServiceMutations from '../../../../src/mutations/service'
import * as MutationTypes from '../../../../src/mutation-types'

describe("ServiceMutations", function() {

  beforeEach(function(done) {
    this.sandbox = sinon.sandbox.create()
    this.state = {devices: [], services: [], characteristics: []}
    factory.create('service')
    .then(service => {
      this.service = service
    })
    .then(() => {
      done()
    })
  })
  afterEach(function () {
    this.sandbox.restore()
  })

  describe('#SERVICE_DISCOVERED', function() {
    it('changed state', function () {
      let payload = {services: [this.service]}
      ServiceMutations[MutationTypes.BLE_SERVICES_DISCOVERED](this.state,payload)
      expect(this.state.services.length).to.equal(1)
    })
  })

})
