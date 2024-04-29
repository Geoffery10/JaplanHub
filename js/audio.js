var audio = null;

function playAudio(url) {
    if (audio && !audio.paused) {
        return; // Do nothing if audio is already playing
    }
    
    audio = new Audio(url);
    audio.play();
}
