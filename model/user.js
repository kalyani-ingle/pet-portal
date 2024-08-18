const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "Enter valid first name with more than 2 characters"],
    // validate: {
    //   validator: function (v) {
    //     return /^[a-zA-Z.\s]+$/;
    //   },
    //   message: "First name can contain only letters",
    // },
  },

  lastname: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Enter valid last name with more than 2 characters"],
    // validate: {
    //   validator: function (v) {
    //     return /^[a-zA-Z.\s]+$/;
    //   },
    //   message: "Last name can contain only letters",
    // },
  },

  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      },
      message: "Please enter a valid email",
    },
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (v) {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      },
      message:
        "Minimum 8 characters in length, atleast one uppercase, one lowercase, one digit and one special character",
    },
  },

  date: {
    type: Date,
    default: Date.now,
  }
  
});

module.exports = mongoose.model("user", userSchema);


