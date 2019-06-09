# web-bluetooth-vuex
A vuex module to interface with BLE devices through the Web Bluetooth API available in Chrome. For Linux and Macos Chrome support was available in 54, for windows 10 in version 70.

## Installation
```console
$ yarn add coinmarketcap-vuex
# OR
$ npm install coinmarketcap-vuex
```

## Configuration
```js
//Set up Vue & Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import WebBluetoothModule from 'web-bluetooth-vuex'

Vue.use(Vuex)

//Create your vuex store
let store = new Vuex.Store({state: {}, modules: {webBluetooth: WebBluetoothModule}})
```
## Use inside a .vue

## Available Actions
#### addDevice
Add devices in the proxmity to the store. Accepts a couple of different combinations.
The snipplet below illustrates the combinations. The services array can take the form
of names of established services, 16bit uuid and 128bit uuids.
```js
// Scan for any devices around you, services determines which possible services
// you can acccess when connected
const option1 = { anyDevices: true, services:['device_information'] }
// Scan for a device with specific name around you, services determines which
// possible services you can acccess when connected
const option2 = { name: 'Demo Device', services['device_information'] }
// Scan for a devices with a name prefix round you, services determines which
// possible services you can acccess when connected
const option3 = { namePrefix: 'Demo Device', services['device_information'] }
// Scan for a devices with a specific set of services advertised
const option4 = { services['device_information'] }

store.dispatch('webBluetooth/addDevice',options)
```
### removeDevice
Disconnects from device and then removes device and all its services & characteristics from the store.
```js
let options = {device: deviceReferenceFromStore}
store.dispatch('webBluetooth/removeDevice',options)

```
### connectDevice
Connects to a device that has been added to the store.
```js
let options = {device: deviceReferenceFromStore}
store.dispatch('webBluetooth/connectDevice',options)
```
### disconnectDevice
Connects to a device that has been added to the store.
```js
let options = {device: deviceReferenceFromStore}
store.dispatch('webBluetooth/disconnectDevice',options)
```
### discoverServices
For a connected devices performs a service and characteristics discovery. characteristics will also be configuerd according to their permissions. Read, Write, Notify, Indicate permissions will be setup with apppripate callbacks and the store will update with value changes.
```js
// Discover all services specifed in addDevice
let option1 = { device: deviceReferenceFromStore }
// Discover a specific service specifed in addDevice
// in this incase the uuid of the Battery Service
let option2 = { device: deviceReferenceFromStore, uuid: BluetoothUUID.canonicalUUID(0x180F) }
store.dispatch('webBluetooth/discoverServices',option1)
```
### writeCharacteristic
Write an arraybuffer to the characteristic
```js
let valueToWrite = Uint8Array.of(1)
let option2 = { characteristic: characteristicReferenceFromStore, value: valueToWrite }
store.dispatch('webBluetooth/writeCharacteristic',option1)
```
## Available Getters
### device(deviceId)
```js
const device = store.getters['webBluetooth/device'](deviceId)
```
### servicesForDevice(deviceId)
```js
const services = store.getters['webBluetooth/servicesForDevice'](deviceId)
```
### serviceForDevice(deviceId,uuid)
```js
const service = store.getters['webBluetooth/serviceForDevice'](deviceId,BluetoothUUID.canonicalUUID(0x180F))
```
### characteristicsForService(service)
```js
const characteristics = store.getters['webBluetooth/characteristicsForService'](serviceFromStore)
```
### characteristicForService(service,uuid)
```js
const characteristic = store.getters['webBluetooth/characteristicForService'](serviceFromStore, BluetoothUUID.canonicalUUID(0x2A19))
```

## Available state

### devices
```js
const devices = store.state.webBluetooth.devices
```
### services
```js
const services = store.state.webBluetooth.services
```
### characteristics
```js
const characteristics = store.state.webBluetooth.characteristics
```
