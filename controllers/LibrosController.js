const librobd = require("../models/libro");
const autorbd = require("../models/autor");
const editorbd = require("../models/editor");

exports.Getlistlibros = (req,res,next) =>{

    librobd.findAll({include:[{model: editorbd}, {model: autorbd}]}).then((result) => {
        const Libro = result.map((result) => result.dataValues);

        res.render("libros/list-libros",{
        pageTitle: "libros", 
        libroActive: true,
        Libro : Libro,
        hasLibro: Libro.length > 0
    })
      })
      .catch((err) => {
        console.log(err);
      });
};

exports.Getcreatelibros = (req,res,netx) =>{

    editorbd.findAll().then((result) => {
        const editor = result.map((result) => result.dataValues);

        autorbd.findAll().then((result) => {
            const autor = result.map((result) => result.dataValues);
    
            res.render("libros/save-libros",{
                pageTitle: "crear libros",  
                libroActive: true, 
                editMode: false,
                Autor: autor,
                Editor: editor,
                hasAutor: autor.length > 0,
                hasEditor: editor.length > 0
            })
          })
          .catch((err) => {
            console.log(err);
          });
    
      })
      .catch((err) => {
        console.log(err);
      });

};

exports.Postcreatelibros = (req,res,netx) =>{
    const name = req.body.name;
    const fecha = req.body.fecha;
    const autor = req.body.autor;
    const editorial = req.body.editorial;

    librobd.create({
        name: name,
        fecha: fecha,
        autoreId: autor,
        editoreId: editorial,
      })
        .then((result) => {
            res.redirect("/list-libros");
        })
        .catch((err) => {
          console.log(err);
        });
};

exports.Geteditlibros = (req,res,netx) =>{
    const edit = req.query.edit
    const librosid = req.params.librosId;

    if (!edit) {
      return  res.redirect("/");
    }

    librobd.findOne({ where: { id: librosid } }).then((result) => {

        const Libro = result.dataValues;   
        if (!Libro) {
          return res.redirect("/");
        }

        editorbd.findAll().then((result) => {
            const editor = result.map((result) => result.dataValues);
    
            autorbd.findAll().then((result) => {
                const autor = result.map((result) => result.dataValues);
        
                res.render("libros/save-libros",{
                    pageTitle: "editar libros",
                    libroActive: true,
                    editMode: edit,
                    Libro: Libro,
                    Autor: autor,
                    Editor: editor,
                    hasAutor: autor.length > 0,
                    hasEditor: editor.length > 0
                   })
              })
              .catch((err) => {
                console.log(err);
              });
        
          })
          .catch((err) => {
            console.log(err);
          });
  
      })
      .catch((err) => {
        console.log(err);
      });
  
};

exports.Posteditlibros = (req,res,netx) =>{
    const name = req.body.name;
    const fecha = req.body.fecha;
    const autor = req.body.autor;
    const editorial = req.body.editorial;
    const librosId = req.body.librosId;

    librobd.update(
      { name: name, 
        fecha: fecha,
        autoreId: autor,
        editoreId: editorial,
     },
      { where: { id: librosId } }
    )
      .then((result) => {
        res.redirect("/list-libros");
      })
      .catch((err) => {
        console.log(err);
      });
};

exports.Postdeletetlibros = (req,res,netx) =>{
    const id = req.body.librosId;

    librobd.destroy({ where: { id: id } })
    .then((result) => {
        return res.redirect("/list-libros");
    })
    .catch((err) => {
      console.log(err);
    });

    
};