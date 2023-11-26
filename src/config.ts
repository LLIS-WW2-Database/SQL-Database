import path = require("path");

interface DatabaseConfig {
    databaseName: string;
}

interface FilePaths {
    filesDir: string;
    inputDir: string;
    outputDir: string;
}

export const filePaths: FilePaths = {
    filesDir: '',
    inputDir: '',
    outputDir: '',
};

export const databaseConfig: DatabaseConfig = {
    databaseName: 'your_database.db'
};

filePaths.filesDir = path.join(__dirname, '../Files');
filePaths.inputDir = path.join(filePaths.filesDir, 'input');
filePaths.outputDir = path.join(filePaths.filesDir, 'output');
