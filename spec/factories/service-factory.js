import factory from 'factory-girl';
import Service from '../../src/models/WebBluetoothStoreService'

factory.define('service', Service, {
  uuid: 0x18F0,
  characteristics: []
});
