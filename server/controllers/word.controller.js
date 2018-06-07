import Word from '../models/word.model';
import Dict from '../models/dict.model';
import Promise from 'bluebird';

function load(req, res, next) {
    // check to see if the current word of the day is expired
    Word.findOne()
        .then((response) => {
           // if more than 24 hours have passed since wotd was last set, change it
           //86400000 is 24 hours
            if((new Date()).getTime() - response.createdAt > 86400000) {
                return response.remove()
                .then(() => {
                    return getRandomWord()
                        .then((result) => {
                            const word = new Word({word: result, createdAt: (new Date()).getTime()});
                            word.save()
                                .then(() => {
                                    req.word = result;
                                    return next();
                                }) 
                        });
                    }
                )
           }
           req.word = response;
           return next();
        })
        .catch(() => {
            // if there is no word of the day in the database, add one
            getRandomWord()
                    .then((result) => {
                        console.log(result);
                        const word = new Word({word: result, createdAt: (new Date()).getTime()});
                        word.save()
                            .then(() => {
                                req.word = result;
                                return next();
                            }) 
                    });
        });
}

// gets called after load middleware is used
function getWord(req, res) {
    res.json(req.word);
}

// finds a random record in the database
function getRandomWord() {
    return Dict.count().exec()
        .then((count) => {
            const random = Math.floor(Math.random() * count);
            console.log(random);
            return Dict.findOne().skip(random).exec()
                .then((result) => {
                    if(result) {
                        console.log(result);
                        return result;
                    }
                    const err = new Error('Random word not found');
                    Promise.reject(err);
                })
        });
}

export default {load, getWord}