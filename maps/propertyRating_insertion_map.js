module.exports = {
    mapping: {
        'PROPERTY RATE': {
            field_name: 'rateIdentifier'
        },
        'RATE DEFINITION': {
            field_name: 'rateDescription'
        }
    },
    options: {
        name: 'property-rating',
        type: 'insert',
        collection_name: 'PropertyRating'
    }
};
