//     'AIN NUMBER'
//     'SA DATE OF\n LAST CHANGE'
//     'SA HOUSE NUMBER'
//     'SA FRACTION'
//     'SA DIRECTION'
//     'SA STREET NAME'
//     'SA UNIT TYPE'
//     'SA UNIT NUMBER'
//     'SA CITY'
//     'SA STATE'
//     'SA ZIP'
//     'SA COUNTY'
//     'SA REGION'
//     'SA NEIGHBORHOOD'        > ignored
//     'SA NEIGHBORHOOD ID'     > points to neighborhood collection
//     'PROPERTY \nRATING'      > points to propertyRating collection 
//     'NEIGHBORHOOD\n RATING'  > points to neighborhoodRating collection 
//     'USE CODE'
//     'ZONING CODE'
//     'REAL ESTATE TYPE'       \
//     'PROP TYPE'                > becomes propTypeId
//     'PROP SUB-TYPE'          /
//     'SQUARE FEET'
//     'PROP UNITS'
//     'PROPERTY FLOORS'
//     'YEAR BUILT'
//     'LAST SALES DATE'
//     'LAST SALES PRICE'
//     'PROPERTY \nMANAGER'
//     'OWNERSHIP ENTITY'
//     'MA DATE OF \nLAST CHANGE'
//     'OWNER ID'               > points to owner collection

module.exports = {
    'AIN NUMBER': {
        field_name: 'ain',
        collection_name: 'Property',
        type: String
    },
    'SA DATE OF\n LAST CHANGE': {
        field_name: 'saDateOfLastChange',
        collection_name: 'Property',
        type: Date
    },
    'SA HOUSE NUMBER': {
        field_name: 'saHouseNumber',
        collection_name: 'Property',
        type: String
    },
    'SA FRACTION': {
        field_name: 'saFraction',
        collection_name: 'Property',
        type: String
    },
    'SA DIRECTION': {
        field_name: 'saDirection',
        collection_name: 'Property',
        type: String
    },
    'SA STREET NAME': {
        field_name: 'saStreetName',
        collection_name: 'Property',
        type: String
    },
    'SA UNIT TYPE': {
        field_name: 'saUnitType',
        collection_name: 'Property',
        type: String
    },
    'SA UNIT NUMBER': {
        field_name: 'saUnitNumber',
        collection_name: 'Property',
        type: String
    },
    'SA CITY': {
        field_name: 'saCity',
        collection_name: 'Property',
        type: String
    },
    'SA STATE': {
        field_name: 'saState',
        collection_name: 'Property',
        type: String
    },
    'SA ZIP': {
        field_name: 'saZip',
        collection_name: 'Property',
        type: String
    },
    'SA COUNTY': {
        field_name: 'saCounty',
        collection_name: 'Property',
        type: String
    },
    'SA REGION': {
        field_name: 'saRegion',
        collection_name: 'Property',
        type: String
    },
    'SA NEIGHBORHOOD': {
        field_name: 'saNeighborhood',
        collection_name: 'Property',
        type: String,
        
    },
    'SA NEIGHBORHOOD ID': {
        field_name: 'saNeighborhoodId',
        collection_name: 'Property',
        type: String
    },
    'PROPERTY \nRATING': {
        field_name: 'propertyRating',
        collection_name: 'Property',
        type: String
    },
    'NEIGHBORHOOD\n RATING': {
        field_name: 'neighborhoodRating',
        collection_name: 'Property',
        type: String
    },
    'USE CODE': {
        field_name: 'useCode',
        collection_name: 'Property',
        type: String
    },
    'ZONING CODE': {
        field_name: 'zoningCode',
        collection_name: 'Property',
        type: String
    },
    'REAL ESTATE TYPE': {
        field_name: 'realEstateType',
        collection_name: 'Property',
        type: String
    },
    'PROP TYPE': {
        field_name: 'propType',
        collection_name: 'Property',
        type: String
    },
    'PROP SUB-TYPE': {
        field_name: 'propSubType',
        collection_name: 'Property',
        type: String
    },
    'SQUARE FEET': {
        field_name: 'squareFeet',
        collection_name: 'Property',
        type: Number
    },
    'PROP UNITS': {
        field_name: 'propUnits',
        collection_name: 'Property',
        type: Number
    },
    'PROPERTY FLOORS': {
        field_name: 'propertyFloors',
        collection_name: 'Property',
        type: Number
    },
    'YEAR BUILT': {
        field_name: 'yearBuilt',
        collection_name: 'Property',
        type: Number
    },
    'LAST SALES DATE': {
        field_name: 'lastSalesDate',
        collection_name: 'Property',
        type: Date
    },
    'LAST SALES PRICE': {
        field_name: 'lastSalesPrice',
        collection_name: 'Property',
        type: Number
    },
    'PROPERTY \nMANAGER': {
        field_name: 'propertyManager',
        collection_name: 'Property',
        type: String
    },
    'OWNERSHIP ENTITY': {
        field_name: 'ownershipEntity',
        collection_name: 'Property',
        type: String
    },
    'MA DATE OF \nLAST CHANGE': {
        field_name: 'maDateOfLastChange',
        collection_name: 'Property',
        type: String
    },
    'OWNER ID': {
        field_name: 'ownerId',
        collection_name: 'Property',
        type: String
    }
};
