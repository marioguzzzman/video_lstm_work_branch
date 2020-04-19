
//--------------------------------------------------------- MOBILE NET + CRNN MODEL

function gotResults(err, results) {


    console.log('ENTER RESULTS'); // see results 

    if (err) console.log(err); //just tell errors

    if (results) {
        resultsReady = true;

        console.log('Results ready: ' + results); // see results 

        //-----> ML5 ------>  Create a sentence
        mbNetLabel0 = results[0].label;
        mbNetConfidence = results[1].confidence;
        mbNetLabel1 = results[1].label;
        mbNetLabel2 = results[2].label;

        mbNetLabel0 = mbNetLabel0.split(" "); //breaks label into words

        toTranslate(mbNetLabel0[0]); //--------------------------------> Translate main label // only one word from label
        console.log("Translated Label: " + translatedRes);

        // -----> CRNN ------> Generate TEXT content

        let randomTxtLength = Math.floor(random(1, 90)); // esto funciona

        rnn.generate({
            // seed: results[1].label, // this is the label result
            // seed: mbNetLabel0, // this is the hole sentence

            //----------------- SEEDS THAT APPEAR ON TEXT
            seed: `${startingSeeds}${mbNetLabel0} `, // this is the whole sentence that becomes seed
            // length: 100, //length of characters
            length: `${randomTxtLength}`,
            temperature: 0.9 // bring closer to 1 in order to make it closer to seed
        }, (err, results) => {

            console.log("SAMPLE: " + results.sample);

            rnnSub = results.sample; // ------> RESULTED SINGLE SEED TEXT
            console.log("rnnSub: " + rnnSub);

            rnnSub = rnnSub.split(" "); //breaks label into words

           // let randomTxtLength = Math.floor(random(1, 3)); // esto funciona

            // var rnnSub = "This is an amazing sentence.";
            // var rnnSub = str.split(" ");
            for (var i = 0; i < rnnSub.length - 10; i++) {
                rnnSub[i - 1] += " ";
            }
            // console.log(rnnSub);
            //["This ", "is ", "an ", "amazing ", "sentence."]

            rnnSub = rnnSub.join(" + "); // THIS GETS DISPLAYED,but dont know if it reaches the display.



            //-------------------- CREATE REGEX -----------------------

            //NOTE:
            // Seed needs to be the reading of the elements in an array. 
            //After 3 tuns the array starts again
            // https://regex101.com/

            // initRegx = rnnSub; // The String the search in
            // var initRegx = 'hola". "adios.alklk jj ojoj ojoj'; // The String the search in

            // var regex = /(\W+)/; // The regex  
            // var resultsRegx = initRegx.match(regex); // Execute the search

            //dividir en palabras, espacios
            // si hay un punto, a azar dar enter o nada
            // si hay comillas, en tres o 5 paavbras agregar otras comillas.

            regexRnnSub = rnnSub.replace(/.\b[^\saeiou]\b/gm, ' '); //reemplaza consonantes sueltas por x FUNCIONA

            // var regex = initRegx.replace(/\.(\s*)([a-z])/, \.\U \1 \2); //grupo uno mathea culquier cantidad de espacios y el grupo dos matchea letras despues de espacios y las hace uppercase...despues hacer uqe e grupo 1 me lo cambie por enter

            // var regex = initRegx.replace(/\"\s*([Aa-zZ]+\s*){1,4}/, \"\1\"); //si encuentra comilla busca hasta 4 palabras y pon una comilla al final
            // regexRnnSub = rnnSub.replace(/\"\s*([A-Za-z.]+\s*){1,4}/, '" "'); //si encuentra comilla busca hasta 4 palabras y pon una comilla al final

            // hacer que al azar eliga desplegar entre 5 y 10 palabras

            // al azar, elegir entre 1 y 3 cosas y despues cortar


            // var regex = initRegx.replace(/\b[a-z]{4,6}\b/gi, replacer);
            //


            console.log("REGEXSUB: " + regexRnnSub);


            // var words = initRegx.split(regexRnnSub);

            // console.log('Total words: ' + words.length);
            // // console.log('resultRegx: ' + resultsRegx);
            // console.log('words in regx: ' + words);
            // console.log('outputRegx: ' + regexRnnSub);

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
                // regex
                regexRnnSub = `${startingSeeds}${translatedRes}${middleSeeds}${results.sample}`; // ------> LatinAmerican model RESULTED TEXT WITH MULTIPLE ENTRANCES
                // rnnSub = `${startingSeeds}${translatedRes}${middleSeeds}${results.sample}`; // ------> LatinAmerican model RESULTED TEXT WITH MULTIPLE ENTRANCES
            } else {
                regexRnnSub = `${startingSeeds}${mbNetLabel0}${middleSeeds}${results.sample}`; // ------> XIX travel literature model RESULTED TEXT WITH MULTIPLE ENTRANCES
                // rnnSub = `${startingSeeds}${mbNetLabel0}${middleSeeds}${results.sample}`; // ------> XIX travel literature model RESULTED TEXT WITH MULTIPLE ENTRANCES
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

            }

            // console.log('Lstm generated: ' + results.sample);

            startingSeeds = entrance[Math.floor(random(0, entrance.length))]; // select random seed form text
            middleSeeds = middle[Math.floor(random(0, middle.length))]; // select random seed form text
            // startingSeeds = startingSeeds + mbNetLabel0 + results.sample + 'I can see a ';

            //DIV FOR TEXT
            // myDivGen.html(rnnSub); // just create a div.  

            // ------------- VIDEO
            // ------------- clasiffy video with mobile net

            if (OnlyCamera) {
                setTimeout(() => myMobileNet.classify(cameraVideo, gotResults), 5000); //setTimeout to slow the results. we also added an arow function
                // 3000 is too slowed to be read
                // 5000 was kind of ok
            } else {
                setTimeout(() => myMobileNet.classify(videos[whichVideo], gotResults), 5000); //setTimeout to slow the results. we also added an arow function
                // 3000 is too slowed to be read
                // 5000 was kind of ok

            }

        }); // end of generate
    } // end of results
} //end of gotResults


