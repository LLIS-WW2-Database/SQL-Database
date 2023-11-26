// Array of expected main fields (some are required)
const expectedMainFields = [
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
]; // Add expected main fields here

// Object of subfields for main fields that require them
const subfields: { [key: string]: string[] } = {
    Wehrmacht: ['Deserteiert', 'Verstoppt'], // Example: Subfields for 'Wehrmacht'
};

// Array of required main fields
const requiredMainFields = ['Name']; // Add the required main fields here

export { expectedMainFields, subfields, requiredMainFields };
