// Successfully connected.

$(".loginDiv").hide();

// Custom animations. Works with all browsers.
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$("#loginButton").click(function(){
  // Connected
  $(".loginDiv").show();
  $(".welcomeButtons").hide();
  $(".social-feed").hide();
});

$("#createButton").click(function(){
  // Connected
});

$(".welcomeCenter").click(function(){
  $(".social-feed").show();
  $(".loginDiv").hide();
  $(".welcomeButtons").show();
});