const router = require("express").Router();
const UserRoutes = require("./user");
const ItemRoutes = require("./item");
const ListRoutes = require("./list");
const ScraperRoutes = require("./scraper");
const CraiglistRoutes = require("./CraiglistScraper");

// routes
router.use("/user", UserRoutes);
router.use("/list", ListRoutes);
router.use("/item", ItemRoutes);
router.use("/scraper", ScraperRoutes);
router.use("/scraper", CraiglistRoutes);


module.exports = router;
