import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export const warehousesFilePath = path.join(_dirname,"./warehouses.json");
export const driversFilePath = path.join(_dirname, "./drivers.json");
export const shipmentsFilePath = path.join(_dirname, "./shipments.json");
export const vehicleFilePath = path.join(_dirname, "./vehicles.json");


export const writeFile =  (path, entity) => {
     fs.writeFileSync(path, JSON.stringify(entity, null, 2))

};

export const readFile = (path) => {
    try{
        const entity = fs.readFileSync(path);
        return JSON.parse(entity)
    }catch(err){
        throw new Error(`File not found: ${err}`)
    }
};