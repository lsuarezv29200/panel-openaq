import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * Ajusta la vista del mapa cuando cambia la ubicación seleccionada.
 */
function ChangeView({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 10);
    }
  }, [position, map]);

  return null;
}

function OpenAQMap({ locations = [], selectedLocation, setSelectedLocation }) {
  const navigate = useNavigate();

  const focusPosition =
    selectedLocation?.coordinates?.latitude != null && selectedLocation?.coordinates?.longitude != null
      ? [selectedLocation.coordinates.latitude, selectedLocation.coordinates.longitude]
      : null;

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "420px", width: "100%" }}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {focusPosition && <ChangeView position={focusPosition} />}

      {locations.map(
        (location) =>
          location.coordinates?.latitude &&
          location.coordinates?.longitude && (
            <Marker
              key={location.id}
              position={[location.coordinates.latitude, location.coordinates.longitude]}
              eventHandlers={{
                click: () => {
                  setSelectedLocation?.(location);
                },
              }}
            >
              <Popup>
                <h3 style={{ margin: "0 0 6px" }}>{location.name || "Sin nombre"}</h3>

                <p style={{ margin: "0 0 10px" }}>
                  País: {location.country?.name || location.country || "Sin país"}
                </p>

                <button className="btn btn-primary" onClick={() => navigate(`/locations/${location.id}`)}>
                  Ver sensores
                </button>
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
}

export default OpenAQMap;
