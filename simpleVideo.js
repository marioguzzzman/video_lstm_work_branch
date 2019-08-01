//------------------------------------------------------------

// The .volume() method of the video object sets its volume (0 is silent, 1 is full volume); you can set the volume by calling .volume() with a parameter (ranging, likewise, from 0 to 1).

// The reference for p5.MediaElement has a complete list of the methods you can call on video objects.

var vid;
var vid2;

var playing = false;
var completion; //percentage of completion =  0 is the beginning of the video and 1 is the end.

function preload(){
    vid = createVideo("videos/2.mp4");
}


function setup() {
  createCanvas(400, 100);
  vid.size(400, 300);
//   vid.play();
  vid.loop();
}
function draw() {
  background(50);

  if (frameCount % 120 == 0) {
    vid.time(random() * vid.duration() - 2);
    vid.volume(random());
  }
  ellipse((vid.time()/vid.duration())*width,
    50, 20, 20);

    playRandom();
}

function playRandom() {


   if (keyCode == ENTER){

    if (!playing) {
        vid.play();
        vid.time((mouseX/width) * vid.duration());
        playing = true;
      }

   }  else if (keyCode == 32){
    vid.pause();
    playing = false;
  }

    }

//---------------------// JUST TO PLAY ONE VIDEO IN LOOOP

// There are a number of new things in this example, and I’ll explain them in turn!

// The .size() method of the video object controls the dimensions of the video object. I made it a bit wider than it was tall.

// The .time() method returns the number of seconds elapsed in the video, and the .duration() method returns the total number of seconds in the video. 
// Dividing time by duration gives us a percentage of completion (i.e., a number from 0 to 1, where 0 is the beginning of the video and 1 is the end).

// The .play() and .pause() methods of the video object play and pause the video (respectively). Video objects don’t come with a method that tells us whether or not the video is currently playing, so you need to keep track of that yourself. (In this sketch, I used a boolean variable called playing for this purpose.)

// The .time() method, when called with a parameter, causes the video to seek to the given position, as given in seconds. In this sketch, we multiply the video’s duration by the ratio of the mouse position to the width of the sketch, which has the effect of moving the video’s playback to proportionally with the X position of the mouse.


// var vid;
// var playing = false;
// var completion;
// function setup() {
//   createCanvas(400, 100);
//   vid = createVideo("videos/2.mp4");
//   vid.size(400, 300);
//   vid.loop();
// }
// function draw() {
//   background(50);
//   completion = vid.time() / vid.duration();
//   ellipse(completion*width, 50, 20, 20);
// }
// function mousePressed() {
//   if (!playing) {
//     vid.play();
//     vid.time((mouseX/width) * vid.duration());
//     playing = true;
//   }
//   else {
//     vid.pause();
//     playing = false;
//   }
// }

