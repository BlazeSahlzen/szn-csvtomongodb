module.exports = function() {
    return new mongoose.Schema({
        ownerId: {
            type: String,
            required: true
        },
        ownerType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OwnerType',
            required: true
        },
        ownerName: {
            type: String,
            required: true
        },
        mailingAddressList: [{
            maHouseNumber: {
                type: String
            },
            maFraction: {
                type: String
            },
            maDirection: {
                type: String
            },
            maStreetName: {
                type: String
            },
            maUnitType: {
                type: String
            },
            maUnit: {
                type: String
            },
            maCity: {
                type: String
            },
            maState: {
                type: String
            },
            maZip: {
                type: String
            },
            maCountry: {
                type: String,
            }
        }],
        contactList: [{
            contactName: {
                type: String
            },
            contactEmployer: {
                type: String
            },
            contactTitle: {
                type: String
            },
            contactEducation: {
                type: String
            },
            contactLinkedinLink: {
                type: String
            },
            contactFacebookLink: {
                type: String
            },
            contactCompanyLink: {
                type: String
            },
            contactOtherLink: {
                type: String
            },
            contactPhone: {
                type: String
            },
            contactEmail: {
                type: String,
            }
        }]
    }, {
        versionKey: false
    });
};
