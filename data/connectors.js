import Mongoose from "mongoose";

Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect("mongodb://localhost:27017/hhproducts?authSource=admin", {
  user: "appAdmin",
  pass: "WsP010867@#$%",
  useMongoClient: true
});

// Connected handler
mongoose.connection.on('connected', function (err) {
  console.log("Connected to DB using chain: " + connectionString);
});

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});

const StudentSchema = Mongoose.Schema({
  name: { first: String, last: String },
  dob: String,
  picture: { large: String },
  location: {
    street: String,
    city: String,
    state: String,
    postcode: String
  },
  phone: String,
  cell: String,
  email: String,
  registered: Date,
  major: String,
  gpa: String,
  sid: String,
  modified: Date,
  modifiedby: String
});

const Students = Mongoose.model("students", StudentSchema);

export { Students };
