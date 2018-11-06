window.URL.createObjectURL = jest.fn();

const mapbox = jest.genMockFromModule('mapbox-gl');
// console.log('MAPBOX MOCK: ', mapbox.Map);
// mapbox.Map = () => {
//   console.log('MAPBOX MAP');
// };

// // export default mapbox;
// export default class Map {
//   constructor() {
//     console.log('Mock SoundPlayer: constructor was called');
//   }

//   playSoundFile() {
//     console.log('Mock SoundPlayer: playSoundFile was called');
//   }
// }
