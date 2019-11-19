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