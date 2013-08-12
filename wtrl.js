module.exports = function createLoggedRequestor (request, log) {
  return function logged_request () {
    var reqobj = request.apply(this, arguments);
    var startTime;
    reqobj.on('request', function(req) {
      startTime = new Date();
    });
    reqobj.on('response', function(res) {
      var socketLog = log.createSublogger(
        res.socket.localAddress + ":" + res.socket.localPort);
      var level = res.statusCode < 400 ? 'info' : 'warn';
      socketLog.log(level, [
        res.request.method, res.request.uri.href, res.statusCode, 
        (new Date() - startTime) + "ms "
      ].join(' '));
      if (level == 'warn') socketLog.log(level, res.body.toString())
    });
    return reqobj;
  };
};
