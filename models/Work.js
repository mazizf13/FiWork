const Sequelize = require("sequelize");
const db = require("../config/database");

const Work = db.define("work", {
  title: {
    type: Sequelize.STRING,
  },
  technologies: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  budget: {
    type: Sequelize.STRING,
  },
  contact_email: {
    type: Sequelize.STRING,
  },
});

Work.sync().then(() => {
  console.log("table created");
});

module.exports = Work;
