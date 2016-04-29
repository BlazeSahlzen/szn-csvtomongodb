'use strict';

/**
 * uuid module to generate unique ID's for every query (for indexed operations)
 */
var uuid = require('uuid');

/**
 * The function to invoke for generating intermediate query object from simple-JSON
 * @param  {Object} json_object JSON object parsed from CSV data
 * @return {Object}            The intermediate query object
 */
var generator_function = function(json_object) {
    //////////////////////////
    // Generating unique ID //
    //////////////////////////
    var id = uuid.v4();

    ///////////////////////////////////
    // Generating intermediate query //
    ///////////////////////////////////
    var intermediate_query = {
        uuid: id,
        fields: [],
        options: this.mappingTable.options
    };

    /////////////////////////////////////////////////////////
    // Pushing mapping data into intermediate query object //
    /////////////////////////////////////////////////////////
    for (var key in json_object) {
        intermediate_query.fields.push({
            csv_key: key,
            csv_value: json_object[key],
            map: this.mappingTable.fields[key]
        });
    }

    return intermediate_query;
};

/**
 * Parses JSON-objects and maps them into intermediate queries
 * @param  {Object} json_object   The JSON-object containing the CSV-record
 */
var intermediate_query_generator = function(json_object) {
    ///////////////////////////////////
    // Generating intermediate_query //
    ///////////////////////////////////
    var intermediate_query = generator_function.apply(this, [json_object]);

    /////////////////////////////////////////////////////////////////////////////////
    // Putting intermediate_query into intermediate queries list (using unique ID) //
    /////////////////////////////////////////////////////////////////////////////////
    this.intermediateQueries[intermediate_query.uuid] = intermediate_query;

    ////////////////////////////
    // Setting the state to 1 //
    ////////////////////////////
    this.internalStateTable[intermediate_query.uuid] = {
        uuid: intermediate_query.uuid,
        state: 1
    };

    return intermediate_query;
};

module.exports = intermediate_query_generator;
