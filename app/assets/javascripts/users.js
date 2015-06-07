$(document).ready(function(){
  $(".twitter_form").submit(function(event){
    event.preventDefault();
    var user = $(".twitter_form #user").val()
    window.location = "/users/"+ user;
  });
})