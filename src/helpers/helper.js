import { readFile } from "../persistence/helperFs.js"

export const validateForeignId = (id, path) => {
    const readFiles = readFile(path);

    const file = readFiles.find(f => f.id === id);
    if(!file) throw new Error("File not found");

    return file

}