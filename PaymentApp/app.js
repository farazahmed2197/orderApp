const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = require('./util/port').PORT;
const LOGGER = require('./util/logger');
const logger = require('morgan');
const host = 'localhost';
var cors = require('cors')


app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//  Header Setup ///////////////////
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin , X-Requested-With , Content-Type , Accept , Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", 'PUT , POST , PATCH , DELETE , GET');
    return res.status(200).json({});
  }
  next();
});

//payment route

app.post('/payment', (req, res) => {
  const state = Math.round(Math.random() > 0.5 ? 1 : 0)
  console.log(state);
  res.send(state == 1 ? true : false);
})

//Error Handlers    ///////////
app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    Error: {
      message: error.message
    }
  });
});
///////////////////////////////////

app.listen(PORT, (error) => {
  if (error) return LOGGER.error(error.meesage);
  LOGGER.appStarted(PORT, host);
})