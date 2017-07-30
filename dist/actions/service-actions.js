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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3NlcnZpY2UtYWN0aW9ucy5qcyJdLCJuYW1lcyI6WyJtdXRhdGlvblR5cGVzIiwiYWN0aW9ucyIsIndlYkJsdWV0b290aERpc2NvdmVyeSIsInF1ZXJ5IiwiZGlzcGF0Y2giLCJjb21taXQiLCJzZXJ2aWNlcyIsInVuZGVmaW5lZCIsImRldmljZSIsImRpc2NvdmVyU2VydmljZXMiLCJzZXJ2aWNlIiwiZGlzY292ZXJTZXJ2aWNlIiwiQkxFX0RFVklDRV9VUERBVEVEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0lBQVlBLGE7Ozs7OztBQUVMLElBQU1DLDRCQUFVO0FBQ2ZDLHVCQURlO0FBQUEsaUZBQzhCQyxLQUQ5QjtBQUFBLFVBQ1VDLFFBRFYsUUFDVUEsUUFEVjtBQUFBLFVBQ29CQyxNQURwQixRQUNvQkEsTUFEcEI7O0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFFZkYsTUFBTUcsUUFBTixLQUFtQkMsU0FGSjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLHFCQUdYSixNQUFNSyxNQUFOLENBQWFDLGdCQUFiLEVBSFc7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFLR04sTUFBTUcsUUFMVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtSSSxxQkFMUTtBQUFBO0FBQUEscUJBTVRQLE1BQU1LLE1BQU4sQ0FBYUcsZUFBYixDQUE2QkQsT0FBN0IsQ0FOUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBU25CTCxxQkFBT0wsY0FBY1ksa0JBQXJCLEVBQXlDLEVBQUNKLFFBQVFMLE1BQU1LLE1BQWYsRUFBekM7O0FBVG1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsQ0FBaEIiLCJmaWxlIjoic2VydmljZS1hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbXV0YXRpb25UeXBlcyBmcm9tICcuL211dGF0aW9uLXR5cGVzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSB7XHJcbiAgYXN5bmMgd2ViQmx1ZXRvb3RoRGlzY292ZXJ5ICh7IGRpc3BhdGNoLCBjb21taXQgfSwgcXVlcnkpIHtcclxuICAgIGlmIChxdWVyeS5zZXJ2aWNlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGF3YWl0IHF1ZXJ5LmRldmljZS5kaXNjb3ZlclNlcnZpY2VzKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IHNlcnZpY2Ugb2YgcXVlcnkuc2VydmljZXMpIHtcclxuICAgICAgICBhd2FpdCBxdWVyeS5kZXZpY2UuZGlzY292ZXJTZXJ2aWNlKHNlcnZpY2UpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbW1pdChtdXRhdGlvblR5cGVzLkJMRV9ERVZJQ0VfVVBEQVRFRCwge2RldmljZTogcXVlcnkuZGV2aWNlfSlcclxuICB9XHJcbn1cclxuIl19