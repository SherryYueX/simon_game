
const max = 4;
const winning_stack = 30;
var array = [];
var audio_srcs = new Array("xbb_renjia.m4a", "qianqing_chuini.m4a", "qianqing_Xbb.m4a", "xbb_heiheihei.m4a");
var btn_ids = new Array("green", "red", "yellow", "blue");
var user_ind = 0;
var is_game_started = false;
var next = getRandomInt();
array.push(next);

$(document).keypress(function(eve) {
  if(!is_game_started){
    $("#level-title").text("Level " + array.length);
    is_game_started = true;
    showNext(next, audio_srcs[next]);
  }
});

$("h1").dblclick(function(eve) {
  if(!is_game_started){
    $("#level-title").text("Level " + array.length);
    is_game_started = true;
    showNext(next, audio_srcs[next]);
  }
});

var error = new Audio("sounds/gong.mp3");

$(".btn").mousedown(function(){
  // this.addClass("pressed");
  if(is_game_started){
    $(this).addClass("pressed",500);
    var ado = new Audio("sounds/" + audio_srcs[btn_ids.indexOf(this.id)]);
    ado.play();
    var is_equal = btn_ids.indexOf(this.id) == array[user_ind];
    if(user_ind == array.length - 1 && is_equal){
      user_ind = 0;
      next = getRandomInt();
      array.push(next);
      $("#level-title").text("Level " + array.length);
      showNext(next, audio_srcs[next]);
    }
    else if(!is_equal){
      error.play();
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("body").addClass("game-over");
      // $("body").removeClass("game-over");
      array = [];
      user_ind = 0;
      is_game_started = false;
      next = getRandomInt();
      array.push(next);
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }
    else{
      user_ind++;
    }

    if(array.length == 30){
      is_game_started = false;
      $("#level-title").html("<em>You Win!!!</em>");
    }

  }

});

$(".btn").mouseup(function(){
    $(this).removeClass("pressed");
});

function showNext(next, sound_name){
  $("#"+btn_ids[next]).animate({
    opacity: 0.5
  }, 700);
  var ado = new Audio("sounds/" + sound_name);
  ado.play();
  $("#"+btn_ids[next]).animate({
    opacity: 1
  });
}

function getRandomInt() {
  return Math.floor(Math.random() * max);
}
