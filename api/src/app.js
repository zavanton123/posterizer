const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api-routes');
const db = require('./database/connection');

app.use(bodyParser.json());

app.use('/api', apiRouter);

// add error processing
app.use((error, req, res, next) => {
  const status = error.status || 500;
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
  app.listen(3000);
});
