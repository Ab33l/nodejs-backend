/*
 * Controller for Add / Update / Delete of Comments table
 */
var flash = require('express-flash-messages')
 // Single Comment View
 exports.view = function(req, res){
   var id = req.params.id;
   req.getConnection(function(err, connection){
     var query = connection.query("SELECT comments.comment_id, posts.title, comments.body, comments.reader FROM comments INNER JOIN posts ON comments.post_id=posts.post_id WHERE comment_id = ?", [id], function(err, rows){
       if(err) console.log("Error Selecting list : %s", err);
       res.render('comment-view',{
         title : "Comment on "+rows[0].title,
         comments: rows
       });
     });
   });
 };

// Comment list Export
exports.list = function(req, res){
  req.getConnection(function(err, connection){
    var query = connection.query("SELECT comments.comment_id, posts.title, comments.body, comments.reader FROM comments INNER JOIN posts ON comments.post_id=posts.post_id", function(err, rows){
      if(err) console.log("Error Selecting list : %s", err);
      res.render('comment-lists',{
        title : "Sport Compass: List of Comments with Post Titles",
        secondaryTitle: "There are " + rows.length + " Comments",
        comments: rows
      });
    });
  });
};

// Comment Add
exports.add = function(req, res){
  res.render("comment-add",{
    title : "Sport Compass: Add a Comment",
    secondaryTitle: "Add Comment",
  })
}

// Comment Edit
exports.edit = function(req, res){
  var id = req.params.id;
  req.getConnection(function(err, connection){
    var query = connection.query("SELECT comments.comment_id, posts.title, comments.body, comments.reader FROM comments INNER JOIN posts ON comments.post_id=posts.post_id WHERE comment_id = ?", [id], function(err, rows){
      if(err) console.log("Error Editing list : %s", err);
      res.render('comment-edit', {
        title : "Sport Compass: Edit Comment",
        comments: rows
      })
    });
  });
};

//Comment save
exports.save = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err, connection){
    var data = {
      post_id: input.post_id,
      body: input.body,
      reader: input.reader
    };
    var query = connection.query("INSERT INTO comments set ?", data, function(err, rows, fields){
      if(err)
        console.log("Error in Inserting Data : %s", err);
      else{
        var query = connection.query("SELECT comments.comment_id, posts.title, comments.body, comments.reader FROM comments INNER JOIN posts ON comments.post_id=posts.post_id WHERE comment_id = ?", rows.insertId, function(err, rows){
          if(err) console.log("Error Editing list : %s", err);
          req.flash('success', '<a href="/comments/view/'+rows[0].comment_id+'" class="alert-link">' + rows[0].reader + '</a> Your Comment Has Been Added');
          res.redirect('/comments');
        });

      }
    });
  });
};

//Comment Save Edit
exports.save_edit = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  var id = req.params.id;
  req.getConnection(function(err, connection){
    var data = {
      post_id: input.post_id,
      body: input.body,
      reader: input.reader
    };
    connection.query("UPDATE comments set ? WHERE comment_id = ?", [data, id], function(err, rows){
      if(err)
        console.log("Error in Updating : %s", err);
      else{
        var query = connection.query("INSERT INTO comments set ?", data, function(err, rows, fields){
          if(err)
            console.log("Error in Inserting Data : %s", err);
          else{
            var query = connection.query("SELECT * FROM comments WHERE comment_id = ?", rows.insertId, function(err, rows){
              if(err) console.log("Error Editing list : %s", err);
              req.flash('success', '<a href="/comments/view/'+rows[0].comment_id+'" class="alert-link">' + rows[0].reader + '</a> Your Comment Has Been Updated.');
              res.redirect('/comments');
            });

          }
        });
      }
    });
  });
};

//Comment DELETE
exports.delete = function(req, res){
  var id = req.params.id;
  req.getConnection(function(err, connection){
    connection.query("DELETE FROM comments WHERE comment_id = ? ", [id], function(err, rows){
      if(err)
        console.log("Error in Deleting : %s", err);
      else{
        console.log("Comment Deleted: %s", rows);
        req.flash('warning', 'Your Comment Has Been Deleted.');
        res.redirect("/comments")
      }
    });
  });
};
