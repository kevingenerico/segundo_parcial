const autordb = require("../models/autor");

exports.Getlistautores = (req,res,netx) =>{

    autordb.findAll().then((result) => {
        const Autor = result.map((result) => result.dataValues);

        res.render("autores/list-autores",{
        pageTitle: "autores", 
        autorActive : true,
        Autor : Autor,
        hasAutor: Autor.length > 0,
    })
      })
      .catch((err) => {
        console.log(err);
      });
};

exports.Getcreateautores = (req,res,netx) =>{
    res.render("autores/save-autores",{pageTitle: "crear autores", autorActive : true, editMode: false})
};

exports.Postcreateautores = (req,res,netx) =>{
    const name = req.body.name;
    const email = req.body.email;

    autordb.create({
        name: name,
        email: email,
      })
        .then((result) => {
          res.redirect("/list-autores");
        })
        .catch((err) => {
          console.log(err);
        });
};

exports.Geteditautores = (req,res,netx) =>{
    const edit = req.query.edit;
    const autorid = req.params.autorId;

    if (!edit) {
      return  res.redirect("/");
    }

    autordb.findOne({ where: { id: autorid } }).then((result) => {

      const Autor = result.dataValues;   
      if (!Autor) {
        return res.redirect("/");
      }

      res.render("autores/save-autores",{
        pageTitle: "editar autores",
        autorActive : true, 
        editMode: edit,
        Autor: Autor,
      })

    })
    .catch((err) => {
      console.log(err);
    });

};

exports.Posteditautores = (req,res,netx) =>{
    const name = req.body.name;
    const email = req.body.email;
    const autorId = req.body.autorId;

    autordb.update(
      { name: name, email: email },
      { where: { id: autorId } }
    )
      .then((result) => {
        res.redirect("/list-autores");
      })
      .catch((err) => {
        console.log(err);
      });

};

exports.Postdeletetautores = (req,res,netx) =>{
    const id = req.body.autorId;

    autordb.destroy({ where: { id: id } })
    .then((result) => {
      return res.redirect("/list-autores");
    })
    .catch((err) => {
      console.log(err);
    });

};