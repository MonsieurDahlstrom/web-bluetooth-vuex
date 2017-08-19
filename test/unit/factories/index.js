import {factory, ObjectAdapter} from 'factory-girl'
factory.setAdapter(new ObjectAdapter());

class Device {

  constructor () {
  }

  addEventListener (string,func) {

  }
}

class Service {
  constructor () {
  }
}

class Characteristic {
  constructor () {
  }
}

class Gatt {
  constructor () {
    this.connected = false
  }
}

factory.define('gatt', Gatt, {

})

factory.define('device', Device ,{
  gatt: factory.create('gatt'),
  connected: true,
  services: []
});

factory.define('characteristic', Characteristic , {
  uuid: 0x2A24,
  value: 'Unit51,1,1',
  service: undefined
});

factory.define('service', Service, {
  uuid: 0x18F0,
  characteristics: []
});

export default factory
