// mapping['owner_insertion'] = {
//     'OWNER ID',
//     'OWNER TYPE',
//     'OWNER NAME',
//     'MA 1 HOUSE NUMBER',
//     'MA 1 FRACTION',
//     'MA 1 DIRECTION',
//     'MA 1 STREET NAME',
//     'MA 1 UNIT TYPE',
//     'MA 1 UNIT',
//     'MA  1 CITY',
//     'MA 1 STATE',
//     'MA 1 ZIP',
//     'MA 1 COUNTRY',
//     'MA 2 HOUSE NUMBER',
//     'MA 2 FRACTION',
//     'MA 2 DIRECTION',
//     'MA 2 STREET NAME',
//     'MA 2 UNIT TYPE',
//     'MA 2 UNIT',
//     'MA  2 CITY',
//     'MA 2 STATE',
//     'MA 2 ZIP',
//     'MA 2 COUNTRY',
//     'MA 3 HOUSE NUMBER',
//     'MA 3 FRACTION',
//     'MA 3 DIRECTION',
//     'MA 3 STREET NAME',
//     'MA 3 UNIT TYPE',
//     'MA 3 UNIT',
//     'MA 3 CITY',
//     'MA 3 STATE',
//     'MA 3 ZIP',
//     'MA 3 COUNTRY',
//     'MA 4 HOUSE NUMBER',
//     'MA 4 FRACTION',
//     'MA 4 DIRECTION',
//     'MA 4 STREET NAME',
//     'MA 4 UNIT TYPE',
//     'MA 4 UNIT',
//     'MA 4 CITY',
//     'MA 4 STATE',
//     'MA 4 ZIP',
//     'MA 4 COUNTRY',
//     'CONTACT 1\n NAME',
//     'CONTACT 1 EMPLOYER',
//     'CONTACT 1 TITLE',
//     'CONTACT 1 EDUCATION',
//     'CONTACT 1 LINKEDIN Links',
//     'CONTACT 1 FACEBOOK Links',
//     'CONTACT 1\nCOMPANY Links',
//     'CONTACT 1 OTHER Links',
//     'CONTACT 1 PHONE',
//     'CONTACT 1  EMAIL',
//     'CONTACT 2 NAME',
//     'CONTACT 2 EMPLOYER',
//     'CONTACT 2 TITLE',
//     'CONTACT 2 EDUCATION',
//     'CONTACT 2 LINKEDIN Links',
//     'CONTACT 2 FACEBOOK Links',
//     'CONTACT 2 COMPANY Links',
//     'CONTACT 2 OTHER Links',
//     'CONTACT 2 PHONE',
//     'CONTACT 2  EMAIL',
//     'CONTACT 3 NAME',
//     'CONTACT 3 EMPLOYER',
//     'CONTACT 3 TITLE',
//     'CONTACT 3 EDUCATION',
//     'CONTACT 3 LINKEDIN Links',
//     'CONTACT 3 FACEBOOK Links',
//     'CONTACT 3 COMPANY Links',
//     'CONTACT 3 OTHER Links',
//     'CONTACT 3 PHONE',
//     'CONTACT 3  EMAIL',
//     'CONTACT 4 NAME',
//     'CONTACT 4 EMPLOYER',
//     'CONTACT 4 TITLE',
//     'CONTACT 4 EDUCATION',
//     'CONTACT 4 LINKEDIN Links',
//     'CONTACT 4 FACEBOOK Links',
//     'CONTACT 4 COMPANY Links',
//     'CONTACT 4 OTHER Links',
//     'CONTACT 4 PHONE',
//     'CONTACT 4  EMAIL'
// };

module.exports = {
    mapping: {
        'OWNER ID': {
            field_name: 'ownerId',
            type: String
        },
        'OWNER TYPE': {
            field_name: 'ownerTypeId',
            type: String
        },
        'OWNER NAME': {
            field_name: 'ownerName',
            type: String
        },
        'MA 1 HOUSE NUMBER': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 1 FRACTION': {
            field_name: 'mailingAddress',
            sub_field_name: 'fraction',
            type: [Object]
        },
        'MA 1 DIRECTION': {
            field_name: 'mailingAddress',
            sub_field_name: 'direction',
            type: [Object]
        },
        'MA 1 STREET NAME': {
            field_name: 'mailingAddress',
            sub_field_name: 'streetName',
            type: [Object]
        },
        'MA 1 UNIT TYPE': {
            field_name: 'mailingAddress',
            sub_field_name: 'unitType',
            type: [Object]
        },
        'MA 1 UNIT': {
            field_name: 'mailingAddress',
            sub_field_name: 'unit',
            type: [Object]
        },
        'MA  1 CITY': {
            field_name: 'mailingAddress',
            sub_field_name: 'city',
            type: [Object]
        },
        'MA 1 STATE': {
            field_name: 'mailingAddress',
            sub_field_name: 'state',
            type: [Object]
        },
        'MA 1 ZIP': {
            field_name: 'mailingAddress',
            sub_field_name: 'zip',
            type: [Object]
        },
        'MA 1 COUNTRY': {
            field_name: 'mailingAddress',
            sub_field_name: 'country',
            type: [Object]
        },
        'MA 2 HOUSE NUMBER': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 2 FRACTION': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 2 DIRECTION': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 2 STREET NAME': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 2 UNIT TYPE': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 2 UNIT': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA  2 CITY': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 2 STATE': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 2 ZIP': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 2 COUNTRY': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 3 HOUSE NUMBER': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 3 FRACTION': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 3 DIRECTION': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 3 STREET NAME': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 3 UNIT TYPE': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 3 UNIT': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 3 CITY': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 3 STATE': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 3 ZIP': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 3 COUNTRY': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 4 HOUSE NUMBER': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 4 FRACTION': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 4 DIRECTION': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 4 STREET NAME': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 4 UNIT TYPE': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 4 UNIT': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 4 CITY': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 4 STATE': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 4 ZIP': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'MA 4 COUNTRY': {
            field_name: 'mailingAddress',
            sub_field_name: 'houseNumber',
            type: [Object]
        },
        'CONTACT 1\n NAME': {},
        'CONTACT 1 EMPLOYER': {},
        'CONTACT 1 TITLE': {},
        'CONTACT 1 EDUCATION': {},
        'CONTACT 1 LINKEDIN Links': {},
        'CONTACT 1 FACEBOOK Links': {},
        'CONTACT 1\nCOMPANY Links': {},
        'CONTACT 1 OTHER Links': {},
        'CONTACT 1 PHONE': {},
        'CONTACT 1  EMAIL': {},
        'CONTACT 2 NAME': {},
        'CONTACT 2 EMPLOYER': {},
        'CONTACT 2 TITLE': {},
        'CONTACT 2 EDUCATION': {},
        'CONTACT 2 LINKEDIN Links': {},
        'CONTACT 2 FACEBOOK Links': {},
        'CONTACT 2 COMPANY Links': {},
        'CONTACT 2 OTHER Links': {},
        'CONTACT 2 PHONE': {},
        'CONTACT 2  EMAIL': {},
        'CONTACT 3 NAME': {},
        'CONTACT 3 EMPLOYER': {},
        'CONTACT 3 TITLE': {},
        'CONTACT 3 EDUCATION': {},
        'CONTACT 3 LINKEDIN Links': {},
        'CONTACT 3 FACEBOOK Links': {},
        'CONTACT 3 COMPANY Links': {},
        'CONTACT 3 OTHER Links': {},
        'CONTACT 3 PHONE': {},
        'CONTACT 3  EMAIL': {},
        'CONTACT 4 NAME': {},
        'CONTACT 4 EMPLOYER': {},
        'CONTACT 4 TITLE': {},
        'CONTACT 4 EDUCATION': {},
        'CONTACT 4 LINKEDIN Links': {},
        'CONTACT 4 FACEBOOK Links': {},
        'CONTACT 4 COMPANY Links': {},
        'CONTACT 4 OTHER Links': {},
        'CONTACT 4 PHONE': {},
        'CONTACT 4  EMAIL': {

        }
    }
};
