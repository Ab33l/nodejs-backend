/*
 * Controller for Add / Update / Delete of Posts table
 */
var flash = require('express-flash-messages')
 // Single Post View
 exports.view = function(req, res){
   var id = req.params.id;
   req.getConnection(function(err, connection){
     var query = connection.query("SELECT * FROM posts WHERE post_id = ?", [id], function(err, rows){
       if(err) console.log("Error Selecting list : %s", err);
       res.render('post-view',{
         title : "Sport Compass: Post on "+rows[0].slug,
         secondaryTitle: rows[0].title,
         posts: rows
       });
     });
   });
 };

// Post list Export
exports.list = function(req, res){
  req.getConnection(function(err, connection){
    var query = connection.query("SELECT * FROM posts", function(err, rows){
      if(err) console.log("Error Selecting list : %s", err);
      res.render('post-lists',{
        title : "Sport Compass: List of Posts",
        secondaryTitle: "There are " + rows.length + " Posts Published",
        posts: rows
      });
    });
  });
};

// Post Add
exports.add = function(req, res){
  res.render("post-add",{
    title : "Sport Compass: Create A Post",
    secondaryTitle: "Create The Post...",
  })
}

// Post Edit
exports.edit = function(req, res){
  var id = req.params.id;
  req.getConnection(function(err, connection){
    var query = connection.query("SELECT * FROM posts WHERE post_id = ?", [id], function(err, rows){
      if(err) console.log("Error Editing list : %s", err);
      res.render('post-edit', {
        title : "Sport Compass: Edit Post",
        posts: rows
      })
    });
  });
};

//Post save
exports.save = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err, connection){
    var data = {
      author: input.author,
      title: input.title,
      content: input.content,
      slug: input.slug
    };
    var query = connection.query("INSERT INTO posts set ?", data, function(err, rows, fields){
      if(err)
        console.log("Error in Inserting Data : %s", err);
      else{
        var query = connection.query("SELECT * FROM posts WHERE post_id = ?", rows.insertId, function(err, rows){
          if(err) console.log("Error Editing list : %s", err);
          req.flash('success', '<a href="/posts/view/'+rows[0].post_id+'" class="alert-link">' + rows[0].author + '</a> Your Post Has Been Created');
          res.redirect('/posts');
        });

      }
    });
  });
};

//Post Save Edit
exports.save_edit = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  var id = req.params.id;
  req.getConnection(function(err, connection){
    var data = {
      author: input.author,
      title: input.title,
      content: input.content,
      slug: input.slug
    };
    connection.query("UPDATE posts set ? WHERE post_id = ?", [data, id], function(err, rows){
      if(err)
        console.log("Error in Updating : %s", err);
      else{
        var query = connection.query("INSERT INTO posts set ?", data, function(err, rows, fields){
          if(err)
            console.log("Error in Inserting Data : %s", err);
          else{
            var query = connection.query("SELECT * FROM posts WHERE post_id = ?", rows.insertId, function(err, rows){
              if(err) console.log("Error Editing list : %s", err);
              req.flash('success', '<a href="/posts/view/'+rows[0].id+'" class="alert-link">' + rows[0].author + '</a> Your Post Has Been Updated.');
              res.redirect('/posts');
            });

          }
        });
      }
    });
  });
};

//Post DELETE
exports.delete = function(req, res){
  var id = req.params.id;
  req.getConnection(function(err, connection){
    connection.query("DELETE FROM posts WHERE post_id = ? ", [id], function(err, rows){
      if(err)
        console.log("Error in Deleting : %s", err);
      else{
        console.log("Post Deleted: %s", rows);
        req.flash('warning', 'Your Post Has Been Deleted.');
        res.redirect("/posts")
      }
    });
  });
};
