/**
 * Encabezado superior de cada página.
 * Recibe título y subtítulo por props para que cada página lo personalice.
 */
function Header({ title, subtitle, userName = "Israel Suárez Vera", userRole = "Estudiante" }) {
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="page-header">
      <div>
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>

      <div className="page-header-user">
        <div>
          <div className="page-header-user-name">{userName}</div>
          <div className="page-header-user-role">{userRole}</div>
        </div>
        <div className="page-header-avatar">{initials}</div>
      </div>
    </header>
  );
}

export default Header;
