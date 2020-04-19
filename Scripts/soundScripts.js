
//------------------------------------------ BACKGROUND SOUND
//Use this function to enable sound in chrome.
// https://p5js.org/reference/#/p5.sound/getAudioContext

function touchStarted() {

    // //Simple code
    // if (getAudioContext().state !== 'running') {
    //     getAudioContext().resume();
    //   }
    //   sounds[1].play();
    //   sounds[1].setVolume(.5);


    // COMPLEX CODE CHANGING SONGS
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }


    if (frameCount % 100 || keyCode === DOWN_ARROW) { //time for the music to change

        otherSong = Math.floor(random(0, sounds.length));

        sounds[otherSong].play();
        sounds[otherSong].setVolume(.5); //antes 5

        // console.log('Entered Frame Song: ' + frameCount);
        // console.log('\nSong: ' + otherSong);

    } else {
        sounds[1].play();
        sounds[1].setVolume(.7); //antes 7
        // console.log('First loop song');
    }
    // sound1.loop();
}

//--------------------------------------------------------- SOUND FOR VIDEO

function videoSound() {
    videos[whichVideo].volume(0); // antes 0
    print('volume video 0');
}



//--------------------------------------------------------- TALK

function talk() {
    myVoice.setVoice(voice);
    myVoice.speak(regexRnnSub);

    // myVoice.speak(rnnSub);

    // SIEMPRE SUENA LA VOZ
    if (translate) {
        myVoice.setRate(.73); // speed of speach
        myVoice.setPitch(.8);
        myVoice.setVolume(.4);
    } else {
        voice = 'Google UK English Male';
        myVoice.setRate(.8); // speed of speach
        myVoice.setPitch(.9);
        myVoice.setVolume(.4);
    }

}
