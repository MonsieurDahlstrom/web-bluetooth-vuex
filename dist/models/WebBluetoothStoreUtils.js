'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Cannonical128UUIDBase = '0000XXXX-0000-1000-8000-00805f9b34fb';

var WebBluetoothStoreUtils = {
  cannonicalUUIDFor16bitUUID: function cannonicalUUIDFor16bitUUID(UUID16) {
    return Cannonical128UUIDBase.replace('XXXX', UUID16.toString(16));
  }
};

exports.default = WebBluetoothStoreUtils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvV2ViQmx1ZXRvb3RoU3RvcmVVdGlscy5qcyJdLCJuYW1lcyI6WyJDYW5ub25pY2FsMTI4VVVJREJhc2UiLCJXZWJCbHVldG9vdGhTdG9yZVV0aWxzIiwiY2Fubm9uaWNhbFVVSURGb3IxNmJpdFVVSUQiLCJVVUlEMTYiLCJyZXBsYWNlIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTUEsd0JBQXdCLHNDQUE5Qjs7QUFFQSxJQUFNQyx5QkFBeUI7QUFDN0JDLDhCQUE0QixvQ0FBVUMsTUFBVixFQUFrQjtBQUM1QyxXQUFPSCxzQkFBc0JJLE9BQXRCLENBQThCLE1BQTlCLEVBQXNDRCxPQUFPRSxRQUFQLENBQWdCLEVBQWhCLENBQXRDLENBQVA7QUFDRDtBQUg0QixDQUEvQjs7a0JBTWVKLHNCIiwiZmlsZSI6IldlYkJsdWV0b290aFN0b3JlVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDYW5ub25pY2FsMTI4VVVJREJhc2UgPSAnMDAwMFhYWFgtMDAwMC0xMDAwLTgwMDAtMDA4MDVmOWIzNGZiJ1xyXG5cclxuY29uc3QgV2ViQmx1ZXRvb3RoU3RvcmVVdGlscyA9IHtcclxuICBjYW5ub25pY2FsVVVJREZvcjE2Yml0VVVJRDogZnVuY3Rpb24gKFVVSUQxNikge1xyXG4gICAgcmV0dXJuIENhbm5vbmljYWwxMjhVVUlEQmFzZS5yZXBsYWNlKCdYWFhYJywgVVVJRDE2LnRvU3RyaW5nKDE2KSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYkJsdWV0b290aFN0b3JlVXRpbHNcclxuIl19