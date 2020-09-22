
namespace sensors {
    class Asl10SoundSensor extends sensors.internal.IICSensor {

        getInfo(): number[] {
            this.transaction(8, [5, 5, 5, 5, 5, 5], 6);

            control.waitMicros(100000);
            let buf = this.getBytes();
            
            let array = [0, 0, 0, 0, 0, 0]
            for (let i = 0; i < buf.length; i++) {
                array[i] = buf[i];
            }
            return array;
            //return this.getBytes()[0];
        }



    }
    export const asl10Sound1 = new Asl10SoundSensor(1)
    export const asl10Sound2 = new Asl10SoundSensor(2)
    export const asl10Sound3 = new Asl10SoundSensor(3)
    export const asl10Sound4 = new Asl10SoundSensor(4)
}