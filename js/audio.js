var audio = null;

function playAudio(url) {
    audio = new Audio();
    audio.src = url;
    audio.preload = "auto";
    audio.play();
}

function playSelectedAudio(id) {
    var selectElement = document.getElementById(id);
    var audioPath = selectElement.value;
    if (audioPath) {
        playAudio(audioPath);
    }
}