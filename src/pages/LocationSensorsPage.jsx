import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLocationSensors } from "../services/openaqApi";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import SensorsTable from "../components/SensorsTable";

function LocationSensorsPage() {
  const { locationId } = useParams();

  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSensors() {
      setLoading(true);
      const data = await getLocationSensors(locationId);
      setSensors(data);
      setLoading(false);
    }

    loadSensors();
  }, [locationId]);

  return (
    <>
      <Header title={`Sensores de la estación #${locationId}`} subtitle="Selecciona un sensor para ver sus mediciones" />

      <div className="app-content">
        <Breadcrumb
          items={[
            { label: "Inicio", to: "/" },
            { label: "Estaciones", to: "/locations" },
            { label: `Estación #${locationId}` },
          ]}
        />

        <div className="panel-card">
          <div className="panel-card-header">
            <div>
              <h3 className="panel-card-title">Sensores disponibles</h3>
              <p className="panel-card-subtitle">{sensors.length} sensores encontrados</p>
            </div>
            <Link to="/locations" className="btn btn-outline">
              ← Volver a estaciones
            </Link>
          </div>

          <div className="panel-card-body no-padding">
            {loading ? (
              <div className="state-container">
                <div className="spinner" />
                <p>Cargando sensores...</p>
              </div>
            ) : (
              <SensorsTable sensors={sensors} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationSensorsPage;
