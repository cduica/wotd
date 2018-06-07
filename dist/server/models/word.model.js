'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dict = require('./dict.model');

var _dict2 = _interopRequireDefault(_dict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WordSchema = new _mongoose2.default.Schema({
    word: {
        type: _dict2.default.schema
    },
    createdAt: {
        type: Number,
        default: new Date().getTime()
    },
    child: _dict2.default.schema
});

exports.default = _mongoose2.default.model('Word', WordSchema);