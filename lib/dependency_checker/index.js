'use strict';

var mongoose = require('mongoose');

/**
 * Checks the dependency of intermediate queries on other collections in the database and resolves them
 */
var dependency_checker = function() {

    for (var index_0 in this.intermediateQueries) { // Loop through list of intermediate queries

        var intermediateQuery = this.intermediateQueries[index_0];

        for (var index_1 in intermediateQuery.mapping) { // Loop through list of fields in each intermediate query

            if (intermediateQuery.mapping[index_1].map.ref_coll_name) { // If that field has a `ref_coll_name` property, then

                /**
                 *
                 * Search in database
                 * 
                 * Reference Collection Name --> intermediateQuery.mapping[index_1].map.ref_coll_name
                 * Reference Field Name -------> intermediateQuery.mapping[index_1].map.ref_field_name
                 * Value to check against -----> intermediateQuery.mapping[index_1].csv_value
                 * Value to return ------------> _id
                 *
                 * If not found, then throw error?
                 * 
                 */

            } else {

                this.internalStateTable[intermediateQuery.uuid].status = 2;

            }

        }

    }

};

module.exports = dependency_checker;
