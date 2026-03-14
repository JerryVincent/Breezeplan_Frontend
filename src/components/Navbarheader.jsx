import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmog } from "@fortawesome/free-solid-svg-icons";
function Navbarheader() {
  return (
    <>
      <Navbar
        className="bg-primary mb-2 fixed-top"
        style={{ top: "0px", zIndex: "300", height: "60px" }}
      >
        <Container>
          <Navbar.Brand>
            <div className="w-100 d-flex align-items-center justify-content-center">
              <FontAwesomeIcon
                icon={faSmog}
                className="text-light me-2"
                size="2xl"
              />{" "}
              <p className="text-light mt-2">Breezeplan</p>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarheader;
