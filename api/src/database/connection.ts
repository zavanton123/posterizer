import mongoose from "mongoose";

const {DBHOST, DBPORT, DBNAME} = process.env;

const url = `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to the database
mongoose.connect(url, options);

export const db = mongoose.connection;
