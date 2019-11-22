function renderVideos() {

    if (resultsReady) {
        // DoTextHiperpoesia();
        // console.log(rnnSub);

        //cuadradito para acentuar subtitulos
        fill(0, 95);
        rect(0, windowHeight - 160, windowWidth, 200);

        DoText();
        // talk();


        if (writingOutput) {
            writer = createWriter(month() + "/" + day() + "/" + year() + "_" + 'latinPage' + "_" + ".txt"); // texto en donde escribir   
        }

        renderCamera(); // FUNCIONA PERO SIN TEXTO


    }


    // // * Camera gets in the back of video 
    if (cameraVideo) { //under video
        // console.log('camera VIdeo');
        // renderCamera(); // no tiene texto
    }

    if (playSimpleVideo) {
        // console.log('playing simple video');
        image(videos[0].play(), 0, 0, width, height); //size and position of video // COMENTED FOR PIXELS // CHECK ALL THIS
        videos[0].volume(0.3);

    } else {
        //PLAY VIDEOS IN RANDOM
        if (stage === 1) {

            console.log('Stage 1');

            if (frameCount % 50) {
                console.log('pressing enter');

                //pick random video from array
                let azar = Math.floor(random(0, videos.length)); // esto funciona
                whichVideo = azar; //for(random(videos.length)); //esto funciona

                // whichVideo = (whichVideo+1)%videos.length;//floor(random(vid // esto es la pagina

                console.log('video number: ' + whichVideo);

                stage = 2;
                playTheVideo();
            }
        }

        if (videoEffects) {
            if (randomFrameEffect) { // plays pixel + random
                pixelEffect();
                randomFrame();

                 // * Camera gets in the back of video 
                //  if (cameraVideo) { //under video
                //     // console.log('camera VIdeo');
                //     renderCamera();
                // }

                
            } else {
                pixelEffect();
                //camera video positioned here is also behind video

                // // * Camera gets in the back of video 
                // if (cameraVideo) { //under video
                //     // console.log('camera VIdeo');
                //     renderCamera();
                // }
            }
        } else {
            if (randomFrameEffect) {
                randomFrame();
            }

            // ----->>>>>>> VIDEO HERE! WITHOUT EFFECTS
            image(videos[whichVideo], 0, 0, width, height); //size and position of video // COMENTED FOR PIXELS
            // tint(255, 255, 255); //add tranparency to video //https://p5js.org/reference/#/p5.Color/setAlpha

            // tint(255, 255, 255, 100); //add tranparency to video //https://p5js.org/reference/#/p5.Color/setAlpha

            // * Camera gets in front of video y por alguna razon no se ve
            // if (cameraVideo) { //under video
            //     // console.log('camera VIdeo');
            //     renderCamera()
            // }



        }

    }

}




//--------------------------------------------------------- VIDEO FUNCTIONS

function pixelEffect() {

    // PIXELS // THIS WORKS
    videos[whichVideo].loadPixels();

    for (var y = 0; y < videos[whichVideo].height; y++) {
        for (var x = 0; x < videos[whichVideo].width; x++) {

            // for (var y = 0; y < videos[whichVideo].height; y+= 1) {
            //     for (var x = 0; x < videos[whichVideo].width; x+= 1) {

            // var index = (videos[whichVideo].width - x + 1 + (y * videos[whichVideo].width)) * 4;

            var index = ((y * videos[whichVideo].width) + x) * 4;

            var r = videos[whichVideo].pixels[index + 0];
            var g = videos[whichVideo].pixels[index + 1];
            var b = videos[whichVideo].pixels[index + 2];
            var bright = (r + g + b) / 3;
            var w = map(bright, 0, 255, 0, vScale);

            noStroke();
            fill(r, g, b);

            ///----------------- XIX century traveler

            // rectMode(CENTER); // not use, scrambles de visuals
            rect(x * vScale, y * vScale, w, w);
            // var rad = 100;

            ///----------------- XIX century traveler -- END


            ///----------------- just hiperpoesia
            // if (keyIsDown(UP_ARROW)){
            //     ellipse(x * vScale, y * vScale, w, w);

            // } else 
            // ellipse(x * vScale, y * vScale, mouseX, mouseX);

            ///----------------- just hiperpoesia -- END
        }
    }

    //-------------------- THIS WORKS

    // OLD CODE WITH CIRCLES
    // https://p5js.org/examples/dom-video-pixels.html

    // const stepSize = 30;
    // // const stepSize = round(constrain(mouseX / 8, 6, 32));

    // for (let y = 0; y < videos[whichVideo].height; y += stepSize) {
    //   for (let x = 0; x < videos[whichVideo].width; x += stepSize) {
    //   console.log('x' + x);

    // pixelColor = get(x, y);

    //  console.log('pixel' + pixelColor );

    // console.log( 'h: ' + height );
    // console.log( 'w: ' + width );
    // console.log( 'vh: ' + videos[whichVideo].height );
    // console.log( 'vw: ' + videos[whichVideo].width );


    //     const i = (y * videos[whichVideo].width + x * 4);

    //     const darkness = (255 - videos[whichVideo].pixels[i * 4]) / 255;

    //     const radius = stepSize * darkness;
    //     // const radius = stepSize;


    //     let r =  videos[whichVideo].pixels[0 + i];
    //     let g =  videos[whichVideo].pixels[1 + i];
    //     let b =  videos[whichVideo].pixels[2 + i];
    //     let a =  videos[whichVideo].pixels[3 + i];

    //     fill(r, g, b, a);
    //     noStroke();
    //     ellipse(x, y, radius, radius);
    //   }

    // }

    /// finish loading pixels



    // / -------- CODE to load pixels
    // vid.loadPixels();
    // var stepSize = 20; //stepSize = number of pixels to print.

    // for (var y = 0; y < height; y += stepSize ) {
    //   for (var x = 0; x < width; x += stepSize) {
    //     var offset = ((y*width)+x)*4;
    // * code for effect
    // ellipse(x, y, w, w);
    //   }
    // }

}

function randomFrame() {

    let playing = false;
    // -------------------FIX THIS TO RUN RANDOM VIDEOS
    // Plays random position based in framecount  

    if (!playing) {
        let timeToChangeFrame = Math.floor(random(videos[whichVideo].duration(), videos[whichVideo].duration() * 10)); // esto funciona //for(random(videos.length));

        if (frameCount % timeToChangeFrame == 0 || keyCode == UP_ARROW) {

            console.log('Enter play random position');
            videos[whichVideo].time(random() * videos[whichVideo].duration() - 2); //solo el random del cuadro

            console.log('Video: ' + whichVideo + 'frame: ' + frameCount);

            playing = true;

        }
    }

}

function playTheVideo() {
    // https://forum.processing.org/two/discussion/23870/p5js-problem-with-asynchronous-video-loading-playing
    videoSound(); // now is set to 0


    if (!randomFrameEffect) {
        console.log('normal video effect');

        if (oneVideo) {

            videos[whichVideo].loop(); // video never goes to videoOver because it is looping and never ends.

        } else {
            console.log('multiple videos');
            videos[whichVideo].play();
            videos[whichVideo].onended(videoOver); //when video ends, call videoOver to return to first screen
        }

    } else {
        console.log('playing random Frame');
        // videos[whichVideo].time(random() * videos[whichVideo].duration() - 2);
        videos[whichVideo].loop().time(5); // time sets a place for the video to be played. it is expressed in seconds
    }
}

function videoOver() {
    console.log("Pausing video now VIDEO OVER / Stage 1");
    // videos[whichVideo].stop();// esto estaba comentado
    // videos[whichVideo].rewind();
    // videos[whichVideo].hide(); // esto estaba comentado
    videos[whichVideo].pause(); // esto estaba comentado

    stage = 1;
}