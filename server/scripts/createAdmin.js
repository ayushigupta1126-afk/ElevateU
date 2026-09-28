const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("../models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    const adminEmail = "admin@elevateu.com";
    const adminPassword = "Admin@12345";

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      existingAdmin.role = "admin";

      await existingAdmin.save();

      console.log("Existing user promoted to admin.");
    } else {
      const hashedPassword = await bcrypt.hash(
        adminPassword,
        10
      );

      await User.create({
        name: "ElevateU Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin account created.");
    }

    console.log("Admin Email:", adminEmail);
    console.log("Admin Password:", adminPassword);

    await mongoose.disconnect();

    console.log("MongoDB disconnected.");
  } catch (error) {
    console.error("Create admin error:", error.message);

    process.exit(1);
  }
};

createAdmin();