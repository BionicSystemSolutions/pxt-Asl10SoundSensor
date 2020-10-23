// tests go here; this will not be compiled when this package is used as a library

// Kan køre motorene i hver sin retning og stoppes med knapperne. 
// Er blevet brugt til at teste forskellige ting.

/*
brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.tank(75, -75);
})
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.tank(0, 0);
})
brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {

    motors.largeBC.tank(-75, 75);

    // dette er brugt til få informationer om aktive sensorer. 
    // Så skal nok gemmes indtil at sensoren bliver registreret med det samme.
    
        brick.setStatusLight(StatusLight.Green);
    
        let x = sensors.internal.getActiveSensors();
    
        let sum = 0;
        for (let i = 0; i < x.length; i++) {
            sum++;
        }
    
        brick.showValue("Aktive sensorer", sum, 6)
    
        //sensors.asl10Sound2.poke(); Kan ikke aktivere soundsensor selvom den kan aktivere andre slags.
        //sensors.infrared1.poke(); kan kun bruges til at aktivere infrarød sensoren
        if (sum == 1) {
            let var1 = x.get(0).id();
            brick.showValue("aktiv sensor", var1, 7)
            let portAktiv = x.get(0).port();
            let i2cID1 = sensors.internal.readIICID(portAktiv);
            brick.showValue("port", portAktiv, 8);
            brick.showString(i2cID1, 9);
    
            sensors.internal.setIICMode(0, 0, 0)
    
        } else if (sum == 2) {
            let var1 = x.get(0).id();
            brick.showValue("aktiv sensor", var1, 7)
            let var2 = x.get(0).id();
            brick.showValue("aktiv sensor", var2, 8)
        }
        
})
*/

// counter bruges ikke længere.
let counter = 0;

let thresholdRight = 0.8; //  1 for biptone // 0.7 for tale er okay
let thresholdLeft = 0.5;

let speed = 0;
let angle = 0;

forever(function () {

    // programmet kører cirka 30 gange i sekundet. 
    angle = sensors.asl10Sound2.angles();

    // forhindrer at den kører alt for hurtigt. Maks hastighed er her 75%. Angle kan sættes til en maks på 4, så vil den kunne nå 100% 
    if (angle > 3) { angle = 3; }
    if (angle < -3) { angle = -3; }
    speed = angle * 25;

    // Sætter en minimumsgrænse for, hvad robotten skal reagere på
    // bemærk at der er forskellige thresholds for rotation mod højre end venstre
    // Skal testes om de også skal være forskellig med en sensor, vi ved virker.
    // thresholds'ne er optimeret til at virke med tale. Kan muligvis være lavere.

/*
    if (angle > thresholdRight) {
        motors.largeBC.tank(-speed, speed);
    } else if (angle < -thresholdLeft) { // thresholdL
        motors.largeBC.tank(-speed, speed);
    } else {
        motors.stopAll();
    }
*/


    brick.showValue("Angle", angle, 4);

    brick.showValue("Battery", brick.batteryLevel(), 11)
    brick.showNumber(counter, 12);
    counter++;
})




