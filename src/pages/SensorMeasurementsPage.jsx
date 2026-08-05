import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSensorMeasurements } from "../services/openaqApi";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import MeasurementsTable from "../components/MeasurementsTable";

function SensorMeasurementsPage() {
  const { sensorId } = useParams();

  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeasurements() {
      setLoading(true);
      const data = await getSensorMeasurements(sensorId, 50);
      setMeasurements(data);
      setLoading(false);
    }

    loadMeasurements();
  }, [sensorId]);

  return (
    <>
      <Header title={`Mediciones del sensor #${sensorId}`} subtitle="Últimos registros obtenidos desde OpenAQ" />

      <div className="app-content">
        <Breadcrumb
          items={[
            { label: "Inicio", to: "/" },
            { label: "Estaciones", to: "/locations" },
            { label: `Sensor #${sensorId}` },
          ]}
        />

        <div className="panel-card">
          <div className="panel-card-header">
            <div>
              <h3 className="panel-card-title">Historial de mediciones</h3>
              <p className="panel-card-subtitle">{measurements.length} registros encontrados</p>
            </div>
            <Link to="/locations" className="btn btn-outline">
              ← Volver a estaciones
            </Link>
          </div>

          <div className="panel-card-body no-padding">
            {loading ? (
              <div className="state-container">
                <div className="spinner" />
                <p>Cargando mediciones...</p>
              </div>
            ) : (
              <MeasurementsTable measurements={measurements} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SensorMeasurementsPage;
