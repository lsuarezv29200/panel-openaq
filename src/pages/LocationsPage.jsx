import { useEffect, useState } from "react";
import { getLocations } from "../services/openaqApi";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import LocationsTable from "../components/LocationsTable";
import OpenAQMap from "../components/OpenAQMap";

function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLocations() {
      setLoading(true);
      const data = await getLocations(100);
      setLocations(data);
      setLoading(false);
    }

    loadLocations();
  }, []);

  return (
    <>
      <Header title="Estaciones de monitoreo" subtitle="Todas las ubicaciones registradas en OpenAQ" />

      <div className="app-content">
        <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: "Estaciones" }]} />

        {loading ? (
          <div className="state-container">
            <div className="spinner" />
            <p>Cargando estaciones ambientales...</p>
          </div>
        ) : (
          <>
            <div className="panel-card">
              <div className="panel-card-header">
                <div>
                  <h3 className="panel-card-title">Mapa de estaciones</h3>
                  <p className="panel-card-subtitle">
                    Haz clic en un marcador para resaltarlo en la tabla, o en "Ver sensores" para navegar.
                  </p>
                </div>
                {selectedLocation && (
                  <button className="btn btn-outline" onClick={() => setSelectedLocation(null)}>
                    Mostrar todas
                  </button>
                )}
              </div>

              <div className="panel-card-body">
                <OpenAQMap
                  locations={locations}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-card-header">
                <div>
                  <h3 className="panel-card-title">Registro de ubicaciones</h3>
                  <p className="panel-card-subtitle">{locations.length} estaciones encontradas</p>
                </div>
              </div>

              <div className="panel-card-body no-padding">
                <LocationsTable locations={selectedLocation ? [selectedLocation] : locations} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default LocationsPage;
