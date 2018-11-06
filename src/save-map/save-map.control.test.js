// jest.mock('mapbox-gl', () => ({
//   Map: () => jest.fn()
// }));

// import mapboxgl from 'mapbox-gl';
var mapboxgl = require('mapbox-gl');
import SaveMapControl from './save-map.control';

describe('SaveMapControl', () => {
  let container;
  let map;

  beforeEach(() => {
    // opts.accessToken = process.env.MapboxAccessToken;
    container = document.createElement('div');
    map = new mapboxgl.Map({ container: container });
    saveMap = new SaveMapControl();
    map.addControl(saveMap);
  });

  it('should be initialized', () => {
    console.log('MAP: ', map);
    // const testValues = [
    //   { value: 1.004, response: 1.0 },
    //   { value: 1.444, response: 1.44 },
    //   { value: 1.445, response: 1.45 },
    //   { value: 1.449, response: 1.45 },
    //   { value: 1.345, response: 1.35 },
    //   { value: 1.005, response: 1.01 }
    // ];
    // testValues.forEach(testValue => {
    //   const response = toTwoDecimalPlaces(testValue.value);
    //   // console.log('Value to 2 decimal places: ', response);
    //   expect(response).toEqual(testValue.response);
    // });
  });
});
