const router = require("express").Router();
const scraperController = require("../../controllers/scraperController");
const CraigController = require("../../controllers/scrapeCraiglistController");

router
    .route("/walmart/:searchTerm")
    .get(scraperController.scrapeWalmart);

router
    .route("/craigslist/:searchTerm")
    .get(CraigController.scraperCraiglist);

module.exports = router;