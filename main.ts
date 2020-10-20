
namespace sensors {
    class Asl10SoundSensor extends sensors.internal.IICSensor {


        /*
        constructor(port: number) {
            super(port)

        }*/

        /*_deviceType() {
            return DAL.DEVICE_TYPE_NXT_IIC
        }*/

        getData() {
            this.transaction(8, [0], 6)
            return this.getBytes()
        }

        getAngle() {

            let buf = this.getData();
            let sumL = (buf[0] << 8) + (buf[1] & 0xff);
            let sumR = (buf[2] << 8) + (buf[3] & 0xff);
            let sumX = (buf[4] << 8) + (buf[5] & 0xff);

            brick.showValue("SumL", sumL, 1);

            brick.showValue("SumR", sumR, 2);

            brick.showValue("SumX", sumX, 3);


            let a2 = 0.0;
            if (sumX != 0) {
                a2 = (sumL - sumR) / sumX
            }
            return a2;
        }

        _IICId() {

            return 'LEGO'; // denne skal den ahave for at den kan have en aktiv sensor
        }
    }

    export const asl10Sound1 = new Asl10SoundSensor(1)
    export const asl10Sound2 = new Asl10SoundSensor(2)
    export const asl10Sound3 = new Asl10SoundSensor(3)
    export const asl10Sound4 = new Asl10SoundSensor(4)
}