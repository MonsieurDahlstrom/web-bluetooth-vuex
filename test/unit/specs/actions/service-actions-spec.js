import {expect} from 'chai'
import sinon from 'sinon'
//
import factory from '../../factories'
import VuexActionTester from '../../helpers/vuex-action-tester.js'
//
import ServiceActions from '../../../../src/actions/service.js'
import * as MutationTypes from '../../../../src/mutation-types'

describe("Service actions", function () {
  describe("webBluetoothDiscoverServices", function () {
    it.only('finds service', function (done) {
      factory.create('device', {name: 'blink'}, {services: [{uuid: 0x180F},{uuid: 0x180A}]})
      .then(device => {
        this.device = device
        done()
      })
      .catch(err => done(err))
    })
    it('serviceadded')
    it('servicechanged')
    it('serviceremoved')
  })
  xdescribe("webBluetoothDiscoverService", function () {
    it('serviceadded')
    it('servicechanged')
    it('serviceremoved')
  })
  xdescribe("webBluetoothRemoveService", function () {
    it('serviceadded')
    it('servicechanged')
    it('serviceremoved')
  })
})
