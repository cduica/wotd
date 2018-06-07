import mongoose from 'mongoose';

import config from './config/config';
import app from './config/express';

Promise = require('bluebird');

mongoose.Promise = Promise;

const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, {server: { socketOptions: {keepAlive: 1}}});
mongoose.connection.on('error', () => {
    throw new Error('Unable to connect to database');
})

app.listen(config.port, () => {
    console.info(`server started on port ${config.port}`)
});

export default app;