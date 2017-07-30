'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _WebBluetoothStoreCharacteristic = require('./WebBluetoothStoreCharacteristic');

var _WebBluetoothStoreCharacteristic2 = _interopRequireDefault(_WebBluetoothStoreCharacteristic);

var _WebBluetoothStoreUtils = require('./WebBluetoothStoreUtils');

var _WebBluetoothStoreUtils2 = _interopRequireDefault(_WebBluetoothStoreUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebBluetoothStoreService = function () {
  /*
    service should be a BluetoothRemoteGATTService instance
  */
  function WebBluetoothStoreService(service) {
    _classCallCheck(this, WebBluetoothStoreService);

    _vue2.default.set(this, 'service', service);
  }

  _createClass(WebBluetoothStoreService, [{
    key: 'discoverCharacteristic',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(uuid) {
        var characteristic;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.service.getCharacteristic(uuid);

              case 3:
                characteristic = _context.sent;
                _context.next = 6;
                return this.initaliseCharacteristic(characteristic);

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                console.error('Could not retrive characteristic ' + uuid + ' because: ' + _context.t0);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function discoverCharacteristic(_x) {
        return _ref.apply(this, arguments);
      }

      return discoverCharacteristic;
    }()
  }, {
    key: 'discoverCharacteristics',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var characteristicsToDiscover = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        var characteristicCollection, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, characteristic;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.service.getCharacteristics();

              case 2:
                characteristicCollection = _context2.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 6;
                _iterator = characteristicCollection[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 15;
                  break;
                }

                characteristic = _step.value;
                _context2.next = 12;
                return this.initaliseCharacteristic(characteristic);

              case 12:
                _iteratorNormalCompletion = true;
                _context2.next = 8;
                break;

              case 15:
                _context2.next = 21;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2['catch'](6);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 21:
                _context2.prev = 21;
                _context2.prev = 22;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 24:
                _context2.prev = 24;

                if (!_didIteratorError) {
                  _context2.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context2.finish(24);

              case 28:
                return _context2.finish(21);

              case 29:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 17, 21, 29], [22,, 24, 28]]);
      }));

      function discoverCharacteristics() {
        return _ref2.apply(this, arguments);
      }

      return discoverCharacteristics;
    }()
  }, {
    key: 'initaliseCharacteristic',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(characteristic) {
        var webBluetoothStoreCharacteristic;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                webBluetoothStoreCharacteristic = new _WebBluetoothStoreCharacteristic2.default(characteristic);
                _context3.next = 3;
                return webBluetoothStoreCharacteristic.configure();

              case 3:
                _vue2.default.set(this, characteristic.uuid, webBluetoothStoreCharacteristic);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function initaliseCharacteristic(_x3) {
        return _ref3.apply(this, arguments);
      }

      return initaliseCharacteristic;
    }()
  }, {
    key: 'characteristicFor16bit',
    value: function characteristicFor16bit(UUID16) {
      return this[_WebBluetoothStoreUtils2.default.cannonicalUUIDFor16bitUUID(UUID16)];
    }
  }]);

  return WebBluetoothStoreService;
}();

exports.default = WebBluetoothStoreService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvV2ViQmx1ZXRvb3RoU3RvcmVTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIldlYkJsdWV0b290aFN0b3JlU2VydmljZSIsInNlcnZpY2UiLCJzZXQiLCJ1dWlkIiwiZ2V0Q2hhcmFjdGVyaXN0aWMiLCJjaGFyYWN0ZXJpc3RpYyIsImluaXRhbGlzZUNoYXJhY3RlcmlzdGljIiwiY29uc29sZSIsImVycm9yIiwiY2hhcmFjdGVyaXN0aWNzVG9EaXNjb3ZlciIsInVuZGVmaW5lZCIsImdldENoYXJhY3RlcmlzdGljcyIsImNoYXJhY3RlcmlzdGljQ29sbGVjdGlvbiIsIndlYkJsdWV0b290aFN0b3JlQ2hhcmFjdGVyaXN0aWMiLCJjb25maWd1cmUiLCJVVUlEMTYiLCJjYW5ub25pY2FsVVVJREZvcjE2Yml0VVVJRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLHdCO0FBQ25COzs7QUFHQSxvQ0FBYUMsT0FBYixFQUFzQjtBQUFBOztBQUNwQixrQkFBSUMsR0FBSixDQUFRLElBQVIsRUFBYyxTQUFkLEVBQXlCRCxPQUF6QjtBQUNEOzs7Ozs0RUFFNkJFLEk7Ozs7Ozs7O3VCQUVDLEtBQUtGLE9BQUwsQ0FBYUcsaUJBQWIsQ0FBK0JELElBQS9CLEM7OztBQUF2QkUsOEI7O3VCQUNFLEtBQUtDLHVCQUFMLENBQTZCRCxjQUE3QixDOzs7Ozs7Ozs7O0FBRU5FLHdCQUFRQyxLQUFSLENBQWMsc0NBQXNDTCxJQUF0QyxHQUE2QyxZQUE3QyxjQUFkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUkyQk0seUIsdUVBQTRCQyxTOzs7Ozs7Ozs7dUJBQ3BCLEtBQUtULE9BQUwsQ0FBYVUsa0JBQWIsRTs7O0FBQWpDQyx3Qzs7Ozs7NEJBQ3VCQSx3Qjs7Ozs7Ozs7QUFBbEJQLDhCOzt1QkFDRCxLQUFLQyx1QkFBTCxDQUE2QkQsY0FBN0IsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4RUFJcUJBLGM7Ozs7OztBQUN6QlEsK0MsR0FBa0MsOENBQW9DUixjQUFwQyxDOzt1QkFDaENRLGdDQUFnQ0MsU0FBaEMsRTs7O0FBQ04sOEJBQUlaLEdBQUosQ0FBUSxJQUFSLEVBQWNHLGVBQWVGLElBQTdCLEVBQW1DVSwrQkFBbkM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0FHc0JFLE0sRUFBUTtBQUM5QixhQUFPLEtBQUssaUNBQXVCQywwQkFBdkIsQ0FBa0RELE1BQWxELENBQUwsQ0FBUDtBQUNEOzs7Ozs7a0JBaENrQmYsd0IiLCJmaWxlIjoiV2ViQmx1ZXRvb3RoU3RvcmVTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXHJcbmltcG9ydCBXZWJCbHVldG9vdGhTdG9yZUNoYXJhY3RlcmlzdGljIGZyb20gJy4vV2ViQmx1ZXRvb3RoU3RvcmVDaGFyYWN0ZXJpc3RpYydcclxuaW1wb3J0IFdlYkJsdWV0b290aFN0b3JlVXRpbHMgZnJvbSAnLi9XZWJCbHVldG9vdGhTdG9yZVV0aWxzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViQmx1ZXRvb3RoU3RvcmVTZXJ2aWNlIHtcclxuICAvKlxyXG4gICAgc2VydmljZSBzaG91bGQgYmUgYSBCbHVldG9vdGhSZW1vdGVHQVRUU2VydmljZSBpbnN0YW5jZVxyXG4gICovXHJcbiAgY29uc3RydWN0b3IgKHNlcnZpY2UpIHtcclxuICAgIFZ1ZS5zZXQodGhpcywgJ3NlcnZpY2UnLCBzZXJ2aWNlKVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGlzY292ZXJDaGFyYWN0ZXJpc3RpYyAodXVpZCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIGNoYXJhY3RlcmlzdGljID0gYXdhaXQgdGhpcy5zZXJ2aWNlLmdldENoYXJhY3RlcmlzdGljKHV1aWQpXHJcbiAgICAgIGF3YWl0IHRoaXMuaW5pdGFsaXNlQ2hhcmFjdGVyaXN0aWMoY2hhcmFjdGVyaXN0aWMpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgcmV0cml2ZSBjaGFyYWN0ZXJpc3RpYyAnICsgdXVpZCArICcgYmVjYXVzZTogJyArIGVycm9yKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGlzY292ZXJDaGFyYWN0ZXJpc3RpY3MgKGNoYXJhY3RlcmlzdGljc1RvRGlzY292ZXIgPSB1bmRlZmluZWQpIHtcclxuICAgIHZhciBjaGFyYWN0ZXJpc3RpY0NvbGxlY3Rpb24gPSBhd2FpdCB0aGlzLnNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWNzKClcclxuICAgIGZvciAobGV0IGNoYXJhY3RlcmlzdGljIG9mIGNoYXJhY3RlcmlzdGljQ29sbGVjdGlvbikge1xyXG4gICAgICBhd2FpdCB0aGlzLmluaXRhbGlzZUNoYXJhY3RlcmlzdGljKGNoYXJhY3RlcmlzdGljKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgaW5pdGFsaXNlQ2hhcmFjdGVyaXN0aWMgKGNoYXJhY3RlcmlzdGljKSB7XHJcbiAgICB2YXIgd2ViQmx1ZXRvb3RoU3RvcmVDaGFyYWN0ZXJpc3RpYyA9IG5ldyBXZWJCbHVldG9vdGhTdG9yZUNoYXJhY3RlcmlzdGljKGNoYXJhY3RlcmlzdGljKVxyXG4gICAgYXdhaXQgd2ViQmx1ZXRvb3RoU3RvcmVDaGFyYWN0ZXJpc3RpYy5jb25maWd1cmUoKVxyXG4gICAgVnVlLnNldCh0aGlzLCBjaGFyYWN0ZXJpc3RpYy51dWlkLCB3ZWJCbHVldG9vdGhTdG9yZUNoYXJhY3RlcmlzdGljKVxyXG4gIH1cclxuXHJcbiAgY2hhcmFjdGVyaXN0aWNGb3IxNmJpdCAoVVVJRDE2KSB7XHJcbiAgICByZXR1cm4gdGhpc1tXZWJCbHVldG9vdGhTdG9yZVV0aWxzLmNhbm5vbmljYWxVVUlERm9yMTZiaXRVVUlEKFVVSUQxNildXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=