import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmog, faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbarheader() {
  return (
    <Navbar className="navbar-glass fixed-top" style={{ top: "0px", zIndex: "300", height: "62px" }}>
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <FontAwesomeIcon icon={faSmog} className="text-info" size="xl" />
          <span className="navbar-brand-text">Breezeplan</span>
        </Navbar.Brand>
        <div className="d-flex gap-3">
          <Link to="/" className="navbar-link">
            <FontAwesomeIcon icon={faHouse} className="me-1" />
            Home
          </Link>
          <Link to="/Getsuggestion" reloadDocument className="navbar-link navbar-link-primary">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="me-1" />
            New Search
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default Navbarheader;
