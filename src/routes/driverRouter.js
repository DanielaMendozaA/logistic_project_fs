import { Router } from "express";

export const driverRouter = Router();

driverRouter.get('/drivers', (req, res) => {
    res.send("desde drivers")

})