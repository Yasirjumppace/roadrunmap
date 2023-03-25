import { Router, application } from "express"; 


import * as VehicleControllers from "../Controller/Vehicles.js";

export const VehicleRouters = Router();


application.prefix = Router.prefix = function (path, middleware, configure) {
  configure(VehicleRouters);
  this.use(path, middleware, VehicleRouters);
  return VehicleRouters;
};


//create vehicle Router


VehicleRouters.route( "/vehicle/create" ).post( VehicleControllers.createVehicle );


//get vehicle Router


VehicleRouters.route( "/vehicle/get" ).get( VehicleControllers.getVehicle );


//update vehicle Router

VehicleRouters.route( "/vehicle/update/:id" ).put( VehicleControllers.updateVehicle );

//delete vehicle Router

VehicleRouters.route( "/vehicle/delete/:id" ).delete( VehicleControllers.deleteVehicle );

