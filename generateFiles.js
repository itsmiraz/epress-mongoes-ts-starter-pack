"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var generateFile = function (filePath, template) {
    var content = template || ''; // Use the provided template or an empty string
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log("File ".concat(filePath, " created successfully."));
};
var main = function () {
    var directoryPath = process.argv[2];
    var fileName = process.argv[3];
    if (!directoryPath || !fileName) {
        console.error('Please provide a directory path and a file name.');
        return;
    }
    var extensions = ['interface', 'model', 'route', 'controller', 'service'];
    extensions.forEach(function (extension) {
        var fullFilePath = path.join(directoryPath, "".concat(fileName, ".").concat(extension, ".ts"));
        // Add your code template for each file type
        var template = '';
        if (extension === 'interface') {
            template = "export type T".concat(fileName, " = {\n  // Your interface definition here\n}\n");
        }
        else if (extension === 'model') {
            template = "import { Schema, model } from 'mongoose';\n";
            template += "import { T".concat(fileName, " } from './").concat(fileName, ".interface';\n\n");
            template += "const ".concat(fileName, "Schema = new Schema<T").concat(fileName, ">(\n");
            template += "  {\n";
            template += "    // Your Model according to the interface\n";
            template += "  },\n\n";
            template += "  {\n";
            template += "    timestamps: true,\n";
            template += "  },\n);\n\n";
            template += "export const ".concat(fileName, " = model<T").concat(fileName, ">('").concat(fileName, "', ").concat(fileName, "Schema);\n");
        }
        else if (extension === 'route') {
            template = "import express from 'express';\n";
            template += "import { ".concat(fileName, "Controllers } from './").concat(fileName, ".controller';\n\n");
            template += "const router = express.Router();\n\n";
            template += "router.post('/create', ".concat(fileName, "Controllers.create").concat(fileName, ");\n\n");
            template += "router.get('/', ".concat(fileName, "Controllers.get").concat(fileName, "s);\n");
            template += "router.get('/:id', ".concat(fileName, "Controllers.getSingle").concat(fileName, ");\n");
            template += "router.patch('/:id', ".concat(fileName, "Controllers.update").concat(fileName, ");\n");
            template += "router.delete('/:id', ".concat(fileName, "Controllers.delete").concat(fileName, ");\n\n");
            template += "export const ".concat(fileName, "Routes = router;\n");
        }
        else if (extension === 'controller') {
            template = "export class ".concat(fileName, "Controller {\n  // Your controller class definition here\n}\n");
        }
        else if (extension === 'service') {
            template = "export class ".concat(fileName, "Service {\n  // Your service class definition here\n}\n");
        }
        generateFile(fullFilePath, template);
    });
};
main();
