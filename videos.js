// https://ml5js.org/reference/api-ImageClassifier/
// python3 -m http.server
// http://localhost:8000/  //works best with this. Does not work with Firefox



//VIDEO
let myVideo;
let playing = false;
let button; 

let stage = 1;
let videos = [];
let whichVideo = 4;



// To add things that take time to load
function preload() {
   
    // myImg = loadImage('animal.jpg'); 
    // myVideo = createCapture(VIDEO);  //captures video from webcam
    // myVideo = createVideo(['videos/1.mp4']); //captures video from videofile



    videos[0] = createVideo("videos/1.mp4");
    videos[1] = createVideo("videos/2.mp4");
    videos[2] = createVideo("videos/3.mp4");
    videos[3] = createVideo("videos/4.mp4");
    // videos[4] = createVideo("videos/5.mp4");
    // videos[5] = createVideo("videos/6.mp4");
    // videos[6] = createVideo("videos/7.mp4");
    // videos[7] = createVideo("videos/8.mp4");
    // videos[8] = createVideo("videos/9.mp4");

}

function setup() {

    createCanvas(windowWidth, windowHeight);
    // console.log('my Mobile: ', myMobileNet) // to test

    //VIDEO 
    // specify multiple formats for different browsers
    // variable = createVideo(['PATH/video.mov', 'PATH/variable.webm']); //from p5js -> just plays the video
    //variable = createVideo(['PATH/video1.mp4']);
    videos[0].hide();
    videos[1].hide();
    videos[2].hide();
    videos[3].hide();
    // videos[4].hide();
    // videos[5].hide();
    // videos[6].hide();
    // videos[7].hide();
    // videos[8].hide();

    myVideo = createVideo("videos/2.mp4");

    button = createButton('play');
    button.mousePressed(toggleVid); // attach button listener

}

function draw(){


}

function toggleVid(){

    if (playing) {
        videos[3].pause();
        button.html('play');
      } else {
        videos[3].loop();
        button.html('pause');
      }
      playing = !playing;
}


//----------------------------------------------------------------------------------------------------------

// function draw() {

//     background(0, 50);
//     frameRate(24);

//     // if (frameCount === 120) {
//     //     frameCount = 0;
//     // } 

//     // videoSound();

//     console.log('Scanning environment...');
//     console.log("frame count: " + frameCount);

//     playTheVideo();

//     //--------------------- FIX THIS, DOES NOT WORK
//     //TO PLAY VIDEOS
//     if (stage === 1) {

//         console.log('Stage 1');

//         if ( frameCount % 30 || keyCode === ENTER ) {
//             // if (keyCode === ENTER || frameCount % 30 ) {

//             console.log('pressing enter');

//             //accepted
//             //pick random video from array
//             let azar = int(random(0, videos.length+1));
//             whichVideo = azar; //for(random(videos.length));

//             console.log( "video length" + videos.length);
//             console.log('video number: ' + whichVideo);


//             //     if (frameCount % 120 == 0) {
//             // whichVideo = random(0,5);
//             //         // videos[whichVideo].time(random() * videos[whichVideo].duration() - 2);//solo el random del cuadro
//             //     }         
//             stage = 2;
//             playTheVideo();
//             console.log('Stage 2');

//         }

//     }


//     //RENDER VIDEO  


//     // -------------------FIX THIS

//     //Plays random position based in framecount  
//     if (frameCount % 120 == 0 || keyCode == UP_ARROW) {

//         console.log('Enter play random position');
//         videos[whichVideo].time(random() * videos[whichVideo].duration() - 2); //solo el random del cuadro
//         videos[3].volume(random());
//         console.log('Video: ' + whichVideo + 'frame: ' + frameCount);

//     }

//     image(videos[whichVideo], 0, 0, windowWidth, windowHeight); //size and position of video

    
//     // ------------------ Display TEXT from Model

//     // DoText();

// }

// //----------------------------------------VIDEO FUNCTIONS

// // plays or pauses the video depending on current state

// function toggleVid() {
//     if (playing) {
//         videos[whichVideo].stop();
//         videos[whichVideo].html('play');

//         Console.log('pressing toggleVId play');
//     } else {
//         videos[whichVideo].loop();
//         videos[whichVideo].html('pause');
//         Console.log('pressing toggleVId pause');

//     }
//     playing = !playing;
// }


// function playTheVideo() {
//     console.log('playing video');

//     videos[whichVideo].play();
//     videos[whichVideo].onended(videoOver); //when video ends, call videoOver to return to first screen
// }

// function videoOver() {
//     console.log("stopping video now VIDEO OVER");
//     videos[whichVideo].pause();
//     //videos[whichVideo].rewind();
//     videos[whichVideo].hide();
//     stage = 1;
// }


