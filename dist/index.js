'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Promise = require('bluebird');

_mongoose2.default.Promise = Promise;

var mongoUri = _config2.default.mongo.host;
_mongoose2.default.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
_mongoose2.default.connection.on('error', function () {
    throw new Error('Unable to connect to database');
});

_express2.default.listen(_config2.default.port, function () {
    console.info('server started on port ' + _config2.default.port);
});

exports.default = _express2.default;