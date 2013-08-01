var request = require('request');
var wtrl = require('../');
var winston = require('winston');
var Tagdlogr = require('tagged-logger')
var assert = require('assert');
var http = require('http');

describe('tagged request logger', function() {
  var logger;
  var transport;
  var server;
  before(function(done) {
    server = http.createServer(function(req, res) {
      if (req.url == '/thing') {
        res.writeHead(200);
        res.end('OK');
      } else {
        res.writeHead(404);
        res.end('Not OK :(');
      }
    })
    server.listen(32962, done);
  });
  beforeEach(function() {
    transport = new winston.transports.Memory();
    var baseLogger = new winston.Logger({transports: [transport]});
    logger = new Tagdlogr(baseLogger, []);
  });

  after(function(done) {
    server.close(done);
  });

  it('should log a requestjs request', function(done) {
    var requestor = wtrl(request, logger);
    requestor('http://localhost:32962/thing', function(err, res, body) {
      assert(!err);
      assert(transport.writeOutput.length == 1);
      assert(transport.writeOutput[0].match(/get/i));
      assert(transport.writeOutput[0].match(/200/));
      console.log(transport.writeOutput[0]);
      done();
    });
  });
});
