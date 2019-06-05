import "@babel/polyfill"

import {expect} from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
//
import factory, {Service} from '../support/factories'
//
import WebBluetoothModule, {VueBluetoothLEMixin, VuexBluetoothLEModule} from '../../src'

Vue.use(Vuex)


describe("WebBluetoothModule", function() {

  describe("default export", function () {
    describe("adding module to store", function() {
      it("does not throw", function () {
        expect(() => new Vuex.Store({state: { }, modules: {webBluetooth: WebBluetoothModule}})).to.not.throw()
      })
    })
  })
})

describe("Vuex Module", () => {
  it("export VueBluetoothLEMixin", function () {
    expect(VueBluetoothLEMixin).to.not.be.undefined
  })
  it("exports VuexBluetoothLEModule", function () { expect(VuexBluetoothLEModule).to.not.be.undefined})
  it("exports default WebBluetoothModule", function () { expect(WebBluetoothModule).to.not.be.undefined})
});
