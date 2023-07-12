const express = require("express");
const router = express.Router();
const {
  getAllCruds,
  postCrud,
  getACrud,
  patchCrud,
  deleteCrud,
} = require("../controllers/crudController");

// creating routes
router.get("/", getAllCruds);

router.post("/test", postCrud);


router.get("/test/:id", getACrud);

router.patch("/test/:id", patchCrud);

router.delete("/test/:id", deleteCrud);

module.exports = router;
