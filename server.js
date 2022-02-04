require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
// const pool = require("db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
const pg = require("pg");
const client = new pg.Client(process.env.CLIENT);
client.connect((error) => {
  error ? console.log(error) : console.log("Client connected.");
});

//server homepage
app.get("/", (req,res) => {
  try {
    res.send("Sesh app backend server via NodeJS, Express, and PostgresSQL");
  } catch (error) {
    console.log(error);
  }
})

//create spot
app.post("/spots", async (req, res) => {
  try {
    const { name, address, phone, host, price } = req.body;
    const newSpot = await client.query("INSERT INTO practiceSpots (name, address, phone, host, price) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [name, address, phone, host, price]);
    res.json(newSpot.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
})


//get all spots
app.get("/spots", async (req, res) => {
  try {
    const allSpots = await client.query("SELECT * FROM practiceSpots");
    res.json(allSpots.rows);
    console.table(allSpots.rows);
  } catch (error) {
    console.log(error.message);
  }
})

//get 1 spot
app.get("/spots/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const spot = await client.query("SELECT * FROM practicespots WHERE spot_id = $1", [id]);
    res.json(spot.rows[0]);
    console.log(spot.rows);
  } catch (error) {
    console.log(error.message);
  }
})


//update spot
app.put("/spots/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone, host, price } = req.body;
    const updateSpot = await client.query("UPDATE practiceSpots SET address = $2, name = $3, price = $4, coord_lng = $5, coord_lat = $6, host = $7 WHERE spot_id = $1", [id, name, address, phone, host, price]);
    res.json("address updated");
    console.log(`Address updated. ${updateSpot}`);
  } catch (error) {
    console.log(error.message);
  }
})

//delete spot
app.delete("/spots/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSpot = await client.query("DELETE FROM practiceSpots WHERE spot_id = $1", [id]);
    res.json("spot deleted");
  } catch (error) {
    console.log(error.message);
  }
})

//create spot hours
app.post("/spothours", async (req, res) => {
  try {
    const {spot_id, sun, mon, tues, wed, thurs, fri, sat} = req.body;
    const newHours = await client.query("INSERT INTO spothours (spot_id, sun, mon, tues, wed, thurs, fri, sat) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [spot_id, sun, mon, tues, wed, thurs, fri, sat]);
    res.json(newHours.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
})


//get all spots hours
app.get("/spothours", async (req, res) => {
  try {
    const allSpots = await client.query("SELECT * FROM spothours");
    res.json(allSpots.rows);
    console.table(allSpots.rows);
  } catch (error) {
    console.log(error.message);
  }
})

//get 1 spots hour
app.get("/spothours/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const spot = await client.query("SELECT * FROM spothours WHERE spot_id = $1", [id]);
    res.json(spot.rows[0]);
    console.log(spot.rows);
  } catch (error) {
    console.log(error.message);
  }
})


//update spot hours
app.put("/spothours/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { sun, mon, tues, wed, thurs, fri, sat } = req.body;
    const updateHours = await client.query("UPDATE spothours SET address = $2, name = $3, price = $4, coord_lng = $5, coord_lat = $6, host = $7 WHERE spot_id = $1", [id, sun, mon, tues, wed, thurs, fri, sat]);
    res.json("address updated");
    console.log(`Hours updated. ${updateHours}`);
  } catch (error) {
    console.log(error.message);
  }
})

//delete spot hours
app.delete("/spothours/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteHours = await client.query("DELETE FROM spothours WHERE spot_id = $1", [id]);
    res.json("Hours deleted");
  } catch (error) {
    console.log(error.message);
  }
})

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
  console.log("server has started on port" + PORT)
});