const express = require("express");

const router = express.Router();
const editoresController = require("../controllers/EditoresController");

router.get("/list-editoriales",editoresController.Getlisteditores);
router.get("/create-editoriales",editoresController.GetcreateEditoreales);
router.post("/create-editoriales",editoresController.PostcreateEditoreales);
router.get("/edit-editoriales/:editorId",editoresController.GeteditEditoreales);
router.post("/edit-editoriales",editoresController.PosteditEditoreales);
router.post("/delete-editoriales",editoresController.PostdeletetEditoreales);

module.exports = router;