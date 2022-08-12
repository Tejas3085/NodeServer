const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./user");
var cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
mongoose.connect(
  "mongodb+srv://tejas:q5BmRmXldhNbwyoa@cluster0.ojmxsvx.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get("/user", function (req, res) {
  User.find().then((data) => {
    res.status(200).json(data);
  });
});

app.post("/user", jsonParser, function (req, res) {
  const data = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    city: req.body.city,
  });
  data
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => console.log(error));
});

app.delete("/user/:id", function (req, res) {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.put("/user/:id", jsonParser, function (req, res) {
  User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        city: req.body.city,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.listen(4000);
