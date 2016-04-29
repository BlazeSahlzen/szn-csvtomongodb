'use strict';

//////////////////////////////////////////////////
// What makes a query?                          //
// 1. DB name?                                  //
// 2. Model name?                               //
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

        // Needed ?

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

    var self = this;

    self.queries = [];

    for (var key in self.intermediateQueries) {

        var intermediateQuery = self.intermediateQueries[key];

        var query = {
            uuid: intermediateQuery.uuid,
            model: intermediateQuery.options.model_name,
            query_type: intermediateQuery.options.type
        };

        intermediateQuery.query = query;

        if (intermediateQuery.options.type === "insert") {

            query.document = {};

        } else if (intermediateQuery.options.type === "update") {

            query.selector = {};

            query.document = {};

        }

        intermediateQuery.fields.forEach(function(field) {

            // Checking for ignore-property
            if (!(field.map.ignore && fields.map.ignore === true)) {

                // Checking for dependency
                if (field.map.ref_model_name) {

                    if (self.dependencies[field.map.ref_model_name][field.map.ref_field_name][field.csv_value]) {

                        field.resolved_value = self.dependencies[field.map.ref_model_name][field.map.ref_field_name][field.csv_value];

                    } else {

                        // Do what? Throw error?

                    }

                } else {

                    field.resolved_value = field.csv_value;

                }

                // Checking for type-property
                if (field.map.type) {

                    field.resolved_value = type_cast(field.resolved_value, field.map.type);

                }

                // Checking for field-level resolve-function
                if (field.map.resolve) {

                    query.document[field.map.field_name] = field.map.resolve.apply(field, [self.app]);

                } else {

                    query.document[field.map.field_name] = field.resolved_value;

                }

            }

        });

        // Checking for query-level resolve-function
        if(intermediateQuery.options.resolve) {

            query.document = intermediateQuery.options.resolve.apply(intermediateQuery, [self.app]);

        }

        // Push query into query list
        self.queries.push(query);

    }

    self.callback(self);

};

module.exports = query_generator;
