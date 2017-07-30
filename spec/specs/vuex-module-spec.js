import Vue from 'vue'
import Vuex from 'vuex'
import WebBluetoothModule from '../../src'
Vue.use(Vuex)

describe("WebBluetoothModule", function() {

  describe("adding module to store", function() {

    it("does not throw", function () {
      expect( function() {
        var store = new Vuex.Store({state: { }, modules: {WebBluetoothModule}})
      }).toBeTruthy()
    })

    describe('has web bluetooth getters', function() {
      var store
      beforeEach(function() {
        store = new Vuex.Store({state: { }, modules: {WebBluetoothModule}})
      })
      it("devices", function () {
        expect(store.getters.webBluetoothDevices).toBeTruthy()
      })

      it("services", function () {
        expect(store.getters.webBluetoothServices).toBeTruthy()
      })
      it("characteristics", function () {
        expect(store.getters.webBluetoothCharacteristics).toBeTruthy()
      })
    })
  })
})
