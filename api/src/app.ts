import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import {db} from "./database/connection";
import {APP_PORT, HTTP_SERVER_ERROR} from "./utils/constants";
import apiRouter from "./routes/api-routes";

const app = express();

// app.use('/', (req: Request, res: Response, next: NextFunction) => {
//   return res.send("Hello world");
// });
// app.listen(5000);

// Setup body-parser
app.use(bodyParser.json());

// CORS headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// REST endpoints
app.use('/', apiRouter);

// Add error processing
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || HTTP_SERVER_ERROR;
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
  console.log('zavanton - connected to MongoDB');
  app.listen(APP_PORT);
});
