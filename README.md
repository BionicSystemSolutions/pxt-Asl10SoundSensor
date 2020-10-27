# pxt-asl10soundsensor

Block for using the ASL10SoundSensor

## How to import this library?

Click the gearwheel menu in the MakeCode editor, and click "Extensions"m search for "asl10" and select it.

## Using the blocks

These block are for now made to control a tank robot, but customized programs can also be created.
To update the information from the asl10sensor use the update block.
Thereafter you can use the drivetank block to control a tank robot. You can also use the getter blocks (angle and power) to get an indication of what angle the sound is coming from. This can be used to make customized programs. 

To use driveTank in typescript following enums are used:
motorEnumASL.BC (motor output B + C) = 1
motorEnumASL.AB (motor output A + B) = 2
motorEnumASL.CD (motor output C + D) = 3
motorEnumASL.AD (motor output A + D) = 4



## Supported targets


* for PXT/linux

* for PXT/ev3
(The metadata above is needed for package search.)
## License

MIT

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.


## TODO

- [ ] Add a reference for your blocks here
- [x] Add "icon.png" image (300x200) in the root folder
- [x] Add "- beta" to the GitHub project description if you are still iterating it.
- [x] Turn on your automated build on https://travis-ci.org
- [ ] Use "pxt bump" to create a tagged release on GitHub
- [ ] Get your package reviewed and approved https://makecode.mindstorms.com/packages/approval

Read more at https://makecode.mindstorms.com/packages/build-your-own
