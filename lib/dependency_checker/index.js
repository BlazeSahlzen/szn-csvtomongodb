'use strict';

/**
 * Checks the dependency of intermediate queries on other collections in the database and resolves them
 * @params {Object} intermediateQuery The intermediate query object
 */
var dependency_checker = function(intermediateQuery) {

    var hasDependency = false;

    for (var index in intermediateQuery.mapping) { // Loop through list of fields in each intermediate query

        if (intermediateQuery.mapping[index].map.ref_model_name) { // If that field has a `ref_model_name` property, then

            var mapping = intermediateQuery.mapping[index];

            /*------------------------------------------------------------------------------------------------------*/

            if (!this.dependencies[mapping.map.ref_model_name]) {

                this.dependencies[mapping.map.ref_model_name] = {};

            }

            if (!this.dependencies[mapping.map.ref_model_name][mapping.map.ref_field_name]) {

                this.dependencies[mapping.map.ref_model_name][mapping.map.ref_field_name] = {};

            }

            this.dependencies[mapping.map.ref_model_name][mapping.map.ref_field_name][mapping.csv_value] = null;

            /*------------------------------------------------------------------------------------------------------*/

            hasDependency = true;

        }

    }

    if (hasDependency) {

        this.internalStateTable[intermediateQuery.uuid].status = 2;

    } else {

        this.internalStateTable[intermediateQuery.uuid].status = 3;

    }

};

module.exports = dependency_checker;
