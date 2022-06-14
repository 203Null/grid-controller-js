import type { Input, Output } from "webmidi";
import type { DeviceConfig } from "./types/devices";

import { WebMidi } from "webmidi";
import DeviceConfigs from "./devices";

export default class GridController {
    activeInput?: Input;
    activeOutput?: Output;
    activeConfig?: DeviceConfig

    callback?: (arg: object) => unknown

    static async start()
    {
        if(WebMidi.enabled == false)
        {
            await WebMidi.enable()
                .catch(error => {
                console.error("An error was thrown by WebMidi", error);
                });
        }
    }

    /** Returns the configuration of all the devices. */
    static configList()
    {
        return Object.keys(DeviceConfigs);
    }

    static addConfig(config : DeviceConfig)
    {
        DeviceConfigs[config.name] = config;
    }

    /** Returns all the available MIDI inputs. */
    static availableDeviceInputs() : Input[]
    {
        return WebMidi.inputs;
    }

    /** Returns all the available MIDI ouputs. */
    static availableDeviceOutputs() : Output[]
    {
        return WebMidi.outputs;
    }

    deviceEventHandler(e : any) // TODO Fix
    {
        switch(e.type)
        {
            case "midimessage":
            {
                switch(e.message.type)
                {
                    case "noteon":
                    case "noteoff":
                    {
                        // console.log(`${e.message.type} - ${e.message.data}`)
                        if(this.activeConfig && this.callback) //We do have a callback
                        {
                            let xy:[number, number] = this.activeConfig.noteToXY(e.message.data[1])
                            this.callback({event: "key", position: xy, velocity: e.message.data[2]})
                        }
                        break;
                    }
            }
                break;
            }
            case "disconnected":
            {
                console.log("Device disconnected")
                break;
            }
            default:
            {
                console.log(e.type);
            }
        }
    }

    connect(input_device:Input|undefined, output_device:Output|undefined, config?:DeviceConfig|string) 
    {
        this.activeInput = input_device;
        this.activeOutput = output_device;

        if(input_device === undefined && output_device === undefined)
        {
            console.log("Both Input and output are undefined");
        }
        else
        {
            this.activeInput?.addListener("midimessage", e => this.deviceEventHandler(e))
            this.activeInput?.addListener("disconnected", e => this.deviceEventHandler(e))
        }
        
        if(config === undefined) //We need to try to auto match device config
        {
            //Input
            let input_config : DeviceConfig|undefined = undefined;
            if(input_device)
            {
                console.log(`Attempting find input config for ${input_device.name}`);
                let input_name : string = input_device?.name;
                for (const name in DeviceConfigs) 
                {
                    let config_regex : string = DeviceConfigs[name].midiNameRegex!;
                    if(input_name.match(config_regex) !== null)
                    {
                        console.log(`Input device config found: ${name}`)
                        input_config = DeviceConfigs[name];
                        break;
                    }
                }
            }

            //Output
            let output_config : DeviceConfig|undefined = undefined;
            if(output_device)
            {
                console.log(`Attempting find output config for ${output_device.name}`);
                let output_name : string = output_device?.name;
                for (const name in DeviceConfigs) 
                {
                    let config_regex : string = DeviceConfigs[name].midiNameRegex!;
                    if(output_name.match(config_regex) !== null)
                    {
                        console.log(`Output device config found: ${name}`)
                        output_config = DeviceConfigs[name];
                        break;
                    }
                }
            }

            if(output_config === input_config)
            {
                this.activeConfig = output_config;
            }
            else //Not matched
            {
                if(input_device === undefined && output_config)
                {
                    this.activeConfig = output_config;
                }
                else if(output_device === undefined && input_config)
                {
                    this.activeConfig = input_config;
                }
                else
                {
                    this.activeConfig = undefined;
                    console.log("Unable to auto match device config")
                }
            }
        }
        else if(typeof config === "string")
        {  
            console.log(`DeviceConfig ${config} used`)
            this.activeConfig = DeviceConfigs[<string>config]; 
        }
        else // if (typeof config === "DeviceConfig") - Does not work, let's assume it is DeviceConfig
        {
            console.log("DeviceConfig from parameter used")
            this.activeConfig = <DeviceConfig>config;
        }

        if(this.activeConfig === undefined)
        {
            console.log("No active config");
        }
        else
        {
            console.log(`${this.activeConfig.name} config used`);
        }

    }

    disconenct() 
    {
        this.activeInput?.removeListener();

        this.activeInput = undefined;
        this.activeOutput = undefined;
        this.activeConfig = undefined;
    }

    setConfig(config:DeviceConfig) {}

    outputReady()
    {
        return this.activeOutput != undefined && this.activeConfig != undefined;  
    }

    setPixel(x: number, y: number, color: number) {}

    setPixelPalette(x: number, y: number, index: number, channel?: number) 
    {
        if(this.outputReady() === false)
            return false;

        let device_x = this.activeConfig!.canvasOrigin[0] + x;
        let device_y = this.activeConfig!.canvasOrigin[1] + y;
        let note = this.activeConfig!.keymap[device_y][device_x];

        if(note == undefined || note == NaN)
            return false;

        if(channel == undefined) {channel = this.activeConfig?.defaultChannel}

        this.activeOutput!.sendNoteOn(note, {channels: channel, rawAttack: index})

        return true;
    }

    fill(color: number){}

    fillPalette(index: number, channel?: number){}

    registerCallback(callback: (arg: any) => unknown) {this.callback = callback}
}