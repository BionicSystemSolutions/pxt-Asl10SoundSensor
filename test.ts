// tests go here; this will not be compiled when this package is used as a library

brick.showString("A. S. L.", 1)
let counter = 0;


forever(function () {

    // test om sensorere overhovedet er aktive. 
    // se om andr ehar lykkedes at implementere ne i2c sensor i makecode.




    //let id = sensors.asl10Sound1.getInfo();



    sensors.internal.transactionIIC(1, 8, [0, 0, 0, 0, 0, 0], 6);
    
    //let x = sensors.internal.getActiveSensors();
    //


    //sensors.internal.iicsensor.transaction(8, [0, 0, 0, 0, 0, 0], 6);
    control.waitMicros(100000);
    let buf = sensors.internal.getIICBytes(1, 6);

    let text = sensors.internal.bufferToString(buf);

    if (!text.compare("")) {
        brick.showString("Ingen tekst!", 4);
    }

    brick.showString(text, 3);


    /*
    sensors.internal.transactionIIC(1, 8, [0, 0, 0, 0, 0, 0], 4);
    control.waitMicros(60000);
    let text = sensors.internal.readIICID(8);

    brick.showNumber(text.length, 4);
    brick.showString(text, 5);*/





    brick.showNumber(counter, 10);
    counter++;

})




