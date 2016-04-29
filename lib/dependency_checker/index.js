'use strict';

/**
 * Checks the dependency of intermediate queries on other collections in the database and resolves them
 * @params {Object} intermediate_query The intermediate query object
 */
var dependency_checker = function(intermediate_query) {

    var has_dependency = false;

    ////////////////////////////////////////////////////////////
    // Loop through list of fields in each intermediate query //
    ////////////////////////////////////////////////////////////
    for (var index in intermediate_query.fields) { 

        ////////////////////////////////////////
        // If that field has dependency, then //
        ////////////////////////////////////////
        if (intermediate_query.fields[index].map.ref_model_name) { 

            var fields = intermediate_query.fields[index];

            ////////////////////////////////////////////////////////////////////////
            // Check if the dependencies list already contains the ref_model_name //
            ////////////////////////////////////////////////////////////////////////
            if (!this.dependencies[fields.map.ref_model_name]) { 
                
                ////////////////////////
                // If not, create it! //
                ////////////////////////
                this.dependencies[fields.map.ref_model_name] = {}; 
            }

            /////////////////////////////////////////////////////////////////////////////////////////////
            // Check if ref_field_name already exists under the dependency list's ref_model_name entry //
            /////////////////////////////////////////////////////////////////////////////////////////////
            if (!this.dependencies[fields.map.ref_model_name][fields.map.ref_field_name]) { 
                
                ////////////////////////
                // If not, create it! //
                ////////////////////////
                this.dependencies[fields.map.ref_model_name][fields.map.ref_field_name] = {}; 
            }

            ////////////////////////////////////////////////////
            // Add the dependent value to the dependency list //
            ////////////////////////////////////////////////////
            this.dependencies[fields.map.ref_model_name][fields.map.ref_field_name][fields.csv_value] = null; 

            has_dependency = true;
        }
    }

    /////////////////////////////////
    // Setting current query state //
    /////////////////////////////////
    if (has_dependency) {

        this.internalStateTable[intermediate_query.uuid].state = 2;

    } else {

        this.internalStateTable[intermediate_query.uuid].state = 3;
    }
};

module.exports = dependency_checker;
