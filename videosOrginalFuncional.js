// GENERAL WORKING AND TESTING BRANCH 

//CURRENTLY WORKING ON:
//Setting random video play
//Managing different efects for videos

//Instructions to run
// https://ml5js.org/reference/api-ImageClassifier/
// In terminal enter the folder in which the code is hosted
// python3 -m http.server
// http://localhost:8000/  //works best with this. Does not work with Firefox

//You have to click on the screen to be able to hear the background sounds



// TODO
//RECORD TEXT
//ADD WEBCAM
//ADD CODE TO CHANGE BETWEEN WEBCAM AND VIDEO WHEN RECOGNIZING A FACE
//ADD THE TRANSLATOR FROM GOOGLE
//CHANGE VOICE TO SPANISH


/////////--------MOBILE NET VIDEO ----------

//ML5
let myMobileNet;

//DIVS
// let myDiv;
// let myDivGen;

//--------------------------VIDEO ----------

//VIDEO
// let myVideo;
let playing = false;

let stage = 1;
let videos = [];
let whichVideo = 0;


var vScale = 20; // scale of video


let pixelColor;

//--------------------------TEXT ----------

let resultsReady = false;

//text displayed in "TERMINAL" text
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

// //--------------Connectors text XIX CENTURY TRAVELER
// let entrance = [
//     'I think this is a ',
//     'Sometimes when I find a ',
//     'Later on, I whould think of this ',
//     'Although I don\'t believe that this is a ',
//     'But, if you wander through the ',
//     'Last time I saw a ',
//     'I couldn\'t believe a ',
//     'I feel I already saw a ',
//     'Just after a ',
//     'Before this ',
//     'After encountering this ',
//     'Also, this ',
//     'Later on, the ',
//     'Above all, this ',

// ];

// let middle = [
//     ' ',
//     ' ',
//     ' ',
//     ' ',
//     ' ',
//     ' ',
//     ' ',
//     '. ',
//     ', ',
//     ', but ',
//     ', moreover, ',
//     ', however, ',
//     ', in short,',
//     ', but also, ',
//     ', in addition, ',
//     ', nevertheless, ',
//     ', I rather think of ',
//     ' we can discuss about',
//     ' I doubted my self, but ',
//     ' was there '

// ];

// //--------------Connectors text XIX CENTURY TRAVELER

//--------------Connectors text LATIN GAMEON
let entrance = [
    'Creo que esto es un ',
    'A veces, cuando encuentro un ',
    'Más tarde, yo pensaría que un ',
    'Aunque no crea que esto es un ',
    'Pero, si recorres el ',
    'La última vez que ví un ',
    'No podría crer que un ',
    'Siento que ya he visto este ',
    'Justo antes de este ',
    'Antes de este ',
    'Después de reconcer este ',
    'También, este ',
    'Más tarde, el ',
    'Sobre todo, este ',

];

let middle = [
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    '. ',
    ', ',
    '. ',
    ', ',
    ', pero ',
    ', sin embargo, ',
    ', en resumen,',
    ', pero también, ',
    ', además, ',
    ', me gustaría pensar que ',
    ' podemos discutir acerca de',
    ' Dudaba de mi, pero ',
    ' estaba ahí '
];

//--------------Connectors text LATIN GAMEON



//--------------------------TEXT SEEDS ----------
let startingSeeds = entrance[0];
let middleSeeds = middle[0];

//--------------------------SOUND ----------

// http://ability.nyu.edu/p5.js-speech/ 
// https://generative.fm/record
var myVoice = new p5.Speech(); // new P5.Speech object
// let voice = 'Google UK English Male';
let voice = 'Google español de Estados Unidos';

//List of voices
// 'Google Deutsch', 'Google US English', 'Google UK English Female', 'Google UK English Male', 'Google español', 'Google español de Estados Unidos', 'Google français', 'Google हिन्दी', 'Google Bahasa Indonesia', 'Google italiano', 'Google 日本語', 'Google 한국의', 'Google Nederlands', 'Google polski', 'Google português do Brasil', 'Google русский', 'Google 普通话（中国大陆）', 'Google 粤語（香港', 'Google 國語（臺灣'


//BACKGROUND MUSIC

let sounds = [];
let otherSong;
// let sound1;
// let sound2;
// let sound3;
// let sound4;


//-------------------------WEB SETTINGS ----------

// p5.disableFriendlyErrors = true; // disables FES //to upgrade performance



function preload() { // To add things that take time to load
    myMobileNet = ml5.imageClassifier('MobileNet'); // put name of model a the end

    // myVideo = createCapture(VIDEO);  //captures video from webcam

    videos[0] = createVideo("videos/1.mp4"); //captures video from videofile
    // videos[1] = createVideo("videos/2.mp4");
    // videos[2] = createVideo("videos/3.mp4");
    // videos[3] = createVideo("videos/4.mp4");
    // videos[4] = createVideo("videos/5.mp4");
    // videos[5] = createVideo("videos/6.mp4");
    // videos[6] = createVideo("videos/7.mp4");
    // videos[7] = createVideo("videos/8.mp4");
    // videos[8] = createVideo("videos/9.mp4");
    // videos[9] = createVideo("videos/10.mp4");


    //LOAD MODEL LSTM
    // rnn = ml5.charRNN("/test-lstm/model_124/"); // XIX century traveler
    rnn = ml5.charRNN("/test-lstm/model_8_latin/"); // lATIN model for GameOn

    //SOUND
    // createConvolver('background_sound/drones.wav', soundReady);

    //SOUND

//TODO increse sound length

    sounds[1] = loadSound('background_sounds/drones.wav');
    sounds[2] = loadSound('background_sounds/seven.wav');
    sounds[0] = loadSound('background_sounds/pulse-modulation.wav');
    // sounds[3] = loadSound('background_sound/eyes.wav');

}

function setup() {

    createCanvas(windowWidth, windowHeight);

    frameRate(30);

    pixelDensity(1);


    // console.log('my Mobile: ', myMobileNet) // to test

    //-------------VIDEO 

    //TODO add videocamera test this code
    // variable = createVideo(['PATH/video.mov', 'PATH/variable.webm']); //from p5js -> just plays the video


    // specify multiple formats for different browsers
    // variable = createVideo(['PATH/video.mov', 'PATH/variable.webm']); //from p5js -> just plays the video
    //variable = createVideo(['PATH/video1.mp4']);


    //Adjust video size // actually increses the accuracy of the prediction model
    videos[0].size(width / vScale, height / vScale);
    // videos[1].size(width / vScale, height / vScale);
    // videos[2].size(width / vScale, height / vScale);
    // videos[3].size(width / vScale, height / vScale);
    // videos[4].size(width / vScale, height / vScale);
    // videos[5].size(width / vScale, height / vScale);
    // videos[6].size(width / vScale, height / vScale);
    // videos[7].size(width / vScale, height / vScale);
    // videos[8].size(width / vScale, height / vScale);
    // videos[9].size(width / vScale, height / vScale);


    // 
    videos[0].hide();
    // videos[1].hide();
    // videos[2].hide();
    // videos[3].hide();
    // videos[4].hide();
    // videos[5].hide();
    // videos[6].hide();
    // videos[7].hide();
    // videos[8].hide();
    // videos[9].hide();

    //---------ML5
    // myMobileNet.classify(myVideo, callback);
    myMobileNet.classify(videos[0], gotResults);

    // DO SOME DIVS
    // myDiv = createDiv('...'); //create only one Div so we can see only one result
    // // myDiv.parent('#wraper');
    // myDivGen = createDiv('...'); //create only one Div so we can see only one result

}

function draw() {
    // console.log('Enter draw...');
    // console.log('video: ' + whichVideo);

    background(0, 50); //antes 50
    // background(0);


    // if (keyCode == 77) { //letter m
    //     textSize(18);
    //     fill(255);
    //     noStroke();
    //     textLeading(30);
    //     textAlign(LEFT);
    //     let menu = "Menu: \n Render Video =  space bar \n Set random Video = Enter \n Black Screen-random-number = Up arrow \n Talk =s ";
    //     text(menu, windowWidth / 2, windowHeight / 2 + 100, 350, 400);

    // } else {


    // }


    // ------------------ Display VIDEOS 

    // if (keyCode == 32) { //space

    //     //Draw something especial
    //     //  renderVideos();

    // } else {
    //     //  draw by default

    //     renderVideos();
    // }
    renderVideos();


    // ENABLE AUDIOCONTEXT REQUIREMENT FOR BROWSER
    textAlign(CENTER);
    fill(0);
    if (getAudioContext().state !== 'running') {
        text('click to start audio', width / 2, height / 2);
    } else {
        // text('audio is enabled', width/2, height/2);
    }

    // ------------------ Display TEXT from Model

    if (resultsReady) {
        DoText();
        talk();
    
        // DoTextHiperpoesia();

        // console.log(rnnSub);
    }


} //--------------END DRAW

//--------------------------------------BACKGROUND SOUND
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



//-----------------------------------------TALK
function talk() {
    myVoice.setVoice(voice);
    myVoice.speak(rnnSub);

    // SIEMPRE SUENA LA VOZ
    myVoice.setRate(.8); // speed of speach
    myVoice.setPitch(.9);
    myVoice.setVolume(.4);

    // DOES NOT WORK

    // if (keyIsDown(DOWN_ARROW)){
    //     myVoice.setRate(.8); // speed of speach
    //     myVoice.setPitch(.9);
    //     myVoice.setVolume(.4);
    // }else { //shutdown voice
    //     myVoice.setRate(.8); // speed of speach
    //     myVoice.setPitch(.9);
    //     myVoice.setVolume(0);
    // }

}


//----------------------------------------RENDER VIDEOS

function renderVideos() {

    // videos[0].playTheVideo();

    //PLAY VIDEOS IN RANDOM
    if (stage === 1) {

        console.log('Stage 1');

        if (frameCount % 50 || keyCode === ENTER) {
            console.log('pressing enter');

            //pick random video from array

            
            let azar = Math.floor(random(0, videos.length));
            whichVideo = azar; //for(random(videos.length));

            console.log('video number: ' + whichVideo);

            stage = 2;
            playTheVideo();

            // console.log('playTheVideoPATH');
        }
    }



    // -------- to load pixels

    // vid.loadPixels();
    // for (var y = 0; y < height; y += 8) {
    //   for (var x = 0; x < width; x += 8) {
    //     var offset = ((y*width)+x)*4;
    //     fill(vid.pixels[offset],
    //       vid.pixels[offset+1],
    //       vid.pixels[offset+2]);
    //     rect(x, y, 8, 8); 
    //   }
    // }


    // PIXELS
    videos[whichVideo].loadPixels();

    for (var y = 0; y < videos[whichVideo].height; y++) {

        for (var x = 0; x < videos[whichVideo].width; x++) {

            var index = (videos[whichVideo].width - x + 1 + (y * videos[whichVideo].width)) * 4;

            var r = videos[whichVideo].pixels[index + 0];
            var g = videos[whichVideo].pixels[index + 1];
            var b = videos[whichVideo].pixels[index + 2];
            var bright = (r + g + b) / 3;
            var w = map(bright, 0, 255, 0, vScale);

            noStroke();
            fill(r, g, b);

            ///----------------- XIX century traveler

            // rectMode(CENTER);
            rect(x * vScale, y * vScale, w , w );
            // var rad = 100;

            ///----------------- XIX century traveler


            ///-----------------just hiperpoesia
            // if (keyIsDown(UP_ARROW)){
            //     ellipse(x * vScale, y * vScale, w, w);

            // } else 
            // ellipse(x * vScale, y * vScale, mouseX, mouseX);

            ///-----------------just hiperpoesia



        }
    }


    // OLD CODE WITH CIRCLES

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

    // / finish loading pixels

    // -------------------FIX THIS

    //Plays random position based in framecount  
    // if (frameCount % 120 == 0 || keyCode == UP_ARROW) {

    //     console.log('Enter play random position');
    //     videos[whichVideo].time(random() * videos[whichVideo].duration() - 2); //solo el random del cuadro

    //     console.log('Video: ' + whichVideo + 'frame: ' + frameCount);

    // }

    // ----->>>>>>> VIDEO HERE!
    // image(videos[whichVideo], 0, 0, width, height); //size and position of video

}

//----------------------------------------VIDEO FUNCTIONS

// plays or pauses the video depending on current state


function playTheVideo() {
    console.log('playing video');

    videos[whichVideo].loop();
    videos[whichVideo].onended(videoOver); //when video ends, call videoOver to return to first screen
    videoSound(); // now is set to 0

}

function videoOver() {
    console.log("Pausing video now VIDEO OVER / Stage 1");
    // videos[whichVideo].stop();
    //videos[whichVideo].rewind();
    // videos[whichVideo].hide();
    stage = 1;
}


//------------------------------------------------SOUND FOR VIDEO
function videoSound() {

        videos[whichVideo].volume(0); // antes 0
}


//-------------------- -----------------------MOBILE NET + CRNN MODEL

function gotResults(err, results) {

    if (err) console.log(err); //just tell errors

    if (results) {

        resultsReady = true;

        console.log('Results ready: ' + results); // see results 

        //-----> ML5 ------>  Create a sentence
        mbNetLabel0 = results[0].label;
        mbNetConfidence = results[1].confidence;
        mbNetLabel1 = results[1].label;
        mbNetLabel2 = results[2].label;

        // myDiv.html(mbNetLabel0); //Put sentence in DIV

        // -----> CRNN ------> Generate TEXT content

        rnn.generate({

            // seed: results[1].label, // this is the label result
            // seed: mbNetLabel0, // this is the hole sentence

            //----------------- SEEDS THAT APPEAR ON TEXT
            
            seed: `${startingSeeds}${mbNetLabel0} `, // this is the whole sentence that becomes seed
            length: 90, //length of characters
            temperature: 0.9 // bring closer to 1 in order to make it closer to seed

        }, (err, results) => {

            // console.log(results);

            // rnnSub = results.sample; // ------> RESULTED SINGLE SEED TEXT

            rnnSub = `${startingSeeds}${mbNetLabel0}${middleSeeds}${results.sample}`; // ------> RESULTED TEXT WITH MULTIPLE ENTRANCES

            // console.log('Lstm generated: ' + results.sample);

            startingSeeds = entrance[Math.floor(random(0, entrance.length))];
            middleSeeds = middle[Math.floor(random(0, middle.length))];
            // startingSeeds = startingSeeds + mbNetLabel0 + results.sample + 'I can see a ';
            //DIV FOR TEXT
            // myDivGen.html(rnnSub); // just create a div.  

            //VIDEO
            setTimeout(() => myMobileNet.classify(videos[whichVideo], gotResults), 5000); //setTimeout to slow the results. we also added an arow function
            // 3000 is too slowed to be read
            // 5000 was kind of ok

        });

    }
} //end of gotResults

//-------------------------------------------------TEXT DISPLAY

function DoText() {

    // TERMINAL TEXT
    posXtextT = windowWidth - (windowWidth - 100);
    posYtextT = windowHeight - 600;
    w = 325;
    h = 400;
    color = 250;


    textAlign(LEFT);
    textFont("Ubuntu Mono");

    textSize(17);
    fill(color);
    noStroke();
    textLeading(30);


    let sourceText = 'Generating narrative...' +
        '\nElements found: ' +
        mbNetLabel0 +
        '. \nSending to narrator.. ' +
        ' \nAlso found a ' +
        mbNetLabel1 +
        ', I am ' +
        mbNetConfidence +
        ' sure of that...' +
        '\nUpdating narrative...';

    // Speed of the text being generated

    if (textSpeed < sourceText.length) {
        textSpeed += 0.3;
    } else {
        textSpeed = 0;
        textSpeed += 0.3;
    }

    // ------------------------------- END OF TERMINAL TEXT


    //CODE TO SIMULATE WRITING
    // https://creative-coding.decontextualize.com/text-and-type/ 

    var startWriting = 0;
    // var left = startWriting - textSpeed ;
    var right = startWriting + textSpeed;
    text(sourceText.substring(startWriting, right + 1), posXtextT, posYtextT + 100, w, h);


    //this is static text
    
    text(sourceText, posXtextT, posYtextT + 100, w, h);

    // Add cursor
    // fill(color + sin(frameCount * 0.1) * 128);
    // text('_', posXtextT, posYtextT + 100, w, h);

    // SUBTITLE TEXT

    posYtextS = windowHeight - 150;
    line = 50;
    textAlign(CENTER);
    textFont("Verdana");
    textSize(35);
    textLeading(50); // pixels between each line

    fill(0, 0, 0, 5); //shadow for subtitle
    // text('I can tell you that' + rnnSub, line + 2, posYtextS + 2, windowWidth, 300);
    stroke(0);
    fill(255, 255, 64);

    text(rnnSub, line, posYtextS, windowWidth - 100, 300);
}

//------------------------------------------WINDOW SIZE ELEMENTS

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



// -----------------------------HIPERPOESIA


function DoTextHiperpoesia() {

    // TERMINAL TEXT
    posXtextT = windowWidth - (windowWidth - 600);
    posYtextT = windowHeight - 600;
    w = 400;
    h = 400;

    posXtextTM = windowWidth - (windowWidth - 100);
    posYtextTM = windowHeight - 200;
    
    // color = 255,105,180;

    textAlign(LEFT); 
    textFont("Ubuntu Mono");

    textSize(25);
    if (keyIsDown(LEFT_ARROW)){

    fill(255);
    let mario = 'mario guzman (2019)'

    if (textSpeed < mario.length) {
        textSpeed += 0.1;
    } else {
        textSpeed = 0;
        textSpeed += 0.1;
    }

    var startWriting = 0;
    // var left = startWriting - textSpeed ;
    var right = startWriting + textSpeed;
    text(mario.substring(startWriting, right + 1), posXtextTM, posYtextTM + 100, w, h);


} else {
        fill(0);
   
    noStroke();
    textLeading(30);


    let sourceText = 'Generating narrative...' +
        '\nElements found: ' +
        mbNetLabel0 +
        '. \nSending to narrator.. ' +
        ' \nAlso found a ' +
        mbNetLabel1 +
        ', I am ' +
        mbNetConfidence +
        ' sure of that...' +
        '\nUpdating narrative...';

    // Speed of the text being generated

    if (textSpeed < rnnSub.length) {
        textSpeed += 0.3;
    } else {
        textSpeed = 0;
        textSpeed += 0.3;
    }

    // ------------------------------- END OF TERMINAL TEXT


    //CODE TO SIMULATE WRITING
    // https://creative-coding.decontextualize.com/text-and-type/ 

    var startWriting = 0;
    // var left = startWriting - textSpeed ;
    var right = startWriting + textSpeed;
    text(rnnSub.substring(startWriting, right + 1), posXtextT, posYtextT + 100, w, h);
}

    //this is static text
    // text(sourceText, posXtextT, posYtextT + 100, w, h);

    // Add cursor
    // fill(color + sin(frameCount * 0.1) * 128);
    // text('_', posXtextT, posYtextT + 100, w, h);

    // SUBTITLE TEXT

    posYtextS = windowHeight - 150;
    line = 50;
    textAlign(LEFT);
    textFont("Ubuntu Mono");
    textSize(35);
    textLeading(50); // pixels between each line

    fill(0, 0, 0, 5); //shadow for subtitle
    // text('I can tell you that' + rnnSub, line + 2, posYtextS + 2, windowWidth, 300);
    stroke(0);
    fill(255, 255, 64);

    // text(rnnSub, line, posYtextS, windowWidth - 100, 300);
}
