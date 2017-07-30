'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = undefined;

var _mutationTypes = require('./mutation-types');

var mutationTypes = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var actions = exports.actions = {
  webBluetoothDiscovery: function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref, query) {
      var dispatch = _ref.dispatch,
          commit = _ref.commit;

      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, service;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(query.services === undefined)) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return query.device.discoverServices();

            case 3:
              _context.next = 31;
              break;

            case 5:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 8;
              _iterator = query.services[Symbol.iterator]();

            case 10:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 17;
                break;
              }

              service = _step.value;
              _context.next = 14;
              return query.device.discoverService(service);

            case 14:
              _iteratorNormalCompletion = true;
              _context.next = 10;
              break;

            case 17:
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context['catch'](8);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 23:
              _context.prev = 23;
              _context.prev = 24;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 26:
              _context.prev = 26;

              if (!_didIteratorError) {
                _context.next = 29;
                break;
              }

              throw _iteratorError;

            case 29:
              return _context.finish(26);

            case 30:
              return _context.finish(23);

            case 31:
              commit(mutationTypes.BLE_DEVICE_UPDATED, { device: query.device });

            case 32:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[8, 19, 23, 31], [24,, 26, 30]]);
    }));

    function webBluetoothDiscovery(_x, _x2) {
      return _ref2.apply(this, arguments);
    }

    return webBluetoothDiscovery;
  }()
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3NlcnZpY2UuanMiXSwibmFtZXMiOlsibXV0YXRpb25UeXBlcyIsImFjdGlvbnMiLCJ3ZWJCbHVldG9vdGhEaXNjb3ZlcnkiLCJxdWVyeSIsImRpc3BhdGNoIiwiY29tbWl0Iiwic2VydmljZXMiLCJ1bmRlZmluZWQiLCJkZXZpY2UiLCJkaXNjb3ZlclNlcnZpY2VzIiwic2VydmljZSIsImRpc2NvdmVyU2VydmljZSIsIkJMRV9ERVZJQ0VfVVBEQVRFRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztJQUFZQSxhOzs7Ozs7QUFFTCxJQUFNQyw0QkFBVTtBQUNmQyx1QkFEZTtBQUFBLGlGQUM4QkMsS0FEOUI7QUFBQSxVQUNVQyxRQURWLFFBQ1VBLFFBRFY7QUFBQSxVQUNvQkMsTUFEcEIsUUFDb0JBLE1BRHBCOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBRWZGLE1BQU1HLFFBQU4sS0FBbUJDLFNBRko7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxxQkFHWEosTUFBTUssTUFBTixDQUFhQyxnQkFBYixFQUhXOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBS0dOLE1BQU1HLFFBTFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLUkkscUJBTFE7QUFBQTtBQUFBLHFCQU1UUCxNQUFNSyxNQUFOLENBQWFHLGVBQWIsQ0FBNkJELE9BQTdCLENBTlM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQVNuQkwscUJBQU9MLGNBQWNZLGtCQUFyQixFQUF5QyxFQUFDSixRQUFRTCxNQUFNSyxNQUFmLEVBQXpDOztBQVRtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLENBQWhCIiwiZmlsZSI6InNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtdXRhdGlvblR5cGVzIGZyb20gJy4vbXV0YXRpb24tdHlwZXMnXHJcblxyXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcclxuICBhc3luYyB3ZWJCbHVldG9vdGhEaXNjb3ZlcnkgKHsgZGlzcGF0Y2gsIGNvbW1pdCB9LCBxdWVyeSkge1xyXG4gICAgaWYgKHF1ZXJ5LnNlcnZpY2VzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgYXdhaXQgcXVlcnkuZGV2aWNlLmRpc2NvdmVyU2VydmljZXMoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgc2VydmljZSBvZiBxdWVyeS5zZXJ2aWNlcykge1xyXG4gICAgICAgIGF3YWl0IHF1ZXJ5LmRldmljZS5kaXNjb3ZlclNlcnZpY2Uoc2VydmljZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tbWl0KG11dGF0aW9uVHlwZXMuQkxFX0RFVklDRV9VUERBVEVELCB7ZGV2aWNlOiBxdWVyeS5kZXZpY2V9KVxyXG4gIH1cclxufVxyXG4iXX0=