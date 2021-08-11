const path = require("path");
const express = require("express");
const expresshbs = require("express-handlebars");
const errorController = require("./controllers/ErrorController404");
const sequelize = require("./util/database");
const Autores = require("./models/autor");
const Editores = require("./models/editor");
const Libros = require("./models/libro");
const compareHelpers = require('./util/helpers/hbs/compare')

const app = express();

app.engine(
    "hbs",
    expresshbs({
      layoutsDir: "views/layouts/",
      defaultLayout: "main-layout",
      extname: "hbs",
      helpers: {
        equalValue: compareHelpers.EqualValue,
      },
    })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"public")));

const indexrouter = require("./routes/index");
const librosrouter = require("./routes/libros");
const editorialesrouter = require("./routes/editores");
const autoresrouter = require("./routes/autores");

app.use(indexrouter);
app.use(librosrouter);
app.use(editorialesrouter);
app.use(autoresrouter);
app.use(errorController.Get404);

Libros.belongsTo(Autores,{constraint: true,onDelete:"CASCADE"});
Libros.belongsTo(Editores,{constraint: true,onDelete:"CASCADE"});
Autores.hasMany(Libros);
Editores.hasMany(Libros);

sequelize.sync().then(result=>{
  app.listen(5050);

}).catch(err =>{
    console.log(err);
})

