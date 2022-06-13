import type { Input, Output } from "webmidi";
import type { DeviceConfig } from "./types/devices";

import { WebMidi } from "webmidi";
import DeviceConfigs from "./devices";

export default class GridController {
  constructor() {
    WebMidi.enable()
      .catch(error => {
        console.error("An error was thrown by WebMidi", error);
        
        throw new Error("Current platform does not support WebMidi.");
      });
  }

    /** Returns the configuration of all the devices. */
    static configList(): typeof DeviceConfigs
    {
        return DeviceConfigs;
    }

    /** Returns all the available MIDI inputs. */
    availableDeviceInputs() : Input[]
    {
        return WebMidi.inputs;
    }

    /** Returns all the available MIDI ouputs. */
    availableDeviceOutputs() : Output[]
    {
        return WebMidi.outputs;
    }

    connect(input_device: Input, output_device: Output, config?: DeviceConfig) {}

    disconnect() {}

    setConfig(config:DeviceConfig) {}

    setPixel(x: number, y: number, color: number) {}

    setPixelPalette(x: number, y: number, index: number, palette?: number) {}

    fill(color: number){}

    fillPalette(index: number, palette?: number){}

    registerCallback(callback: (arg: any) => unknown) {}
}
