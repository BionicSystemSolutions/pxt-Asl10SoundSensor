
//% groups="['test1', `sensssors']"
//% color=#909090 weight=80
namespace sensorstest {
    export class Asl10SoundSensor extends sensors.internal.IICSensor {

        // constructor og _deviceType behøves ikke, men jeg så dog 
        // at andre lego sensorer har dem. 
        /*
        constructor(port: number) {
            super(port)

        }*/
        /*_deviceType() {
            return DAL.DEVICE_TYPE_NXT_IIC
        }*/

        // for bytes over i2c
        getData() {
            this.transaction(8, [0], 6)
            return this.getBytes()
        }

        // udregner "vinklen" udfra data

        //% group=PID
        getAngle() {

            let buf = this.getData();
            let sumL = (buf[0] << 8) + (buf[1] & 0xff);
            let sumR = (buf[2] << 8) + (buf[3] & 0xff);
            let sumX = (buf[4] << 8) + (buf[5] & 0xff);

            // printer en masse ting. Skal udkommenteres
            brick.showValue("SumL", sumL, 1);
            brick.showValue("SumR", sumR, 2);
            brick.showValue("SumX", sumX, 3);
            brick.showValue("buf0", buf[0], 5);
            brick.showValue("buf1", buf[1], 6);



            let a2 = 0.0;
            // eventuelt fjerne max-grænse
            // max-grænse er der, fordi der opstod overførsler på over 65000
            // som enten tyder på overflow eller en løs forbindelse, 
            // da det kom, når sensoren blev udsat for rystelse/vibrationer.
            let max = 2000;
            if (sumX != 0 && sumL < max && sumR < max) {
                a2 = (sumL - sumR) / sumX
            }
            return a2;
        }

    // denne skal sende sensor id, den virker dog kun hvis der står lego i den.
    // måske en sammenhæng mellem det og at internal.sensors.readIICID() læses til
    // LegoTempStore%s
        _IICId() {
            return 'LEGO'; 
        }
    }

    export const asl10Sound1 = new Asl10SoundSensor(1)
    export const asl10Sound2 = new Asl10SoundSensor(2)
    export const asl10Sound3 = new Asl10SoundSensor(3)
    export const asl10Sound4 = new Asl10SoundSensor(4)
}