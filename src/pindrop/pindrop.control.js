import mapboxgl from 'mapbox-gl';

import './pindrop.control.css';

class PindropControl {
  handleClick(event) {
    const { lngLat } = event;

    // Create text label for marker.
    const html = '<input type="text" />';
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: -30,
      className: 'pindrop-label'
    }).setHTML(html);

    // Create marker and add text label popup and add to map.
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lngLat.lng, lngLat.lat])
      .setPopup(popup)
      .addTo(this.map);

    // Toggle the popup on by default, it cannot be switched off due
    // to config options on the Popup.
    marker.togglePopup();

    // Remove handler from map so more aren't added accidentally.
    this.map.off('click', this.handleClick);
  }

  /**
   * When adding control to a map, add a button with a click handler
   * on the map to place a marker and label.
   *
   * @param {*} map
   *
   * @returns
   *
   * @memberof PindropControl
   */
  onAdd(map) {
    this.map = map;
    this.active = false;
    this.container = document.createElement('button');
    this.container.className = 'mapboxgl-ctrl pindrop-control';

    this.container.onclick = event => {
      map.on('click', this.handleClick);
    };

    return this.container;
  }

  /**
   *
   *
   * @memberof PindropControl
   */
  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map.off('click', this.handleClick);
    this.map = undefined;
  }
}

export default PindropControl;
