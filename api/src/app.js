const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api-routes');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.listen(3000);
