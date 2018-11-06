import './branding.control.css';

class BrandingControl {
  constructor(opts) {
    this.opts = opts || {};
  }
  /**
   * When adding control to a map, set the default value and set
   * the content to update when the mouse moves.
   *
   * @param {*} map
   *
   * @returns
   *
   * @memberof BrandingControl
   */
  onAdd(map) {
    this.map = map;
    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl branding-control';

    const ahref = document.createElement('a');
    ahref.target = '_blank';
    ahref.rel = 'noopener noreferrer';

    this.opts.href
      ? (ahref.href = this.opts.href)
      : (ahref.href = 'https://astrosat.space');

    // Icon in opts must be a string SVG.
    let icon = null;
    if (this.opts.logo) {
      icon = this.opts.logo;
    } else {
      icon = `<svg viewBox="0 0 1000 1000">
  <circle cx="500" cy="570" r="80" />
  <circle cx="500" cy="570" r="200" stroke="black" stroke-width="5" fill="none" />
  <circle cx="500" cy="666" r="300" stroke="black" stroke-width="5" fill="none" />
  <circle cx="500" cy="500" r="470" stroke="black" stroke-width="5" fill="none" />
  <g><circle cx="300" cy="570" r="30" /></g>
  <g><circle cx="500" cy="366" r="30" /></g>
  <g><circle cx="500" cy="30" r="30" /></g>
</svg>`;
    }

    // this.container.innerHTML = `<img src="" />${this.opts.text}`;
    const logo = document.createElement('span');
    logo.innerHTML = icon;

    const label = document.createElement('span');
    label.className = 'title';
    this.opts.text
      ? (label.innerHTML = this.opts.text)
      : (label.innerHTML = 'Powered by Astrosat');

    this.container.className = 'mapboxgl-ctrl branding-control';

    ahref.appendChild(logo);
    ahref.appendChild(label);
    this.container.appendChild(ahref);

    return this.container;
  }

  /**
   *
   *
   * @memberof BrandingControl
   */
  onRemove() {
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}

export default BrandingControl;
