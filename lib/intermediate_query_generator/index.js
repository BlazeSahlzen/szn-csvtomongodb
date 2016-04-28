'use strict';

var uuid = require('uuid');

/**
 * The function to invoke for generating intermediate query object from simple-JSON
 * @param  {Object} jsonObject JSON object parsed from CSV data
 * @return {Object}            The intermediate query object
 */
var intermediate_query_generator_function = function(jsonObject) {

    var id = uuid.v4();

    var intermediateQuery = {
        uuid: id,
        mapping: [],
        options: this.mappingTable.options /*--------------- may not require in future -----------------*/
    };

    for (var key in jsonObject) {
        intermediateQuery.mapping.push({
            csv_key: key,
            csv_value: jsonObject[key],
            map: this.mappingTable.mapping[key] /*--------------- may not require in future -----------------*/
        });
    }

    return intermediateQuery;

};

/**
 * Parses JSON-objects and maps them into intermediate queries
 * @param  {Object} jsonObject   The JSON-object containing the CSV-record
 */
var intermediate_query_generator = function(jsonObject) {

    var intermediateQuery = intermediate_query_generator_function.apply(this, [jsonObject]);

    this.intermediateQueries[intermediateQuery.uuid] = intermediateQuery;

    this.internalStateTable[intermediateQuery.uuid] = {
        uuid: intermediateQuery.uuid,
        status: 1
    };

    return intermediateQuery;

};

module.exports = intermediate_query_generator;
