import express from "express";
import { 
    warehouseRouter,
    driverRouter,
    shipmentRouter,
    vehicleRouter
} from "./index.js";


const routes = express();

routes.use("/warehouses", warehouseRouter);
routes.use("/drivers", driverRouter);
routes.use("/shipments", shipmentRouter);
routes.use("/vehicles", vehicleRouter);

export default routes;



