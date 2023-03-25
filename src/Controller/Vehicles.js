import vehicleModel from "../DB/Model/Vehicles.js";
// import { handleMultipartData } from "../Utils/MultipartData.js";

import {
  createVehicleValidator,
  updateVehicleValidator,
} from "../Utils/Validator/VehiclesValidator.js";

import CustomError from "../Utils/ResponseHandler/CustomError.js";
import CustomSuccess from "../Utils/ResponseHandler/CustomSuccess.js";
import multer from "multer";

const FILE_TYPE_MAP = {
  "application/pdf": "pdf",
  "application/doc": "doc",
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file)
    // console.log(req)

    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});
const uploadOptionsImage = multer({ storage: storage });
//create vehicles

export const createVehicle = [
  uploadOptionsImage.single("Image"),

  async (req, res, next) => {
    try {
      const { error } = createVehicleValidator.validate(req.body);

      if (error) {
        error.details.map((err) => {
          return next(CustomError.createError(err.message, 400));
        });
      }

      const file = req.file;
      if (!file) return res.status(400).send("No image in the request");
      const filepath = file.filename;
      const basePath = `https://${req.get("host")}/public/uploads/`;
      const { Manufacture, Make, Model, Type } = req.body;

      const createvehicle = await new vehicleModel({
        Manufacture,
        Make,
        Type,
        Model,
        Image: `${basePath}${filepath}`,
      }).save();
      console.log(createvehicle);
      if (!createvehicle) {
        return next(CustomError.createError("vehicle not create", 200));
      }

      return next(
        CustomSuccess.createSuccess(
          createvehicle,
          "vehicle create successfully",
          200
        )
      );
    } catch (error) {
      return next(CustomError.createError(error, 400));
    }
  },
];

//get vehicles

export const getVehicle = async (req, res, next) => {
  try {
    const getvehicle = await vehicleModel.find();

    if (!getvehicle) {
      return next(CustomError.createError("vehicle not found", 200));
    }
    if (getvehicle) {
      return next(
        CustomSuccess.createSuccess(
          getvehicle,
          "vehicle found succesfully",
          200
        )
      );
    }
  } catch (error) {
    return next(CustomError.createError(error, 400));
  }
};

//update vehicle
export const updateVehicle = [
  uploadOptionsImage.single("Image"),

  async (req, res, next) => {
    try {
      const { error } = updateVehicleValidator.validate(req.body);

      if (error) {
        error.details.map((err) => {
          return next(CustomError.createError(err.message, 400));
        });
      }
      const { id } = req.params;
      const file = req.file;
      if (!file) return res.status(400).send("No image in the request");
      const filepath = file.filename;
      const basePath = `https://${req.get("host")}/public/uploads/`;
      const { Manufacture, Make, Model, Type } = req.body;

      const createvehicle = await vehicleModel.findByIdAndUpdate(
        id,
        {
          Manufacture,
          Make,
          Type,
          Model,
          Image: `${basePath}${filepath}`,
        },
        { new: true }
      );
      console.log(createvehicle);
      if (!createvehicle) {
        return next(CustomError.createError("vehicle not update", 200));
      }

      return next(
        CustomSuccess.createSuccess(
          createvehicle,
          "vehicle update successfully",
          200
        )
      );
    } catch (error) {
      return next(CustomError.createError(error, 400));
    }
  },
];

//delete vehicle

export const deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletevehicle = await vehicleModel.findByIdAndDelete(id);

    if (!deletevehicle) {
      return next(CustomError.createError("vehicle not delte", 200));
    }

    return next(
      CustomSuccess.createSuccess({}, "vehicle delete successfully", 200)
    );
  } catch (error) {
    return next(CustomError.createError(error, 400));
  }
};
