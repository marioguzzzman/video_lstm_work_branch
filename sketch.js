// https://creative-coding.decontextualize.com/video/


//new code for random playing inside
var vid;
var playing = false;
var completion;

var stage = 1;
var videos = [];
// var videos;

var whichVideo=0;

function preload(){
    videos[0] = createVideo("videos/6.mp4");
}

function setup() {
  createCanvas(400, 100);


    // button = createButton('play');
    // button.mousePressed(toggleVid); // attach button listener

//   videos[0].size(400, 300);
//   videos[0].play();
}
function draw() {
    
      //TO PLAY VIDEOS
      if (stage === 1) {
        if (keyCode === LEFT_ARROW) {
        //accepted
        //pick random video from array
        whichVideo = (whichVideo+1)%videos.length;//floor(random(videos.length));         
        stage = 2;
              playTheVideo();
     } 
    
    }

    videos[0].volume(.1);
  if (frameCount % 120 == 0) {
    videos[whichVideo].time(random() * videos[0].duration() - 2); //solo el random del cuadro

    //RENDER VIDEO    
// image(videos[0].time(random() * videos[0].duration() - 2), 0, 0, windowWidth, windowHeight );
    // videos[0].volume(random());
  }
//   ellipse((videos[0].time()/videos[0].duration())*width, 50, 20, 20);

    console.log("videos/6.mp4");
}


function playTheVideo() {      
    videos[whichVideo].play();
    videos[whichVideo].onended(videoOver); //when video ends, call videoOver to return to first screen
}

function videoOver() {
  console.log("stopping video now"); 
  videos[whichVideo].pause();
  //videos[whichVideo].rewind();
  videos[whichVideo].hide();
  stage = 1;
}
// // code working but needs to press button and gets difficult to random

// var stage = 1;
// var videos = [];
// var whichVideo=0;

// // TODO
// //falta hacer un loop para mostrar y para ocultar
// //falta mas random
// //falta control sobre los videos
 
// function preload(){
//     videos[0] = createVideo("videos/1.mp4"); 
//     videos[1] = createVideo("videos/2.mp4");
//     videos[2] = createVideo("videos/3.mp4");
 
// }
 
// function setup() { 
//    createCanvas(windowWidth, windowHeight);  //if much more videos change this to for loop to load&&hide
//     videos[0].hide();
//       videos[2].hide();
//       videos[1].hide();
// } 
 
// function draw() { 
// // background(255,0,155);
// if (stage === 1) {
//     if (keyCode === LEFT_ARROW) {
//     //accepted
//     //pick random video from array
//     whichVideo = (whichVideo+1)%videos.length;//floor(random(videos.length));         
//     stage = 2;
//           playTheVideo();
//  } 

// }

// image(videos[whichVideo],0,0,windowWidth,windowHeight);
//         //  text("Video "+whichVideo,100,100);

// //   if (stage === 1){
// //         text("Stage 1",100,100);
// //   } else {
// //     image(videos[whichVideo],0,0,windowWidth,windowHeight);
// //          text("Video "+whichVideo,100,100);
// //   }
// }
 
// function playTheVideo() {      
//       videos[whichVideo].play();
//       videos[whichVideo].onended(videoOver); //when video ends, call videoOver to return to first screen
// }
 
// function videoOver() {
//     console.log("stopping video now"); 
//     videos[whichVideo].pause();
//     //videos[whichVideo].rewind();
//     videos[whichVideo].hide();
//     stage = 1;
// }
 
// // function keyPressed() {
// //     if (stage === 1) {
// //         if (keyCode === LEFT_ARROW) {
// //         //accepted
// //         //pick random video from array
// //         whichVideo = (whichVideo+1)%videos.length;//floor(random(videos.length));         
// //         stage = 2;
// //               playTheVideo();
// //      } 
 
// //     }
// // }