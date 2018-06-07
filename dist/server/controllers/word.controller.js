'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _word = require('../models/word.model');

var _word2 = _interopRequireDefault(_word);

var _dict = require('../models/dict.model');

var _dict2 = _interopRequireDefault(_dict);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function load(req, res, next) {
    // check to see if the current word of the day is expired
    _word2.default.findOne().then(function (response) {
        // if more than 24 hours have passed since wotd was last set, change it
        //86400000
        if (new Date().getTime() - response.createdAt > 2) {
            return response.remove().then(function () {
                return getRandomWord().then(function (result) {
                    var word = new _word2.default({ word: result, createdAt: new Date().getTime() });
                    word.save().then(function () {
                        req.word = result;
                        return next();
                    });
                });
            });
        }
        req.word = response;
        return next();
    }).catch(function () {
        getRandomWord().then(function (result) {
            console.log(result);
            var word = new _word2.default({ word: result, createdAt: new Date().getTime() });
            word.save().then(function () {
                req.word = result;
                return next();
            });
        });
    });
}

function getWord(req, res) {
    res.json(req.word);
}

function getRandomWord() {
    return _dict2.default.count().exec().then(function (count) {
        var random = Math.floor(Math.random() * count);
        console.log(random);
        return _dict2.default.findOne().skip(random).exec().then(function (result) {
            if (result) {
                console.log(result);
                return result;
            }
            var err = new Error('Random word not found');
            _bluebird2.default.reject(err);
        });
    });
}

exports.default = { load: load, getWord: getWord };