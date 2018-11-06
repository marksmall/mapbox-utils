'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mapboxgl = _interopDefault(require('mapbox-gl'));
var saveAs = _interopDefault(require('file-saver'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".branding-control {\n  background-color: #fff;\n  border: 1px solid #000;\n  border-radius: 0.3rem;\n  padding: 0.3rem;\n}\n\n.branding-control a {\n  display: flex;\n  align-items: center;\n  text-decoration: none;\n}\n\n.branding-control span {\n  color: #454445;\n  font-weight: bolder;\n}\n\n.branding-control svg {\n  width: 25px;\n  padding-right: 0.2rem;\n}\n";
styleInject(css);

var BrandingControl =
/*#__PURE__*/
function () {
  function BrandingControl(opts) {
    _classCallCheck(this, BrandingControl);

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


  _createClass(BrandingControl, [{
    key: "onAdd",
    value: function onAdd(map) {
      this.map = map;
      this.container = document.createElement('div');
      this.container.className = 'mapboxgl-ctrl branding-control';
      var ahref = document.createElement('a');
      ahref.target = '_blank';
      ahref.rel = 'noopener noreferrer';
      this.opts.href ? ahref.href = this.opts.href : ahref.href = 'https://astrosat.space'; // Icon in opts must be a string SVG.

      var icon = null;

      if (this.opts.logo) {
        icon = this.opts.logo;
      } else {
        icon = "<svg viewBox=\"0 0 1000 1000\">\n  <circle cx=\"500\" cy=\"570\" r=\"80\" />\n  <circle cx=\"500\" cy=\"570\" r=\"200\" stroke=\"black\" stroke-width=\"5\" fill=\"none\" />\n  <circle cx=\"500\" cy=\"666\" r=\"300\" stroke=\"black\" stroke-width=\"5\" fill=\"none\" />\n  <circle cx=\"500\" cy=\"500\" r=\"470\" stroke=\"black\" stroke-width=\"5\" fill=\"none\" />\n  <g><circle cx=\"300\" cy=\"570\" r=\"30\" /></g>\n  <g><circle cx=\"500\" cy=\"366\" r=\"30\" /></g>\n  <g><circle cx=\"500\" cy=\"30\" r=\"30\" /></g>\n</svg>";
      } // this.container.innerHTML = `<img src="" />${this.opts.text}`;


      var logo = document.createElement('span');
      logo.innerHTML = icon;
      var label = document.createElement('span');
      label.className = 'title';
      this.opts.text ? label.innerHTML = this.opts.text : label.innerHTML = 'Powered by Astrosat';
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

  }, {
    key: "onRemove",
    value: function onRemove() {
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }]);

  return BrandingControl;
}();

var css$1 = ".coords-control {\n  color: #f00;\n  background: #000;\n  min-width: 16rem;\n  max-width: 16rem;\n  text-align: center;\n  background-color: #fff;\n  border: 1px solid #000;\n  background: rgba(255, 255, 255, 0.5);\n  padding: 8px;\n  border-radius: 4px;\n  margin: 8px;\n}\n";
styleInject(css$1);

var toTwoDecimalPlaces = function toTwoDecimalPlaces(value) {
  return parseFloat(String(Math.round(String(value) + 'e+2')) + 'e-2');
};

var CoordsControl =
/*#__PURE__*/
function () {
  function CoordsControl() {
    _classCallCheck(this, CoordsControl);
  }

  _createClass(CoordsControl, [{
    key: "onAdd",

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
    value: function onAdd(map) {
      var _this = this;

      this.map = map;
      this.container = document.createElement('div');
      this.container.className = 'mapboxgl-ctrl coords-control';
      this.container.textContent = 'LAT: 0, LON: 0';
      map.on('mousemove', function (event) {
        var _event$lngLat = event.lngLat,
            lat = _event$lngLat.lat,
            lng = _event$lngLat.lng;
        _this.container.textContent = "LAT: ".concat(toTwoDecimalPlaces(lat), ", LON: ").concat(toTwoDecimalPlaces(lng));
      });
      return this.container;
    }
    /**
     *
     *
     * @memberof CoordsControl
     */

  }, {
    key: "onRemove",
    value: function onRemove() {
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }]);

  return CoordsControl;
}();

var css$2 = ".pindrop-control {\n  background-color: rgb(255, 255, 255);\n  height: 30px;\n  width: 30px;\n  background-image: url(https://api.mapbox.com/mapbox.js/v2.4.0/images/icons-000000@2x.png);\n  background-position: 0px -52px;\n  background-size: 26px 260px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 2px;\n  cursor: pointer;\n}\n\n.pindrop-label input {\n  text-align: center;\n  padding: 0.3rem;\n  border: 1px solid #000;\n  border-radius: 0.3rem;\n  opacity: 0.7;\n}\n\n.pindrop-label .mapboxgl-popup-tip {\n  display: none;\n}\n\n.pindrop-label .mapboxgl-popup-content {\n  background: unset;\n  padding: 0;\n}\n";
styleInject(css$2);

var PindropControl =
/*#__PURE__*/
function () {
  function PindropControl() {
    _classCallCheck(this, PindropControl);
  }

  _createClass(PindropControl, [{
    key: "handleClick",
    value: function handleClick(event) {
      var lngLat = event.lngLat; // Create text label for marker.

      var html = '<input type="text" />';
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: -30,
        className: 'pindrop-label'
      }).setHTML(html); // Create marker and add text label popup and add to map.

      var marker = new mapboxgl.Marker({
        draggable: true
      }).setLngLat([lngLat.lng, lngLat.lat]).setPopup(popup).addTo(this.map); // Toggle the popup on by default, it cannot be switched off due
      // to config options on the Popup.

      marker.togglePopup(); // Remove handler from map so more aren't added accidentally.

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

  }, {
    key: "onAdd",
    value: function onAdd(map) {
      var _this = this;

      this.map = map;
      this.active = false;
      this.container = document.createElement('button');
      this.container.className = 'mapboxgl-ctrl pindrop-control';

      this.container.onclick = function (event) {
        map.on('click', _this.handleClick);
      };

      return this.container;
    }
    /**
     *
     *
     * @memberof PindropControl
     */

  }, {
    key: "onRemove",
    value: function onRemove() {
      this.container.parentNode.removeChild(this.container);
      this.map.off('click', this.handleClick);
      this.map = undefined;
    }
  }]);

  return PindropControl;
}();

var css$3 = ".save-map-control {\n  background-color: rgb(255, 255, 255);\n  height: 30px;\n  width: 30px;\n  background-image: url(https://api.mapbox.com/mapbox.js/v2.4.0/images/icons-000000@2x.png);\n  background-position: 0px -52px;\n  background-size: 26px 260px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 2px;\n  cursor: pointer;\n}\n";
styleInject(css$3);

var SaveMapControl =
/*#__PURE__*/
function () {
  function SaveMapControl() {
    _classCallCheck(this, SaveMapControl);
  }

  _createClass(SaveMapControl, [{
    key: "onAdd",

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
    value: function onAdd(map) {
      this.map = map;
      this.container = document.createElement('button');
      this.container.className = 'mapboxgl-ctrl save-map-control';

      this.container.onclick = function (event) {
        console.log('Button clicked: ', event);
        map.getCanvas().toBlob(function (blob) {
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

  }, {
    key: "onRemove",
    value: function onRemove() {
      this.container.parentNode.removeChild(this.container);
      this.map = undefined;
    }
  }]);

  return SaveMapControl;
}();

exports.BrandingControl = BrandingControl;
exports.CoordsControl = CoordsControl;
exports.PindropControl = PindropControl;
exports.SaveMapControl = SaveMapControl;
