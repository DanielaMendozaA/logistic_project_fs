import { Router } from "express";
import { readFile, shipmentsFilePath, warehousesFilePath, writeFile } from "../persistence/helperFs.js";
import { validateForeignId } from "../helpers/helper.js";

export const shipmentRouter = Router();

const shipmentPath = shipmentsFilePath;
const warehousePath = warehousesFilePath;

shipmentRouter.post("/",  (req, res) => {
    const shipments =  readFile(shipmentPath)

    const { item, quantity, idWarehouse } = req.body;

    const warehouse = validateForeignId(idWarehouse, warehousePath);

    if(!warehouse) return res.send("Warehouse inválida");
   
    const newShipment = {
        id: Date.now(),
        item,
        quantity,
        idWarehouse
    };


    shipments.push(newShipment);
    writeFile(shipmentPath, shipments)
    res.status(201).json({
        "message": "Shipment created successfully",
        newShipment
    });

});


shipmentRouter.get("/", (req, res) => {
    const shipments =  readFile(shipmentPath);

    res.json({shipments})
});


shipmentRouter.get("/:id", (req, res) => {
    const shipments =  readFile(shipmentPath);
    const shipment = shipments.find(w => w.id === parseInt(req.params.id));
    if(!shipment) return res.status(400).send("Shipment not found");

    res.send(shipment)

});

shipmentRouter.put("/:id", (req, res) => {
    const shipments =  readFile(shipmentPath);
    const indexShipment = shipments.findIndex(w => w.id === parseInt(req.params.id));
    const { item, quantity, idWarehouse } = req.body

    if(indexShipment === -1) return res.status(404).send("Shipment not found");
    const updateShipment = {
        ...shipments[indexShipment],
        item,
        quantity,
        idWarehouse
    };

    shipments[indexShipment] = updateShipment;
    writeFile(shipmentPath, shipments);
    res.json({"message": "Shipment updated successfully", updateShipment})

});


shipmentRouter.delete("/:id", (req, res) => {
    let shipments =  readFile(shipmentPath);
    const shipmentToDelete = shipments.find(w => w.id === parseInt(req.params.id));
    if(!shipmentToDelete) return res.send("Shipment not found");
    shipments = shipments.filter(w => w.id !== shipmentToDelete.id);
    writeFile(shipmentPath, shipments);
    res.json({"message": "Shipment delete successfully"})
});
