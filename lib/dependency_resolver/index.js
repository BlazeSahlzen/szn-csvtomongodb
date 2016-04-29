'use strict';

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
 * Each element is a query for resolving a particular dependency
 * @type {Array}
 */
var dependency_information_table = [];

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

        dependency_information_table.push({ // Push all relevant information into dependency_information_table
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
 * To execute the queries for finding the data in the database on which dependency exists
 * @param {Function} cb The callback
 */
var query_executor = function(cb) {

    async.map(dependency_information_table, function(item, callback) {

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
 * To populate the values in the dependencies list, thus, resolving the dependencies!
 * @param  {Object} dep_info_table List of documents which will be used to populate the dependencies list
 */
var populate_dependency_list = function(dep_info_table) {

    dep_info_table.forEach(function(dep_info_table_elem) { // Loop through the dependency information table

        dep_info_table_elem.output.forEach(function(document) { // Loop through the output property in one element of the dependency information table

            dep_info_table_elem.field_names.forEach(function(field_name) { // Loop through the field_names in that element of the dependency information table

                self.dependencies[dep_info_table_elem.model_name][field_name][document[field_name]] = document._id; // Resolve dependency
            });
        });
    });
};

/**
 * Entry-point dependency_resolver
 */
var dependency_resolver = function(callback) {

    self = this;

    db = this.app.db.connections[0];

    query_generator.apply(self, []);

    query_executor.apply(self, [function(err, dep_info_table) {

        if (err) {
            ///////////////////////
            console.log(err);
            ///////////////////////
        } else {
            populate_dependency_list(dep_info_table);
        }

        callback();

    }]);

};

module.exports = dependency_resolver;
