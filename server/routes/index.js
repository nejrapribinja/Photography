const router = require("express").Router();
const index = require("../controllers/index");

router.post("/prijaviSe", index.prijaviSe);
router.get("/logout", index.logout);

module.exports = { router };