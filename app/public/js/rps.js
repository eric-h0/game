var user;
var computer;

$('.choice').click(function() {
  user = this.id;
  computer = Math.random();
  if (computer <= 1 / 3) {
    computer = "charmander";
  } else if (computer < 2 / 3) {
    computer = "bulbasaur";
  } else {
    computer = "squirtle";
  }
  var winner = compare(user, computer);
  $("h6").html(winner.str);
  $('.choice').css("box-shadow", "none");
  if (winner.ner == "tie") {
    $(this).css("box-shadow", "0px 0px 1px 1px #F2E8C4");
  } else if (winner.ner == "win") {
    $(this).css("box-shadow", "0px 0px 1px 1px #3EC9A7");
  } else {
    $(this).css("box-shadow", "0px 0px 1px 1px #E32B09");
  }
});

var compare = function(user, computer) {
  var obj = {
    str: "",
    ner: ""
  }
  var charmander = "Charmander embered Bulbasaur."
  var squirtle = "Squirtle water-gunned Charmander."
  var bulbasaur = "Bulbasaur razor-leafed Squirtle."
  var win = "You win!"
  var lose = "You lose."
  if (user === computer) {
    obj.str = "The result is a tie.";
    obj.ner = "tie";
  } else if (user === "charmander") {
    if (computer === "bulbasaur") {
      obj.str = charmander + " " + win;
      obj.ner = "win";
      points + 50;
      // MYSQL
      console.log(points)

    } else {
      obj.str = squirtle + " " + lose;
      obj.ner = "lose";
    }
  } else if (user === "squirtle") {
    if (computer === "charmander") {
      obj.str = squirtle + " " + win;
      obj.ner = "win";
      points + 50;
      // MYSQL
      console.log(points)

    } else {
      obj.str = bulbasaur + " " + lose;
      obj.ner = "lose";
    }
  } else if (user === "bulbasaur") {
    if (computer === "charmander") {
      obj.str = charmander + " " + lose;
      obj.ner = "lose";
    } else {
      obj.str = bulbasaur + " " + win;
      obj.ner = "win";
      points + 50;
      // MYSQL
      console.log(points)

    }
  }

  return obj;
};