const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");
const KeepData = require("./model/schema");

const port = 5000;
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//     res.setHeader("Content-Type", "application/json");
//     next();
// });



app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/data", async (req, res) => {
  const { title, msg } = req.body;
  try {
    const Data = new KeepData({ title, msg });
    await Data.save();
    res.status(201).json({ message: "Data Submit" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/data", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const findResult = await KeepData.find();
    await res.send({ findResult });

  } catch (error) {
    console.log(error);
  }
});

app.post("/delete", async (req, res) => {
  const {_id} = req.body;
  try {
   await KeepData.deleteOne({_id:_id})
    res.status(201).send({message : "Data Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.post("/edit", async (req, res) => {
  const {_id} = req.body;
  try {
   const userData = await KeepData.findOne({_id:_id})
    res.status(201).send({userData})
    
  } catch (error) {
    console.log(error);
  }
});

app.post("/update", async (req, res) => {
  const { _id, title, msg } = req.body;
  try {
  await KeepData.findByIdAndUpdate({_id},{
    title, msg
   })
    res.status(201).send({ message : "Update User Data"})
  } catch (error) {
    console.log(error);
  }
});


app.listen(port, (e) => {
  console.log(`The page is live ${port}`);
});
