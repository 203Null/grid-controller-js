import type { Input, Output } from "webmidi";
import type { DeviceConfig } from "./types/devices";

import { WebMidi } from "webmidi";
import DeviceConfigs from "./devices";

export default class GridController {
    activeInput?: Input;
    activeOutput?: Output;
    activeConfig?: DeviceConfig
    
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

    connect(input_device:Input, output_device:Output, config?:DeviceConfig) 
    {
        this.activeInput = input_device;
        this.activeOutput = output_device;

        this.activeInput.addListener("midimessage", e => {console.log(e);})
        
        if(config === undefined) //We need to try to auto match device config
        {

        }
        else
        {
            this.activeConfig = config;
        }

    }

    disconenct() 
    {
        this.activeInput = undefined;
        this.activeOutput = undefined;
    }

    setConfig(config:DeviceConfig) {}

    outputReady()
    {
        return this.activeOutput != undefined && this.activeConfig != undefined;  
    }

    setPixel(x: number, y: number, color: number) {}

    setPixelPalette(x: number, y: number, index: number, palette?: number) 
    {
        if(this.outputReady() === false)
            return false;

        let device_x = this.activeConfig?.canvasOrigin[0] + x;
        let device_y = this.activeConfig?.canvasOrigin[1] + 1;
        let note = this.activeConfig?.keymap[device_y][device_x];

        if(note === undefined)
            return false;

        this.activeOutput.sendNoteOn(note, {channels: 1, attack: index})

        return true;
    }

    fill(color: number){}

    fillPalette(index: number, palette?: number){}

    registerCallback(callback: (arg: any) => unknown) {}
}
