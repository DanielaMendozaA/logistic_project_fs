import { Router } from "express";

export const vehicleRouter = Router();

vehicleRouter.get("/vehicles", (req, res) => {
    res.send("hola desde vehicles")

})