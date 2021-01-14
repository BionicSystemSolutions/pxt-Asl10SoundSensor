//% color="#3BF52A" weight=92 icon="\uf10f"
//% groups=["Methods", "Getters", "Others"]
namespace aslsensor {

    export enum MotorEnumASL {
        //% block="B+C" jres=icons.portBC
        BC = 1,
        //% block="A+B" jres=icons.portAB
        AB = 2,
        //% block="C+D" jres=icons.portCD
        CD = 3,
        //% block="A+D" jres=icons.portAD
        AD = 4
    }

    const dt = 0.0050;

    //% fixedInstances
    export class Asl10SoundSensor extends sensors.internal.IICSensor {
        angleVal: number;
        powerVal: number;

        sumLeftVal: number;
        sumRightVal: number;

        intgr: number;
        angleTank: number;

        constructor(port: number) {
            super(port)
        }

        /*_deviceType() {
            return DAL.DEVICE_TYPE_NXT_IIC
        }*/

        //% help=aslsensor/update
        //% block="update **sensor port** %this|asl10"
        //% blockId=asl10update
        //% parts="asl10"
        //% blockNamespace=aslsensor
        //% this.fieldEditor="ports"
        //% weight=500
        //% group="Methods"
        update() {
            this.transaction(8, [0], 6);
            let buf = this.getBytes();

            let sumLeft = (buf[0] << 8) + (buf[1] & 0xff);
            let sumRight = (buf[2] << 8) + (buf[3] & 0xff);
            let sumTotal = (buf[4] << 8) + (buf[5] & 0xff);

            let angle = sumRight - sumLeft;
            // Check for corruptet bytes
            if (angle < -2000 || angle > 2000) {
                angle = 0;
            }

            // Check for corruptet bytes
            let power = sumTotal;
            if (power < -6000 || power > 6000) {
                power = 0;
            }

            this.angleVal = angle;
            this.powerVal = power;
            this.sumLeftVal = sumLeft;
            this.sumRightVal = sumRight;

        }

        //% help=aslsensor/angle
        //% block="angle **sensor port** %this|asl10"
        //% blockId=asl10angle
        //% parts="asl10"
        //% blockNamespace=aslsensor
        //% this.fieldEditor="ports"
        //% weight=100
        //% group="getters"
        angle(): number {
            return this.angleVal;
        }
        //% help=aslsensor/power
        //% block="power **sensor port** %this|asl10"
        //% blockId=asl10power
        //% parts="asl10"
        //% blockNamespace=aslsensor
        //% this.fieldEditor="ports"
        //% weight=50
        //% group="getters"
        power(): number {
            return this.powerVal;
        }

        private sumLeft(): number {
            return this.sumLeftVal;
        }
        private sumRight(): number {
            return this.sumRightVal;
        }

        //% block="driveTank on **sensor port** %this tanking **motors** $motorsUsed"
        //% blockId=asl10driveTank
        //% blockNamespace=aslsensor
        //% this.fieldEditor="ports"
        //% weight=150
        //% inlineInputMode=inline
        //% group="Methods"
        driveTank(motorsUsed: MotorEnumASL) {

            let angleValue = this.angleVal;

            this.intgr = this.intgr + angleValue * dt;

            this.angleTank = 0.5 * this.angleTank + 0.5 * angleValue;

            let speed = 0.2 * angleValue + 0.005 * this.intgr;

            if (speed < -50) {
                speed = -50;
            }

            if (speed > 50) {
                speed = 50;
            }

            switch (motorsUsed) {
                case 1: {
                    motors.largeBC.tank(speed, -speed);
                    break;
                }
                case 2: {
                    motors.largeAB.tank(speed, -speed);
                    break;
                }
                case 3: {
                    motors.largeCD.tank(speed, -speed);
                    break;
                }
                case 4: {
                    motors.largeAD.tank(speed, -speed);
                    break;
                }
            }

        }

        // only works if it returns LEGO
        //  internal.sensors.readIICID() reads to be LegoTempStore%s
        // maybe there is a connection
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