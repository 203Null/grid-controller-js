export interface DeviceConfig {
  name: string;
  defaultChannel:number;
  midiNameRegex?: string;
  keymap: number[][];
  /** [Width, Height] */
  size: [number, number];
  /** Grid Only: [Width, Height] */
  canvasSize: [number, number];
  /** [X, Y] */
  canvasOrigin: [number, number];
  noteToXY: (note: number) => [number, number];
  rgbSysexGen?: (x: number, y: number, color: number) => number[];
  initializationSysex?: number[];
}

