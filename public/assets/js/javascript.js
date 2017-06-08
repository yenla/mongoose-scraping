
$.getJSON("/articles", function(data) {
// For each one
for (var i = 0; i < data.length; i++) {
  // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" + data[i].summary + "</p>");

  $("#articles").append("<p>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>");
  // $("#title").append("<p>" + data[i].title + "</p>");

  }
});

$(document).on("click", "#submit-btn", function(){

  // var articleId = $(this).data('id');

  // $.ajax({
  //   method: 'POST',
  //   url: 'add/comment/' + articleId,
  //   data: {
  //     body: $('#author_comment' + articleId).val()
  //   }
  // }).done(function (data){
  //   console.log(data);
  //   $('#author_comment' + articleId).val();
  // });

  var articleId = $(this).attr("data-id");
    // URL root (so it works in eith Local Host for Heroku)
    var baseURL = window.location.origin;

    // Get Form Data by Id
    var formName = "form-add-" + articleId;
    var form = $('#' + formName);


    // AJAX Call to delete Comment
    $.ajax({
      url: baseURL + '/add/comment/' + articleId,
      method: 'POST',
      data: form.serialize(),
    })
    .done(function(data) {

      console.log(data);

      $(".collection").append("<input id='author_name' name='comment' >");
      $(".collection").append("<input id='author_comment' name='comment' >");
      $(".collection").append("<button data-id='" + data._id + "' id='savenote'>Save Comment</button>");

        if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
      // Refresh the Window after the call is done
      // location.reload();


      // $(".collection").empty();
    });
    
    // Prevent Default
    // return false;
}); 

  // Nav Bar Mobile Slider
  // $(".button-collapse").sideNav();

  // Click Listener for FORM SUBMISSION to ADD a comment
  // $('.add-comment-button').on('click', function(){
   
  //   // Get _id of comment to be deleted
  //   var articleId = $(this).data("id");

  //   // URL root (so it works in eith Local Host for Heroku)
  //   var baseURL = window.location.origin;

  //   // Get Form Data by Id
  //   var formName = "form-add-" + articleId;
  //   var form = $('#' + frmName);


  //   // AJAX Call to delete Comment
  //   $.ajax({
  //     url: baseURL + '/add/comment/' + articleId,
  //     type: 'POST',
  //     data: frm.serialize(),
  //   })
  //   .done(function() {
  //     // Refresh the Window after the call is done
  //     location.reload();
  //   });
    
  //   // Prevent Default
  //   return false;

  // });


  // // Click Listener for FORM SUBMISSION to DELETE a comment
  // $('.delete-comment-button').on('click', function(){

  //   // Get _id of comment to be deleted
  //   var commentId = $(this).data("id");

  //   // URL root (so it works in eith Local Host for Heroku)
  //   var baseURL = window.location.origin;

  //   // AJAX Call to delete Comment
  //   $.ajax({
  //     url: baseURL + '/remove/comment/' + commentId,
  //     type: 'POST',
  //   })
  //   .done(function() {
  //     // Refresh the Window after the call is done
  //     location.reload();
  //   });
    
  //   // Prevent Default
  //   return false;

  // });
  
// });