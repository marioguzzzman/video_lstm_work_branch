int xPin = A1;
int yPin = A0;
int buttonPin = 2;
int xPosition = 0;
int yPosition = 0;
int buttonState = 0;
void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);

  pinMode(xPin, INPUT);
  pinMode(yPin, INPUT);
  //activate pull-up resistor on the push-button pin
  pinMode(buttonPin, INPUT_PULLUP);

  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
}
void loop() {

  xPosition = analogRead(xPin);
  yPosition = analogRead(yPin);
  buttonState = digitalRead(buttonPin);

  //if (Serial.a/vailable() > 0) {


  //  Serial.write(1)/;

  //  Serial.print("X: ");/
  Serial.write("x");
  Serial.write(xPosition);
  //  Serial.print(" | Y: ");
  Serial.write("y");
  Serial.write(yPosition);
  //  Serial.print(" | Button: ");
  //  Serial.println(buttonState);

  //}/
  delay(100); // add some delay between reads
}
