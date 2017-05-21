module.exports = {
    saveStockListing: function(jsonData) {        

        return sails.models.stocklisting.create({
            payload: jsonData
          }).then(function(listingRecord) {
            sails.log('Latest Stock Listing has an ID of ' + listingRecord.id);
            return listingRecord;
          });
    }
};