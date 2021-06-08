import mongoose from "mongoose";

const {DBPORT, DBNAME} = process.env;

const url = `mongodb://database:${DBPORT}/${DBNAME}`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to the database
mongoose.connect(url, options);

export const db = mongoose.connection;
