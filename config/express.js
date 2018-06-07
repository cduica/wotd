import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import routes from '../server/routes/index.route';
import httpStatus from 'http-status';

const app = express();

app.use(cors());
app.use('/api', routes);

app.use((req, res, next) => 
    res.status(httpStatus.NOT_FOUND).json({
        message: "Not found"
    })
);

export default app;