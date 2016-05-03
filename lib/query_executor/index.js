'use strict';

/**
 * [async description]
 * @type {[type]}
 */
var async = require('async');


var insert_operation = function() {

};


var update_operation = function() {

};

/**
 * [query_executor description]
 */
var query_executor = function() {

    var self = this;

    var dbModels = self.app.models;

    var raw_queries = [];

    var bulkOpInsert = {},
        bulkOpUpdate = {};

    for (var key in self.queries) {

        var query = self.queries[key];

        if()

        if (!bulkOpInsert[query.model]) {

            bulkOpInsert[query.model] = [];

        }

        bulkOpInsert[query.model].push(query.document);

        raw_queries.push(query.document);



    }





    // for (var key in self.queries) {

    //     var query = self.queries[key];

    //     if (!bulkOp[dbModels[query.model].collection.collectionName]) {

    //         bulkOp[dbModels[query.model].collection.collectionName] = {
    //             'operation': dbModels[query.model].collection.initializeOrderedBulkOp(),
    //             'promise': null,
    //             'output': {}
    //         };

    //     }

    //     bulkOp[dbModels[query.model].collection.collectionName].operation.insert(query.document);

    // }

    // for (var key in bulkOp) {

    //     var bulk = bulkOp[key].operation;

    // bulkOp[key].promise = (bulkOp[key].operation.execute())
    //     .then(function(results) {
    //         console.log(results.toJSON());

    //         bulkOp[key].output = results.toJSON();
    //     });

    //     console.log(key);
    //     bulk.execute();

    // }

    // console.log(1);

    self.callback(self);

};

module.exports = query_executor;
