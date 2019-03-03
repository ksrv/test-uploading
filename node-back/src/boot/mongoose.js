import mongoose from 'mongoose';
import Debug from 'debug';

const debug = Debug('mongoose');

function onOpen () {
  debug('Mongo connected');
}

function onError (error) {
  debug(error);
}

mongoose.connection.once('open', onOpen);
mongoose.connection.on('error', onError);

mongoose.connect("mongodb://127.0.0.1:27017/ecias_task_db", { useNewUrlParser: true });


export default function (app) {
  app.use((req, res, next) => {
    res.locals.mongoose = mongoose;
    next();
  });
};


