'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebBluetoothStoreCharacteristic = function () {
  function WebBluetoothStoreCharacteristic(characteristic) {
    _classCallCheck(this, WebBluetoothStoreCharacteristic);

    _vue2.default.set(this, 'characteristic', characteristic);
    _vue2.default.set(this, 'value', undefined);
  }

  _createClass(WebBluetoothStoreCharacteristic, [{
    key: 'configure',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.characteristic.addEventListener('characteristicvaluechanged', function (event) {
                  _vue2.default.set(_this, 'value', event.target.value);
                });

                if (!this.characteristic.properties.read) {
                  _context.next = 10;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return this.characteristic.readValue();

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](2);

                console.error('Could not read value for ' + this.characteristic.uuid + '  error: ' + _context.t0);

              case 10:
                if (!(this.characteristic.properties.notify || this.characteristic.properties.indicate)) {
                  _context.next = 19;
                  break;
                }

                _context.prev = 11;
                _context.next = 14;
                return this.characteristic.startNotifications();

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t1 = _context['catch'](11);

                console.error('Could not start notifications for ' + this.characteristic.uuid + '  error: ' + _context.t1);

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 7], [11, 16]]);
      }));

      function configure() {
        return _ref.apply(this, arguments);
      }

      return configure;
    }()
  }, {
    key: 'writeValue',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(dataUInt8Array) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.characteristic.writeValue(dataUInt8Array);

              case 3:
                _vue2.default.set(this, 'value', dataUInt8Array);
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);

                console.error('Could not write data for ' + this.characteristic.uuid + '  error: ' + _context2.t0);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function writeValue(_x) {
        return _ref2.apply(this, arguments);
      }

      return writeValue;
    }()
  }]);

  return WebBluetoothStoreCharacteristic;
}();

exports.default = WebBluetoothStoreCharacteristic;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvV2ViQmx1ZXRvb3RoU3RvcmVDaGFyYWN0ZXJpc3RpYy5qcyJdLCJuYW1lcyI6WyJXZWJCbHVldG9vdGhTdG9yZUNoYXJhY3RlcmlzdGljIiwiY2hhcmFjdGVyaXN0aWMiLCJzZXQiLCJ1bmRlZmluZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsInByb3BlcnRpZXMiLCJyZWFkIiwicmVhZFZhbHVlIiwiY29uc29sZSIsImVycm9yIiwidXVpZCIsIm5vdGlmeSIsImluZGljYXRlIiwic3RhcnROb3RpZmljYXRpb25zIiwiZGF0YVVJbnQ4QXJyYXkiLCJ3cml0ZVZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7O0lBRXFCQSwrQjtBQUVuQiwyQ0FBYUMsY0FBYixFQUE2QjtBQUFBOztBQUMzQixrQkFBSUMsR0FBSixDQUFRLElBQVIsRUFBYyxnQkFBZCxFQUFnQ0QsY0FBaEM7QUFDQSxrQkFBSUMsR0FBSixDQUFRLElBQVIsRUFBYyxPQUFkLEVBQXVCQyxTQUF2QjtBQUNEOzs7Ozs7Ozs7Ozs7QUFHQyxxQkFBS0YsY0FBTCxDQUFvQkcsZ0JBQXBCLENBQXFDLDRCQUFyQyxFQUFtRSxpQkFBUztBQUMxRSxnQ0FBSUYsR0FBSixRQUFjLE9BQWQsRUFBdUJHLE1BQU1DLE1BQU4sQ0FBYUMsS0FBcEM7QUFDRCxpQkFGRDs7cUJBR0ksS0FBS04sY0FBTCxDQUFvQk8sVUFBcEIsQ0FBK0JDLEk7Ozs7Ozs7dUJBRXpCLEtBQUtSLGNBQUwsQ0FBb0JTLFNBQXBCLEU7Ozs7Ozs7Ozs7QUFFTkMsd0JBQVFDLEtBQVIsQ0FBYyw4QkFBOEIsS0FBS1gsY0FBTCxDQUFvQlksSUFBbEQsR0FBeUQsV0FBekQsY0FBZDs7O3NCQUdBLEtBQUtaLGNBQUwsQ0FBb0JPLFVBQXBCLENBQStCTSxNQUEvQixJQUF5QyxLQUFLYixjQUFMLENBQW9CTyxVQUFwQixDQUErQk8sUTs7Ozs7Ozt1QkFFbEUsS0FBS2QsY0FBTCxDQUFvQmUsa0JBQXBCLEU7Ozs7Ozs7Ozs7QUFFTkwsd0JBQVFDLEtBQVIsQ0FBYyx1Q0FBdUMsS0FBS1gsY0FBTCxDQUFvQlksSUFBM0QsR0FBa0UsV0FBbEUsY0FBZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4RUFLWUksYzs7Ozs7Ozt1QkFFUixLQUFLaEIsY0FBTCxDQUFvQmlCLFVBQXBCLENBQStCRCxjQUEvQixDOzs7QUFDTiw4QkFBSWYsR0FBSixDQUFRLElBQVIsRUFBYyxPQUFkLEVBQXVCZSxjQUF2Qjs7Ozs7Ozs7QUFFQU4sd0JBQVFDLEtBQVIsQ0FBYyw4QkFBOEIsS0FBS1gsY0FBTCxDQUFvQlksSUFBbEQsR0FBeUQsV0FBekQsZUFBZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWhDZWIsK0IiLCJmaWxlIjoiV2ViQmx1ZXRvb3RoU3RvcmVDaGFyYWN0ZXJpc3RpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWdWUgZnJvbSAndnVlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViQmx1ZXRvb3RoU3RvcmVDaGFyYWN0ZXJpc3RpYyB7XHJcblxyXG4gIGNvbnN0cnVjdG9yIChjaGFyYWN0ZXJpc3RpYykge1xyXG4gICAgVnVlLnNldCh0aGlzLCAnY2hhcmFjdGVyaXN0aWMnLCBjaGFyYWN0ZXJpc3RpYylcclxuICAgIFZ1ZS5zZXQodGhpcywgJ3ZhbHVlJywgdW5kZWZpbmVkKVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlndXJlICgpIHtcclxuICAgIHRoaXMuY2hhcmFjdGVyaXN0aWMuYWRkRXZlbnRMaXN0ZW5lcignY2hhcmFjdGVyaXN0aWN2YWx1ZWNoYW5nZWQnLCBldmVudCA9PiB7XHJcbiAgICAgIFZ1ZS5zZXQodGhpcywgJ3ZhbHVlJywgZXZlbnQudGFyZ2V0LnZhbHVlKVxyXG4gICAgfSlcclxuICAgIGlmICh0aGlzLmNoYXJhY3RlcmlzdGljLnByb3BlcnRpZXMucmVhZCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY2hhcmFjdGVyaXN0aWMucmVhZFZhbHVlKClcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgcmVhZCB2YWx1ZSBmb3IgJyArIHRoaXMuY2hhcmFjdGVyaXN0aWMudXVpZCArICcgIGVycm9yOiAnICsgZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0aGlzLmNoYXJhY3RlcmlzdGljLnByb3BlcnRpZXMubm90aWZ5IHx8IHRoaXMuY2hhcmFjdGVyaXN0aWMucHJvcGVydGllcy5pbmRpY2F0ZSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY2hhcmFjdGVyaXN0aWMuc3RhcnROb3RpZmljYXRpb25zKClcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3Qgc3RhcnQgbm90aWZpY2F0aW9ucyBmb3IgJyArIHRoaXMuY2hhcmFjdGVyaXN0aWMudXVpZCArICcgIGVycm9yOiAnICsgZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHdyaXRlVmFsdWUgKGRhdGFVSW50OEFycmF5KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0aGlzLmNoYXJhY3RlcmlzdGljLndyaXRlVmFsdWUoZGF0YVVJbnQ4QXJyYXkpXHJcbiAgICAgIFZ1ZS5zZXQodGhpcywgJ3ZhbHVlJywgZGF0YVVJbnQ4QXJyYXkpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3Qgd3JpdGUgZGF0YSBmb3IgJyArIHRoaXMuY2hhcmFjdGVyaXN0aWMudXVpZCArICcgIGVycm9yOiAnICsgZXJyb3IpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==