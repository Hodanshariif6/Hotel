const express = require("express")
const router = express.Router()
const newsController = require("../controller/newsController")
const uploadImage = require("../middleware/uploadImage")

router.post("/create/New", uploadImage.single("img"), newsController.createNew)

// get
router.post("/read/New", newsController.readNew)

// readsingledata
router.get("/readSingle/New/:id", newsController.readSingleNew)

// updateNew

router.put("/update/New/:id",uploadImage.single("img"), newsController.updateNew)

// deleteNew
router.delete("/delete/New/:id", newsController.deleteNew)

module.exports = router
