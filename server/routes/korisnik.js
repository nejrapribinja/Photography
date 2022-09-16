const router = require("express").Router();
const korisnik = require("../controllers/korisnik");

router.post("/rezervisiDatum", korisnik.rezervisiDatum);
router.get("/getKategorije", korisnik.getKategorije);
router.get("/getSlike/:id", korisnik.getSlike);

module.exports = { router };