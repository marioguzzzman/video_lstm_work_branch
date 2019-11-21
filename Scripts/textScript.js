// --------------------------------------- DISPLAY VARIOUS TEXTS IN THE CANVAS

function randomize() {
    num = Math.floor(random(150, 300));

}

function DoText() {

    //subtitute for millis

    terminal = true;
    showTerminal++;

    console.log('Counting: ' + count);

    if (terminal && !subtitle) {
        doTerminal();
        showTerminal++;
        // terminal = false;
    }

    if (showTerminal == 400) { // maybe poner el final del texto producido.
        terminal = false;
        subtitle = true;
    }

    if (subtitle) {
        DoSubtitle();
        showSubtitle++;
    }

    if (showSubtitle == 1000) { // maybe poner el final del texto producido.
        terminal = true;
        subtitle = false;

        showSubtitle = 0;
        showTerminal = 0;
    }

    // TERMINAL TEXT
    // text(sourceText.substring(startWriting, right + 1), posXtextT, posYtextT + 100, w, h);
    // // SUBTITLE TEXT
    // DoSubtitle();

}

function doTerminal() {

    let posXtextT = windowWidth - (windowWidth - 100);
    let posYtextT = windowHeight - 600;
    let w = 500;
    let h = 400;
    let color = 255;

    textAlign(LEFT);
    if (offline) {
        textFont("Arial");
    } else {
        textFont("Ubuntu Mono");
    }

    textSize(33);
    fill(color);
    noStroke();
    textLeading(30);


    if (offline) {
        sourceText = 'Generando narrativa...' +
            '\nElemento encontrado: ' +
            '. \nEnviando a narrador.. ' +
            // ' \nTambién he encontrado un ' +
            // mbNetLabel1 +
            '\nCreo estar ' +
            ' segure...' +
            '\nActualizando narrativa...';
    } else {

        //MAKE THIS SENTENCE MORE VARIABLE

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
    }

    var startWriting = 0;
    // var left = startWriting - textSpeed ;
    var right = startWriting + textSpeed;

    // Speed of the text being generated

    if (textSpeed < sourceText.length) {
        textSpeed += 0.3;
    } else {
        textSpeed = 0;
        textSpeed += 0.3;
    }

    text(sourceText.substring(startWriting, right + 1), posXtextT, posYtextT + 100, w, h);


    // ------------------------------- END OF TERMINAL TEXT

    //CODE TO SIMULATE WRITING
    // https://creative-coding.decontextualize.com/text-and-type/ 

    // var startWriting = 0;
    // // var left = startWriting - textSpeed ;
    // var right = startWriting + textSpeed;

    // var count = 0;

    // var random = Math.floor(random(150, 300));
}

function DoSubtitle() {
    // SUBTITLE TEXT

    posYtextS = windowHeight - 150;
    line = 70;
    textAlign(CENTER);
    textFont("Verdana");
    textSize(52);
    textLeading(50); // pixels between each line

    
    // fill(0, 70);
    // rect(posYtextS, windowWidth - 140, 300);

    fill(0, 0, 0, 5); //shadow for subtitle
    // text('I can tell you that' + rnnSub, line + 2, posYtextS + 2, windowWidth, 300);
    stroke(0);
    // fill(255, 255, 64);
    fill(255, 255, 120);



    text(regexRnnSub, line, posYtextS, windowWidth - 140, 300);

    // text(rnnSub, line, posYtextS, windowWidth - 100, 300);
}

// ----------------------------ADDS EXTERNAL TEXT

function extraText() {
    // console.log('texto importado:' + textToLoad );
    // TERMINAL TEXT
    let posXtextT = windowWidth - (windowWidth - 100);
    let posYtextT = windowHeight - 700;
    let w = 450;
    let h = 600;
    // let color = '228, 0, 124';

    textAlign(LEFT);

    textFont("Arial");
    textFont('Staatliches');
    textFont('Press Start 2P');

    textSize(60);
    fill(228, 0, 124); // rosa mexicano
    noStroke();
    textLeading(45);

    var txt = join(textToLoad, '\n');

    var sentenceDelim = '.:;?!';
    var sentences = splitTokens(txt, sentenceDelim); //gives me array
    totalSentences = sentences.length;

    // console.log('SENTENCES ' + txt);
    // console.log('SENTENCES ' + totalSentences);

    // var messageRegex = message.replace(/\,/gi, ',\n'); //replace , for enter

    // Speed of the text being generated
    if (textSpeed < totalSentences * 4) {
        textSpeed += 0.2;
    } else {
        textSpeed = 0;
        textSpeed += 0.3;
    }

    var startWriting = 0;
    var right = startWriting + textSpeed;
    // text(sentences[1].substring(startWriting, right + 1), posXtextT, posYtextT + 100, w, h);

    // text(sentences[1], posXtextT, posYtextT + 100, w, h);


    if (keyPressed) {
        text(sentences[count].substring(startWriting, right + 1), posXtextT, posYtextT + 100, w, h);
        console.log('COUNT LINES' + count);
    }
}


function keyPressed() { // make extratext advance by pressing keys
    count++;
    if (count == totalSentences) {
        count = 0;
    }
}


//--------------------------------------------------------- TEXT DISPLAY

function txtLoaded(textToLoad) {

    console.log('TEXT READY');
    // Here we pass in a line break to retain formatting
    var txt = join(textToLoad, '\n');

    // var sentenceDelim = '.:;?!';
    // var sentences = splitTokens(txt, sentenceDelim); //gives me 
    // var totalSentences = sentences.length;

    // console.log('SENTENCES ' + txt);
    // console.log('SENTENCES ' + totalSentences);


    return txt;
}

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