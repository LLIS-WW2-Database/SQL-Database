import path = require('path');
import fs = require('fs');
import { convertAllJsonToSqlite } from './jsonToSQLite';
import { deleteAllFilesInFolder, replaceSpacesWithHyphensInKeys, replaceSpecialCharsInKeys } from './utilityFuncs';
import { filePaths, databaseConfig } from './config';
import { SearchBy, searchByPeople } from './searchDB';

const { inputDir, outputDir } = filePaths;
const { databaseName } = databaseConfig;

const databasePath = path.join(outputDir, databaseName);

async function createEntries() {
    const files = fs.readdirSync(inputDir);
    const filePaths: string[] = [];

    // Loop over the files
    await files.forEach(async (file) => {
        const filePath = path.join(inputDir, file);

        await replaceSpacesWithHyphensInKeys(filePath);
        await replaceSpecialCharsInKeys(filePath);
        filePaths.push(filePath);
    });

    await deleteAllFilesInFolder(outputDir);

    const conversionResult = await convertAllJsonToSqlite(filePaths, databasePath)
    console.log('Conversion Result:', conversionResult);
}

async function searchEntries() {
    // Example usage:
    const results = await searchByPeople('1923', SearchBy.Abfahrtsliste_vom, false, databasePath)
    console.log('Results:', results);
}


async function doAll() {
    await createEntries();
    await searchEntries();
};

doAll();