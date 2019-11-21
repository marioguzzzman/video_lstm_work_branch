function anotheEffectForCamera() {
    // https://codeburst.io/instagram-filters-with-javascript-p5-js-83f28c9f7fda
    myCamera.loadPixels();

    var stepSize = 20; //stepSize = number of pixels to print.
    var pixelSize = 20;
    for (var x = 0; x < myCamera.width; x += stepSize) {
        for (var y = 0; y < myCamera.height; y += stepSize) {
            var index = ((y * myCamera.width) + x) * 4; //  get the index of the current pixel using its (x, y) coordinates.

            // Filter and transformation code
            var redVal = myCamera.pixels[index];
            var greenVal = myCamera.pixels[index + 1];
            var blueVal = myCamera.pixels[index + 2];

            var bright = (redVal + greenVal + blueVal) / 3;
            var w = map(bright, 0, 255, 0, stepSize);

            noStroke();

            fill(redVal, greenVal, blueVal, 150); // face becomes lit up, the rest is transparent
            // fill(redVal, greenVal, blueVal); // face becomes lit up, the rest is transparent

            // tint(255, 255, 255, 100);

            ellipse(x, y, w, w);
        }
    }
}

function turnOffCamera(){
    myCamera.stop();
        localstream.stop();
        background(0, 50);

}

function renderCamera() {

    //coment for only see pixels

    // change to ====
    // if (cameraVideo && cameraEffect){
    //     anotheEffectForCamera();
    // } else {

    //     the code in camera video
    // }

    if (cameraVideo) { //under video
        // console.log('camera VIdeo');
        // image(myCamera, 0, 0, width, height); //size and position of video // COMENTED FOR PIXELS
        // filter(INVERT);
        // filter(POSTERIZE, 3);
        // filter(BLUR, 3);

        if (cameraEffect) {
            anotheEffectForCamera();
        }

    }
}

//--------------------------------------------------------- 
//--------------------------------------------------------- RENDER VIDEOS

function gotResultsCam() {

}