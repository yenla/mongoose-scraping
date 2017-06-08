
$.getJSON("/articles", function(data) {
// For each one
for (var i = 0; i < data.length; i++) {
  // Display the apropos information on the page
  // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" + data[i].summary + "</p>");

  $("#articles").append("<p>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>");
  // $("#title").append("<p>" + data[i].title + "</p>");

  }
});

$(document).on("click", "#submit-btn", function(){

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
      // Refresh the Window after the call is done
      // location.reload();

      console.log(data);

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