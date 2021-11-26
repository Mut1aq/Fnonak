const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 57,
  },
  //   city: {
  //     type: String,
  //     required: true,
  //   },
  phoneNumber: {
    type: Number,
    required: true,
  },
  image: [
    {
      url: String,
      filename: String,
    },
  ],
  dateOfBirth: {
    type: Date,
    required: true,
    max: "2003-01-01",
    min: "1960-01-01",
  },
  bio: {
    type: String,
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
