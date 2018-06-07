import mongoose from 'mongoose';
import Dict from './dict.model';

/**
 * Word of the day collection that only has one document at a time
 */
const WordSchema = new mongoose.Schema({
    word: {
        type: Dict.schema
    },
    createdAt: {
        type: Number,
        default: (new Date()).getTime()
    },
    child: Dict.schema
});

export default mongoose.model('Word', WordSchema);