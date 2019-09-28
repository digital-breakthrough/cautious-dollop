import config from "config";
import Mongoose from "mongoose";

Mongoose.connect(
  config.get("db.url"), {
    "useNewUrlParser": true,
    'useCreateIndex': true
  }
);

const db = Mongoose.connection;

db.on("error", err => {
  console.log(err);
});

db.on("open", () => {
  console.log("MongoDB successful connected");
});

export {
  db
};