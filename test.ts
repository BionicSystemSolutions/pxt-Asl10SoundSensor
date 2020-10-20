// tests go here; this will not be compiled when this package is used as a library

brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {

    motors.largeBC.tank(-75, 75);


    /*let i2cID1 = sensors.internal.readIICID(0);
    brick.showString(i2cID1, 11);
    let i2cID2 = sensors.internal.readIICID(2);
    brick.showString(i2cID2, 12);*/

})
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {

    motors.largeBC.tank(0, 0);


    /*let i2cID1 = sensors.internal.readIICID(0);
    brick.showString(i2cID1, 11);
    let i2cID2 = sensors.internal.readIICID(2);
    brick.showString(i2cID2, 12);*/

})

brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {

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


    /*
        let i2cID1 = sensors.internal.readIICID(1);
    
        let i2cID2 = sensors.internal.readIICID(2);
    
        let data = sensors.asl10Sound2.id();
    
        let data2 = sensors.infrared1.id();
    
        brick.showString(i2cID1, 8);
    
        brick.showString(i2cID2, 9)
    
        brick.showNumber(data, 10);
        brick.showNumber(data2, 11);
    
    */



})


let counter = 0;
let threshold = 1;

forever(function () {



    let angle = sensors.asl10Sound2.getAngle();



    if (angle > 3) { angle = 3; }
    if (angle < -3) { angle = -3; }

    let speed = angle * 25;



    //if (counter % 10 == 0) {
    if (angle > threshold) {
        motors.largeBC.tank(-speed, speed);
    } else if (angle < -threshold) {
        motors.largeBC.tank(-speed, speed);
    } else {
        motors.largeBC.tank(0, 0);
    }
    //} else if (counter % 10 == 4) {
    //   motors.largeBC.tank(0, 0);
    // }


    brick.showValue("Angle", angle, 4);

    brick.showNumber(counter, 12);
    counter++;

})




