const router = require("express").Router();
const admin = require("../controllers/admin");

router.get('/getAdmin', admin.getAdmin);
router.post('/dodajAdmina', admin.dodajAdmina);
router.delete('/obrisiAdmina/:id', admin.obrisiAdmina);
router.post('/dodajKategoriju', admin.dodajKategoriju);
router.get('/getTermini', admin.getTermini);
router.get('/getZavrseniTermini', admin.getZavrseniTermini);
router.post('/dodajSlike/:kategorija', admin.dodajSlike);

module.exports = { router };