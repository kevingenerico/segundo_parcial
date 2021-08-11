const express = require("express");

const router = express.Router();
const autoresController = require("../controllers/AutoresController");

router.get("/list-autores",autoresController.Getlistautores);
router.get("/create-autores",autoresController.Getcreateautores);
router.post("/create-autores",autoresController.Postcreateautores);
router.get("/edit-autores/:autorId",autoresController.Geteditautores);
router.post("/edit-autores",autoresController.Posteditautores);
router.post("/delete-autor",autoresController.Postdeletetautores);
module.exports = router;