/**
 * StockItemViewController
 *
 * @description :: Server-side logic for managing Stockitemviews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  viewAll: function (req, res) {

    StockListingDbService.getLatestStockListing()
      .then(function (latestListing) {

        // var stockItems = JSON.parse(latestListing.payload);
        return res.view('viewLatestStockListing', {
          stockItems: latestListing.payload
        });
      }).catch(function (err) {
        return res.serverError(err);
      });
  }
};
