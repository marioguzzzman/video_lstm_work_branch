// ------------------------------------------------------ TODO
//CURRENTLY WORKING ON:
//Setting random video play
//Managing different efects for videos

// AUDIOS DOES NOT WORK
//ADD WEBCAM MULTIPLE
//ADD CODE TO CHANGE BETWEEN WEBCAM AND VIDEO WHEN RECOGNIZING A FACE
//MODULATE SPANISH VOICE // DOES NOT WORK NOW
//ADD MENU
//TODO increse sound length


//------------------------------------------------------- TESTING 

let offline = false; // disable text to test video
let menu = true;


let meta_gameOn = true;
let meta_experment = false;

// //SETTING WORKING FOR EXPERIMENTS
//need to activate both videos and camera code
let videoEffects = true;
let randomFrameEffect = true;
let playSimpleVideo = false; //random videos // currently not working, do not know why, probably come changes in for loop // FIX // PROBLEM WITH VOLUME OR SOMETHING // currently appears as defacult is one video is false
let oneVideo = true; // efects wonk work when false // just 1.mp4

// // let bothCameraAndVideo = false;

let cameraVideo = false; //estaba true
let OnlyCamera = false; // GETS ERROR FROM GENERATOR
let cameraEffect = false; // estaba true


// SETTING WORKING FOR GAME ON
// let videoEffects = true;
// let randomFrameEffect = true;
// let playSimpleVideo = false; //random videos
// let oneVideo = true; // efects wonk work when false // just 1.mp4

// let cameraVideo = true; //estaba true
// let OnlyCamera = false; // GETS ERROR FROM GENERATOR // maybe because generator ins embeded into renderVIdeos()
// let cameraEffect = true; // estaba true


/////////------------------------------------------------- MOBILE NET VIDEO ----------

//ML5
let myMobileNet;

/////----------------------------------------------------- TRANSLATION MODULE

var entryLang = 'en';
var exitLang = 'es';
var translatedRes = '';

var translateAPIKey = 'AIzaSyAGvEzCaMeaL_woHEsCo_w85802jZVuYnI';
// 
let translate = true;

//----------------------------------------------------------- CAMERA --------

// https://ml5js.github.io/ml5-examples/javascript/ImageClassification_Video/ // REVIEW
//ls -ltrh /dev/video* // check cameras available in Linux

let myCamera; //WEB CAM

// https://github.com/ITPNYU/ICM-2015/blob/master/09_video_sound/02_capture/13_get_sources/sketch.js // get cameras available
// Seriously.js
// https://www.youtube.com/watch?v=jdKep6jo7b0&list=PLRqwX-V7Uu6aKKsDHZdDvN6oCJ2hRY_Ig&index=8

// EFFECTS PIXEL MIRROR
// https://www.youtube.com/watch?v=rNqaw8LT2ZU&list=PLRqwX-V7Uu6aKKsDHZdDvN6oCJ2hRY_Ig&index=4

//PAINTING
// https://www.youtube.com/watch?v=0V3uYA1hafk&list=PLRqwX-V7Uu6aKKsDHZdDvN6oCJ2hRY_Ig&index=6

//SCAN
// https://www.youtube.com/watch?v=YqVbuMPIRwY&list=PLRqwX-V7Uu6aKKsDHZdDvN6oCJ2hRY_Ig&index=7

var capture;
var options;

let cameraON = false;
var showCamera = 0;

let videoON = false;
let showVideo = 0;


//----------------------------------------------------------- VIDEO ----------

//VIDEO
// https://p5js.org/reference/#/p5.MediaElement
// https://creative-coding.decontextualize.com/video/

let playing = false;

let stage = 1;
let videos = [];
let whichVideo = 0;
let amountVideos = 3;

var vScale = 1; // scale of video // chech set up to adjust vscale acording to tipe of video effect  //Adjust video size // actually increses the accuracy of the prediction model


let pixelColor;

//------------------------------------------------------------- TEXT ----------
//To merge all text files
// cat * > merged-file
let writingOutput = false;
let writer;
let linesInPage = 5; // amount of lines in page
let page = []; // text file writen


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
let regexRnnSub = '';
let initRegx = '';

//parameters for "terminal" text
let sourceText = ' ';
let textSpeed = 0;


//TEXTS 
let textToLoad;
let txt;
var totalSentences;
let count = 0;

let terminal = false;
var showTerminal = 0;

let subtitle = false;
let showSubtitle = 0;

// //--------------Connectors text XIX CENTURY TRAVELER
// let entrance = [ 'I think this is a ', 'Sometimes when I find a ', 'Later on, I whould think of this ', 'Although I don\'t believe that this is a ', 'But, if you wander through the ', 'Last time I saw a ', 'I couldn\'t believe a ', 'I feel I already saw a ', 'Just after a ', 'Before this ', 'After encountering this ', 'Also, this ', 'Later on, the ', 'Above all, this ', ];


// let middle = [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', '. ', ', ', ', but ', ', moreover, ', ', however, ', ', in short,', ', but also, ', ', in addition, ', ', nevertheless, ', ', I rather think of ', ' we can discuss about', ' I doubted my self, but ', ' was there ', ];

// //--------------Connectors text XIX CENTURY TRAVELER

//--------------Connectors text LATIN GAMEON
let entrance = ['Creo que esto es un ', 'A veces, cuando encuentro un ', 'Más tarde, yo pensaría que un ', 'Aunque no crea que esto es un ', 'Pero, si recorres el ', 'La última vez que ví un ', 'No podría crer que un ', 'Siento que ya he visto este ', 'Justo antes de este ', 'Antes de este ', 'Después de reconcer este ', 'También, este ', 'Más tarde, el ', 'Sobre todo, este ', ];

let middle = [' ', ' ', ' ', ' ', ' ', ' ', ' ', '. ', ', ', '. ', ', ', ', pero ', ', sin embargo, ', ', en resumen,', ', pero también, ', ', además, ', ', me gustaría pensar que ', ' podemos discutir acerca de', ' dudaba de mi, pero ', ' estaba ahí ', ];

//--------------------------TEXT SEEDS ----------
let startingSeeds = entrance[0];
let middleSeeds = middle[0];

//----------------------------------------------------------------  SOUND ----------

// http://ability.nyu.edu/p5.js-speech/ 
// https://generative.fm/record
var myVoice = new p5.Speech(); // new P5.Speech object // OFFLINE 
// let voice = 'Google UK English Male';
let voice = 'Google español de Estados Unidos';

//List of voices
// 'Google Deutsch', 'Google US English', 'Google UK English Female', 'Google UK English Male', 'Google español', 'Google español de Estados Unidos', 'Google français', 'Google हिन्दी', 'Google Bahasa Indonesia', 'Google italiano', 'Google 日本語', 'Google 한국의', 'Google Nederlands', 'Google polski', 'Google português do Brasil', 'Google русский', 'Google 普通话（中国大陆）', 'Google 粤語（香港', 'Google 國語（臺灣'


//BACKGROUND MUSIC
let sounds = [];
let otherSong;

//------------------------------------------------------------- WEB SETTINGS ----------


p5.disableFriendlyErrors = true; // disables FES //to upgrade performance

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- PRE LOAD  ------------------------------------------------
// ------------------------------------------------------------------------------------------------------------


function preload() { // To add things that take time to load


    textToLoad = loadStrings('subTexts.txt', txtLoaded);


    myMobileNet = ml5.imageClassifier('MobileNet'); // put name of model aT the end

    //CAMERAS
    if (OnlyCamera || cameraVideo) {
        myCamera = createCapture(VIDEO); //captures video from webcam
        console.log('CAMERA ON');
    }

    // VIDEOS
    if (oneVideo) {
        videos[whichVideo] = createVideo("videos/1.mp4"); //captures video from videofile
        console.log('ONE VIDEO ON');
    } else {
        console.log('MULTI VIDEO ON');

        for (i = 0; i < amountVideos; i++) {
            videos[i] = createVideo(`videos/random_narrative_videos/${i + 1}.mp4`); //captures video from videofile
        }
        console.log('x Videos: ' + videos.length);

    }

    //LOAD MODEL LSTM
    if (translate) {
        rnn = ml5.charRNN("/test-lstm/model_8_latin/"); // lATIN model for GameOn
    } else {
        rnn = ml5.charRNN("/test-lstm/model_124/"); // XIX century traveler
    }

    //SOUND
    // createConvolver('background_sound/drones.wav', soundReady);

    sounds[1] = loadSound('background_sounds/drones.wav');
    sounds[2] = loadSound('background_sounds/seven.wav');
    sounds[0] = loadSound('background_sounds/pulse-modulation.wav');
    // sounds[3] = loadSound('background_sound/eyes.wav');

}

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- SET UP ---------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

function setup() {
    noCursor();

    // createCanvas(windowWidth, windowHeight);
    //createCanvas(1920, 1080); // orginal
    createCanvas(1200, 728); // for ELO magazine vol. 4


    frameRate(30);
    pixelDensity(1);

    //-------------CAMERA



    // console.log('my Mobile: ', myMobileNet) // to test

    //-------------VIDEO 

    if (videoEffects) {
        vScale = 15;
    } else {
        vScale = 1;
    }

    if (OnlyCamera || cameraVideo) {
        v_Cam_Scale = 1;

        // myCamera.size(width / v_Cam_Scale, height / v_Cam_Scale);
        myCamera.size(1920 / v_Cam_Scale, 1080 / v_Cam_Scale);

        myCamera.hide();
    }

    if (oneVideo) {
        videos[whichVideo].size(width / vScale, height / vScale);
        videos[whichVideo].hide();
    } else if (playSimpleVideo) {
        for (i = 0; i < videos.length; i++) {
            videos[i].size(width / vScale, height / vScale);
            videos[i].hide();
        }
    }


    //-------------  ML5
    // myMobileNet.classify(myVideo, callback);

    if (offline) {
        // Don't use any model to classify any video
    } else {

        // if (OnlyCamera || cameraVideo) { // just in case this is a problem
        //     myMobileNet.classify(myCamera, gotResultsCam);
        // }

        myMobileNet.classify(videos[0], gotResults);
    }
}


// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- DRAW -----------------------------------------------------
// ------------------------------------------------------------------------------------------------------------


function draw() {


    background(0, 50); //antes 50
    menuComands();

    // ENABLE AUDIOCONTEXT REQUIREMENT FOR BROWSER
    if (getAudioContext().state !== 'running') {
        text('click to start audio', width / 2, height / 2);
    }

    // cameraON = true;
    // showCamera++;

    // console.log('camera: ' + showCamera++);

    // if (cameraON && !videoON) {
    //     renderCamera();
    //     // renderVideos();
    //     // myCamera.hide();

    //     turnOffCamera();


    //     showCamera++;
    //     console.log('render camera');

    //     // terminal = false;

    
    //     if (showCamera == 200) {
    //         cameraON = false;
    //         videoON = true;
    //         console.log('render camera is 200');


    //     }
    // }



    // if (videoON) {
    //     renderVideos();
    //     // renderCamera();

    //     showVideo++;
    //     console.log('render video');

    // }

    // if (showVideo == 200) {
    //     console.log('turn of camera');

    //     turnOffCamera();

    //     cameraON = true;
    //     videoON = false;

    //     videoON = 0;
    //     showCamera = 0;
    // }


    // switchCameraAndVIdeo();


    // if (OnlyCamera) {
    // renderCamera();
    // } else {
    renderVideos();
    // }

    // showCamera++;
    // console.log('camera: ' + showCamera++);
// 
        // if (showCamera == 700) {
            // renderCamera(); // FUNCIONA PERO SIN TEXTO

            // cameraON = false;
            // videoON = true;
            // console.log('render camera is 200');


        // }


    // extraText();


    // ------------------ Display TEXT from Model
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

    }

}

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- END DRAW -------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

//------------------------------------------WINDOW SIZE ELEMENTS

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// ------------------------------- MENU

function menuComands() {
    if (keyCode == 77) { //letter m
        textSize(18);
        fill(255);
        noStroke();
        textLeading(30);
        textAlign(LEFT);
        let menu = "Menu: \n Render Video =  space bar \n Set random Video = Enter \n Black Screen-random-number = Up arrow \n Talk =s ";
        text(menu, windowWidth / 2, windowHeight / 2 + 100, 350, 400);
    }
}



// ---------------------------------------


// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- INSTRUCTIONS ---------------------------------------------
// ------------------------------------------------------------------------------------------------------------


// GENERAL WORKING AND TESTING BRANCH 

//Instructions to run
// https://ml5js.org/reference/api-ImageClassifier/
// In terminal enter the folder in which the code is hosted
// python3 -m http.server
// http://localhost:8000/  //works best with this. Does not work with Firefox

//You have to click on the screen to be able to hear the background sounds