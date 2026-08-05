import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

/**
 * Estructura general del panel: sidebar fija + área de contenido
 * donde React Router renderiza la página activa (Outlet).
 */
function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
