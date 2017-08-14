import {factory, ObjectAdapter} from 'factory-girl'
factory.setAdapter(new ObjectAdapter());

class Device {
  constructor () {
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

factory.define('device', Device ,{
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
