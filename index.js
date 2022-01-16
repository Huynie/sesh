const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create spot
app.post("/spots", async (req, res) => {
  try {
    const { address } = req.body;
    const newAddress = await pool.query("INSERT INTO practiceSpots (address) VALUES($1) RETURNING *", [address]);
    console.log(res.json(newAddress.rows[0]));
    
  } catch (error) {
    console.log(error.message);
  }
})


//get all spots
app.get("/spots", async (req, res) => {
  try {
    const allSpots = await pool.query("SELECT * FROM practiceSpots");
    res.json(allSpots.rows);
  } catch (error) {
    console.log(error.message);
  }
})

//get 1 spot
app.get("/spots/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const spot = await pool.query("SELECT * FROM practicespots WHERE spot_id = $1", [id]);
    res.json(spot.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
})


//update spot
app.put("/spots/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { address } = req.body;
    const updateAddress = await pool.query("UPDATE practiceSpots SET address = $1 WHERE spot_id = $2", [address, id]);
    res.json("address updated");
  } catch (error) {
    console.log(error.message);
  }
})

//delete spot
app.delete("/spots/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAddress = await pool.query("DELETE FROM practiceSpots WHERE spot_id = $1", [id]);
    res.json("address deleted");
  } catch (error) {
    console.log(error.message);
  }
})

app.listen(5000, () => {
  console.log("server has started on port 5000")
});