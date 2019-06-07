import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from "sinon-chai"

chai.use(sinonChai);

//
import factory from '../../support/factories'
//
import ServiceMutations from '../../../src/mutations/service'
import * as MutationTypes from '../../../src/mutation-types'

describe("ServiceMutations", function() {

  beforeEach( async function() {
    this.sandbox = sinon.createSandbox()
    this.state = {devices: [], services: [], characteristics: []}
    this.service = await factory.create('service')
  })
  afterEach(function () {
    this.sandbox.restore()
  })

  describe('#BLE_SERVICE_ADDED', function() {
    it("adds device", function(){
      ServiceMutations[MutationTypes.BLE_SERVICE_ADDED](this.state,this.service)
      expect(this.state.services.length).to.equal(1)
    })
    it("does not duplicate", function() {
      this.state.services.push(this.service)
      ServiceMutations[MutationTypes.BLE_SERVICE_ADDED](this.state,this.service)
      expect(this.state.services.length).to.equal(1)
    })
  })

  describe('#BLE_SERVICE_REMOVED', function() {
    it('service not cached', async function () {
      this.state.services.push(this.service)
      let anotherService = await factory.create('service')
      ServiceMutations[MutationTypes.BLE_SERVICE_REMOVED](this.state,anotherService)
      expect(this.state.services.length).to.equal(1)
    })
    it('remove service', function () {
      this.state.services.push(this.service)
      ServiceMutations[MutationTypes.BLE_SERVICE_REMOVED](this.state,this.service)
      expect(this.state.services.length).to.equal(0)
    })
    it('remove characteristics', async function () {
      let characteristic = await factory.create('characteristic')
      this.state.characteristics.push(characteristic)
      this.state.services.push(this.service)
      this.service.characteristics.set(characteristic.uuid, characteristic)
      characteristic.service = this.service
      expect(this.state.characteristics.length).to.equal(1)
      ServiceMutations[MutationTypes.BLE_SERVICE_REMOVED](this.state,this.service)
      expect(this.state.characteristics.length).to.equal(0)
    })
  })

  describe('#BLE_SERVICE_UPDATED', function() {
    it('service not cached', async function () {
      const spy = this.sandbox.spy(this.state.services,'splice')
      ServiceMutations[MutationTypes.BLE_SERVICE_UPDATED](this.state,this.service)
      expect(this.state.services.length).to.equal(0)
      expect(spy).to.not.have.been.called;
    })
    it('changed state', function () {
      this.state.services.push(this.service)
      const spy = this.sandbox.spy(this.state.services,'splice')
      ServiceMutations[MutationTypes.BLE_SERVICE_UPDATED](this.state,this.service)
      expect(this.state.services.length).to.equal(1)
      expect(spy).to.have.been.calledOnce;
    })
  })

})
