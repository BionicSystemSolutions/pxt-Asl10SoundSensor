 namespace asl10 {

    export class Asl10DataModel {
        angle: number;
        power: number;
    }

    export class Asl10SoundSensor extends sensors.internal.IICSensor {

        constructor(port: number) {
            super(port)

        }

        // Return devicetype
        _deviceType() {
            return DAL.DEVICE_TYPE_NXT_IIC
        }

        getData(): Asl10DataModel {
            this.transaction(8, [0], 6);
            let buf = this.getBytes();

            let sumL = (buf[0] << 8) + (buf[1] & 0xff);
            let sumR = (buf[2] << 8) + (buf[3] & 0xff);
            let sumX = (buf[4] << 8) + (buf[5] & 0xff);

            let angle = sumR - sumL;
            // Check for corruptet bytes
            if (angle < -2000 || angle > 2000) {
                angle = null;
            }

            // Check for corruptet bytes
            let power = sumX;
            if (power < -6000 || power > 6000) {
                power = null;
            }

            let data: Asl10DataModel = {
                angle: angle,
                power: power
            }

            return data;
        }


        _IICId() {
            return 'LEGO';
        }
    }
    //% fixedInstance whenUsed block="1" jres=icons.port1
    export const asl10Sound1 = new Asl10SoundSensor(1)

    //% fixedInstance whenUsed block="2" jres=icons.port2
    export const asl10Sound2 = new Asl10SoundSensor(2)

    //% fixedInstance whenUsed block="3" jres=icons.port3
    export const asl10Sound3 = new Asl10SoundSensor(3)

    //% fixedInstance whenUsed block="4" jres=icons.port4
    export const asl10Sound4 = new Asl10SoundSensor(4)
}
