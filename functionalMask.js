// https://ml5js.org/reference/api-ImageClassifier/
// python3 -m http.server
// http://localhost:8000/  //works best with this. Does not work with Firefox


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

//PIMAGES AS MASKS
let circleMask;
let contentBack;
let videoBack;

//TEXT

let resultsReady = false;

//text displayed in "terminal" text
let rnn;
let mbNetLabel0 = '';
let mbNetConfidence0 = ''; //i think i am not using this
let mbNetLabel1 = '';
let mbNetLabel2 = '';
let confidence = '';

//ml5 result as subtitle text
let rnnSub = '';

//parameters for "terminal" text
let terminalF;
let subtitleF;
let posXte
let posYtextT;
let w;
let h;

let textSpeed = 0;


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
let myVoice = new p5.Speech(); // new P5.Speech object
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

    // for (let i = 0; i < videos.length -1; i++) {

    //     videos[i] = createVideo(`videos/${i+1}.mp4`);

    //   }



    //LOAD MODEL LSTM
    rnn = ml5.charRNN("/test-lstm/model_124/");

    //Text
    // seaRoseLines = loadStrings('sentences.txt'); //not being used rigth now


    // //VOICE
}

function setup() {

    createCanvas(windowWidth, windowHeight);

    frameRate(60);

    pixelDensity(1);

    circleMask = createGraphics(windowWidth, windowHeight);
    img = createImage(windowWidth, windowHeight);

    // create a p5.Graphics containing the image that will be masked
    contentBack = createGraphics(windowWidth, windowHeight);

    // console.log('my Mobile: ', myMobileNet) // to test

    //VIDEO 
    // specify multiple formats for different browsers
    // variable = createVideo(['PATH/video.mov', 'PATH/variable.webm']); //from p5js -> just plays the video
    //variable = createVideo(['PATH/video1.mp4']);

    // for (let i = 0; i < videos.length -1; i++) {
    //     videos[i].hide();
    //   }

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
    myMobileNet.classify(videos[whichVideo], gotResults);

    // DO SOME DIVS
    // myDiv = createDiv('...'); //create only one Div so we can see only one result
    // myDiv.parent('#wraper');
    // myDivGen = createDiv('...'); //create only one Div so we can see only one result

}

function draw() {

    background(0, 50);


    if (keyCode == 77) {
        textSize(18);
        fill(255);
        noStroke();
        textLeading(30);
        textAlign(LEFT);
        let menu = "Menu: \n Render Video =  space bar \n Set random Video = Enter \n Black Screen-random-number = Up arrow \n Talk =s ";
        text(menu, windowWidth / 2, windowHeight / 2 + 100, 350, 400);
    } else {

        //    textSize(18);
        //    noFill();
        //    noStroke();
        //     textLeading(30);
        //     text(" ", windowWidth/2, windowHeight/2 + 100, 350, 400);
    }
    // videoSound();

    console.log('Scanning environment...');

    // ------------------ Display VIDEOS 

    if (keyCode == 32) {

        console.log('inside space');


        // creating a seudo mask
        // tint(255, 127);
        // fill(0);
        // rect(0, 0, windowWidth, windowHeight);
        // fill(255);
        // ellipse(mouseX, mouseY, 100, 100);
       

        renderVideos(); //assign video to backgroung image, but not in here.
    } else {

        // fill(0);
        // circleMask.rect(0, 0, windowWidth, windowHeight); //background of circle
        circleMask.background(0);
        circleMask.fill(50); //fill of cicle
        circleMask.ellipse(mouseX, mouseY, 200);
        let maskedImage = pgMask(contentBack, circleMask);
        image(maskedImage, 0, 0, windowWidth,windowHeight); // all size for them to have same size
    }


    // ------------------ Display TEXT from Model

    if (resultsReady) {
        DoText();
    }

}

function pgMask(_content, _mask) {
    //Create the mask as image
    let img = createImage(_mask.width, _mask.height);
    img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
    //load pixels
    img.loadPixels();
    for (let i = 0; i < img.pixels.length; i += 4) {
        // 0 red, 1 green, 2 blue, 3 alpha
        // Assuming that the mask image is in grayscale,
        // the red channel is used for the alpha mask.
        // the color is set to black (rgb => 0) and the
        // alpha is set according to the pixel brightness.
        let v = img.pixels[i];
        img.pixels[i] = 0;
        img.pixels[i + 1] = 0;
        img.pixels[i + 2] = 0;
        img.pixels[i + 3] = v;
    }
    img.updatePixels();

    //convert _content from circleMask to image
    let contentImg = createImage(_content.width, _content.height);
    contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
    // create the mask
    contentImg.mask(img)
    // return the masked image
    return contentImg;
}


//----------------------------------------RENDER VIDEOS

function renderVideos() {

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

}

//----------------------------------------VIDEO FUNCTIONS

// plays or pauses the video depending on current state


function playTheVideo() {
    console.log('playing video');

    contentBack = videos[whichVideo];
    contentBack.play();
    videos[whichVideo].onended(videoOver); //when video ends, call videoOver to return to first screen

}

function videoOver() {
    console.log("stopping video now VIDEO OVER");
    contentBack = videos[whichVideo]
    contentBack.pause();
    //videos[whichVideo].rewind();
    contentBack.hide();
    stage = 1;
}

// function mousePressed() {
//     shuffle(seaRoseLines, true);
// }


//------------------------------------------------SOUND FOR VIDEO
function videoSound() {
    videos[whichVideo].volume(0);
    videos[3].volume(.1);
}



//-------------------------------------------------TEXT DISPLAY

function DoText() {

    posXtextT = windowWidth - (windowWidth - 100);
    posYtextT = windowHeight - 600;
    w = 350;
    h = 400;
    color = 250;


    textAlign(LEFT);
    textFont("Ubuntu Mono");

    textSize(18);
    fill(color);
    noStroke();
    textLeading(30);

    let sourceText = 'Scanning... \nFound a ' +
        mbNetLabel0 +
        '. \nthat looks like a ' +
        mbNetLabel1 +
        ' \nmaybe is also a ' +
        mbNetLabel2 +
        'I am ' +
        mbNetConfidence0 +
        ' sure of that...';

    // this moves new

    if (textSpeed < sourceText.length) {
        textSpeed += 0.2;
    } else {
        textSpeed = 0;
        textSpeed += 0.2;
    }

    //CODE TO SIMULATE WRITING
    // https://creative-coding.decontextualize.com/text-and-type/ 

    let startWriting = 0;
    // let left = startWriting - textSpeed ;
    let right = startWriting + textSpeed;
    text(sourceText.substring(startWriting, right + 1), posXtextT, posYtextT + 100, w, h);


    //this is static text
    // text(sourceText, posXtextT, posYtextT + 100, w, h);

    // Add cursor
    // fill(color + sin(frameCount * 0.1) * 128);
    // text('Scanning...', posXtextT, posYtextT + 100, w, h);

    // fill(color);
    // let frame = frameCount % 60;
    // // text(frameCount%60, posXtextT, posYtextT + 400, w, h);
    // text(frame, posXtextT, posYtextT + 400, w, h);


    // SUBTITLE TEXT

    posYtextS = windowHeight - 150;
    line = 50;
    textAlign(CENTER);
    textFont("Verdana");
    textSize(35);
    textLeading(50); // pixels between each line

    fill(0, 0, 0, 5); //shadow for subtitle
    text('I can tell you that' + rnnSub, line + 2, posYtextS + 2, windowWidth, 300);
    stroke(0);
    fill(255, 255, 64);
    // TODO: althoug I think is this, i feel it loooks more like thi.
    //Need to conect this text with termina
    //SOmebody told me:, Object N, made me think, why this feels like a:, 
    //This kind of sentences need to go into the seed as well
    text(rnnSub, line, posYtextS, windowWidth - 100, 300);
}

//-------------------- -----------------------MOBILE NET + CRNN MODEL

function gotResults(err, results) {

    if (err) console.log(err); //just tell errors

    if (results) {

        resultsReady = true;

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
            seed: `I can see a ${mbNetLabel0} `, // this is the hole sentence that becomes seed
            length: 120, //length of characters
            temperature: 0.7 // bring closer to 1 in order to make it closer to seed

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

function talk() {

    myVoice.setVoice(voice);
    myVoice.speak(rnnSub);

}

//------------------------------------------WINDOW SIZE ELEMENTS

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}