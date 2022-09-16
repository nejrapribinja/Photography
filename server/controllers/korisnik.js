const { pool } = require('../db');

exports.rezervisiDatum = (req, res) => {
    try {
        const {ime, prezime, email, broj, datum, kategorija} = req.body
        console.log(kategorija)
        pool.query(`insert into termini (ime, prezime, email, broj, datum, kategorija_id) 
                    values ($1, $2, $3, $4, $5, $6)`,
            [ime, prezime, email, broj, datum, kategorija],
            (err, result) => {
                if (err) {
                    console.info(err);
                }
                res.status(209).send("yes")
            });

    } catch (err) {
        console.log(err);
    }
};

exports.getKategorije = (req, res) => {
    try {
        pool.query(`select * from kategorija`,
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

exports.getSlike = (req, res) => {
    const {id} = req.params;
    try {
        pool.query(`SELECT * FROM fotografija WHERE kategorija_id = $1`, [id],
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
