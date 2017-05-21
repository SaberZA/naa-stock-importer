module.exports = {
    saveStockListing: function(jsonData) {        

        return sails.models.stocklisting.create({
            payload: jsonData
          }).then(function(listingRecord) {
            sails.log('[saveStockListing] Latest Stock Listing has an ID of ' + listingRecord.id);
            return listingRecord;
          });
    },
    getLatestStockListing: function() {
        return sails.models.stocklisting.find().sort('createdDate DESC').limit(1)
            .then(function(listingRecord) {
                if(listingRecord.length < 1) {
                    throw 'No Stock Listing found!';
                }
            sails.log('[getLatestStockListing] Latest Stock Listing has an ID of ' + listingRecord[0].id);
                return listingRecord[0];
            });
        
    }
};