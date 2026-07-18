const users = require("../models/userModel");

// GET all users
exports.getUsers = (req, res) => {
    res.json(users);
};

// POST new user
exports.addUser = (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and Email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User Registered Successfully",
        user: newUser
    });

};