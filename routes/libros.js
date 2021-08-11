const express = require("express");

const router = express.Router();
const librosController = require("../controllers/LibrosController");

router.get("/list-libros",librosController.Getlistlibros);
router.get("/create-libros",librosController.Getcreatelibros);
router.post("/create-libros",librosController.Postcreatelibros);
router.get("/edit-libros/:librosId",librosController.Geteditlibros);
router.post("/edit-libros",librosController.Posteditlibros);
router.post("/delete-libros",librosController.Postdeletetlibros);

module.exports = router;