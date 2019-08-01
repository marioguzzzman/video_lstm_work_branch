// https://ml5js.org/reference/api-ImageClassifier/
// python3 -m http.server
// http://localhost:8000/  //works best with this. Does not work with Firefox

/////// GUI PARAMS

// gui params
var frameRateX = 30;
// var myColor = '#eeee00';

var gui;


/////////--------MOBILE NET VIDEO ----------

//ML5
let myMobileNet;

//DIVS
// let myDiv;
// let myDivGen;

//VIDEO
// let myVideo;
let playing = false;
let button;

let stage = 1;
let videos = [];
let whichVideo = 4;

//TEXT
let rnn;
let mbNetLabel0 = '';
let mbNetConfidence0 = ''; //i think i am not using this
let mbNetLabel1 = '';
let mbNetLabel2 = '';
let confidence = '';

let rnnSub = '';

let terminalF;
let subtitleF;
let posXte
let posYtextT;
let w;
let h;

let posYtextS;
let line;
let color;

let seaRoseLines;
let entrance = ["But it really feels like a",
    'I whish you also could see ',
    'Remote: Enumerating objects:', 'Object Found:',
    'Maybe is also'
];

//SOUND
var myVoice = new p5.Speech(); // new P5.Speech object
let voice = 'Google UK English Female';
// http://ability.nyu.edu/p5.js-speech/


// To add things that take time to load
function preload() {
    myMobileNet = ml5.imageClassifier('MobileNet'); // put name of model a the end
    
    // myImg = loadImage('animal.jpg'); 
    // myVideo = createCapture(VIDEO);  //captures video from webcam
    // myVideo = createVideo(['videos/1.mp4']); //captures video from videofile

    videos[0] = createVideo("videos/1.mp4");
    videos[1] = createVideo("videos/2.mp4");
    videos[2] = createVideo("videos/3.mp4");
    videos[3] = createVideo("videos/4.mp4");
    videos[4] = createVideo("videos/5.mp4");
    videos[5] = createVideo("videos/6.mp4");
    videos[6] = createVideo("videos/7.mp4");
    videos[7] = createVideo("videos/8.mp4");
    videos[8] = createVideo("videos/9.mp4");


    //LOAD MODEL LSTM
    rnn = ml5.charRNN("/lstm/hemingway/");

    //Text
    seaRoseLines = loadStrings('sentences.txt'); //not being used rigth now


    // //VOICE
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    // console.log('my Mobile: ', myMobileNet) // to test

    //GUI

    // Create the GUI
    // sliderRange(20, 60, 1);
    // gui = createGui('p5.gui');
    // gui.addGlobals('frameRateX');

    // Only call draw when then gui is changed
    // noLoop(); 

    //VIDEO 
    // specify multiple formats for different browsers
    // variable = createVideo(['PATH/video.mov', 'PATH/variable.webm']); //from p5js -> just plays the video
    //variable = createVideo(['PATH/video1.mp4']);
    videos[0].hide();
    videos[1].hide();
    videos[2].hide();
    videos[3].hide();
    videos[4].hide();
    videos[5].hide();
    videos[6].hide();
    videos[7].hide();
    videos[8].hide();

    // button = createButton('play');
    // button.mousePressed(toggleVid); // attach button listener


    //-------TEXT

    //---------ML5

    // myMobileNet.classify(myVideo, callback);
    // myMobileNet.classify(videos[whichVideo], gotResults);

    // DO SOME DIVS
    myDiv = createDiv('...'); //create only one Div so we can see only one result
    // myDiv.parent('#wraper');
    myDivGen = createDiv('...'); //create only one Div so we can see only one result

}

function draw() {

    background(0, 50);
    frameRate(30);

    videoSound();

    console.log('Scanning environment...');


    // videos[0].playTheVideo();

    //--------------------- FIX THIS, DOES NOT WORK
    //TO PLAY VIDEOS
    if (stage === 1) {

        console.log('Stage 1');

        if (frameCount % 30 || keyCode === ENTER) {
            console.log('pressing enter');

            //accepted
            //pick random video from array
            let azar = int(random(0, videos.length + 1));
            whichVideo = azar; //for(random(videos.length));

            console.log('video number: ' + whichVideo);


            //     if (frameCount % 120 == 0) {
            // whichVideo = random(0,5);
            //         // videos[whichVideo].time(random() * videos[whichVideo].duration() - 2);//solo el random del cuadro
            //     }         
            stage = 2;
            playTheVideo();
            console.log('Stage 2');

        }

    }


    //RENDER VIDEO  


    // -------------------FIX THIS

    //Plays random position based in framecount  
    if (frameCount % 120 == 0 || keyCode == UP_ARROW) {

        console.log('Enter play random position');
        videos[whichVideo].time(random() * videos[whichVideo].duration() - 2); //solo el random del cuadro
        videos[3].volume(random());
        console.log('Video: ' + whichVideo + 'frame: ' + frameCount);

    }

    image(videos[whichVideo], 0, 0, windowWidth, windowHeight); //size and position of video

    


    // ------------------ Display TEXT from Model

    // DoText();

}

//----------------------------------------VIDEO FUNCTIONS

// plays or pauses the video depending on current state

function toggleVid() {
    if (playing) {
        videos[whichVideo].stop();
        videos[whichVideo].html('play');

        Console.log('pressing toggleVId play');
    } else {
        videos[whichVideo].loop();
        videos[whichVideo].html('pause');
        Console.log('pressing toggleVId pause');

    }
    playing = !playing;
}


function playTheVideo() {
    console.log('playing video');

    videos[whichVideo].play();
    videos[whichVideo].onended(videoOver); //when video ends, call videoOver to return to first screen
}

function videoOver() {
    console.log("stopping video now VIDEO OVER");
    videos[whichVideo].pause();
    //videos[whichVideo].rewind();
    videos[whichVideo].hide();
    stage = 1;
}

// function mousePressed() {
//   shuffle(seaRoseLines, true);
// }


//------------------------------------------------SOUND FOR VIDEO
function videoSound() {
    videos[whichVideo].volume(.1);
    videos[3].volume(.1);
}


//-------------------------------------------------TEXT DISPLAY

function DoText() {

    posXtextT = windowWidth - (windowWidth - 100);
    posYtextT = windowHeight - 900;
    w = 600;
    h = 400;
    color = 250;


    textAlign(LEFT);
    textFont("Ubuntu Mono");

    textSize(37);
    fill(color);
    noStroke();
    textLeading(50);

    // TEST THIS MORE
    // for (let i = 0; i < seaRoseLines.length; i++) {
    //     fill(color);
    //     text(seaRoseLines[i], 50, 50+i*20);
    //   }


    let sourceText = ' I am ' +
        mbNetConfidence0 +
        ' sure this is a ' +
        mbNetLabel0 +
        '. \nBut it really feels like a ' +
        mbNetLabel1 +
        '. \nRemote: Enumerating objects: ' +
        mbNetLabel2.length +
        ' \nMaybe is also a ' +
        mbNetLabel2 + '?';


    text(sourceText, posXtextT, posYtextT + 100, w, h);

    //Add cursor
    fill(color + sin(frameCount * 0.1) * 128);
    text('_', posXtextT, posYtextT + 100, w, h);

    fill(color);
    let frame = frameCount % 60;
    // text(frameCount%60, posXtextT, posYtextT + 400, w, h);
    text(frame, posXtextT, posYtextT + 400, w, h);



    //CODE TO SIMULATE WRITING
    // https://creative-coding.decontextualize.com/text-and-type/
    //use substring
    // var someText = "it was the best of times";
    // console.log(someText.substring(0, 1)); // prints "i"
    // console.log(someText.substring(7, 15)); // prints "the best"
    // console.log(someText.substring(19)); // prints "times"
    // var middle = sourceText.length / 2;
    //   var left = middle - ((mouseX / width) * middle);
    //   var right = middle + ((mouseX / width) * middle);
    //   text(
    //     sourceText.substring(left, right+1),
    //      posXtextT, posYtextT + 500, w, h);



    //SEPARATE SENTENCES
    // text('> Remote: Enumerating objects: done.' + mbNetLabel0 , posXtextT, posYtextT + 150, w, h);
    // text('> But it really feels like a'  + mbNetLabel1,  posXtextT, posYtextT + 200, w, h);
    // text('> Could it also be a' + mbNetLabel2 + '?',  posXtextT, posYtextT + 250, w, h);

    posYtextS = windowHeight - 200;
    line = 50;
    textAlign(CENTER);
    textFont("Verdana");
    textSize(55);
    textLeading(50); // pixels between each line

    fill(0, 0, 0, 5); //shadow for subtitle
    text('I can tell you that' + rnnSub, line + 2, posYtextS + 2, windowWidth, 300);
    stroke(0);
    fill(255, 255, 64);
    // TODO: althoug I think is this, i feel it loooks more like thi.
    //Need to conect this text with termina
    //SOmebody told me:, Object N, made me think, why this feels like a:, 
    //This kind of sentences need to go into the seed as well
    text(rnnSub, line, posYtextS, windowWidth, 100);
}

//-------------------- -----------------------MOBILE NET + CRNN MODEL

function gotResults(err, results) {

    if (err) console.log(err); //just tell errors

    if (results) {

        console.log(results); // see results 

        //-----> ML5 ------>  Create a sentence
        mbNetLabel0 = results[0].label;
        mbNetConfidence0 = results[0].confidence;
        mbNetLabel1 = results[1].label;
        mbNetLabel2 = results[2].label;

        myDiv.html(mbNetLabel0); //Put sentence in DIV

        // -----> CRNN ------> Generate TEXT content

        rnn.generate({
            // seed: results[1].label, // this is the label result
            // seed: mbNetLabel0, // this is the hole sentence
            seed: `I can tell you that ${mbNetLabel0}`, // this is the hole sentence that becomes seed
            length: 90, //length of characters
            temperature: 0.5 // bring closer to 1 in order to make it closer to seed

        }, (err, results) => {

            console.log(results);

            rnnSub = results.sample; // ------> RESULTED TEXT

            //DIV FOR TEXT
            myDivGen.html(rnnSub); // just create a div.  


            //-------------> AUDIO / TALK

            // talk();

        
            //VIDEO
            setTimeout(() => myMobileNet.classify(videos[whichVideo], gotResults), 5000); //setTimeout to slow the results. we also added an arow function


        });

    }
} //end of gotResults


//-----------------------------------------TALK

function talk(){

    myVoice.setVoice(voice);
    myVoice.speak(rnnSub);

}

//------------------------------------------WINDOW SIZE ELEMENTS

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}