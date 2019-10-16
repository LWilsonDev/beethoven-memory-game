$(document).ready(function() {

  load_lang();
  startGame();
  
  


});


function load_lang() {

  var $dropdown = $("#country_select");    
  $.each(LanguageList, function(key, value) {
    $dropdown.
      append($("<option/>").
      val(key).
      text(value));
    });
  var location = checkLocation();
  if(location == 'DEU'){
    loadsLanguage("DEU");
    
    $dropdown.find('option:contains("Deutch")').attr("selected",true);
    $dropdown.find('option:contains("English")').removeAttr("selected",true);
  } else {
    loadsLanguage("EN");
    
    $dropdown.find('option:contains("English")').attr("selected",true);
    $dropdown.find('option:contains("Deutch")').removeAttr("selected",true);
    
  }
  
}


function loadsLanguage(lang){
  addSelected(lang);
  /*fills all the span tags with class=lang pattern*/ 
  $('span[class^="lang"]').each(function(){

    var LangVar = (this.className).replace('lang-','');
    var Text = window["text_"+lang][LangVar];
    $(this).text(Text);        
  });
}

function addSelected(lang){
  var $dropdown = $("#country_select");  
  $dropdown.find('option[value="{$lang}"]').attr("selected",true); 
  
  $dropdown.find(!'option[value="{$lang}"]').removeAttr("selected",true);
}



function checkLocation(){
  $.get("https://ipinfo.io", function(response) {
  var country = response.country;
  console.log(response);
  
  return country;
});

}


//VARIABLES

var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

var turnCounter = 0;


var s1_s1 = new Audio();
s1_s1.src = "assets/symphony_1/01.mp3";

var s1_s2 = new Audio();
s1_s2.src = "assets/symphony_1/02.mp3";

var s1_s3 = new Audio();
s1_s3.src = "assets/symphony_1/03.mp3";

var s1_s4 = new Audio();
s1_s4.src = "assets/symphony_1/04.mp3";

var s1_s5 = new Audio();
s1_s5.src = "assets/symphony_1/05.mp3";

var s1_s6 = new Audio();
s1_s6.src = "assets/symphony_1/06.mp3";

var win = new Audio();
win.src = "assets/sounds/win.mp3";


//EVENTS

//option buttons
$(".hard-btn").on("click", function(e) {
  e.preventDefault();
  $('.reset').addClass("plainFront");
  $(".hard-btn").addClass("active");
  $(".easy-btn").removeClass("active");
  reset();
});
$(".easy-btn").on("click", function(e) {
  e.preventDefault();
  $('.reset').removeClass("plainFront");
  $(".easy-btn").addClass("active");
  $(".hard-btn").removeClass("active");
  reset();
});

//reset button
$(".reset-btn").on("click", function(e) {
  e.preventDefault();
  reset();
});
//play again button
$(".play-btn").on("click", function(e) {
  e.preventDefault();
  reset();
  $(".win-pop-up").addClass("bounceOutLeft").removeClass("bounceInLeft");
  setTimeout(function(){
    $(".win-pop-up").addClass("hidden");
  }, 500);
});


//add event listeners to display cards on click and add selected class
$('.card').on('click', function(e) {
  e.preventDefault();
  if($('.selected').length <2){
    $(this).addClass('flipped selected disabled');
  }
  
  
let cardIndex = $(this).data('card-index');
switch(cardIndex) {
    case 1:
        play1();
        break;
    case 2:
        play2();
        break;
    case 3:
        play3();
        break;
    case 4:
        play4();
        break;
    case 5:
        play5();
        break;
    case 6:
        play6();
        break;    
}
  moveCounter();
  checkMatch();
  checkForWin();
});


//FUNCTIONS

function startGame() {
  $('.deck').children().addClass('card notMatched');
  cards = shuffle(cards);
  //assign shuffled cards to divs
  assignIndex();
  //assign colours to cards (after delay for animation on reset)
  setTimeout(function() {
    assignNotation();
  }, 500);
}

function reset() {
  //remove classes
  $('.deck').children().removeClass().removeAttr('data').removeData();
  //add animation to spin over cards and remove existing color class
  $('.back').addClass('spinBack').removeClass(function(index, css) {
    return (css.match(/(^|\s)notation\S+/g) || []).join(' ');
  });
  turnCounter = 0;
  $('.counter').html(turnCounter);
  startGame();
}

function moveCounter() {
  if ($('.selected').length == 2) {
    turnCounter++;
    $('.counter').html(turnCounter);
  }
}

//shuffle code from:
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array    
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
//end

function assignIndex() {
  $('.card').each(function(index) {
    $(this).attr('data-card-index', cards[index]);
  });
}

function assignNotation() {
  $('.card').each(function(index) {
    $(this).children(".spinBack").attr('data-card-index', cards[index]);
    $(this).children(".spinBack").addClass("notation-" + cards[index]);
  });
}

//animate cards to show match
function checkMatch() {
  if ($('.selected').length == 2) {
    disable();
    if ($('.selected').first().data('card-index') == $('.selected').last().data('card-index')) {
      setTimeout(function() {
        $('.selected').each(function() {
          $(this).removeClass("notMatched selected").addClass("animated tada");
          $(this).children(".reset").removeClass("plainFront");
          $(this).children(".spinBack").removeClass('spinBack');
        });
      }, 400);
    }
    else {
      disable();
      setTimeout(function() {
        $('.selected').each(function() {
          $(this).removeClass("flipped disabled selected");
        });
      }, 1000);
      
      //after a delay turn both cards back over
    }
  }
}

function disable(){
  $('.card').children().prop('disabled',true);
    setTimeout(function(){
       // enable click after 1 second
       $('.card').prop('disabled',false);
    },2000); // 1 second delay
}

function checkForWin() {
  setTimeout(function() {
    if ($('.disabled').length == 12) {
      win.play();
      showPopUp();
    }
  }, 2000);
}

function showPopUp(){
  $(".win-pop-up").removeClass("hidden bounceOutLeft").addClass("animated bounceInLeft")
}

//bug-fix: when two matching notes are selected, check if note is already playing, pause and reset and play again
function play1() {
  if (!s1_s1.paused) {
    s1_s1.pause();
    s1_s1.currentTime = 0;
  }
  s1_s1.play();
}

function play2() {
  if (!s1_s2.paused) {
    s1_s2.pause();
    s1_s2.currentTime = 0;
  }
  s1_s2.play();
}

function play3() {
  if (!s1_s3.paused) {
    s1_s3.pause();
    s1_s3.currentTime = 0;
  }
  s1_s3.play();
}

function play4() {
  if (!s1_s4.paused) {
    s1_s4.pause();
    s1_s4.currentTime = 0;
  }
  s1_s4.play();
}

function play5() {
  if (!s1_s5.paused) {
    s1_s5.pause();
    s1_s5.currentTime = 0;
  }
  s1_s5.play();
}

function play6() {
  if (!s1_s6.paused) {
    s1_s6.pause();
    s1_s6.currentTime = 0;
  }
  s1_s6.play();
}