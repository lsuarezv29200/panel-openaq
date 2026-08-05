import { Link } from "react-router-dom";

/**
 * Tabla de sensores pertenecientes a una ubicación.
 * Cada fila enlaza hacia las mediciones de ese sensor (ruta dinámica).
 */
function SensorsTable({ sensors = [] }) {
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID Sensor</th>
            <th>Parámetro</th>
            <th>Unidad</th>
            <th>Tipo</th>
          </tr>
        </thead>

        <tbody>
          {sensors.length > 0 ? (
            sensors.map((sensor) => (
              <tr key={sensor.id}>
                <td>
                  <Link className="row-link" to={`/sensors/${sensor.id}`}>
                    {sensor.id}
                  </Link>
                </td>

                <td>{sensor.parameter?.name || sensor.name || "Sin parámetro"}</td>

                <td>{sensor.parameter?.units || "Sin unidad"}</td>

                <td>
                  <span className="badge-pill badge-blue">
                    {sensor.parameter?.displayName || "Sensor ambiental"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr className="empty-row">
              <td colSpan="4">No existen sensores disponibles para esta ubicación</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SensorsTable;
