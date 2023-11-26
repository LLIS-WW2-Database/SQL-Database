import * as fs from 'fs';
import * as sqlite3 from 'sqlite3';
import * as Constants from './Constants';

interface RowData {
    [key: string]: string;
}

interface ConversionResult {
    success: boolean;
    error?: string;
}

export async function convertAllJsonToSqlite(allJsonFilePaths: string[], databaseName: string) {
    const results: ConversionResult[] = [];

    for (let i: number = 0; i < allJsonFilePaths.length; i++) {
        const element = allJsonFilePaths[i];

        const result = await convertJsonToSqlite(element, databaseName);
        results.push(result);
    }

    return results;
}

export function convertJsonToSqlite(jsonFilePath: string, databaseName: string): Promise<ConversionResult> {
    return new Promise((resolve) => {
        try {
            // Read JSON file
            const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

            // Check if jsonData is an object
            if (typeof jsonData !== 'object' || jsonData === null) {
                resolve({ success: false, error: 'JSON data is not in the expected format.' });
                return;
            }

            // Extract main fields from Constants.ts
            const mainFields = Constants.expectedMainFields;

            // Extract subfields from Constants.ts
            const subfields = Constants.subfields;

            // Log transformed JSON keys
            console.log('Transformed JSON Keys:', Object.keys(jsonData).map(column => `"${column.replace(/ /g, '_')}"`).join(', '));

            // Create a dynamic table structure
            const columns = mainFields.map((mainField) => {
                if (subfields.hasOwnProperty(mainField)) {
                    // Include subfields if present
                    const subfieldColumns = subfields[mainField].map((subfield) => `"${mainField}_${subfield}" TEXT`);
                    return [`"${mainField}" TEXT`, ...subfieldColumns].join(', ');
                } else {
                    return `"${mainField}" TEXT`;
                }
            });

            // Join all columns to create the CREATE TABLE query
            const createTableQuery = `CREATE TABLE IF NOT EXISTS people (${columns.join(', ')})`;

            console.log('CREATE TABLE Query:', createTableQuery);

            // Connect to SQLite database (or create a new one)
            const db = new sqlite3.Database(databaseName);

            db.serialize(() => {
                db.run(createTableQuery);

                // Insert data into the table
                const values = Object.values(jsonData);
                const sanitizedColumnNames = Object.keys(jsonData)
                    .map(column => `"${column.replace(/[^a-zA-Z0-9_]/g, '_')}"`)
                    .join(', ');

                const placeholders = Array(values.length).fill('?').join(', ');

                const insertDataQuery = `INSERT INTO people (${sanitizedColumnNames}) VALUES (${placeholders})`;

                console.log('INSERT Query:', insertDataQuery);

                db.run(insertDataQuery, values, function (err) {
                    if (err) {
                        resolve({ success: false, error: err.message });
                    } else {
                        console.log(`Row inserted with ID: ${this.lastID}`);

                        // Close the database connection
                        db.close((err) => {
                            if (err) {
                                resolve({ success: false, error: err.message });
                            } else {
                                resolve({ success: true });
                            }
                        });
                    }
                });
            });
        } catch (error: any) {
            resolve({ success: false, error: error.message });
        }
    });
}
