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
    this.characteristics = []
    this.device = undefined
  }

  async getCharacteristic(bluetoothServiceUUID) {
    return this.characteristics[bluetoothCharacteristicUUID]
  }

  async getCharacteristics() {
    return this.characteristics
  }

}

class Characteristic {
  constructor () {
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

async function generateServicesForGatt (gatt, uuids) {
  for(let metadata of uuids) {
    let service = await factory.create('service', {uuid: metadata.uuid}, {characteristics: metadata.characteristics})
    gatt.services[service.uuid] = service
  }
  return gatt
}

async function generateCharacteristicsForService (service, uuids) {
  for(let metadata of uuids) {
    let characteristic = await factory.create('characteristic', {uuid: metadata.uuid})
    service.characteristics.push(characteristic)
  }
  return service
}

factory.define('characteristic', Characteristic , {
  uuid: 0x2A24,
  value: 'Unit51,1,1',
  service: undefined
});

factory.define('service', Service, {
  uuid: 0x18F0,
  characteristics: []
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
    if(buildOptions.services) {
      return generateServicesForGatt(model.gatt,buildOptions.services).then((gatt) => model)
    } else {
      return model
    }
  }
});


module.exports.Service = Service
module.exports.Device = Device
module.exports.Characteristic = Characteristic
module.exports.Gatt = Gatt
module.exports.factory = factory
export default factory
