import type { DeviceConfig } from "../types/devices";

const config: DeviceConfig = {
    name: "Matrix",
    midiNameRegex: "^Matrix",

    defaultChannel: 2,

    keymap: [
      [64, 65, 66, 67, 96, 97, 98, 99],
      [60, 61, 62, 63, 92, 93, 94, 95],
      [56, 57, 58, 59, 88, 89, 90, 91],
      [52, 53, 54, 55, 84, 85, 86, 87],
      [48, 49, 50, 51, 80, 81, 82, 83],
      [44, 45, 46, 47, 76, 77, 78, 79],
      [40, 41, 42, 43, 72, 73, 74, 75],
      [36, 37, 38, 39, 68, 69, 70, 71],
      [100, 101, 102, 103, 104, 105, 106, 107]],
    
    size: [8, 8],
    canvasSize: [8, 8],
    canvasOrigin: [0, 0],
    noteToXY(note) {
      if (note >= 36 && note < 100) {
        const keymap_lut = [[0,7],[1,7],[2,7],[3,7],[0,6],[1,6],[2,6],[3,6],[0,5],[1,5],[2,5],[3,5],[0,4],[1,4],[2,4],[3,4],[0,3],[1,3],[2,3],[3,3],[0,2],[1,2],[2,2],[3,2],[0,1],[1,1],[2,1],[3,1],[0,0],[1,0],[2,0],[3,0],[4,7],[5,7],[6,7],[7,7],[4,6],[5,6],[6,6],[7,6],[4,5],[5,5],[6,5],[7,5],[4,4],[5,4],[6,4],[7,4],[4,3],[5,3],[6,3],[7,3],[4,2],[5,2],[6,2],[7,2],[4,1],[5,1],[6,1],[7,1],[4,0],[5,0],[6,0],[7,0]];
        
        return keymap_lut[note - 36] as [number, number];
      }
      
      else if (note >= 100 && note < 108)
      {
        return [8, note - 100];
      }

      else if (note >= 108 && note < 116)
      {
        return [-1, note - 108];
      }
      
      return [NaN, NaN];
    }
}

export default config;