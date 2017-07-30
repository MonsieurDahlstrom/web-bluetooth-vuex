import factory from 'factory-girl';
import Device from '../../src/models/WebBluetoothStoreDevice'

factory.define('device', Device, {
  connected: true,
  services: []
});
