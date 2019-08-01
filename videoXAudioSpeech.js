// https://ml5js.org/reference/api-ImageClassifier/
// python3 -m http.server
// http://localhost:8000/  //works best with this. Does not work with Firefox

// Inspired on:
//  https://github.com/googlecreativelab/aiexperiments-giorgio-cam

//VIDEO 
// https://p5js.org/examples/dom-video.html
// https://creative-coding.decontextualize.com/video/ //http://www.decontextualize.com/

//TEXT
// https://ml5js.org/reference/api-charRNN/

//SOUND
// view-source:http://ability.nyu.edu/p5.js-speech/examples/01simple.html

/////////--------MOBILE NET VIDEO ----------


let myMobileNet;
let myVideo;
let myVideos = [];
let numOfVideos = 3;


let myDiv;
let myDivGen;

let playing = false;
let fingers;
let button;

let rnn;

var myVoice  = new p5.Speech(); // new P5.Speech object

// var menuLoaded = 0;
// var label, input, checkbox, speakbutton, vslider, rslider, pslider; // UI


// To add things that take time to load
function preload() {
    myMobileNet = ml5.imageClassifier('MobileNet'); // put name of model a the end
    // myImg = loadImage('animal.jpg'); 
    // myVideo = createCapture(VIDEO);  //captures video from webcam
   

    // myVideo = (Math.floor(random(myVideo.length))); //random voices
    // myVideos = [];


    for(let i = 1; i <= numOfVideos; i++) {
        const myVideo = createVideo(`videos/${i}.mp4`); //captures video from videofile
        myVideos.push(myVideo)
    }

    // capture.hide();

    //LOAD MODEL LSTM
    rnn = ml5.charRNN("/lstm/hemingway/");

    //VOICE


}

function setup() {
    // console.log('my Mobile: ', myMobileNet) // to test

    //VIDEO 
    // specify multiple formats for different browsers
    //   fingers = createVideo(['assets/fingers.mov', 'assets/fingers.webm']); //from p5js -> just plays the video
    //fingers = createVideo(['videos/video1.mp4']);

    button = createButton('play');
    button.mousePressed(toggleVid); // attach button listener

    //AUDIOS
    // sliders:
    // vslider = createSlider(0., 100., 100.);
    // vslider.position(20, 140);
    // vslider.mouseReleased(setVolume);
    // rslider = createSlider(10., 200., 100.);
    // rslider.position(20, 160);
    // rslider.mouseReleased(setRate);
    // pslider = createSlider(1., 200., 100.);
    // pslider.position(20, 180);
    // pslider.mouseReleased(setPitch);


    //ELEMENTS FOR ML5
    myMobileNet.classify(myVideos[0], gotResults);

    // DO SOME DIVS
    myDiv = createDiv('...'); //create only one Div so we can see only one result
    // myDiv.parent('#wraper');
    myDivGen = createDiv('...'); //create only one Div so we can see only one result

}

function gotResults(err, results) {


    if (err) console.log(err);
    if (results) {
        console.log(results);
        myDiv.html(`Label: ${results[1].label} Confidence: ${results[1].confidence}`) //pass the Div here
        setTimeout(() => myMobileNet.classify(myVideo, gotResults), 5000); //setTimeout to slow the results. we also added an arow function

        // Generete content
        rnn.generate({
            seed: results[1].label, // this is the label
            length: 100, //length of characters
            temperature: 0.8 // bring closer to 1 in order to make it closer to seed
        }, (err, results) => {
            // console.log(results);
            myDivGen.html(results.sample) // just create a div.        

            // say hello:
            //AUDIO
            myVoice.setVoice(Math.floor(random(myVoice.voices.length))); //random voices
            myVoice.speak(results.sample);


        });


    
    }
}

// plays or pauses the video depending on current state
function toggleVid() {
    if (playing) {
        myVideo.pause();
        button.html('play');
    } else {
        myVideo.loop();
        button.html('pause');
    }
    playing = !playing;
}


