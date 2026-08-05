/**
 * Tabla de mediciones registradas por un sensor seleccionado.
 */
function formatDate(item) {
  const raw = item.datetime?.utc || item.period?.datetimeFrom?.utc;
  if (!raw) return "Sin fecha";
  return new Date(raw).toLocaleString("es-EC");
}

function MeasurementsTable({ measurements = [] }) {
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha y hora</th>
            <th>Valor</th>
            <th>Unidad</th>
          </tr>
        </thead>

        <tbody>
          {measurements.length > 0 ? (
            measurements.map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item)}</td>
                <td>{item.value}</td>
                <td>{item.unit || item.parameter?.units || "µg/m³"}</td>
              </tr>
            ))
          ) : (
            <tr className="empty-row">
              <td colSpan="3">No hay mediciones disponibles para este sensor</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MeasurementsTable;
