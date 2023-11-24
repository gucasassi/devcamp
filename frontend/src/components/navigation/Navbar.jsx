import { Link } from "react-router-dom";
import { navbarLinks } from "../../data/navbar-links";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <i className="fas fa-laptop-code"></i> DevCamp
        </Link>
        {/* Navbar Links */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {navbarLinks.map((link) => {
              return (
                <li key={link.id} className="nav-item">
                  <a className="nav-link" href={link.path}>
                    <i className={link.icon}></i> {link.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
