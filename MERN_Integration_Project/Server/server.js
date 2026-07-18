const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/InternDB");

// Student Model
const Student = mongoose.model("Student", {
    name: String
});

// Insert Data
app.post("/students", async (req, res) => {

    const student = new Student({
        name: req.body.name
    });

    await student.save();

    res.send("Student Added Successfully");
});

// Retrieve Data
app.get("/students", async (req, res) => {

    const students = await Student.find();

    res.json(students);

});

app.listen(5000, () => {
    console.log("Server Running at http://localhost:5000");
});