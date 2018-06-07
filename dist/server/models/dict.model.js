'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DictSchema = new _mongoose2.default.Schema({
    word: {
        type: String
    },
    definition: {
        type: String
    }
});

DictSchema.statics = {
    get: function get(id) {
        return this.findOne({ word: id }).exec().then(function (word) {
            if (word) {
                return word;
            }
            var err = new Error('Word not found');
            return _bluebird2.default.reject(err);
        });
    }
};

exports.default = _mongoose2.default.model('Dict', DictSchema);