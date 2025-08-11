import L from "leaflet";

export class TimeSliderControl extends L.Control {
  private _container?: HTMLElement;
  onAdd(map: L.Map) {
    // Create a container div for the control
    this._container = L.DomUtil.create("div", "leaflet-control-timeslider");

    // Prevent map interactions when interacting with the control
    L.DomEvent.disableClickPropagation(this._container);
    L.DomEvent.disableScrollPropagation(this._container);

    return this._container;
  }

  getContainer() {
    return this._container;
  }

  onRemove(map: L.Map) {
    // Clean up if needed when removed
  }
}
