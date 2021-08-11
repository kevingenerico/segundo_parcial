$(document).ready(function(){


    $("#delete-libros").on('click',function(e){
      e.preventDefault();   

      if(confirm("Estas seguro que deseas eliminar este libro?")){
          $("#form-delete-libro").submit();
      }

    });

    $("#delete-autores").on('click',function(e){
      e.preventDefault();   

      if(confirm("Estas seguro que deseas eliminar este autor?")){
          $("#form-delete-autores").submit();
      }

    });

    $("#delete-editores").on('click',function(e){
      e.preventDefault();   

      if(confirm("Estas seguro que deseas eliminar este editorial?")){
          $("#form-delete-editores").submit();
      }

    });

});
