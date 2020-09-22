// tests go here; this will not be compiled when this package is used as a library

brick.showString("A. S. L.", 1)
let counter = 0;


forever(function () {

    let id = sensors.asl10Sound1.getInfo();


    for (let i = 0; i < id.length; i++) {
        let x = i + 2;
        brick.showNumber(id[i], x);

    }

    /*
    sensors.internal.transactionIIC(1, 8, [0, 0, 0, 0, 0, 0], 4);
    control.waitMicros(60000);
    let text = sensors.internal.readIICID(8);

    brick.showNumber(text.length, 4);
    brick.showString(text, 5);*/





    brick.showNumber(counter, 10);
    counter++;

})




