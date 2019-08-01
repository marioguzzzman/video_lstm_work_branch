// in this sketch the goal is to use a p5.Graphic object as mask.
var circleMask;
var contentBack;

function setup() {
  createCanvas(500, 400);
  // create a p5.Graphic acting as mask.
  circleMask = createGraphics(400,400);
  img = createImage(400,400);
  
  // create a p5.Graphics containing the image that will be masked
  contentBack = createGraphics(400,400);
  // draw some stuff.
  contentBack.background(25,0,0);//color
  contentBack.stroke(25, 204, 0);//colo3
	
  for(var i = 0; i < width + 10; i+=10){
    contentBack.strokeWeight(i/10)//lines
    contentBack.line(i,0,i,100);//lines
  }
}

function draw() {
  background(220);

  //mask
  circleMask.background(0);//background of circle
  circleMask.fill(255); //fill of cicle
  circleMask.ellipse(mouseX,mouseY,200);
  var maskedImage = circleMaskMask(contentBack, circleMask);
  image(maskedImage, 0, 0);
}

function circleMaskMask(_content,_mask){
  //Create the mask as image
  var img = createImage(_mask.width,_mask.height);
  img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
  //load pixels
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    // 0 red, 1 green, 2 blue, 3 alpha
    // Assuming that the mask image is in grayscale,
    // the red channel is used for the alpha mask.
    // the color is set to black (rgb => 0) and the
    // alpha is set according to the pixel brightness.
    var v = img.pixels[i];
    img.pixels[i] = 0;
    img.pixels[i+1] = 0;
    img.pixels[i+2] = 0;
    img.pixels[i+3] = v;
  }
  img.updatePixels();
  
  //convert _content from circleMask to image
  var contentImg = createImage(_content.width,_content.height);
  contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
  // create the mask
  contentImg.mask(img)
  // return the masked image
  return contentImg;
}