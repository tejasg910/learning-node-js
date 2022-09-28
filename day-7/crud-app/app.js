const mongoose = require("mongoose");
const express = require("express");
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log("there is problem");
  });

const Car = mongoose.model("Car", {
  model: String,
  country: Number,
  isFwd: Boolean,
  make: String,
});

const app = express();

//we are posting the data from the client and then we would be adding into db
//you are getting json object and the moment you add the express.json you will get object converted from the json
//you have posted the data from client to the server
app.post("/", express.json(), (req, res) => {
  const car = req.body;
  console.log(car);
  //     const dbObj = new Car({model: car.model,
  //     make: car.make,
  // })

  // ...car is equal to above object
  const dbObj = new Car({ ...car });
  dbObj
    .save()
    .then(() => {
      res.status(200).json({ sts: "success" });
    })
    .catch((err) => {
      res.status(400).json({ sts: "failed" });
    });
});

// you can find the data by using car schema object
app.get("/", (req, res) => {

    // first select criteria and second is exclusion third is callback having error and data parameters 
  const cars = Car.find({}, { __v: 0 }, (err, crs) => {
    if (err) res.status(500).json({ err: "error" });
    res.json(crs);
  });
});




//Homework 
//updating the data 
app.put("/:id", (req, res) => {
  const car_id = req.params.id;
  Car.findByIdAndUpdate(car_id, { model: 'old', make: "us"}, (err, data) =>{
if (err) res.status(400).json({error: "error occured"})

console.log("Updated data : ", data);
res.status(200).json({Success: "Updated successfully"})


});


});
app.delete("/:id", (req, res) => {
  const car_id = req.params.id;
  Car.findByIdAndDelete({_id: car_id}, (err, data)=>{
    if(err)  res.status(400).json({error: "something went wrong"})
    res.status(200).json({Success: "car deleted successfully"})
  })


});

app.listen(3000, () => {
  console.log("sever started");
});
