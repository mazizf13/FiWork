const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Work = require("../models/Work");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Get work list
router.get("/", (req, res) =>
  Work.findAll()
    .then((works) =>
      res.render("works", {
        works,
      })
    )
    .catch((err) => res.render("error", { error: err }))
);

// Display add work form
router.get("/add", (req, res) => res.render("add"));

// Add a work
router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({
      text: "Title is required. Please provide a title for the work.",
    });
  }
  if (!technologies) {
    errors.push({
      text: "Technologies field is required. Please specify the technologies needed.",
    });
  }
  if (!description) {
    errors.push({
      text: "Description is required. Please provide a detailed description of the work.",
    });
  }
  if (!contact_email) {
    errors.push({
      text: "Contact email is required. Please provide an email for contact.",
    });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ", ");

    // Insert into table
    Work.create({
      title,
      technologies,
      description,
      budget,
      contact_email,
    })
      .then((work) => res.redirect("/works"))
      .catch((err) => res.render("error", { error: err.message }));
  }
});

// Search for works
router.get("/search", (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Work.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    .then((works) => res.render("works", { works }))
    .catch((err) => res.render("error", { error: err }));
});

module.exports = router;
