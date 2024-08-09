import { Router } from 'express';
import { readFile, warehousesFilePath, writeFile } from '../persistence/helperFs.js';

export const warehouseRouter = Router();

const warehousesPath = warehousesFilePath


warehouseRouter.post("/",  (req, res) => {
    const warehouses =  readFile(warehousesPath);

    const { name, location, driverId } = req.body;
   
    const newWarehouse = {
        id: Date.now(),
        name,
        location,
        driverId
    };


    warehouses.push(newWarehouse);
    writeFile(warehousesPath, warehouses);
    res.status(201).json({
        "message": "Warehouse created successfully",
        newWarehouse
    });

});


warehouseRouter.get("/", (req, res) => {
    const warehouses =  readFile(warehousesPath);

    res.json({warehouses})
});


warehouseRouter.get("/:id", (req, res) => {
    const warehouses =  readFile(warehousesPath);
    const warehouse = warehouses.find(w => w.id === parseInt(req.params.id));
    if(!warehouse) return res.status(400).send("Warehouse not found");

    res.send(warehouse)

});

warehouseRouter.put("/:id", (req, res) => {
    const warehouses =  readFile(warehousesPath);
    const indexWarehouse = warehouses.findIndex(w => w.id === parseInt(req.params.id));
    const { name, location } = req.body

    if(indexWarehouse === -1) return res.status(404).send("Warehouse not found");
    const updateWarehouse = {
        ...warehouses[indexWarehouse],
        name,
        location
    };

    warehouses[indexWarehouse] = updateWarehouse;
    writeFile(warehousesPath, warehouses);
    res.json({"message": "Warehouse updated successfully", updateWarehouse})

});


warehouseRouter.delete("/:id", (req, res) => {
    let warehouses =  readFile(warehousesPath);
    const warehouseToDelete = warehouses.find(w => w.id === parseInt(req.params.id));
    if(!warehouseToDelete) return res.send("Warehouse not found");
    warehouses = warehouses.filter(w => w.id !== warehouseToDelete.id);
    writeFile(warehousesPath, warehouses);
    res.json({"message": "Warehouse delete successfully"})
});


