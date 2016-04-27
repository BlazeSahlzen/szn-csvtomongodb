module.exports = function() {
    return new mongoose.Schema({
        ain: {
            type: String,
            required: true
        },
        saDateOfLastChange: {
            type: String,
            required: true
        },
        saHouseNumber: {
            type: String
        },
        saFraction: {
            type: String
        },
        saDirection: {
            type: String
        },
        saStreetName: {
            type: String,
            required: true
        },
        saUnitType: {
            type: String
        },
        saUnitNumber: {
            type: String
        },
        saCity: {
            type: String,
            required: true
        },
        saState: {
            type: String,
            required: true
        },
        saZip: {
            type: String,
            required: true
        },
        saCounty: {
            type: String,
            required: true
        },
        saRegion: {
            type: String,
            required: true
        },
        saNeighborhoodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Neighborhood',
            required: true
        },
        propertyRating: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PropertyRating',
            required: true
        },
        neighborhoodRating: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'neighborhoodRating',
            required: true
        },
        useCode: {
            type: String,
            required: true
        },
        zoningCode: {
            type: String,
            required: true
        },
        propertyTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PropertyType',
            required: true
        },
        squareFeet: {
            type: Number,
            required: true
        },
        propertyUnits: {
            type: Number
        },
        propertyFloors: {
            type: Number
        },
        yearBuilt: {
            type: Number
        },
        lastSalesDate: {
            type: Date
        },
        lastSalesPrice: {
            type: Number
        },
        propertyManager: {
            type: String
        },
        ownershipEntity: {
            type: String
        },
        maDateOfLastChange: {
            type: String,
            required: true
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Owner',
            required: true
        }
    }, {
        versionKey: false
    });
};
