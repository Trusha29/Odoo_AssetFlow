const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Department = require("../models/Department");
const Category = require("../models/Category");

const seedData = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@assetflow.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";

    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      await User.create({
        name: "System Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "Admin",
        status: "Active",
      });
    }

    const itDepartment = await Department.findOne({ name: "Information Technology" });
    if (!itDepartment) {
      await Department.create({
        name: "Information Technology",
        description: "Core technology and support operations",
        status: "Active",
      });
    }

    const facilitiesDepartment = await Department.findOne({ name: "Facilities" });
    if (!facilitiesDepartment) {
      await Department.create({
        name: "Facilities",
        description: "Facilities and workplace operations",
        status: "Active",
      });
    }

    const electronicsCategory = await Category.findOne({ name: "Electronics" });
    if (!electronicsCategory) {
      await Category.create({
        name: "Electronics",
        description: "Laptops, monitors, phones, and accessories",
        customFields: { warranty: true, brand: true },
        status: "Active",
      });
    }

    const furnitureCategory = await Category.findOne({ name: "Furniture" });
    if (!furnitureCategory) {
      await Category.create({
        name: "Furniture",
        description: "Desks, chairs, and office furniture",
        customFields: { condition: true, location: true },
        status: "Active",
      });
    }

    console.log("Seed data checked");
  } catch (error) {
    console.error("Seed data failed", error.message);
  }
};

module.exports = seedData;
