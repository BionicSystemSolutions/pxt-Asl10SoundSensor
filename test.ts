forever(function () {

    aslsensor.asl10Sound4.update();

    // aslsensor.asl10Sound2.driveTank(aslsensor.MotorEnumASL.BC)

    let x = aslsensor.asl10Sound4.angle();
    let y = aslsensor.asl10Sound4.power();

    brick.showValue("ANGLE", x, 1)
    brick.showValue("POWER", y, 2)


})