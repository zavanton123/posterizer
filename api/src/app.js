const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api-routes');
const db = require('./database/connection');
const {APP_PORT} = require("./utils/constants");
const {SERVER_ERROR} = require("./utils/constants");

// Setup body-parser
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// REST endpoints
app.use('/api', apiRouter);

// Add error processing
app.use((error, req, res, next) => {
  const status = error.status || SERVER_ERROR;
  const message = error.message;
  const data = error.data;
  return res.json({
    status: status,
    message: message,
    data: data
  });
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`zavanton - connected to MongoDB`);
  app.listen(APP_PORT);
});
