const { pool } = require('../db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.prijaviSe = async (req, res, next) => {
  const { korisnicko_ime, lozinka } = req.body;

  const user = await pool.query("SELECT * FROM admin WHERE korisnicko_ime = $1", [korisnicko_ime]);

  if (user.rows.length == 0) {
    return res.status(400).send("Ne postoji korisnik s tim korisnickim imenom!");
  }

  if (await bcrypt.compare(lozinka, user.rows[0].lozinka)) {

    req.userInfo = user.rows[0];
    const tokenInfo = {
      t_user_id: req.userInfo.user_id,
      t_email: req.userInfo.email,
      t_role_id: req.userInfo.role_id,
    };
    
    const token = jwt.sign(tokenInfo, process.env.JWT_SECRET, { expiresIn: "24h" });
    return res.json({
      token
    })
  } else {
    return res.status(400).send("Neispravna lozinka.");
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/");
};