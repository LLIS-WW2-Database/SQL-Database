import * as fs from 'fs';
import path = require('path');

export async function replaceSpacesWithHyphensInKeys(filePath: string): Promise<void> {
    try {
        // Read the JSON file
        const jsonData: Record<string, string> = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Get the original keys
        const originalKeys = Object.keys(jsonData);

        // Create a new object with keys replaced
        const modifiedData: Record<string, string> = {};
        originalKeys.forEach((key) => {
            const modifiedKey = key.replace(/ /g, '_');
            modifiedData[modifiedKey] = jsonData[key];
        });

        // Save the modified JSON back to the file
        fs.writeFileSync(filePath, JSON.stringify(modifiedData, null, 2), 'utf-8');

        console.log(`Spaces replaced with underscores in keys of file: ${filePath}`);
    } catch (error: any) {
        console.error('Error processing JSON file:', error.message);
    }
}

export async function replaceSpecialCharsInKeys(filePath: string): Promise<void> {
    try {
        // Read the JSON file
        const jsonData: Record<string, string> = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Get the original keys
        const originalKeys = Object.keys(jsonData);

        // Create a new object with keys replaced
        const modifiedData: Record<string, string> = {};
        originalKeys.forEach((key) => {
            const modifiedKey = replaceSpecialChars(key);
            modifiedData[modifiedKey] = jsonData[key];
        });

        // Save the modified JSON back to the file
        fs.writeFileSync(filePath, JSON.stringify(modifiedData, null, 2), 'utf-8');

        console.log(`Special characters replaced in keys of file: ${filePath}`);
    } catch (error: any) {
        console.error('Error processing JSON file:', error.message);
    }
}

function replaceSpecialChars(input: string): string {
    // Replace ö with oe, ä with ae, etc.
    return input
        .replace(/ /g, '_') // Replace spaces with underscores
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/Ä/g, 'Ae')
        .replace(/Ö/g, 'Oe')
        .replace(/Ü/g, 'Ue')
        .replace(/é/g, 'e')
        .replace(/è/g, 'e')
        .replace(/ê/g, 'e')
        .replace(/ë/g, 'e')
        .replace(/á/g, 'a')
        .replace(/à/g, 'a')
        .replace(/â/g, 'a')
        .replace(/û/g, 'u')
        .replace(/ù/g, 'u')
        .replace(/ô/g, 'o')
        .replace(/ñ/g, 'n')
        .replace(/ç/g, 'c')
        .replace(/í/g, 'i')
        .replace(/ì/g, 'i')
        .replace(/î/g, 'i')
        .replace(/ï/g, 'i')
        .replace(/ÿ/g, 'y')
        .replace(/É/g, 'E')
        .replace(/È/g, 'E')
        .replace(/Ê/g, 'E')
        .replace(/Ë/g, 'E')
        .replace(/Á/g, 'A')
        .replace(/À/g, 'A')
        .replace(/Â/g, 'A')
        .replace(/Û/g, 'U')
        .replace(/Ù/g, 'U')
        .replace(/Ô/g, 'O')
        .replace(/Ç/g, 'C')
        .replace(/Í/g, 'I')
        .replace(/Ì/g, 'I')
        .replace(/Î/g, 'I')
        .replace(/Ï/g, 'I')
        .replace(/Ÿ/g, 'Y')
        .replace(/°/g, '')
        .replace(/,/g, '')
        .replace(/[()]/g, '')
        .replace(/„/g, '')
        .replace(/“/g, '');
}

export async function deleteAllFilesInFolder(folderPath: string): Promise<void> {
    try {
        // Read the list of files in the folder
        const files = fs.readdirSync(folderPath);

        // Iterate over the files and delete each one
        files.forEach((file) => {
            const filePath = path.join(folderPath, file);
            fs.unlinkSync(filePath);
            console.log(`Deleted file: ${filePath}`);
        });

        console.log(`All files deleted in folder: ${folderPath}`);
    } catch (error: any) {
        console.error('Error deleting files:', error.message);
    }
}