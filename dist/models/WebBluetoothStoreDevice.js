'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _WebBluetoothStoreService = require('./WebBluetoothStoreService');

var _WebBluetoothStoreService2 = _interopRequireDefault(_WebBluetoothStoreService);

var _WebBluetoothStoreUtils = require('./WebBluetoothStoreUtils');

var _WebBluetoothStoreUtils2 = _interopRequireDefault(_WebBluetoothStoreUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebBluetoothStoreDevice = function () {
  function WebBluetoothStoreDevice(bluetoothDevice) {
    var _this = this;

    _classCallCheck(this, WebBluetoothStoreDevice);

    _vue2.default.set(this, 'device', bluetoothDevice);
    _vue2.default.set(this, 'gatt', bluetoothDevice.gatt);
    _vue2.default.set(this, 'connected', false);
    _vue2.default.set(this, 'name', bluetoothDevice.name);
    _vue2.default.set(this, 'id', bluetoothDevice.id);
    this.device.addEventListener('gattserverdisconnected', function (event) {
      _vue2.default.set(_this, 'connected', false);
    });
  }

  _createClass(WebBluetoothStoreDevice, [{
    key: 'connect',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.gatt.connect();

              case 2:
                _vue2.default.set(this, 'connected', true);
                _context.next = 5;
                return this.discoverServices();

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connect() {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: 'discoverService',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(metadata) {
        var service, webBluetoothService, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, characteristicUUID;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.gatt.getPrimaryService(metadata.uuid);

              case 3:
                service = _context2.sent;
                webBluetoothService = new _WebBluetoothStoreService2.default(service);

                if (!(metadata.characteristics && metadata.characteristics.length > 0)) {
                  _context2.next = 34;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 9;
                _iterator = metadata.characteristics[Symbol.iterator]();

              case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 18;
                  break;
                }

                characteristicUUID = _step.value;
                _context2.next = 15;
                return webBluetoothService.discoverCharacteristic(characteristicUUID);

              case 15:
                _iteratorNormalCompletion = true;
                _context2.next = 11;
                break;

              case 18:
                _context2.next = 24;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2['catch'](9);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 24:
                _context2.prev = 24;
                _context2.prev = 25;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 27:
                _context2.prev = 27;

                if (!_didIteratorError) {
                  _context2.next = 30;
                  break;
                }

                throw _iteratorError;

              case 30:
                return _context2.finish(27);

              case 31:
                return _context2.finish(24);

              case 32:
                _context2.next = 36;
                break;

              case 34:
                _context2.next = 36;
                return webBluetoothService.discoverCharacteristics();

              case 36:
                _vue2.default.set(this, metadata.uuid, webBluetoothService);
                _context2.next = 42;
                break;

              case 39:
                _context2.prev = 39;
                _context2.t1 = _context2['catch'](0);

                console.error('Could not retrive characteristic ' + metadata.uuid + ' because: ' + _context2.t1);

              case 42:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 39], [9, 20, 24, 32], [25,, 27, 31]]);
      }));

      function discoverService(_x) {
        return _ref2.apply(this, arguments);
      }

      return discoverService;
    }()
  }, {
    key: 'discoverServices',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var serviceCollection, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, bleservice, webBluetoothService;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.gatt.getPrimaryServices();

              case 2:
                serviceCollection = _context3.sent;

                // Setup the discovered services
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context3.prev = 6;
                _iterator2 = serviceCollection[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context3.next = 17;
                  break;
                }

                bleservice = _step2.value;
                webBluetoothService = new _WebBluetoothStoreService2.default(bleservice);
                _context3.next = 13;
                return webBluetoothService.discoverCharacteristics();

              case 13:
                _vue2.default.set(this, bleservice.uuid, webBluetoothService);

              case 14:
                _iteratorNormalCompletion2 = true;
                _context3.next = 8;
                break;

              case 17:
                _context3.next = 23;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3['catch'](6);
                _didIteratorError2 = true;
                _iteratorError2 = _context3.t0;

              case 23:
                _context3.prev = 23;
                _context3.prev = 24;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 26:
                _context3.prev = 26;

                if (!_didIteratorError2) {
                  _context3.next = 29;
                  break;
                }

                throw _iteratorError2;

              case 29:
                return _context3.finish(26);

              case 30:
                return _context3.finish(23);

              case 31:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 19, 23, 31], [24,, 26, 30]]);
      }));

      function discoverServices() {
        return _ref3.apply(this, arguments);
      }

      return discoverServices;
    }()
  }, {
    key: 'serviceFor16bit',
    value: function serviceFor16bit(UUID16) {
      return this[_WebBluetoothStoreUtils2.default.cannonicalUUIDFor16bitUUID(UUID16)];
    }
  }, {
    key: 'handleError',
    value: function handleError(context, error) {
      console.error('Prototype: ' + context + ' ' + error);
    }
  }]);

  return WebBluetoothStoreDevice;
}();

exports.default = WebBluetoothStoreDevice;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvV2ViQmx1ZXRvb3RoU3RvcmVEZXZpY2UuanMiXSwibmFtZXMiOlsiV2ViQmx1ZXRvb3RoU3RvcmVEZXZpY2UiLCJibHVldG9vdGhEZXZpY2UiLCJzZXQiLCJnYXR0IiwibmFtZSIsImlkIiwiZGV2aWNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbm5lY3QiLCJkaXNjb3ZlclNlcnZpY2VzIiwibWV0YWRhdGEiLCJnZXRQcmltYXJ5U2VydmljZSIsInV1aWQiLCJzZXJ2aWNlIiwid2ViQmx1ZXRvb3RoU2VydmljZSIsImNoYXJhY3RlcmlzdGljcyIsImxlbmd0aCIsImNoYXJhY3RlcmlzdGljVVVJRCIsImRpc2NvdmVyQ2hhcmFjdGVyaXN0aWMiLCJkaXNjb3ZlckNoYXJhY3RlcmlzdGljcyIsImNvbnNvbGUiLCJlcnJvciIsImdldFByaW1hcnlTZXJ2aWNlcyIsInNlcnZpY2VDb2xsZWN0aW9uIiwiYmxlc2VydmljZSIsIlVVSUQxNiIsImNhbm5vbmljYWxVVUlERm9yMTZiaXRVVUlEIiwiY29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLHVCO0FBRW5CLG1DQUFhQyxlQUFiLEVBQThCO0FBQUE7O0FBQUE7O0FBQzVCLGtCQUFJQyxHQUFKLENBQVEsSUFBUixFQUFjLFFBQWQsRUFBd0JELGVBQXhCO0FBQ0Esa0JBQUlDLEdBQUosQ0FBUSxJQUFSLEVBQWMsTUFBZCxFQUFzQkQsZ0JBQWdCRSxJQUF0QztBQUNBLGtCQUFJRCxHQUFKLENBQVEsSUFBUixFQUFjLFdBQWQsRUFBMkIsS0FBM0I7QUFDQSxrQkFBSUEsR0FBSixDQUFRLElBQVIsRUFBYyxNQUFkLEVBQXNCRCxnQkFBZ0JHLElBQXRDO0FBQ0Esa0JBQUlGLEdBQUosQ0FBUSxJQUFSLEVBQWMsSUFBZCxFQUFvQkQsZ0JBQWdCSSxFQUFwQztBQUNBLFNBQUtDLE1BQUwsQ0FBWUMsZ0JBQVosQ0FBNkIsd0JBQTdCLEVBQXVELGlCQUFTO0FBQzlELG9CQUFJTCxHQUFKLFFBQWMsV0FBZCxFQUEyQixLQUEzQjtBQUNELEtBRkQ7QUFHRDs7Ozs7Ozs7Ozs7dUJBR08sS0FBS0MsSUFBTCxDQUFVSyxPQUFWLEU7OztBQUNOLDhCQUFJTixHQUFKLENBQVEsSUFBUixFQUFjLFdBQWQsRUFBMkIsSUFBM0I7O3VCQUNNLEtBQUtPLGdCQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEVBR2VDLFE7Ozs7Ozs7Ozt1QkFFQyxLQUFLUCxJQUFMLENBQVVRLGlCQUFWLENBQTRCRCxTQUFTRSxJQUFyQyxDOzs7QUFBaEJDLHVCO0FBQ0FDLG1DLEdBQXNCLHVDQUE2QkQsT0FBN0IsQzs7c0JBQ3RCSCxTQUFTSyxlQUFULElBQTRCTCxTQUFTSyxlQUFULENBQXlCQyxNQUF6QixHQUFrQyxDOzs7Ozs7Ozs7NEJBQ2pDTixTQUFTSyxlOzs7Ozs7OztBQUEvQkUsa0M7O3VCQUNESCxvQkFBb0JJLHNCQUFwQixDQUEyQ0Qsa0JBQTNDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUdGSCxvQkFBb0JLLHVCQUFwQixFOzs7QUFFUiw4QkFBSWpCLEdBQUosQ0FBUSxJQUFSLEVBQWNRLFNBQVNFLElBQXZCLEVBQTZCRSxtQkFBN0I7Ozs7Ozs7O0FBRUFNLHdCQUFRQyxLQUFSLENBQWMsc0NBQXNDWCxTQUFTRSxJQUEvQyxHQUFzRCxZQUF0RCxlQUFkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBTTRCLEtBQUtULElBQUwsQ0FBVW1CLGtCQUFWLEU7OztBQUExQkMsaUM7O0FBQ0o7Ozs7OzZCQUN1QkEsaUI7Ozs7Ozs7O0FBQWRDLDBCO0FBQ0hWLG1DLEdBQXNCLHVDQUE2QlUsVUFBN0IsQzs7dUJBQ3BCVixvQkFBb0JLLHVCQUFwQixFOzs7QUFDTiw4QkFBSWpCLEdBQUosQ0FBUSxJQUFSLEVBQWNzQixXQUFXWixJQUF6QixFQUErQkUsbUJBQS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBSWFXLE0sRUFBUTtBQUN2QixhQUFPLEtBQUssaUNBQXVCQywwQkFBdkIsQ0FBa0RELE1BQWxELENBQUwsQ0FBUDtBQUNEOzs7Z0NBRVlFLE8sRUFBU04sSyxFQUFPO0FBQzNCRCxjQUFRQyxLQUFSLENBQWMsZ0JBQWdCTSxPQUFoQixHQUEwQixHQUExQixHQUFnQ04sS0FBOUM7QUFDRDs7Ozs7O2tCQXJEa0JyQix1QiIsImZpbGUiOiJXZWJCbHVldG9vdGhTdG9yZURldmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUgZnJvbSAndnVlJ1xyXG5pbXBvcnQgV2ViQmx1ZXRvb3RoU3RvcmVTZXJ2aWNlIGZyb20gJy4vV2ViQmx1ZXRvb3RoU3RvcmVTZXJ2aWNlJ1xyXG5pbXBvcnQgV2ViQmx1ZXRvb3RoU3RvcmVVdGlscyBmcm9tICcuL1dlYkJsdWV0b290aFN0b3JlVXRpbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJCbHVldG9vdGhTdG9yZURldmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yIChibHVldG9vdGhEZXZpY2UpIHtcclxuICAgIFZ1ZS5zZXQodGhpcywgJ2RldmljZScsIGJsdWV0b290aERldmljZSlcclxuICAgIFZ1ZS5zZXQodGhpcywgJ2dhdHQnLCBibHVldG9vdGhEZXZpY2UuZ2F0dClcclxuICAgIFZ1ZS5zZXQodGhpcywgJ2Nvbm5lY3RlZCcsIGZhbHNlKVxyXG4gICAgVnVlLnNldCh0aGlzLCAnbmFtZScsIGJsdWV0b290aERldmljZS5uYW1lKVxyXG4gICAgVnVlLnNldCh0aGlzLCAnaWQnLCBibHVldG9vdGhEZXZpY2UuaWQpXHJcbiAgICB0aGlzLmRldmljZS5hZGRFdmVudExpc3RlbmVyKCdnYXR0c2VydmVyZGlzY29ubmVjdGVkJywgZXZlbnQgPT4ge1xyXG4gICAgICBWdWUuc2V0KHRoaXMsICdjb25uZWN0ZWQnLCBmYWxzZSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBhc3luYyBjb25uZWN0ICgpIHtcclxuICAgIGF3YWl0IHRoaXMuZ2F0dC5jb25uZWN0KClcclxuICAgIFZ1ZS5zZXQodGhpcywgJ2Nvbm5lY3RlZCcsIHRydWUpXHJcbiAgICBhd2FpdCB0aGlzLmRpc2NvdmVyU2VydmljZXMoKVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGlzY292ZXJTZXJ2aWNlIChtZXRhZGF0YSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIHNlcnZpY2UgPSBhd2FpdCB0aGlzLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2UobWV0YWRhdGEudXVpZClcclxuICAgICAgdmFyIHdlYkJsdWV0b290aFNlcnZpY2UgPSBuZXcgV2ViQmx1ZXRvb3RoU3RvcmVTZXJ2aWNlKHNlcnZpY2UpXHJcbiAgICAgIGlmIChtZXRhZGF0YS5jaGFyYWN0ZXJpc3RpY3MgJiYgbWV0YWRhdGEuY2hhcmFjdGVyaXN0aWNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBmb3IgKGxldCBjaGFyYWN0ZXJpc3RpY1VVSUQgb2YgbWV0YWRhdGEuY2hhcmFjdGVyaXN0aWNzKSB7XHJcbiAgICAgICAgICBhd2FpdCB3ZWJCbHVldG9vdGhTZXJ2aWNlLmRpc2NvdmVyQ2hhcmFjdGVyaXN0aWMoY2hhcmFjdGVyaXN0aWNVVUlEKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhd2FpdCB3ZWJCbHVldG9vdGhTZXJ2aWNlLmRpc2NvdmVyQ2hhcmFjdGVyaXN0aWNzKClcclxuICAgICAgfVxyXG4gICAgICBWdWUuc2V0KHRoaXMsIG1ldGFkYXRhLnV1aWQsIHdlYkJsdWV0b290aFNlcnZpY2UpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgcmV0cml2ZSBjaGFyYWN0ZXJpc3RpYyAnICsgbWV0YWRhdGEudXVpZCArICcgYmVjYXVzZTogJyArIGVycm9yKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGlzY292ZXJTZXJ2aWNlcyAoKSB7XHJcbiAgICAvLyBSZXRyaXZlIHRoZSBpbnRlbmRlZCBjb2xsZWN0aW9uIG9mIHNlcnZpY2VzXHJcbiAgICB2YXIgc2VydmljZUNvbGxlY3Rpb24gPSBhd2FpdCB0aGlzLmdhdHQuZ2V0UHJpbWFyeVNlcnZpY2VzKClcclxuICAgIC8vIFNldHVwIHRoZSBkaXNjb3ZlcmVkIHNlcnZpY2VzXHJcbiAgICBmb3IgKGxldCBibGVzZXJ2aWNlIG9mIHNlcnZpY2VDb2xsZWN0aW9uKSB7XHJcbiAgICAgIHZhciB3ZWJCbHVldG9vdGhTZXJ2aWNlID0gbmV3IFdlYkJsdWV0b290aFN0b3JlU2VydmljZShibGVzZXJ2aWNlKVxyXG4gICAgICBhd2FpdCB3ZWJCbHVldG9vdGhTZXJ2aWNlLmRpc2NvdmVyQ2hhcmFjdGVyaXN0aWNzKClcclxuICAgICAgVnVlLnNldCh0aGlzLCBibGVzZXJ2aWNlLnV1aWQsIHdlYkJsdWV0b290aFNlcnZpY2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXJ2aWNlRm9yMTZiaXQgKFVVSUQxNikge1xyXG4gICAgcmV0dXJuIHRoaXNbV2ViQmx1ZXRvb3RoU3RvcmVVdGlscy5jYW5ub25pY2FsVVVJREZvcjE2Yml0VVVJRChVVUlEMTYpXVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlRXJyb3IgKGNvbnRleHQsIGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdQcm90b3R5cGU6ICcgKyBjb250ZXh0ICsgJyAnICsgZXJyb3IpXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=