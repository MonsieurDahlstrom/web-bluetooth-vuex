import {factory, ObjectAdapter} from 'factory-girl'
factory.setAdapter(new ObjectAdapter());

class Device {

  constructor () {
    this.watchingAdvertisements = false
  }

  addEventListener (type,func) {

  }

  removeEventListener (type,func) {

  }

  async watchAdvertisements () {
    this.watchingAdvertisements = true
  }

  unwatchAdvertisements () {
    this.watchingAdvertisements = false
  }

}

class Service {

  constructor () {
    this.characteristics = new Map()
    this.device = undefined
  }

  async getCharacteristic(bluetoothCharacteristicUUID) {
    return this.characteristics.get(bluetoothCharacteristicUUID)
  }

  async getCharacteristics() {
    return this.characteristics.values()
  }

}

class Characteristic {
  constructor () {
    this.value = undefined
    this.properties = {}
    this.evListerners = []
  }

  async startNotifications() {
    return true
  }

  async stopNotifications() {
    return true
  }

  async readValue() {
    return true
  }

  async writeValue() {
    return true
  }

  addEventListener(type,listener) {
    this.evListerners.push(listener)
  }

  removeEventListener(type,listener) {
    let index = this.evListerners.findIndex( storedListener => { storedListener === listener })
    this.evListerners.splice(index,1)
  }
}

class Gatt {
  constructor () {
    this.connected = false
    this.services = {}
  }

  async connect() {
    this.connected = true
  }

  disconnect() {
    this.connected = false
  }

  async getPrimaryService(bluetoothServiceUUID) {
    return this.services[bluetoothServiceUUID]
  }

  async getPrimaryServices() {
    return Object.values(this.services)
  }

}

async function generateServicesForGatt (gatt, uuids, device) {
  for(let metadata of uuids) {
    let service = await factory.create('service', {uuid: metadata.uuid}, {characteristics: metadata.characteristics})
    gatt.services[service.uuid] = service
    service.device = device
  }
  return gatt
}

async function generateCharacteristicsForService (service, uuids) {
  for(let metadata of uuids) {
    let characteristic = await factory.create('characteristic', {uuid: metadata.uuid})
    characteristic.service = service
    service.characteristics.set(characteristic.uuid, characteristic);
  }
  return service
}

factory.define('characteristic', Characteristic , {
  uuid: 0x2A24,
  value: 'Unit51,1,1',
  service: undefined,
  properties: {read:false, write:false, notify: false, indicate: false}
}, {
  afterBuild: (model,attr,buildOptions) => {
    if (typeof(model.uuid) === 'number') {
      let modelString = model.uuid.toString(16)
      model.uuid = '0000XXXX-0000-1000-8000-00805f9b34fb'.replace('XXXX', modelString)
    }
    if(buildOptions.properties) {
      model.properties = buildOptions.properties
    }
    return model
  }
});

factory.define('service', Service, {
  uuid: 0x18F0,
  characteristics: new Map()
}, {
  afterBuild: (model,attrs,buildOptions) => {
    if (typeof(model.uuid) === 'number') {
      let modelString = model.uuid.toString(16)
      model.uuid = '0000XXXX-0000-1000-8000-00805f9b34fb'.replace('XXXX', modelString)
    }
    if(buildOptions.characteristics) {
      return generateCharacteristicsForService(model,buildOptions.characteristics)
    } else {
      return model
    }
  }
});

factory.define('gatt', Gatt, {}, {
  afterBuild: (model, attrs, buildOptions) => {
    if (buildOptions.services) {
      return generateServicesForGatt(model,buildOptions.services)
    }
    return model
  }
})

factory.define('device', Device, {
  id: factory.chance('string'),
  name: factory.chance('name'),
  gatt: factory.assoc('gatt')
}, {
  afterBuild: (model,attrs,buildOptions) => {
    if(buildOptions.services)
      return generateServicesForGatt(model.gatt,buildOptions.services,model).then((gatt) => {
        model.gatt = gatt
        return model
      });
    return model
  }
});


export { Service as Service, Device as Device, Characteristic as Characteristic, Gatt as Gatt}
export default factory

/*
module.exports.Service = Service
module.exports.Device = Device
module.exports.Characteristic = Characteristic
module.exports.Gatt = Gatt
module.exports.factory = factory
*/
