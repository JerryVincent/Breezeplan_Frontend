import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faPlus,
  faPaperPlane,
  faUser,
  faLocationDot,
  faTemperatureHigh,
  faWind,
  faClock,
  faLink,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

/* ── MUI dark-theme overrides ── */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": { borderColor: "rgba(13,202,240,0.35)" },
    "&:hover fieldset": { borderColor: "rgba(13,202,240,0.65)" },
    "&.Mui-focused fieldset": { borderColor: "#0dcaf0", borderWidth: "2px" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.55)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#0dcaf0" },
};

const selectSx = {
  color: "white",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(13,202,240,0.35)" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(13,202,240,0.65)" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0dcaf0",
    borderWidth: "2px",
  },
  "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.7)" },
};

const labelSx = {
  color: "rgba(255,255,255,0.55)",
  "&.Mui-focused": { color: "#0dcaf0" },
};

const menuProps = {
  PaperProps: {
    sx: {
      bgcolor: "#0d1b3e",
      border: "1px solid rgba(13,202,240,0.2)",
      "& .MuiMenuItem-root": {
        color: "rgba(255,255,255,0.85)",
        "&:hover": { bgcolor: "rgba(13,202,240,0.1)" },
        "&.Mui-selected": { bgcolor: "rgba(13,202,240,0.15)" },
      },
    },
  },
};

function Starting() {
  const [show, setShow] = useState(false);
  const [acts, setAct] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [, setNewuser] = useState(false);
  const [weather, setWeather] = useState({});
  const [full, setFull] = useState(false);
  const [users, setUsers] = useState([{ gender: "", age: 0, fitnessLevel: "" }]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => toast.error("Location access denied. Please enable location permissions and refresh.")
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  }, []);

  const [commonFields, setCommonFields] = useState({ timeToSpend: "" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleInputChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  const handleCommonInputChange = (field, value) => {
    setCommonFields({ ...commonFields, [field]: value });
  };

  const addUser = () => {
    const incomplete = Object.values(users[currentIndex]).some((value) => !value);
    if (incomplete) {
      toast.warning("Please complete all fields for the current user!");
      return;
    }
    if (!/^[0-9]+$/.test(users[currentIndex].age)) {
      toast.info("Age must be a number!");
      return;
    }
    if (!/^[0-9]+$/.test(commonFields.timeToSpend)) {
      toast.info("Time must be a number!");
      return;
    }
    setUsers([...users, { gender: "", age: 0, fitnessLevel: "" }]);
    setCurrentIndex(currentIndex + 1);
    setFull(false);
    toast.info("Add the details of the new user");
    setNewuser(true);
  };

  const submitHandle = async () => {
    const commonIncomplete = Object.values(commonFields).some((value) => !value);
    if (commonIncomplete) {
      toast.warning("Please complete all common fields!");
      return;
    } else if (users.some((user) => Object.values(user).some((value) => !value))) {
      toast.warning("Ensure all user details are filled before submitting!");
      return;
    } else if (!/^[0-9]+$/.test(users[currentIndex].age)) {
      toast.info("Age must be a number!");
      return;
    } else if (!/^[0-9]+$/.test(commonFields.timeToSpend)) {
      toast.info("Time must be a number!");
      return;
    }
    if (!location) {
      toast.error("Location is not available. Please enable location permissions and try again.");
      return;
    }

    setNewuser(false);

    const weatherResult = await getWeather();
    if (weatherResult instanceof Error || weatherResult?.response || !weatherResult?.data) {
      const msg = weatherResult?.response?.data?.message || weatherResult?.message || "Failed to fetch weather data. Please try again.";
      toast.error(msg);
      return;
    }
    setWeather(weatherResult.data);

    const activitiesResult = await getActivities(weatherResult.data);
    if (activitiesResult instanceof Error || activitiesResult?.response || !activitiesResult?.data) {
      const msg = activitiesResult?.response?.data?.message || activitiesResult?.message || "Failed to fetch activity suggestions. Please try again.";
      toast.error(msg);
      return;
    }

    setAct(activitiesResult.data?.data);
    setFull(true);
    toast.success("Details submitted successfully!");
  };

  const [work, setWork] = useState({});
  const cardHandle = (index) => {
    handleShow();
    setWork(acts[index]);
  };

  const getActivities = async (weatherData) => {
    const match = weatherData?.temperature?.match(/[\d.]+/);
    const temperature = match ? parseFloat(match[0]) : 0;
    const match1 = weatherData?.precipitation?.match(/[\d.]+/);
    const precipitation = match1 ? parseFloat(match1[0]) : 0;
    const match2 = weatherData?.humidity?.match(/[\d.]+/);
    const humidity = match2 ? parseFloat(match2[0]) : 0;
    const match3 = weatherData?.windSpeed?.match(/[\d.]+/);
    const windspeed = match3 ? parseFloat(match3[0]) : 0;
    return await axios({
      method: "POST",
      url: `http://localhost:5000/suggestionEngine/activitySuggestions`,
      data: {
        longitude: parseInt(location?.lng),
        latitude: parseInt(location?.lat),
        temperature,
        humidity,
        windSpeed: windspeed,
        precipitation,
        members: users,
        timeRange: parseInt(commonFields.timeToSpend),
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response)
      .catch((err) => err);
  };

  const getWeather = async () => {
    return await axios({
      method: "POST",
      url: `http://127.0.0.1:5000/weather/weatherData?latitude=${location?.lat}&longitude=${location?.lng}`,
      data: "",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response)
      .catch((err) => err);
  };

  const timeStamp = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  return (
    <div className="suggestion-page">
      {/* ── FORM ── */}
      {!full && (
        <div className="suggestion-form-glass">
          {/* Person chips */}
          {users.length > 1 && (
            <div className="person-chips-wrap">
              {users.map((user, index) =>
                user.age !== "" && user.gender !== "" ? (
                  <div key={index} className="person-chip">
                    <span className="chip-num">{index + 1}</span>
                    <span>
                      {user.gender}, {user.age} yrs
                    </span>
                  </div>
                ) : null
              )}
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-4">
            <div className="step-badge">
              <FontAwesomeIcon icon={faUser} />
              &nbsp;Person {currentIndex + 1}
            </div>
            <h2 className="form-page-title">Plan Your Adventure</h2>
            <p className="form-page-sub">
              Share your group details to get personalised outdoor suggestions
            </p>
          </div>

          {/* Common field */}
          <Box className="d-flex flex-column gap-4" component="form" noValidate autoComplete="off">
            <TextField
              label="Time Available (minutes)"
              variant="outlined"
              fullWidth
              sx={inputSx}
              value={commonFields.timeToSpend}
              onChange={(e) => handleCommonInputChange("timeToSpend", e.target.value)}
            />
          </Box>

          {/* Per-user fields */}
          {users.map((user, index) => (
            <div key={index} hidden={index !== currentIndex}>
              <Box
                className="d-flex flex-column gap-4 mt-4"
                component="form"
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Age"
                  variant="outlined"
                  fullWidth
                  sx={inputSx}
                  onChange={(e) =>
                    handleInputChange(index, "age", parseInt(e.target.value))
                  }
                />
                <FormControl fullWidth>
                  <InputLabel sx={labelSx}>Gender</InputLabel>
                  <Select
                    value={user.gender}
                    onChange={(e) => handleInputChange(index, "gender", e.target.value)}
                    label="Gender"
                    sx={selectSx}
                    MenuProps={menuProps}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel sx={labelSx}>Fitness Level</InputLabel>
                  <Select
                    value={user.fitnessLevel}
                    onChange={(e) =>
                      handleInputChange(index, "fitnessLevel", e.target.value)
                    }
                    label="Fitness Level"
                    sx={selectSx}
                    MenuProps={menuProps}
                  >
                    <MenuItem value={"Beginner"}>Beginner</MenuItem>
                    <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                    <MenuItem value={"Advanced"}>Advanced</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          ))}

          {/* Buttons */}
          <div className="d-flex align-items-center justify-content-center gap-3 mt-5 flex-wrap">
            {currentIndex === users.length - 1 && (
              <button className="form-btn-add" onClick={addUser}>
                <FontAwesomeIcon icon={faPlus} /> Add Person
              </button>
            )}
            <button className="form-btn-submit" onClick={submitHandle}>
              <FontAwesomeIcon icon={faPaperPlane} /> Get Suggestions
            </button>
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {full && (
        <div className="w-100">
          {/* Weather hero */}
          <div className="weather-hero mb-4">
            <div className="weather-hero-overlay" />
            <div className="weather-stats-row">
              <div className="weather-location-badge">
                <FontAwesomeIcon icon={faLocationDot} />
                &nbsp;Muenster
              </div>
              <div className="w-100 d-flex flex-wrap gap-3 justify-content-center mt-2">
                <div className="weather-stat-item">
                  <FontAwesomeIcon
                    icon={faTemperatureHigh}
                    className="weather-stat-icon text-warning"
                  />
                  <span className="weather-stat-label">Temperature</span>
                  <span className="weather-stat-value">{weather?.temperature}</span>
                </div>
                <div className="weather-stat-item">
                  <FontAwesomeIcon
                    icon={faWind}
                    className="weather-stat-icon text-info"
                  />
                  <span className="weather-stat-label">Wind Speed</span>
                  <span className="weather-stat-value">{weather?.windSpeed}</span>
                </div>
                <div className="weather-stat-item">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="weather-stat-icon"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  />
                  <span className="weather-stat-label">Time</span>
                  <span className="weather-stat-value" style={{ fontSize: "0.75rem" }}>
                    {timeStamp}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activities header */}
          <div className="activities-header">
            <h3 className="activities-title">Suggested Activities</h3>
            <p className="activities-sub">
              Tap any card for location details &amp; safety tips
            </p>
          </div>

          {/* Activity cards grid */}
          <Row className="g-4">
            {acts?.map((activity, index) => (
              <Col key={index} sm={12} lg={6}>
                <div
                  className="activity-card-dark"
                  style={{ animationDelay: `${index * 0.1 + 0.05}s` }}
                  onClick={() => cardHandle(index)}
                >
                  <div className="activity-card-img-wrap">
                    <img src={activity.image} alt={activity.activity} />
                    <div className="activity-card-img-overlay" />
                  </div>
                  <div className="activity-card-body">
                    <div className="activity-card-title">{activity.activity}</div>
                    <p className="activity-card-desc">{activity.description}</p>
                    <div className="activity-card-meta">
                      <span className="activity-tag">
                        <FontAwesomeIcon icon={faClock} size="xs" />
                        &nbsp;{activity.timeRequired}
                      </span>
                      <span className="activity-tag">{activity.groupSuitability}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* ── MODAL ── */}
      <Modal show={show} onHide={handleClose} animation={false} size="lg" className="modal-dark">
        <Modal.Header closeButton>
          <Modal.Title>{work.activity}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col
              sm={12}
              lg={5}
              className="d-flex align-items-center justify-content-center mb-3 mb-lg-0"
            >
              <img
                src={work.image}
                alt=""
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </Col>
            <Col sm={12} lg={7}>
              <ListGroup variant="flush">
                <ListGroup.Item className="modal-list-item">
                  <FontAwesomeIcon icon={faLocationDot} className="me-2 text-danger" />
                  <span className="text-white-50">Location:</span>{" "}
                  <span className="text-info">
                    {work.locationInfo?.pathNameOrLocationName}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="modal-list-item">
                  <FontAwesomeIcon icon={faSun} className="text-warning me-2" beat />
                  <span className="text-white-50">Lighting:</span>{" "}
                  {work.locationInfo?.lighting}
                </ListGroup.Item>
                <ListGroup.Item className="modal-list-item">
                  <span className="text-warning">Info:</span>{" "}
                  {work.locationInfo?.description}
                </ListGroup.Item>
                <ListGroup.Item className="modal-list-item">
                  <FontAwesomeIcon icon={faShield} className="me-2 text-success" />
                  <span className="text-danger">Safety Tips:</span>
                  {work.locationInfo?.safetyTips.map((item, i) => (
                    <p
                      key={i}
                      className="ms-4 mb-1 mt-1"
                      style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}
                    >
                      {item}
                    </p>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item className="modal-list-item">
                  <Link
                    to={work.locationInfo?.redirectUrl}
                    target="_blank"
                    className="text-info text-decoration-none"
                  >
                    <FontAwesomeIcon icon={faLink} className="me-2" />
                    View in Google Maps
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="form-btn-add" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <ToastContainer theme="colored" autoClose={1500} position="top-center" />
    </div>
  );
}

export default Starting;
