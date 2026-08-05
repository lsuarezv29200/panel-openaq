import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLocations } from "../services/openaqApi";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import LocationsTable from "../components/LocationsTable";

function HomePage() {
  const [locations, setLocations] = useState([]);
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

  const totalSensores = locations.reduce((sum, loc) => sum + (loc.sensors?.length || 0), 0);
  const fijas = locations.filter((loc) => !loc.isMobile).length;
  const moviles = locations.filter((loc) => loc.isMobile).length;

  const cards = [
    { label: "Total de estaciones", value: locations.length, icon: "📍", color: "blue" },
    { label: "Total de sensores", value: totalSensores, icon: "📡", color: "green" },
    { label: "Estaciones fijas", value: fijas, icon: "🏢", color: "purple" },
    { label: "Estaciones móviles", value: moviles, icon: "🚗", color: "orange" },
  ];

  return (
    <>
      <Header title="Panel de calidad del aire" subtitle="Información obtenida desde la API OpenAQ" />

      <div className="app-content">
        <div className="hero-banner">
          <div>
            <p className="hero-banner-eyebrow">Panel principal</p>
            <h2 className="hero-banner-title">Monitoreo ambiental en tiempo real</h2>
            <p className="hero-banner-desc">
              Explora el estado general de las estaciones registradas y revisa los indicadores clave del
              sistema OpenAQ.
            </p>
          </div>

          <div className="hero-banner-badge">{locations.length} estaciones activas</div>
        </div>

        {loading ? (
          <div className="state-container">
            <div className="spinner" />
            <p>Cargando estaciones ambientales...</p>
          </div>
        ) : (
          <>
            <SummaryCards cards={cards} />

            <div className="panel-card">
              <div className="panel-card-header">
                <div>
                  <h3 className="panel-card-title">Resumen de estaciones</h3>
                  <p className="panel-card-subtitle">Vista rápida de las estaciones más relevantes registradas.</p>
                </div>
                <Link to="/locations" className="btn btn-outline">
                  Ver todas →
                </Link>
              </div>

              <div className="panel-card-body no-padding">
                <LocationsTable locations={locations.slice(0, 10)} />
              </div>
            </div>
          </>
        )}

        <footer className="footer-note">
          Universidad Técnica Estatal de Quevedo — UTEQ
          <br />
          Aplicaciones Telemáticas Basadas en Web
          <br />© 2026 · Irrael Suárez
        </footer>
      </div>
    </>
  );
}

export default HomePage;
