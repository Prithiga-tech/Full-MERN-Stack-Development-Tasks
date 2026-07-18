// controllers/userController.js
// Handles fetching, updating, and deleting user records.
// All routes here are protected by authMiddleware.

const bcrypt = require("bcryptjs");
const User = require("../models/User");

// @route   GET /api/users
// @access  Private
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/users/:id
// @access  Private (a user may only update their own profile)
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Only the owner of the profile can update it
    if (user._id.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this profile");
    }

    const { name, bio, password } = req.body;

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;

    // If a new password was provided, hash it before saving
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/users/:id
// @access  Private (a user may only delete their own account)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user._id.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this account");
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };
