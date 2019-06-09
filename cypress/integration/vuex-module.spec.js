import {expect} from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
//
import factory, {Service} from '../support/factories'
//
import WebBluetoothModule, {WebBluetoothVuexModule} from '../../src'

Vue.use(Vuex)


describe("WebBluetoothModule", function() {

  describe("default export", function () {
    it("exports default", function () { expect(WebBluetoothModule).to.not.be.undefined})
    describe("adding module to store", function() {
      it("does not throw", function () {
        expect(() => new Vuex.Store({state: { }, modules: {webBluetooth: WebBluetoothModule}})).to.not.throw()
      })
    })
  })
})

describe("Vuex Module", () => {

  it("exports VuexBluetoothLEModule", function () { expect(WebBluetoothVuexModule).to.not.be.undefined})
});
