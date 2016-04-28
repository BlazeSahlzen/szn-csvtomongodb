'use strict';

/////////////////////////////////////////////////////////////////////////////////////////
// Search in database                                                                  //
//                                                                                     //
// Reference Model Name --> intermediateQuery.mapping[index_1].map.ref_model_name      //
// Reference Field Name -------> intermediateQuery.mapping[index_1].map.ref_field_name //
// Value to check against -----> intermediateQuery.mapping[index_1].csv_value          //
// Value to return ------------> _id                                                   //
//                                                                                     //
// If not found, then throw error?                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

var async = require('async');

/**
 * Reference to the mongoose instance
 * @type {Object}
 */
var db = null;

/**
 * Reference to self-scope
 * @type {Object}
 */
var self = null;

/**
 * Holds all information regarding dependencies
 * @type {Array}
 */
var dependencyInformationTable = [];

/**
 * To generate queries for dependency resolution
 */
var query_generator = function() {

    var model_name, // Stores the name of the model on which a dependency exists (loop var)

        field_name, // Stores the name of the field on which a dependency exists (loop var)

        field_names, // Stores all the field names on which dependency exists

        selection, // Stores the current find selector (for query)

        selections, // Stores all selection objects (for query)

        projection; // Stores the current projection object (for query)

    for (model_name in this.dependencies) { // Loop over the model-dependencies

        selections = []; // Initialize selections

        projection = { // Initialize projection
            "_id": 1
        };

        field_names = []; // Initialize field_names

        for (field_name in this.dependencies[model_name]) { // Loop over the field-dependencies

            selection = {}; // Initialize selection

            selection[field_name] = { // Insert property in selection
                "$in": Object.keys(this.dependencies[model_name][field_name]) // Trick is to use the $in operator to retrieve all the documents (TO REDUCE NUMBER OF QUERIES)
            };

            projection[field_name] = 1; // Insert property in projection

            selections.push(selection); // Push selection into selections

            field_names.push(field_name); // Push field_name into field_names

        }

        dependencyInformationTable.push({ // Push all relevant information into dependencyInformationTable
            model_name: model_name,
            field_names: field_names,
            selection: { // Final query-selection object
                "$or": selections // Trick is to use the $or operator to retrieve all the documents (TO REDUCE NUMBER OF QUERIES)
            },
            projection: projection // Final query-projection object
        });

    }

};

/**
 * To execute the queries
 * @param {Function} cb The callback
 */
var query_executor = function(cb) {

    async.map(dependencyInformationTable, function(item, callback) {

        db.models[item.model_name].find(item.selection, item.projection, function(err, doc) {

            if (err) {

                callback(err, null);

            } else {

                item.output = doc;

                callback(null, item);
            }

        });

    }, cb);

};

/**
 * To populate the values in the dependency list
 * @param  {Object} depInfoTable Individual documents to be resolved
 */
var populateValues = function(depInfoTable) {

    depInfoTable.forEach(function(depInfoTableElem) {

        depInfoTableElem.output.forEach(function(document) {

            depInfoTableElem.field_names.forEach(function(field_name) {

                self.dependencies[depInfoTableElem.model_name][field_name][document[field_name]] = document._id;

            });

        });

    });

};

/**
 * Entry-point function for resolving dependencies
 * @param callback The main callback
 */
var dependency_resolver = function(callback) {

    self = this;

    db = this.app.db.connections[0];

    query_generator.apply(self, []);

    query_executor.apply(self, [function(err, depInfoTable) {

        if (err) {
            console.log(err);
        } else {
            populateValues(depInfoTable);
        }

        callback();

    }]);

};

module.exports = dependency_resolver;
