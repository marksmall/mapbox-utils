import './cursor-coords.control.css';

import { toTwoDecimalPlaces } from '../utils/utils';

class CoordsControl {
  /**
   * When adding control to a map, set the default value and set
   * the content to update when the mouse moves.
   *
   * @param {*} map
   *
   * @returns
   *
   * @memberof CoordsControl
   */
  onAdd(map) {
    this.map = map;

    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl coords-control';
    this.container.textContent = 'LAT: 0, LON: 0';

    map.on('mousemove', event => {
      const {
        lngLat: { lat, lng }
      } = event;

      this.container.textContent = `LAT: ${toTwoDecimalPlaces(
        lat
      )}, LON: ${toTwoDecimalPlaces(lng)}`;
    });

    return this.container;
  }

  /**
   *
   *
   * @memberof CoordsControl
   */
  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

export default CoordsControl;
