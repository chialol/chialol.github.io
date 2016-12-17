var audio;
var playlist;
var tracks;
var current;

$(document).ready(function() {
  instructions();
  initaudio();
});
function instructions() {
    alert("Press \'a\' on the beat to receive a high score. Have fun! :)");
}
function initaudio(){
    current = 0;
    audio = $('#audio');
    playlist = $('#playlist');
    tracks = playlist.find('li a');
    len = tracks.length;
    audio[0].volume = 1.0;
    audio[0].appendChild(document.createElement("source"));
    audio[0].play();

    playlist.find('a').click(function(e){
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        currentScore = 0; // score is a global variable
        runaudio(link, audio[0]);

    });
    audio[0].addEventListener('ended',function(e){
        console.log("Testing beats:");
        console.log(testingBeats);
        console.log(testingBeats2);
        console.log("Current score: ");
        console.log(currentScore);
        console.log("Total possible: ");
        console.log(totalPossible);
        var score = Math.min(Math.max(100.0 * currentScore / totalPossible, 0), 100);
        score = Math.floor(score);
        alert("Your score is: " + score + "%");
        currentScore = 0;
        current++;
        if(current == len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];
        }
        console.log("Current");
        console.log(current);
        console.log("link");
        console.log(link);
        runaudio($(link),audio[0]);
    });
}
function runaudio(link, player){
    player.src = link.attr('data-altsrc');
    par = link.parent();
    par.addClass('active').siblings().removeClass('active');
    

    // Update current music global variable
    currentMusic = getMusicName(link);
    console.log("Current music: ");
    console.log(currentMusic);
    numTimesPressed = 0;
    totalPossible = 1;
    if (currentMusic == "LetItGo") {
        console.log("Lowered volume");
        audio[0].volume = 0.5;
        STATE.SNOW.shouldSnow = true;
    } else {
        audio[0].volume = 1.0;
        STATE.SNOW.shouldSnow = false;
    }

    audio[0].load();
    audio[0].play();
}

function getMusicName(link) {
    var arr = link.attr('data-altsrc').split("/");
    var arr2 = arr[1].split(".");
    return arr2[0];
}
