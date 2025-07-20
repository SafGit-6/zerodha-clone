require('dotenv').config();

const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const authRoute = require("./routes/AuthRoute");
const otpRoute = require("./routes/otp");

const {HoldingsModel} = require('./model/HoldingsModel');
const {PositionsModel} = require("./model/PositionsModel");
const {OrdersModel} = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));



app.use(express.json());


app.get("/allHoldings",async(req,res)=>{
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
})

app.get("/allPositions",async(req,res)=>{
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
})

app.post('/newOrder',async(req,res)=>{
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty:  req.body.qty,
    price:req.body.price,
    mode: req.body.mode,
  })
  newOrder.save();
  res.send("Order saved");
});

app.use('/api', otpRoute);
app.use("/",authRoute);

async function startServer() {
    try {
      await mongoose.connect(uri);
      console.log("DB connected");
  
      app.listen(PORT, () => {
        console.log(`App started on port ${PORT}`);
      });
  
    } catch (err) {
      console.error("Failed to connect to DB:", err);
    }
  }
  
  startServer();
  