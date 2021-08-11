const editordb = require("../models/editor");

exports.Getlisteditores = (req,res,next) =>{
    
    editordb.findAll().then((result) => {
        const Editor = result.map((result) => result.dataValues);

        res.render("editoriales/list-editores",{
        pageTitle: "editorieales", 
        editorActive: true,
        Editor : Editor,
        hasEditor: Editor.length > 0
    });
      })
      .catch((err) => {
        console.log(err);
      });
};

exports.GetcreateEditoreales = (req,res,netx) =>{
    res.render("editoriales/save-editoriales",{pageTitle: "crear editoriales", editorActive: true, editMode: false})
};

exports.PostcreateEditoreales = (req,res,netx) =>{
    const name = req.body.name;
    const phone = req.body.phone;
    const pais = req.body.pais;

    editordb.create({
        name: name,
        telefono: phone,
        pais: pais,
      })
        .then((result) => {
            res.redirect("/list-editoriales");
        })
        .catch((err) => {
          console.log(err);
        });
};

exports.GeteditEditoreales = (req,res,netx) =>{
    const edit = req.query.edit
    const editorid = req.params.editorId;

    if (!edit) {
      return  res.redirect("/");
    }
    
    editordb.findOne({ where: { id: editorid } }).then((result) => {

      const Editor = result.dataValues;   
      if (!Editor) {
        return res.redirect("/");
      }

      res.render("editoriales/save-editoriales",{
        pageTitle: "editar editoriales",
        editorActive: true, 
        editMode: edit,
        Editor: Editor,
       })

    })
    .catch((err) => {
      console.log(err);
    });

};

exports.PosteditEditoreales = (req,res,netx) =>{
    const name = req.body.name;
    const phone = req.body.phone;
    const pais = req.body.pais;
    const editorId = req.body.editorId;

    editordb.update(
      { name: name, telefono: phone, pais: pais},
      { where: { id: editorId } }
    )
      .then((result) => {
        res.redirect("/list-editoriales");
      })
      .catch((err) => {
        console.log(err);
      });
};

exports.PostdeletetEditoreales = (req,res,netx) =>{
    const editid = req.body.editorId;

    editordb.destroy({ where: { id: editid } })
    .then((result) => {
      return res.redirect("/list-editoriales");
    })
    .catch((err) => {
      console.log(err);
    });

    
};