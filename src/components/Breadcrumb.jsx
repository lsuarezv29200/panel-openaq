import { Link } from "react-router-dom";

/**
 * Migas de pan para reflejar la navegación jerárquica:
 * Inicio > Estaciones > Ubicación > Sensor
 *
 * items: [{ label: string, to?: string }]
 * El último elemento (sin "to") se muestra como página actual.
 */
function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb-nav" aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {item.to && !isLast ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span className={isLast ? "breadcrumb-current" : ""}>{item.label}</span>
            )}
            {!isLast && <span className="breadcrumb-sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
