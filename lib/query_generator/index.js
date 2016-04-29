'use strict';

/**
 * Automatically cast from default type in CSV-JSON to database-field type
 * @param  {Function} type  Construction function of the type (String, Number, etc.)
 * @param  {String}   value The value to be cast to given type
 * @return {Depends}        The type-casted value
 */
var type_cast = function(type, value) {
    if (Array.isArray(type)) {

        //////////////
        // Needed ? //
        //////////////

    } else {
        if (type === Number) {
            return Number(value);
        } else {
            return value;
        }
    }
};

/**
 * Generates query from intermediate query and resolved-dependency information
 */
var query_generator = function() {

    /////////////////////////////////////
    // Storing reference to self-scope //
    /////////////////////////////////////
    var self = this;

    ///////////////////////////////////////////////////
    // Loop through the list of intermediate queries //
    ///////////////////////////////////////////////////
    for (var key in self.intermediateQueries) {

        ///////////////////////////////////
        // Store each intermediate query //
        ///////////////////////////////////
        var intermediateQuery = self.intermediateQueries[key];

        ////////////////////
        // Generate query //
        ////////////////////
        var query = {

            ////////////////////////////////
            // The unique ID of the query //
            ////////////////////////////////
            uuid: intermediateQuery.uuid,

            ///////////////////////////////////////////
            // The model on which the query will run //
            ///////////////////////////////////////////
            model: intermediateQuery.options.model_name,

            /////////////////////////////////////////
            // The type of query: insert or update //
            /////////////////////////////////////////
            query_type: intermediateQuery.options.type
        };

        if (intermediateQuery.options.type === "insert") {

            /////////////////////////////////////////////////////
            // Initialize the document, which will be inserted //
            /////////////////////////////////////////////////////
            query.document = {};

        } else if (intermediateQuery.options.type === "update") {

            //////////////////////////////////////////////////////
            // The selector object which will be used to search //
            //////////////////////////////////////////////////////
            query.selector = {};

            ////////////////////////////////////////////////////
            // Initialize the document, which will be updated //
            ////////////////////////////////////////////////////
            query.document = {};

        }

        ///////////////////////////////////////////////////////
        // Loop through the fields in the intermediate query //
        ///////////////////////////////////////////////////////
        for (var key in intermediateQuery.fields) {

            var field = intermediateQuery.fields[key];

            //////////////////////////////////
            // Checking for ignore-property //
            //////////////////////////////////
            if (!(field.map.ignore && field.map.ignore === true)) {

                /////////////////////////////
                // Checking for dependency //
                /////////////////////////////
                if (self.internalStateTable[intermediateQuery.uuid].state === 2) {

                    ///////////////////////////////////////////////////
                    // Checking whether dependency has been resolved //
                    ///////////////////////////////////////////////////
                    if (self.dependencies[field.map.ref_model_name][field.map.ref_field_name][field.csv_value] !== null) {

                        /////////////////////////////////////
                        // Resolve dependency on the query //
                        /////////////////////////////////////
                        field.resolved_value = self.dependencies[field.map.ref_model_name][field.map.ref_field_name][field.csv_value];

                        ///////////////////////////////
                        // Setting state to resolved //
                        ///////////////////////////////
                        self.internalStateTable[intermediateQuery.uuid].state = 3;


                    } else {

                        /////////////////////////////////
                        // Setting state to unresolved //
                        /////////////////////////////////
                        self.internalStateTable[intermediateQuery.uuid].state = 4;

                        ///////////////////////////
                        // Do what? Throw error? //
                        ///////////////////////////

                        continue;
                    }
                } else {

                    ///////////////////////////////////
                    // No dependency. Store directly //
                    ///////////////////////////////////
                    field.resolved_value = field.csv_value;
                }

                ////////////////////////////////
                // Checking for type-property //
                ////////////////////////////////
                if (field.map.type) {

                    ////////////////////////////
                    // Type-casting the value //
                    ////////////////////////////
                    field.resolved_value = type_cast(field.resolved_value, field.map.type);

                }

                ///////////////////////////////////////////////
                // Checking for field-level resolve-function //
                ///////////////////////////////////////////////
                if (field.map.resolve) {

                    ////////////////////////////////////////
                    // Apply field-level resolve-function //
                    ////////////////////////////////////////
                    query.document[field.map.field_name] = field.map.resolve.apply(field, [self.app]);
                } else {

                    ///////////////////////////
                    // Otherwise, just store //
                    ///////////////////////////
                    query.document[field.map.field_name] = field.resolved_value;
                }
            }
        }

        ///////////////////////////////////////
        // If query's dependency is resolved //
        ///////////////////////////////////////
        if (self.internalStateTable[intermediateQuery.uuid].state === 3) {

            ///////////////////////////////////////////////
            // Checking for query-level resolve-function //
            ///////////////////////////////////////////////
            if (intermediateQuery.options.resolve) {

                ////////////////////////////////////////
                // Apply query-level resolve-function //
                ////////////////////////////////////////
                query.document = intermediateQuery.options.resolve.apply(intermediateQuery, [self.app]);
            }

            ////////////////////////////////
            // Push query into query list //
            ////////////////////////////////
            self.queries.push(query);

            //////////////////////////////////////
            // Setting state to query-generated //
            //////////////////////////////////////
            self.internalStateTable[intermediateQuery.uuid].state = 5;
        }
    }

    ///////////////////////
    // Call the callback //
    ///////////////////////
    self.callback(self);
};

module.exports = query_generator;
