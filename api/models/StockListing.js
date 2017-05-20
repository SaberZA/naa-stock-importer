/**
 * StockListing.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'StockListing',
  connection: 'naaPostgresServer',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement : true
    },
    payload: {
      type: 'json'
    },
    createdDate: {
      type: 'datetime',
      defaultsTo: function() {
        return new Date();
      }
    }    
  }
};

