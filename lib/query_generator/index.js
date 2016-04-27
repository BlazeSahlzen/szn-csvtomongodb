'use strict';

//////////////////////////////////////////////////
// What makes a query?                          //
// 1. DB name?                                  //
// 2. Collection name?                          //
// 3. Query type? Like `insert`, `update`, etc. //
// 4. Options? Like:                            //
//    i.  Selector object                       //
//    ii. Modifier object                       //
//////////////////////////////////////////////////

/**
 * Automatically cast from default type in CSV-JSON to database-field type
 * @param  {Function} type  Construction function of the type (String, Number, etc.)
 * @param  {String}   value The value to be cast to given type
 * @return {Depends}        The type-casted value
 */
var type_cast = function(type, value) {

    if (Array.isArray(type)) {

        // TO DO

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

    var query,
        field;

    for (var index_0 in this.intermediateQueries) { // Loop through the list of intermediate queries

        var intermediateQuery = this.intermediateQueries[index_0];

        if (intermediateQuery.options.resolve) { // If that intermediate query has a user-defined resolve function

            query = intermediateQuery.options.resolve.apply(intermediateQuery, []); // Apply the user-defined resolve function

        } else { // If resolve function is not present

            for (var index_1 in intermediateQuery.mapping) { // Loop through the mapping list

                if (intermediateQuery.mapping[index_1].map.resolve) { // If the field has a user-defined resolve function

                    field = intermediateQuery.mapping[index_1].map.resolve.apply(intermediateQuery.mapping[index_1], []); // Apply the user-defined resolve function

                } else { // If resolve function is not present

                    /**
                     *
                     * 
                     * 
                     */

                }

            }

        }

    }

};

module.exports = query_generator;
