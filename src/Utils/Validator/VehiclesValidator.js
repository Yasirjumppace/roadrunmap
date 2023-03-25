import joi from "joi";

//create vehicle validator

export const createVehicleValidator = joi.object({
  Manufacture: joi.string(),
  Make: joi.string(),
  Model: joi.string(),
  Image: joi.string(),
  Type: joi.string().equal("Car", "Bike"),
});

export const updateVehicleValidator = joi.object({
  Manufacture: joi.string(),
  Make: joi.string(),
  Model: joi.string(),
  Image: joi.string(),
  Type: joi.string().equal("Car", "Bike"),
});
