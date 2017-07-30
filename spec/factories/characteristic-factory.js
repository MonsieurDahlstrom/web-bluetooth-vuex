import factory from 'factory-girl';
import Characteristic from '../../src/models/WebBluetoothStoreCharacteristic'

factory.define('characteristic', Characteristic, {
  uuid: 0x2A24,
  value: 'Unit51,1,1',
  service: undefined
});
