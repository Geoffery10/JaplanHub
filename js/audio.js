var audio = null;

function playAudio(url) {
    audio = new Audio();
    audio.src = url;
    audio.preload = "auto";
    audio.play();
}

