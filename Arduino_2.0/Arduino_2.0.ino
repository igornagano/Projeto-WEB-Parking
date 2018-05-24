
#include <Ultrasonic.h>
//instalar biblioteca Ultrasonic


int ultra = 0;
boolean statusAnterior = false;
int ir = 0;
Ultrasonic ultrasonic(11,12); // (Porta do Trig,Porta do Echo)
void setup() {
 
 Serial.begin(9600);
}

void loop() {
 boolean ocupado;
 ultra = ultrasonic.Ranging(CM); // CM or INC
 if(ultra <= 15){//menor que 15cm
   ocupado = true;
  }
  else{
    ocupado = false;
  }

  if(ocupado != statusAnterior){
      statusAnterior = ocupado;
      Serial.println(ocupado);   
  }
 delay(200);
}
