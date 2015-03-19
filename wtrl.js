module.exports = function createLoggedRequestor (request, log) {
  return function logged_request () {
    var reqobj = request.apply(this, arguments);
    var startTime;
    reqobj.on('request', function(req) {
      startTime = new Date();
    });
    reqobj.on('response', function(res) {
      var level = res.statusCode < 400 ? 'info' : 'warn';
      log.log(level, [
        res.request.method, res.request.uri.href, res.statusCode, 
        (new Date() - startTime) + "ms "
      ].join(' '));
      if (level == 'warn') {
        var body = '';
        res.on('data', function(ch) { body += ch });
        res.on('end', function() {
          log.log(level, body);
        });
      }
    });
    return reqobj;
  };
};
