import { Link } from "react-router-dom";

/**
 * Tabla de ubicaciones / estaciones de monitoreo.
 * Cada fila enlaza (rutas dinámicas) hacia los sensores de esa ubicación.
 */
function LocationsTable({ locations = [] }) {
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estación</th>
            <th>País</th>
            <th>Localidad</th>
            <th>Sensores</th>
            <th>Coordenadas</th>
            <th>Tipo</th>
          </tr>
        </thead>

        <tbody>
          {locations.length > 0 ? (
            locations.map((location) => (
              <tr key={location.id}>
                <td>{location.id}</td>

                <td>
                  <Link className="row-link" to={`/locations/${location.id}`}>
                    {location.name || "Sin nombre"}
                  </Link>
                </td>

                <td>{location.country?.name || location.country || "Sin país"}</td>

                <td>{location.locality || location.city || "No disponible"}</td>

                <td>{location.sensors?.length ?? "—"}</td>

                <td>
                  {location.coordinates?.latitude != null && location.coordinates?.longitude != null
                    ? `${location.coordinates.latitude.toFixed(4)}, ${location.coordinates.longitude.toFixed(4)}`
                    : "No disponible"}
                </td>

                <td>
                  <span className={`badge-pill ${location.isMobile ? "badge-orange" : "badge-green"}`}>
                    {location.isMobile ? "Móvil" : "Fija"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr className="empty-row">
              <td colSpan="7">No hay ubicaciones disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LocationsTable;
