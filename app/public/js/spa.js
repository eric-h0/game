// Successfully connected.

// Listener function for modals.
$(document).ready(function(){
  $('.modal-trigger').leanModal();
});

// Loading screen
window.addEventListener("load", function(){
  var load_screen = document.getElementById("load_screen");
  document.body.removeChild(load_screen);
});

// Custom animations. Works with all browsers.
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

//Hides extraneous sections on load.
$(".loginDiv").hide();
$(".createDiv").hide();
$(".onlinePlayers").hide();
$(".game").hide();
$(".chatButton").hide();

//Navigation on login press.
$("#loginButton").click(function(){
  $(".loginDiv").show();
  $(".welcomeButtons").hide();
  $(".social-feed").hide();
});

//Navigation on create press.
$("#createButton").click(function(){
  $(".createDiv").show();
  $(".welcomeButtons").hide();
  $(".social-feed").hide();
});

//Navigation on login submit.
$("#loginSubmit").click(function(){
  $(".pongGif").hide();
  $(".loginDiv").hide();
  $(".onlinePlayers").show();
});

//Navigation for icon press.
$(".welcomeCenter").click(function(){
  $(".social-feed").show();
  $(".loginDiv").hide();
  $(".createDiv").hide();
  $(".welcomeButtons").show();
  $(".onlinePlayers").hide();
  $(".pongGif").show();
});

//Function for login submit.
//Checks names and passwords with database and launches chat if correct.
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
                // If login is correct, the user's username will be used for the chatroom.
                var messagesRef = new Firebase('https://thebattleground.firebaseio.com/');
                var messageField = $('#messageInput');
                var nameField = player.screenName;
                var messageList = $('#messages');

            messageField.keypress(function(e) {
                // Sends message on enter/return.
                if (e.keyCode == 13) {
                    //FIELD VALUES
                    var username = player.screenName;
                    var message = messageField.val().trim();

                    //SAVE DATA TO FIREBASE AND EMPTY FIELD
                    messagesRef.push({ name: username, text: message });
                    messageField.val(name);
                }

            });


          // Firebase chat
          messagesRef.limitToLast(20).on('child_added', function(snapshot) {
              //GET DATA
              var data = snapshot.val();
              var username = data.name || "anonymous";
              var message = data.text;
              var messageElement = $("<li>");
              var nameElement = $("<b class='chat-username'></b>")
              nameElement.text(username + ": ");
              messageElement.text(message).prepend(nameElement);

              //ADD MESSAGE
              messageList.append(messageElement)

              messageList[0].scrollTop = messageList[0].scrollHeight;

          }); 
            getPlayers();
            $(".loginDiv").hide();
            $(".onlinePlayers").show();
            $(".chatButton").show();

        } else {
            alert("Invalid login.");
        }
    });
});

//Create submit function.
$("#createSubmit").on('click', function() {
    // Checks to make sure passwords match before pushing to database.
    if ($("#newPassword").val() == $("#confirmPassword").val()) {
        $(".createDiv").hide();
        $(".loginDiv").show();
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

// Testing.
$("#randomPlayer").click(function(){
  $(".tic-tac-toe").show();
  $(".icon").hide();
  $(".onlinePlayers").hide();
  $(".modal-trigger").hide();
});

