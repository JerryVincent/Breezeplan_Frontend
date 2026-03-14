import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbarheader() {
  return (
    <Navbar className="navbar-glass fixed-top" style={{ top: "0px", zIndex: "300", height: "62px" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <FontAwesomeIcon icon={faSmog} className="text-info" size="xl" />
          <span className="navbar-brand-text">Breezeplan</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Navbarheader;
