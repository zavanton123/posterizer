const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api-routes');
const db = require('./database/connection');

app.use(bodyParser.json());

app.use('/api', apiRouter);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`zavanton - connected to MongoDB`);
  app.listen(3000);
});
