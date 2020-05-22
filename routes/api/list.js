const router = require("express").Router();
const ListController = require("../../controllers/listController");

// Matches with "/api/item"
router.route("/")
  .get(ListController.findAll)
  .post(ListController.create);

// Matches with "/api/item/:id"
router
  .route("/:id")
  .get(ListController.findById)
  .put(ListController.update)
  .delete(ListController.remove);

router
  .route("/user/:id")
  .get(ListController.findAllByUser)

router
  .route("/delete/:id")
  .put(ListController.removeItem)

module.exports = router;
