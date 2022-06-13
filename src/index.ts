
import {WebMidi} from "webmidi";
import type {Input, Output} from "webmidi";

import {DeviceConfig, DeviceConfigs} from "./../config/DeviceConfigs"

export default class GridController {
    constructor() {
        WebMidi.enable();
        if(WebMidi.enabled == false)
        {
            throw new Error("Current Platform does not support WebMidi");
        }
      }

    //Return all Library built in Device Config
    static configList() : {[key: string]: DeviceConfig}
    {
        return DeviceConfigs;
    }

    availableDeviceInputs() : Input[]
    {
        return WebMidi.inputs;
    }

    availableDeviceOutputs() : Output[]
    {
        return WebMidi.outputs;
    }

    connect(input_device:Input, output_device:Output, config?:DeviceConfig) {}

    disconenct() {}

    setConfig(config:DeviceConfig) {}

    setPixel(x:number, y:number, color:number) {}

    setPixelPalette(x:number, y:number, index:number, palette?:number) {}

    fill(color:number){}

    fillPalette(index:number, palette?:number){}

    registerCallback(callback: (arg: any) => void) {}
}