'use strict';

/**
 * Parses JSON-objects and maps them into intermediate queries
 * @param  {Object} mappingTable                      The mapping from CSV-JSON to MongoDB format
 * @param  {Object} intermediateQueryInformationTable The mapping from CSV-JSON to MongoDB format
 * @param  {Function} handler                         The user-defined handler function
 */
var intermediate_query_generator = function(mappingTable, intermediateQueryInformationTable, handler) {

    if (!mappingTable) {
        throw new Error("Map not provided!");
    }

    if (typeof handler === "function") {
        this.handler = handler;
    }

    /**
     * The mapping from CSV-JSON to MongoDB format
     * @type {Object}
     */
    this.mappingTable = mappingTable;

    /**
     * Intermediate Query Information Table contains all information regarding queries
     * @type {Object}
     */
    this.intermediateQueryInformationTable = intermediateQueryInformationTable || {};

    /**
     * Hooks are function that are executed on the data before or after the handler function is executed
     * @type {Object}
     */
    this.hooks = {
        /**
         * This object contains pre-hooks
         * @type {Array}
         */
        pre: [],
        /**
         * This object contains post-hooks
         * @type {Array}
         */
        post: []
    };

    /**
     * The main working queue where JSON data is acted upon
     * @type {Array}
     */
    this.processingQueue = [];

};

/**
 * Executes user-defined pre & post hooks and the handler function.
 * @param  {Object} jsonObject   The inputted JSON-object data
 * @param  {Function} handler    The user-defined handler function
 */
intermediate_query_generator.prototype.generate = function(jsonObject, handler) {

    var self = this;

    var selectedHandler;

    if (handler) {

        selectedHandler = handler;

    } else if (self.handler) {

        selectedHandler = self.handler;

    } else {

        throw new Error("No handler found!");

    }

    ////////////////////////////////////////////////////
    // Inserting initial object into processing queue //
    ////////////////////////////////////////////////////

    self.processingQueue.push(jsonObject);

    /////////////////////////
    // Executing pre hooks //
    /////////////////////////

    self.hooks.pre.forEach(function(each) {

        self.processingQueue.push(each.apply(self, [self.processingQueue.pop()]));

    });

    ///////////////////////
    // Executing handler //
    ///////////////////////

    self.processingQueue.push(selectedHandler.apply(self, [self.processingQueue.pop()]));

    //////////////////////////
    // Executing post hooks //
    //////////////////////////

    self.hooks.post.forEach(function(each) {

        self.processingQueue.push(each.apply(self, [self.processingQueue.pop()]));

    });

    ////////////////////
    // Storing output //
    ////////////////////
    
    self.intermediateQueryInformationTable.intermediateQueries.push(self.processingQueue.pop());

};

/**
 * Attaches the handler (parsing function) to the parser
 * @param  {Function} handler The parsing function
 */
intermediate_query_generator.prototype.attachHandler = function(handler) {

    if (typeof handler === "function") {

        this.handler = handler;

    } else {

        throw new Error("Handler must be a function!");
    }
}

/**
 * Attaches pre hooks to the parser
 * @param  {Function} hook The hook function
 */
intermediate_query_generator.prototype.preHook = function(hook) {

    if (typeof hook === "function") {

        this.hooks.pre.push(hook);

    } else {

        throw new Error("Hook must be a function!");
    }
};

/**
 * Attaches post hooks to the parser
 * @param  {Function} hook The hook function
 */
intermediate_query_generator.prototype.postHook = function(hook) {

    if (typeof hook === "function") {

        this.hooks.post.push(hook);

    } else {

        throw new Error("Hook must be a function!");
    }
};

module.exports = intermediate_query_generator;
