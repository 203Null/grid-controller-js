export type DeviceConfig =
{
    name: string,
    midiNameRegex?: string,
    keymap: number[][],
    size: [number, number], //Width, Height
    canvasSize: [number, number], //Width, Height - (Grid only)
    canvasOrigin: [number, number],
    noteToXY: (note: number) => [number, number],
    rgbSysexGen?: (x:number, y:number, color:number) => number[],
    initializationSysex?: number[],
}

export let DeviceConfigs: {[key: string]: DeviceConfig} = {}; 

//Add Device Configs here
import * as MatrixPro from "./MatrixPro"
DeviceConfigs[MatrixPro.Config.name] = MatrixPro.Config;