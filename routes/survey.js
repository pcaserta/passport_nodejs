const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "yourRootPassword",
  database: "imt"
});

function getConnection() {
  return pool;
}

router.post("/submit", (req, res) => {
  console.log("trying to add user to db");
  const email = req.body.email;
  const q1 = req.body.q1;
  const q2 = req.body.q2;
  const q3 = req.body.q3;

  const queryString =
    "INSERT into new_table (email, q1, q2, q3) VALUES (?,?,?,?)";
  getConnection().query(
    queryString,
    [email, q1, q2, q3],
    (err, results, fields) => {
      if (err) {
        console.log("failed to insert survey" + err);
        res.sendStatus(500);
        return;
      }
      console.log("Inserted a new survey with id ", results.insertId);
      res.end();
    }
  );

  res.end();
});

module.exports = router;
