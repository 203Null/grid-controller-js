// import {GridController} from "../dist/index"

const GridController = require("../dist/index.js").default

async function main()
{
    console.log(GridController)

    let Controller = await GridController.new();

    // console.log(Controller.availableDeviceInputs());
    // console.log(Controller.availableDeviceOutputs());

    let outputDevice = Controller.availableDeviceOutputs()[1];

    console.log(outputDevice.name);

    Controller.connect(undefined, Controller.availableDeviceOutputs()[1]);

    Controller.setPixelPalette(0, 0, 127);
}

main();