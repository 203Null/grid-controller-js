// import {GridController} from "../dist/index"

const GridController = require("../dist/index.js").default

function midiKeyEventHandler(event)
{
    console.log(`Keyevent ${event.position[0]}-${event.position[1]} ${event.velocity}`)
}

async function main()
{
    await GridController.start()

    console.log(GridController.availableDeviceInputs());
    console.log(GridController.availableDeviceOutputs());
    console.log(GridController.configList());

    let Controller = new GridController();

    let outputDevice = GridController.availableDeviceOutputs()[1];
    console.log(outputDevice.name);

    let inputDevice = GridController.availableDeviceInputs()[0];
    console.log(inputDevice.name);

    Controller.connect(inputDevice, outputDevice, "Matrix");
    Controller.registerCallback(midiKeyEventHandler);

    Controller.setPixelPalette(0, 0, 127);
}

main();