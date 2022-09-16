const { pool } = require('../db');
const bcrypt = require("bcrypt");

exports.getAdmin = (req, res) => {
  try {
    pool.query(`SELECT * from admin`,
      (err, result) => {
        if (err) {
          console.info(err);
        }
        res.json(result.rows);
        //console.log(result.rows);
      });

  } catch (err) {
    console.log(err);
  }
}

exports.dodajAdmina = async (req, res) => {
  const { korisnicko_ime, lozinka } = req.body;

  const hashedPassword = await bcrypt.hash(lozinka, 10);

  await pool.query("INSERT INTO admin(korisnicko_ime, lozinka) VALUES ($1, $2);", [korisnicko_ime, hashedPassword]);

  res.status(201).redirect("/login");
};

exports.obrisiAdmina = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM admin WHERE id = $1", [id]);
    res.json("Admin uspjesno obrisan")

  } catch (err) {
    console.log(err.message);
  }
}

exports.dodajKategoriju = (req, res) => {
  try {
    const { naziv } = req.body;
    pool.query(`insert into kategorija (naziv) values ($1)`, [naziv],
      (err, result) => {
        if (err) {
          console.info(err);
        }
        res.status(200);
      });

  } catch (err) {
    console.error(err.message);
  }
};

exports.getTermini = (req, res) => {
  try {
    pool.query(`SELECT *, to_char(t.datum, 'DD/MM/YYYY') as dat 
                FROM termini t
                INNER JOIN kategorija k on t.kategorija_id = k.id
                WHERE datum > CURRENT_DATE`,
      (err, result) => {
        if (err) {
          console.info(err);
        }
        res.json(result.rows);
        //console.log(result.rows);
      });

  } catch (err) {
    console.error(err.message);
  }
}

exports.getZavrseniTermini = (req, res) => {
  try {
    pool.query(`SELECT *, to_char(t.datum, 'DD/MM/YYYY') as dat
                FROM termini t
                INNER JOIN kategorija k on t.kategorija_id = k.id
                WHERE datum < CURRENT_DATE`,
      (err, result) => {
        if (err) {
          console.info(err);
        }
        res.json(result.rows);
        //console.log(result.rows);
      });

  } catch (err) {
    console.error(err.message);
  }
}

exports.dodajSlike = async (req, res) => {
  const { kategorija } = req.params;
  console.log(kategorija);
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  
  const myFile = req.files.image;
  //  mv() method places the file inside public directory
  myFile.mv(`../client/src/images/uploadedImages/${myFile.name}`, function (err) {
    if (err) {
      console.log(err.message)
      return res.status(500).send({ msg: "Error occured" });
    }
    pool.query(`insert into fotografija(slika, kategorija_id)
                             values($1, $2)`, [myFile.name, kategorija],
      (err, result) => {
        if (err) {
          console.info(err);

        }
      });
    return res.send({ name: myFile.name, path: `/${myFile.name}` });
  });
}