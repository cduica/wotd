import mongoose from 'mongoose';
import Promise from 'bluebird';

/**
 * The Oxford english dictionary
 */
const DictSchema = new mongoose.Schema({
    word: {
        type: String
    }, 
    definition: {
        type: String
    }
});

DictSchema.statics = {
    get(id) {
        return this.findOne({word: id})
            .exec()
            .then((word) => {
               if(word) {
                   return word;
               }
               const err = new Error('Word not found');
               return Promise.reject(err);
            });
    }
}

export default mongoose.model('Dict', DictSchema);