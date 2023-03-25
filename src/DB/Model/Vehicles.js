import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  Manufacture: {
    type: String,
    required: true,
  },

  Make: {
    type: String,
    required: true,
  },
  Model: {
    type: String,
    required: true,
  },

  Image: {
    type: String,
    default: "",
  },

  Type: {
    type: String,
    enum: ["Car", "Bike"],
  },
});

const vehicleModel = mongoose.model("vehicles", vehicleSchema);

export default vehicleModel;
