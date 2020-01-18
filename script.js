$(document).ready(function() {
  let piece = getPiece();
  // load as english on first load
  loadsLanguageText('en');
  startGame();
});


// language and piece selection:

$('#piece_select').on('change', function() {
    reset();
    let piece = getPiece();
});

$('#country_select').on('change', function() {
  let langChoice =  $('#country_select').val();
  // load text for whole page
  loadsLanguageText(langChoice);
  // set HTML lang= attribute 
  setHtmlLang(langChoice);
});

function getPiece(){
  let piece = $('#piece_select').val();
  return piece;
 }

function setHtmlLang(lang){
  document.getElementsByTagName('html')[0].setAttribute('lang',lang);
}

function loadsLanguageText(lang){
  /*fills all the span tags with class=lang pattern*/ 
  $('span[class^="lang"]').each(function(){
    var LangVar = (this.className).replace('lang-','');
    var Text = window["text_"+lang][LangVar];
    $(this).text(Text);        
  });
}
  

// Game logic

//VARIABLES

var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
let piece = getPiece();
var turnCounter = 0;
var deckLength = 6;


var win = new Audio();
win.src = "assets/sounds/win.mp3";

function playMusic(i){
  let piece = getPiece();
  var clips = getPieceClips(piece);
  var clip = new Audio();
  var index = clips[i-1].value;
 
  clip.src = 'assets/'+piece+'/'+index+'.mp3';
 
  if (!clip.paused) {
    clip.pause();
    clip.currentTime = 0;
  }
  clip.play();
}


function getPieceClips(){
//return array of mp3 clips

  var clips = [];
    for(var i=1; i<=deckLength; i ++){
      clips.push({
        key: 'key'+i,
        value: '0' +i
      });
    }
    return clips;
}



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
    $('.page-wrapper').removeClass('dim');
  }, 500);

});


//add event listeners to display cards on click and add selected class
$('.card').on('click', function(e) {
  e.preventDefault();
  if($('.selected').length <2){
    $(this).addClass('flipped selected disabled');
  }

  // for bug on iphone clicking on deck focuses on language picker  
  $('.deck').on('click', function(e) {
    e.preventDefault();  
  });
  
  let cardIndex = $(this).data('card-index');
  playMusic(cardIndex);
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
  let piece = getPiece();
  $('.card').each(function(index) {
    $(this).children(".spinBack").attr('data-card-index', cards[index]);
    $(this).children(".spinBack").addClass('notation_'+piece+'_'+ cards[index]);
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
  $(".win-pop-up").removeClass("hidden bounceOutLeft").addClass("animated bounceInLeft");
  $('.page-wrapper').addClass('dim');
}

