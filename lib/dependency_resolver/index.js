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
 * [db description]
 * @type {[type]}
 */
var db = null;

/**
 * [self description]
 * @type {[type]}
 */
var self = null;

/**
 * [dependencyInformationTable description]
 * @type {Array}
 */
var dependencyInformationTable = [];

/**
 * [query_generator description]
 */
var query_generator = function() {

    var model_name,
        field_name,
        field_names,
        selections,
        selection,
        projection;

    for (model_name in this.dependencies) { // 

        selections = [];

        projection = {
            "_id": 1
        };

        field_names = [];

        for (field_name in this.dependencies[model_name]) { //

            selection = {};

            selection[field_name] = {
                "$in": Object.keys(this.dependencies[model_name][field_name])
            };

            projection[field_name] = 1;

            selections.push(selection);

            field_names.push(field_name);

        }

        dependencyInformationTable.push({
            model_name: model_name,
            field_names: field_names,
            selection: {
                "$or": selections
            },
            projection: projection
        });

    }

};

/**
 * [query_executor description]
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
 * [dependency_resolver description]
 */
var dependency_resolver = function() {

    self = this;

    db = this.app.db.connections[0];

    query_generator.apply(self, []);

    query_executor.apply(self, [function(err, results) {

        if(err) {
            console.log(err);
        } else {
            console.log(results);
        }

    }]);

    // dependencyInformationTable.forEach(function(each) {

    //     (function(obj) {

    //         obj.promise.then(function(doc) {

    //             for (var index in doc) {

    //                 self.dependencies[obj.model_name][obj.field_name][doc[index][obj.field_name]] = doc[index]._id;

    //             }

    //             console.log(self.dependencies);

    //         });

    //     })(each);

    // });

};

module.exports = dependency_resolver;
