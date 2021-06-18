#include <SoftwareSerial.h>
#include <Servo.h>

SoftwareSerial mySerial(9, 10);
String textForSMS;

int buzzer = 8;
int gas = 0;
int greenLED = 5;
int yellowLED = 6;
int redLED = 7;
Servo waterTap;

void setup()
{
  mySerial.begin(9600); //initializes s/w serial connection to 9600 bps
  pinMode(buzzer, OUTPUT);
  pinMode(gas, INPUT);
  waterTap.attach(3);
  Serial.begin(9600); //initializes h/w serial connection to 9600 bps (both h/w and s/w needs to be at same bitrate)
}

void loop()
{
  int gasLevel = analogRead(gas);
  Serial.print("Gas level:");
  Serial.println(gasLevel);
  delay(1000);
  if (gasLevel > 600 && gasLevel <= 700) { //warning light(YELLOW) + light buzzer@1000Hz
    tone(buzzer, 1000);
    digitalWrite(redLED, LOW);
    digitalWrite(yellowLED, HIGH);
    digitalWrite(greenLED, LOW);
  } else if (gasLevel > 700) { //alert light(RED) + heavy buzzer@3000Hz + SMS + TAP
    tone(buzzer, 3000);
    digitalWrite(redLED, HIGH);
    digitalWrite(yellowLED, LOW);
    digitalWrite(greenLED, LOW);
    textForSMS = "EMERGENCY!! There's a Fire! Rush home immediately.";
    SendMessage(textForSMS);
    Serial.println("Message sent.");
    waterTap.write(180);
    delay(8000);
  } else { //safe light(GREEN)
    noTone(buzzer);
    digitalWrite(redLED, LOW);
    digitalWrite(yellowLED, LOW);
    digitalWrite(greenLED, HIGH);
    waterTap.write(0);
  }
  delay(1000);
}

void SendMessage(String message)
{
  mySerial.println("AT+CMGF=1"); //Sets the GSM Module in Text Mode
  delay(1000);
  mySerial.println("AT+CMGS=\"+919448061047\"\r");
  delay(1000);
  mySerial.println(message); //content of message
  delay(100);
  mySerial.println((char)26); //ctrl+z ascii value(to send message from serial monitor)
  delay(1000);
}
