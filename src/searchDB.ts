import * as sqlite3 from 'sqlite3';

export enum SearchBy {
    'Name',
    'Vorname_des_Vaters',
    'Geburtsdatum',
    'Wohnort',
    'Land',
    'Geburtsort',
    'Geburtsland',
    'Religion',
    'Zivile_Ausbildung',
    'Militaerische_Ausbildung',
    'Fraeiwellegekompanie',
    'Beruf',
    'Stellungsbefehl_RAD',
    'RAD',
    'KHD',
    'Musterung',
    'Stellungsbefehl_Wehrmacht',
    'Wehrmacht',
    'Erkennungsmarke_N',
    'Waffeneinheit',
    'Militaerischer_Rang_bei_der_Gefangennahme',
    'Militaerischer_Dienst',
    'Art_der_Gefangennahme',
    'Datum_der_Gefangennahme',
    'Ort_der_Gefangennahme',
    'Land_der_Gefangennahme',
    'Nummer_der_Kriegsgefangenenlager',
    'Auf_Brief_an_Stalin',
    'Auf_Liste_vom',
    'Abfahrtsliste_vom',
    'Datum_der_Repatriierung',
    'Ankunft_in_Luxemburg',
    'Todesdatum',
    'Todesursache',
    'Nummer_des_Kriegsgefangenenlagers_wo_er_starb',
    'Nummer_der_Grablage',
    'Nummer_der_Personalakte_im_Archiv_in_Moskau',
    'Kontrollnummer_vom_Bearbeiter_Paul_Dostert',
    'Gestorben',
    'Lescht_mise_a_jour',
    'Lescht_Meldung'
}

export async function searchByPeople(
    searchTerm: string,
    searchBy: SearchBy,
    matchExact: boolean,
    databaseName: string
): Promise<Object[]> {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(databaseName);

        // Sanitize the search term to prevent SQL injection
        const sanitizedSearchTerm = searchTerm.replace(/'/g, "''");

        // Build the SQL query based on the search criteria
        let query;
        if (matchExact) {
            query = `SELECT * FROM people WHERE ${searchBy} = '${sanitizedSearchTerm}'`;
        } else {
            query = `SELECT * FROM people WHERE ${searchBy} LIKE '%${sanitizedSearchTerm}%'`;
        }

        // Execute the query
        db.all(query, (err, rows) => {
            db.close();

            if (err) {
                reject(err);
            } else {
                resolve(rows as object[]);
            }
        });
    });
}
