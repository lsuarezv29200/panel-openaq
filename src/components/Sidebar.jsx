import { NavLink } from "react-router-dom";

/**
 * Barra lateral de navegación del panel.
 * Usa NavLink para resaltar automáticamente la sección activa.
 */
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">AQ</div>
        <div>
          <div className="sidebar-brand-title">OpenAQ</div>
          <div className="sidebar-brand-subtitle">Panel ambiental</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
        >
          🏠 Inicio
        </NavLink>

        <NavLink
          to="/locations"
          className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
        >
          📍 Estaciones
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        Aplicaciones Telemáticas
        <br />
        UTEQ
      </div>
    </aside>
  );
}

export default Sidebar;
