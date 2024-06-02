const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./config/database");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

app.engine(
  "handlebars",
  exphbs.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index", { layout: "landing" }));

app.use("/works", require("./routes/works"));

const PORT = process.env.PORT || 3500;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
