import './save-map.control.css';

import saveAs from 'file-saver';

class SaveMapControl {
  /**
   * When adding control to a map, set the default value and set
   * the content to update when the mouse moves.
   *
   * @param {*} map
   *
   * @returns
   *
   * @memberof SaveMapControl
   */
  onAdd(map) {
    this.map = map;
    this.container = document.createElement('button');
    this.container.className = 'mapboxgl-ctrl save-map-control';

    this.container.onclick = event => {
      console.log('Button clicked: ', event);
      map.getCanvas().toBlob(blob => {
        saveAs(blob, 'snapshot.png');
      });
    };

    return this.container;
  }

  /**
   *
   *
   * @memberof SaveMapControl
   */
  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

export default SaveMapControl;
