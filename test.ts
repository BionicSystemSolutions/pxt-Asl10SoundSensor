forever(function () {

    aslsensor.asl10Sound2.update();

    // aslsensor.asl10Sound2.driveTank(aslsensor.MotorEnumASL.BC)

    let x = aslsensor.asl10Sound2.angle();

    brick.showValue("ANGLE", x, 1)


    sensors.internal.transactionIIC(1, 8, [], 6)
    let iic = sensors.internal.getIICBytes(1, 6);
    let sumLeft = (iic[0] << 8) + (iic[1] & 0xff)
    let sumRight = (iic[2] << 8) + (iic[3] & 0xff)
    let sumTotal = (iic[4] << 8) + (iic[5] & 0xff)

    let angleVal = sumRight - sumLeft
    brick.showValue("angle", angleVal, 5)
    brick.showValue("X", sumTotal, 6)




})