const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

mongoose.connect("mongodb+srv://admin:Finance123@cluster0.hngsoga.mongodb.net/?appName=Cluster0")
.then(() => console.log("DB Connected ✅"))
.catch(err => console.log(err));