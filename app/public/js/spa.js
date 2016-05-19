// Successfully connected.

// Loading screen
window.addEventListener("load", function(){
  var load_screen = document.getElementById("load_screen");
  document.body.removeChild(load_screen);
});

$(".loginDiv").hide();
$(".createDiv").hide();
$(".onlinePlayers").hide();
$(".game").hide();

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
  $(".loginDiv").show();
  $(".welcomeButtons").hide();
  $(".social-feed").hide();
});

$("#createButton").click(function(){
  $(".createDiv").show();
  $(".welcomeButtons").hide();
  $(".social-feed").hide();
});

$("#loginSubmit").click(function(){
  $(".pongGif").hide();
  $(".loginDiv").hide();
  $(".onlinePlayers").show();
});

$(".welcomeCenter").click(function(){
  $(".social-feed").show();
  $(".loginDiv").hide();
  $(".createDiv").hide();
  $(".welcomeButtons").show();
  $(".onlinePlayers").hide();
  $(".pongGif").show();
});

    $("#loginSubmit").click(function() {

        var currentURL = window.location.origin;
        var player = {
            screenName: $("#ScreenName").val(),
            password: $("#password").val()
        }
        console.log("Player screen name clientside : " + player.screenName);
        console.log("Player password clientside : " + player.password);


        $.post(currentURL + '/api/playerlogin', player).success(function(data) {
            console.log(data);
            if (typeof data.redirect == 'string') {
                //window.location = data.redirect 
                getPlayers();
                $(".pongGif").hide();
                $(".loginDiv").hide();
                $(".onlinePlayers").show();
            } else {
                alert("Error: wrong password/screenName");
            }
        });



    });

    $("#createSubmit").on('click', function() {
        if ($("#newPassword").val() == $("#confirmPassword").val()) {
            var currentURL = window.location.origin;
            var newPlayer = {
                screenName: $("#newScreenName").val(),
                password: $("#newPassword").val()
            }

            $.post(currentURL + '/api/newMember', newPlayer).success(function(data) {

            })

        } else {

            alert("invalid password");
        }
    });

    function getPlayers() {
        var currentURL = window.location.origin;
        $.get(currentURL + '/api/userList', function(data) {
            //console.log("testing get players "  + data[0].Screen_Name);

            for (var i = 0; i < data.length; i++) {
                console.log(data[i].Screen_Name);

                if (data[i].Willing_To_Play == 1) {
                    $("#playersTable").append("<tr><td>" + data[i].Screen_Name + "</td><td><a class='waves-effect waves-light btn' sendPlayRequest>Play</a></td> < /tr>")

                }
            }

        })

    }
