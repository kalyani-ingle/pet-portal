const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({  
  parentEmail: { 
    type: String, 
    required: true,
  },

  fullName: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Enter valid first name with more than 2 characters"],
  },

  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [10, "Enter valid address"],
  },

  mobile: {
    type: Number,
    required: [true, "Mobile is required"],
    minlength: [10, "Mobile number must have 10 digits"],
  },

  ZipCode: {
    type: Number,
    required: [true, "ZipCode is required"],
  },

  vetName: {
    type: String,
    required: [true, "VetName is required"],
    minlength: [2, "Enter a valid vetName"],
  },

  vetRegisNum: {
    type: String,
    required: [true, "Vet registration no is required"],
  },

  petName: {
    type: String,
    required: [true, "Pet name is required"],
  },

  petBreed: {
    type: String,
    required: [true, "Pet Breed is required"],
  },

  petGender: {
    type: String,
    enum:["Male", "Female"],
    required: [true],
    message:[`Gender is either 'Male' or 'Female'`]
  },

  petAge: {
    type: Number,
    required: [true, "Pet Age is required"],
  },

  neuterStatus: {
    type: String,
    enum: ["Yes", "No"],
    required: [true],
    message:[`Neuter Status is either 'Yes' or 'No'`]

  },

  microChip: {
    type: String,
    enum: ["Yes", "No"],
    required: [true],
    message:[`Micro Chip Status is either 'Yes' or 'No'`]

  },

  antiRabbiesVac: {
    type: Date,
    required: [true, "Anti-rabbies Vac date is required"],
  },
});

// Add the compound index to the schema
petSchema.index({ parentEmail: 1, petName: 1 }, { unique: true });

module.exports = mongoose.model("pet", petSchema);
