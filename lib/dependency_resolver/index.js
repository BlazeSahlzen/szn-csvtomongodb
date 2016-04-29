'use strict';

/**
 * Allows systematic approach to async coding
 */
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

    //////////////////////////////////////////////////////////////////////////
    // Stores the name of the model on which a dependency exists (loop var) //
    //////////////////////////////////////////////////////////////////////////
    var model_name,

        //////////////////////////////////////////////////////////////////////////
        // Stores the name of the field on which a dependency exists (loop var) //
        //////////////////////////////////////////////////////////////////////////
        field_name,

        ///////////////////////////////////////////////////////////
        // Stores all the field names on which dependency exists //
        ///////////////////////////////////////////////////////////
        field_names,

        //////////////////////////////////////////////////
        // Stores the current find selector (for query) //
        //////////////////////////////////////////////////
        selection,

        //////////////////////////////////////////////
        // Stores all selection objects (for query) //
        //////////////////////////////////////////////
        selections,

        //////////////////////////////////////////////////////
        // Stores the current projection object (for query) //
        //////////////////////////////////////////////////////
        projection;

    //////////////////////////////////////
    // Loop over the model-dependencies //
    //////////////////////////////////////
    for (model_name in this.dependencies) {

        ///////////////////////////
        // Initialize selections //
        ///////////////////////////
        selections = [];

        ///////////////////////////
        // Initialize projection //
        ///////////////////////////
        projection = {
            "_id": 1
        };

        ////////////////////////////
        // Initialize field_names //
        ////////////////////////////
        field_names = [];

        //////////////////////////////////////
        // Loop over the field-dependencies //
        //////////////////////////////////////
        for (field_name in this.dependencies[model_name]) {

            //////////////////////////
            // Initialize selection //
            //////////////////////////
            selection = {};

            //////////////////////////////////
            // Insert property in selection //
            //////////////////////////////////
            selection[field_name] = {

                //////////////////////////////////////////////////////////////////////////////////////////////////
                // Trick is to use the $in operator to retrieve all the documents (TO REDUCE NUMBER OF QUERIES) //
                //////////////////////////////////////////////////////////////////////////////////////////////////
                "$in": Object.keys(this.dependencies[model_name][field_name])
            };

            ///////////////////////////////////
            // Insert property in projection //
            ///////////////////////////////////
            projection[field_name] = 1;

            ////////////////////////////////////
            // Push selection into selections //
            ////////////////////////////////////
            selections.push(selection);

            //////////////////////////////////////
            // Push field_name into field_names //
            //////////////////////////////////////
            field_names.push(field_name);
        }

        /////////////////////////////////////////////////////////////////////
        // Push all relevant information into dependency_information_table //
        /////////////////////////////////////////////////////////////////////
        dependency_information_table.push({
            model_name: model_name,
            field_names: field_names,

            //////////////////////////////////
            // Final query-selection object //
            //////////////////////////////////
            selection: {

                //////////////////////////////////////////////////////////////////////////////////////////////////
                // Trick is to use the $or operator to retrieve all the documents (TO REDUCE NUMBER OF QUERIES) //
                //////////////////////////////////////////////////////////////////////////////////////////////////
                "$or": selections
            },

            ///////////////////////////////////
            // Final query-projection object //
            ///////////////////////////////////
            projection: projection
        });
    }
};

/**
 * To execute the queries for finding the data in the database on which dependency exists
 * @param {Function} cb The final callback
 */
var query_executor = function(cb) {

    ///////////////////////////////////////////////////////////////////////////////////////////
    // Using async.map to execute all the queries stored in the dependency_information_table //
    ///////////////////////////////////////////////////////////////////////////////////////////
    async.map(dependency_information_table, function(item, callback) {

            ////////////////////
            // The find query //
            ////////////////////
            db.models[item.model_name].find(item.selection, item.projection, function(err, doc) {

                if (err) {

                    /////////////////////
                    // Error-handling? //
                    /////////////////////

                    callback(err, null);

                } else {

                    ////////////////////////
                    // Storing the output //
                    ////////////////////////
                    item.output = doc;

                    //////////////////////////////////
                    // Returning the current output //
                    //////////////////////////////////
                    callback(null, item);
                }
            });
        },
        
        ////////////////////////////////////
        // Registering the final callback //
        ////////////////////////////////////
        cb);
};

/**
 * To populate the values in the dependencies list, thus, resolving the dependencies!
 * @param  {Object} dep_info_table List of documents which will be used to populate the dependencies list
 */
var populate_dependency_list = function(dep_info_table) {

    ///////////////////////////////////////////////////
    // Loop through the dependency information table //
    ///////////////////////////////////////////////////
    dep_info_table.forEach(function(dep_info_table_elem) {

        /////////////////////////////////////////////////////////////////////////////////////////
        // Loop through the output property in one element of the dependency information table //
        /////////////////////////////////////////////////////////////////////////////////////////
        dep_info_table_elem.output.forEach(function(document) {

            //////////////////////////////////////////////////////////////////////////////////////
            // Loop through the field_names in that element of the dependency information table //
            //////////////////////////////////////////////////////////////////////////////////////
            dep_info_table_elem.field_names.forEach(function(field_name) {

                ////////////////////////
                // Resolve dependency //
                ////////////////////////
                self.dependencies[dep_info_table_elem.model_name][field_name][document[field_name]] = document._id;
            });
        });
    });
};

/**
 * Entry-point dependency_resolver
 */
var dependency_resolver = function(callback) {

    ///////////////////////////////////
    // Store reference to self-scope //
    ///////////////////////////////////
    self = this;

    ////////////////////////////////////////////
    // Store reference to database connection //
    ////////////////////////////////////////////
    db = this.app.db.connections[0];

    ///////////////////////////////////////////////////////
    // Generate the queries need to resolve dependencies //
    ///////////////////////////////////////////////////////
    query_generator.apply(self, []);

    /////////////////////////////////////////////////////////////////////////////////////////
    // Execute the find-queries for resolving the dependencies and apply callback after it //
    /////////////////////////////////////////////////////////////////////////////////////////
    query_executor.apply(self, [function(err, dep_info_table) {

        if (err) {

            /////////////////////
            // Error handling? //
            /////////////////////

        } else {
            //////////////////////////////////////////////////////////////////////////////
            // Populating the dependency list from the data retrieved from the database //
            //////////////////////////////////////////////////////////////////////////////
            populate_dependency_list(dep_info_table);
        }

        ///////////////////////////////////////////////////////////
        // Continue on to the next section of the csv processing //
        ///////////////////////////////////////////////////////////
        callback();
    }]);
};

module.exports = dependency_resolver;
