// Successfully connected.

$(".loginDiv").hide();

$("#loginButton").click(function(){
  // Connected
  $(".loginDiv").show();
  $(".social-feed").hide();
  $(".welcomeButtons").hide();
});

$("#createButton").click(function(){
  // Connected
});

$(".welcomeCenter").click(function(){
  $(".social-feed").show();
  $(".loginDiv").hide();
  $(".welcomeButtons").show();
});