# winston-tagged-request-logger

Connects [request.js](http://www.github.com/mikeal/request) to a
[tagged-logger](https://bitbucket.org/maghoff/tagged-logger). 

## install

```
npm install winston-tagged-request-logger
```

## usage

This will create a new [winston](https://github.com/flatiron/winston) 
[logger](https://github.com/flatiron/winston#instantiating-your-own-logger) and 
a new [tagged-logger](https://bitbucket.org/maghoff/tagged-logger/), and use
a [tagged-console-target](https://bitbucket.org/maghoff/tagged-console-target) 
to write the output to the console in all the colours of the rainbow.

```javascript

// create our winston logger
var winston = require('winston');
var winstonLogger = new winston.Logger();

// create a transport so our logs have somewhere to go
var TaggedConsoleTarget = require('tagged-console-target');
winston.add(new TaggedConsoleTarget());

// make a new tagged logger to generate tagged log messages
var TaggedLogger = require('tagged-logger');
var logger = new TaggedLogger(winstonLogger, ['my amazing server']);

// require requestjs and wrap it in winston-tagged-request-logger
var request = require('winston-tagged-request-logger')(require('request'), logger);

// All done! any requests created with `request` will be logged!
request('http://www.google.com', function(err, res, body) {
  //stuff!
});
```
