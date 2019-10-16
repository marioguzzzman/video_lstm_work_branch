// ------------------------------------------------------ TODO
//CURRENTLY WORKING ON:
//Setting random video play
//Managing different efects for videos

//RECORD TEXT
//ADD WEBCAM
//ADD CODE TO CHANGE BETWEEN WEBCAM AND VIDEO WHEN RECOGNIZING A FACE
//MODULATE SPANISH VOICE
//ADD MENU
//TODO increse sound length
//AGREGAR RELOAD FUNCTION EVERY X SECONDS


//------------------------------------------------------- TESTING 

let offline = false; // disable text to test video
let menu = true;
let videoEffects = false;
let randomFrameEffect = true;

/////////------------------------------------------------- MOBILE NET VIDEO ----------

//ML5
let myMobileNet;

//DIVS
// let myDiv;
// let myDivGen;

/////----------------------------------------------------- TRANSLATION MODULE

var entryLang = 'en';
var exitLang = 'es';
var translatedRes = '';

var translateAPIKey = 'AIzaSyAGvEzCaMeaL_woHEsCo_w85802jZVuYnI';

let translate = true;


//----------------------------------------------------------- VIDEO ----------

//VIDEO
// https://p5js.org/reference/#/p5.MediaElement
// https://creative-coding.decontextualize.com/video/
// let myCamera; //WEB CAM

let playing = false;

let stage = 1;
let videos = [];
let whichVideo = 0;

var vScale = 20; // scale of video

let pixelColor;

//------------------------------------------------------------- TEXT ----------
//To merge all text files
// cat * > merged-file
let writingOutput = true;
let writer;
let linesInPage = 5; // amount of lines in page
let page = []; // text file writen


let resultsReady = false;

// let inputTexts; // does not work

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
let sourceText = ' ';
let textSpeed = 0;


// //--------------Connectors text XIX CENTURY TRAVELER
// let entrance = [ 'I think this is a ', 'Sometimes when I find a ', 'Later on, I whould think of this ', 'Although I don\'t believe that this is a ', 'But, if you wander through the ', 'Last time I saw a ', 'I couldn\'t believe a ', 'I feel I already saw a ', 'Just after a ', 'Before this ', 'After encountering this ', 'Also, this ', 'Later on, the ', 'Above all, this ', ];


// let middle = [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', '. ', ', ', ', but ', ', moreover, ', ', however, ', ', in short,', ', but also, ', ', in addition, ', ', nevertheless, ', ', I rather think of ', ' we can discuss about', ' I doubted my self, but ', ' was there ', ];

// //--------------Connectors text XIX CENTURY TRAVELER

//--------------Connectors text LATIN GAMEON
let entrance = ['Creo que esto es un ', 'A veces, cuando encuentro un ', 'Más tarde, yo pensaría que un ', 'Aunque no crea que esto es un ', 'Pero, si recorres el ', 'La última vez que ví un ', 'No podría crer que un ', 'Siento que ya he visto este ', 'Justo antes de este ', 'Antes de este ', 'Después de reconcer este ', 'También, este ', 'Más tarde, el ', 'Sobre todo, este ', ];

let middle = [' ', ' ', ' ', ' ', ' ', ' ', ' ', '. ', ', ', '. ', ', ', ', pero ', ', sin embargo, ', ', en resumen,', ', pero también, ', ', además, ', ', me gustaría pensar que ', ' podemos discutir acerca de', ' Dudaba de mi, pero ', ' estaba ahí ', ];

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
// 'Google Deutsch', 'Google US English', 'Google UK English Female', 'Google UK English Male', 'Google español', 'Google español de Estados Unidos', 'Google français', 'Google हिन्दी', 'Google Bahasa Indonesia', 'Google italiano', 'Google 日本語', 'Google 한국의', 'Google Nederlands', 'Google polski', 'Google português do Brasil', 'Google русский', 'Google 普通话（中国大陆）', 'Google 粤語（香港', 'Google 國語（臺灣'


//BACKGROUND MUSIC

let sounds = [];
let otherSong;
// let sound1;
// let sound2;
// let sound3;
// let sound4;


//------------------------------------------------------------- WEB SETTINGS ----------


// p5.disableFriendlyErrors = true; // disables FES //to upgrade performance

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- PRE LOAD  ------------------------------------------------
// ------------------------------------------------------------------------------------------------------------


function preload() { // To add things that take time to load

    // -------- DOES NOT WORK INPUT TEXTS

    // inputTexts = loadStrings('subTexts.txt'); // texto en donde leer

    // // inputTexts = getItem('subTexts.txt');
    // // if (inputTexts === null) {
    // //     inputTexts = '';
    // // }

    // inputTexts = inputTexts[Math.floor(random(0, middle.length))];

    // console.log('entrance: ' + entrance);
    // console.log('middle: ' + inputTexts); // not working
    // console.log(inputTexts);

    // -------- DOES NOT WORK INPUT TEXTS


    myMobileNet = ml5.imageClassifier('MobileNet'); // put name of model aT the end

    //CAMERA
    // myCamera = createCapture(VIDEO);  //captures video from webcam

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

    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    pixelDensity(1);

    // console.log('my Mobile: ', myMobileNet) // to test

    //-------------VIDEO 

    //TODO add videocamera test this code
    // CAMERA
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

    //-------------  ML5
    // myMobileNet.classify(myVideo, callback);

    if (offline) {
        // Don't use any model to classify any video
    } else {
        myMobileNet.classify(videos[0], gotResults);
    }

    // DO SOME DIVS
    // myDiv = createDiv('...'); //create only one Div so we can see only one result
    // // myDiv.parent('#wraper');
    // myDivGen = createDiv('...'); //create only one Div so we can see only one result
}

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- DRAW -----------------------------------------------------
// ------------------------------------------------------------------------------------------------------------


function draw() {
    // console.log('Enter draw...');
    // console.log('video: ' + whichVideo);

    background(0, 50); //antes 50
    // background(0);


    if (keyCode == 77) { //letter m
        textSize(18);
        fill(255);
        noStroke();
        textLeading(30);
        textAlign(LEFT);
        let menu = "Menu: \n Render Video =  space bar \n Set random Video = Enter \n Black Screen-random-number = Up arrow \n Talk =s ";
        text(menu, windowWidth / 2, windowHeight / 2 + 100, 350, 400);

    } else {


    }


    // ------------------ Display VIDEOMandar mail a la universidad 

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


        if (writingOutput) {
            writer = createWriter(month() + "/" + day() + "/" + year() + "_" + 'latinPage' + "_" + ".txt"); // texto en donde escribir   
        } else {
            //nothing
        }
        // talk();

        // DoTextHiperpoesia();

        // console.log(rnnSub);
    }


}

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- END DRAW -------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------- BACKGROUND SOUND
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



//--------------------------------------------------------- TALK

function talk() {
    myVoice.setVoice(voice);
    myVoice.speak(rnnSub);

    // SIEMPRE SUENA LA VOZ


    if (translate) {
        myVoice.setRate(.73); // speed of speach
        myVoice.setPitch(.8);
        myVoice.setVolume(.4);
    } else {
        voice = 'Google UK English Male';
        myVoice.setRate(.8); // speed of speach
        myVoice.setPitch(.9);
        myVoice.setVolume(.4);
    }

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


//--------------------------------------------------------- RENDER VIDEOS

function renderVideos() {

    // videos[0].playTheVideo(); //estaba comentado

    //PLAY VIDEOS IN RANDOM
    if (stage === 1) {

        console.log('Stage 1');

        if (frameCount % 50 || keyCode === ENTER) {
            console.log('pressing enter');

            //pick random video from array


            let azar = Math.floor(random(0, videos.length)); // esto funciona
            whichVideo = azar; //for(random(videos.length)); //esto funciona

            // whichVideo = (whichVideo+1)%videos.length;//floor(random(vid // esto es la pagina

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

    if (videoEffects) {

        // PIXELS // THIS WORKS
        // videos[whichVideo].loadPixels();

        // for (var y = 0; y < videos[whichVideo].height; y++) {

        //     for (var x = 0; x < videos[whichVideo].width; x++) {

        //         var index = (videos[whichVideo].width - x + 1 + (y * videos[whichVideo].width)) * 4;

        //         var r = videos[whichVideo].pixels[index + 0];
        //         var g = videos[whichVideo].pixels[index + 1];
        //         var b = videos[whichVideo].pixels[index + 2];
        //         var bright = (r + g + b) / 3;
        //         var w = map(bright, 0, 255, 0, vScale);

        //         noStroke();
        //         fill(r, g, b);

        //         ///----------------- XIX century traveler

        //         // rectMode(CENTER); // not use, scrambles de visuals
        //         rect(x * vScale, y * vScale, w, w);
        //         // var rad = 100;

        //         ///----------------- XIX century traveler -- END


        //         ///----------------- just hiperpoesia
        //         // if (keyIsDown(UP_ARROW)){
        //         //     ellipse(x * vScale, y * vScale, w, w);

        //         // } else 
        //         // ellipse(x * vScale, y * vScale, mouseX, mouseX);

        //         ///----------------- just hiperpoesia -- END
        //     }
        // }

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


    } else {

        if (randomFrameEffect) {
            randomFrame();
        }

        // ----->>>>>>> VIDEO HERE! WITHOUT EFFECTS
        image(videos[whichVideo], 0, 0, width, height); //size and position of video // COMENTED FOR PIXELS

    }



}

//--------------------------------------------------------- VIDEO FUNCTIONS

// plays or pauses the video depending on current state

function randomFrame() {

    let playing = false;
    // -------------------FIX THIS TO RUN RANDOM VIDEOS
    // Plays random position based in framecount  

    if (!playing) {
        let timeToChangeFrame = Math.floor(random(videos[whichVideo].duration(), videos[whichVideo].duration() * 20)); // esto funciona //for(random(videos.length));

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


    if (!randomFrameEffect){
        console.log('looping video');

        videos[whichVideo].loop(); // video never goes to videoOver because it is looping and never ends.
        // videos[whichVideo].play();
        // videos[whichVideo].onended(videoOver); //when video ends, call videoOver to return to first screen
    } else {
        console.log('playing video with random Frame');


        // videos[whichVideo].time(random() * videos[whichVideo].duration() - 2);
       
        videos[whichVideo].loop().time(5); // time sets a place for the video to be played. it is expressed in seconds


    }


}

function videoOver() {
    console.log("Pausing video now VIDEO OVER / Stage 1");
    // videos[whichVideo].stop();// esto estaba comentado
    //videos[whichVideo].rewind();
    // videos[whichVideo].hide(); // esto estaba comentado
    stage = 1;
}


//--------------------------------------------------------- SOUND FOR VIDEO

function videoSound() {
    videos[whichVideo].volume(0); // antes 0
}

//--------------------------------------------------------- TRANSLATION FUNCIONS

function toTranslate(wordToTranslate) {
    var full_translation = wordToTranslate;

    // Translate the result to another language using Google translate API
    var url = `https://www.googleapis.com/language/translate/v2/?key=${translateAPIKey}&target=${exitLang}&source=${entryLang}&q=${full_translation}`;

    loadJSON(url, gotTranslation);
}

function gotTranslation(result) {
    if (result.data.translations) {
        translatedRes = result.data.translations[0].translatedText;
    }
}


//--------------------------------------------------------- MOBILE NET + CRNN MODEL

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


        toTranslate(mbNetLabel0); //--------------------------------> Translate main label 
        console.log("see label: " + translatedRes);

        // myDiv.html(mbNetLabel0); //Put sentence in DIV

        // -----> CRNN ------> Generate TEXT content

        rnn.generate({

            // seed: results[1].label, // this is the label result
            // seed: mbNetLabel0, // this is the hole sentence

            //----------------- SEEDS THAT APPEAR ON TEXT

            seed: `${startingSeeds}${mbNetLabel0} `, // this is the whole sentence that becomes seed
            // length: 90, //length of characters
            length: 100,
            temperature: 0.9 // bring closer to 1 in order to make it closer to seed


        }, (err, results) => {

            console.log("rnnSub: " + rnnSub);

            // rnnSub = results.sample; // ------> RESULTED SINGLE SEED TEXT

            //-------------------- CREATE CONTEXT -----------------------

            //NOTE:
            // Seed needs to be the reading of the elements in an array. 
            //After 3 tuns the array starts again

            var initRegx = rnnSub; // The String the search in
            // var regex = /(\W+)/; // The regex  
            // var resultsRegx = initRegx.match(regex); // Execute the search
            var regex = initRegx.replace(/\b[a-z]{4,6}\b/gi, replacer);

            var words = initRegx.split(regex);
            console.log('Total words: ' + words.length);
            // console.log('resultRegx: ' + resultsRegx);
            console.log('words in regx: ' + words);
            console.log('outputRegx: ' + regex);

            // let savedContext = 3; // amount of lines in page
            // let savedContext = []; // text file writen

            // context.push(results.sample + "\n");
            // console.log('lineas x pagina:' + savedContext.length);

            // if (savedContext.length == savedContext) {
            //     writer.print(page);
            //     writer.close();
            //     savedContext.length = 0; // to clear array
            //     savedContext = 0;
            // }

            //-------------------- CREATE CONTEXT -----------------------


            //--------------------INSERT TRANSLATE -----------------------

            if (translate) {
                rnnSub = `${startingSeeds}${translatedRes}${middleSeeds}${results.sample}`; // ------> LatinAmerican model RESULTED TEXT WITH MULTIPLE ENTRANCES
            } else {
                rnnSub = `${startingSeeds}${mbNetLabel0}${middleSeeds}${results.sample}`; // ------> XIX travel literature model RESULTED TEXT WITH MULTIPLE ENTRANCES
            }


            //-------------------- WRITE INTO PAGE -----------------------

            if (writingOutput) {
                // writer.write(results.sample + "\n"); // writes to print just one text

                page.push(results.sample + "\n");
                // console.log('lineas x pagina:' + page.length);

                if (page.length == linesInPage) {
                    writer.print(page);
                    writer.close();
                    page.length = 0; // to clear array
                    linesInPage = 0;
                }

            } else {
                // do nothing 
            }


            // console.log('Lstm generated: ' + results.sample);

            startingSeeds = entrance[Math.floor(random(0, entrance.length))]; // select random seed form text
            middleSeeds = middle[Math.floor(random(0, middle.length))]; // select random seed form text
            // startingSeeds = startingSeeds + mbNetLabel0 + results.sample + 'I can see a ';

            //DIV FOR TEXT
            // myDivGen.html(rnnSub); // just create a div.  

            // ------------- VIDEO
            // ------------- clasiffy video with mobile net
            setTimeout(() => myMobileNet.classify(videos[whichVideo], gotResults), 5000); //setTimeout to slow the results. we also added an arow function
            // 3000 is too slowed to be read
            // 5000 was kind of ok
        }); // end of generate
    } // end of results
} //end of gotResults

//--------------------------------------------------------- REPLACER ARTIFICAL EDITOR

function replacer(match) {
    var len = match.length;
    // Four letter words become uppercase
    if (len == 1) {
        //   return match.toUpperCase();
        // Five letter words become "five"
        return "five";
    } else if (len == 5) {
        return "five";
        // Six letter words turn into today's date
    } else if (len == 6) {
        return Date();
    }

    console.log('match: ' + match);
}




//--------------------------------------------------------- TEXT DISPLAY

function DoText() {
    // TERMINAL TEXT
    let posXtextT = windowWidth - (windowWidth - 100);
    let posYtextT = windowHeight - 600;
    let w = 325;
    let h = 400;
    let color = 250;

    textAlign(LEFT);
    if (offline) {
        textFont("Arial");
    } else {
        textFont("Ubuntu Mono");
    }

    textSize(17);
    fill(color);
    noStroke();
    textLeading(30);

    if (translate) {
        sourceText = 'Generando narrativa...' +
            '\nElemento encontrado: ' +
            translatedRes + //latinamerican model
            '. \nEnviando a narrador.. ' +
            // ' \nTambién he encontrado un ' +
            // mbNetLabel1 +
            '\nCreo estar ' +
            mbNetConfidence +
            ' segure...' +
            '\nActualizando narrativa...';
    } else {
        sourceText = 'Generating narrative...' +
            '\nElements found: ' +
            mbNetLabel0 + // XIX travel model
            '. \nSending to narrator.. ' +
            ' \nAlso found a ' +
            mbNetLabel1 +
            ', I am ' +
            mbNetConfidence +
            ' sure of that...' +
            '\nUpdating narrative...';
    }

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

    // text(sourceText, posXtextT, posYtextT + 100, w, h);

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
    if (keyIsDown(LEFT_ARROW)) {

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