import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, Col, Row } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot, faTemperatureHigh, faWind, faClock, faLink,faShield } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
// Function to center the map when the userlocation changes

function Starting() {

  const [show, setShow] = useState(false);
  const [acts,setAct]=useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  
  const [,setNewuser]=useState(false)
  const [weather,setWeather]=useState({})
  const [full,setFull]=useState(false);
  const [users, setUsers] = useState([
    {gender: "", age: 0, fitnessLevel: "" },
  ]);
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
          (error) => {
            console.error('Error fetching location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }, []);

  const [commonFields, setCommonFields] = useState({
    timeToSpend: ""
  });
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
    setFull(false)
    toast.info("Add the details of the new user");
    setNewuser(true)
  };

  const submitHandle = async() => {

    const commonIncomplete = Object.values(commonFields).some((value) => !value);

    if (commonIncomplete) {
      toast.warning("Please complete all common fields!");
      return;
    }
    else if (users.some((user) => Object.values(user).some((value) => !value))) {
      toast.warning("Ensure all user details are filled before submitting!");
      return;
    }
    else if (!/^[0-9]+$/.test(users[currentIndex].age)) {
      toast.info("Age must be a number!");
      return;
    }
    else if (!/^[0-9]+$/.test(commonFields.timeToSpend)) {
      toast.info("Time must be a number!");
      return;
    }
      setFull(true)
      setNewuser(false)
      const result=await getWeather()
      setWeather(result.data)
      const {data}= await getActivities()
      setAct(data?.data)
      toast.success("Details submitted successfully!");
  };
  const [work,setWork]=useState({})
  const cardHandle=(index)=>{
    handleShow()
    setWork(acts[index])
  }
  const getActivities=async()=>{
    const match= weather?.temperature?.match(/[\d.]+/)
    const temperature= match ? parseFloat(match[0]) : 0;
    const match1= weather?.precipitation?.match(/[\d.]+/)
    const precipitation= match1 ? parseFloat(match1[0]) : 0;
    const match2= weather?.humidity?.match(/[\d.]+/)
    const humidity= match2 ? parseFloat(match2[0]) : 0;
    const match3= weather?.windSpeed?.match(/[\d.]+/)
    const windspeed= match3 ? parseFloat(match3[0]) : 0;
    return await axios({
      method:'POST',
      url:`http://localhost:5000/suggestionEngine/activitySuggestions`,
      data:{
        "longitude": parseInt(location?.lng),
        "latitude": parseInt(location?.lat),
        "temperature": temperature,
        "humidity": humidity,
        "windSpeed": windspeed,
        "precipitation": precipitation,
        "members": users,
        "timeRange": parseInt(commonFields.timeToSpend)
      },
      headers:{"Content-Type":'application/json'}
    }).then((response)=>{return response}).catch((err)=>{return err})
  }
  const getWeather=async()=>{
    return await axios({
      method:'POST',
      url:`http://127.0.0.1:5000/weather/weatherData?latitude=${location?.lat}&longitude=${location?.lng}`,
      data:'',
      headers:{"Content-Type":'application/json'}
    }).then((response)=>{return response}).catch((err)=>{return err})
  }


  let time=new Date()
  let timeStamp= new Intl.DateTimeFormat("en-GB",{year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(time)
  return (
    <div className="w-100 d-md-flex align-items-center justify-content-center">
      {!full && <div className="border border-primary p-2 rounded w-75 mt-md-4 form-section" id="cont">
        {users.length>1 && <div className="d-flex align-items-center justify-content-center">{users.map((user,index)=>(
          (user.age !== '' && user.gender !== '') &&
          <Card key={index} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title className="text-center">Person {index+1}</Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-center w-100">
                <p>Age: {user.age}</p>
                <p className="ms-3">Gender: {user.gender}</p>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        ))}</div>}
        <p className="fs-5x text-center text-warning">
          Please fill in the details below
        </p>

        {/* Common Fields */}
        <Box
          className="d-flex align-items-center justify-content-center flex-column text-light"
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Time to Spend (in minutes)"
            variant="outlined"
            className="w-75 mt-3"
            color="dark"
            value={commonFields.timeToSpend}
            onChange={(e) =>
              handleCommonInputChange("timeToSpend", e.target.value)
            }
            focused
          />
        </Box>

        {/* User-Specific Fields */}
        {users.map((user, index) => (
          <div key={index} hidden={index !== currentIndex}>
            <Box
              className="d-flex align-items-center justify-content-center flex-column text-light"
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Age"
                variant="outlined"
                className="w-75 mt-4"
                color="dark"
                // value={user.age}
                onChange={(e) => handleInputChange(index, "age", parseInt(e.target.value))}
                focused
              />
              <FormControl className="w-75 mt-4" focused>
                <InputLabel color="dark">Gender</InputLabel>
                <Select
                  color="dark"
                  value={user.gender}
                  onChange={(e) =>
                    handleInputChange(index, "gender", e.target.value)
                  }
                  label="Gender"
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
             
              <FormControl className="w-75 mt-4" focused>
                <InputLabel color="dark">Fitness Level</InputLabel>
                <Select
                color="dark"
                  value={user.fitnessLevel}
                  onChange={(e) =>
                    handleInputChange(index, "fitnessLevel", e.target.value)
                  }
                  label="Fitness Level"
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
        <div className="d-flex align-items-center justify-content-center mt-5 mb-5">
          {currentIndex === users.length - 1 && (
            <Button variant="primary" onClick={addUser}>
              Add New User
            </Button>
          )}
          <Button
            variant="warning"
            className="ms-3"
            onClick={submitHandle}
          >
            Submit
          </Button>
    
        </div>
      </div>}
      {full && <div className="w-100 mt-4 p-3 border border-info rounded">
      <div className="w-100 mb-2 d-flex align-items-center justify-content-center weather-section" style={{background:'url("https://i.gifer.com/SBMh.gif")',height:'200px', backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
      <Card style={{ width: '25rem' }} border="info">
      <ListGroup variant="flush">
        <ListGroup.Item className=" bg-dark text-light fs-3x text-shadow fa-lg-xl p-3">
        <FontAwesomeIcon icon={faTemperatureHigh} fade  className="me-5" size="xl"/>Temperature:   {weather?.temperature}</ListGroup.Item>
        <ListGroup.Item className="text-primary fa-lg-xl p-3">
        <FontAwesomeIcon icon={faWind} fade className="me-5" size="xl"/>
          Wind Speed: {weather?.windSpeed}</ListGroup.Item>
    <ListGroup.Item className=" bg-dark text-light text-shadow p-3">
    <FontAwesomeIcon icon={faClock} fade className="me-5" size="xl"/> 
      {timeStamp}, Muenster
    </ListGroup.Item>
      </ListGroup>
    </Card>     
      </div>
<div className="container w-100">
      <h3 className="text-center text-info">Suggested Activities</h3>
      <Row className="w-100 mt-3 ms-1">
        {acts?.map((activity,index)=>(
            <Col key={index} sm={12} lg={6} className="d-flex align-items-center justify-content-center p-3">
            <Card className="activity-card" style={{ width: '100%' }} onClick={()=>{cardHandle(index);}}>
          <Card.Img variant="top" src={activity.image} style={{height:'300px'}}/>
          <Card.Body>
            <Card.Title className="text-center text-info fa-xl">{activity.activity}</Card.Title>
            <Card.Text>
              <p>{activity.description} {activity.groupSuitability}. Time Required is {activity.timeRequired}.</p>
            </Card.Text>
          </Card.Body>
        </Card> 
            </Col>
        ))}  
        </Row> 
</div> 
    </div>}
      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title>{work.activity}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="w-100">
            <Col sm={12} lg={5} className="d-flex align-items-center justify-content-center">
              <img src={work.image} alt="" style={{width:'100%', height:'250px'}}/>
            </Col>
            <Col sm={12} lg={7} className="d-flex align-items-center justify-content-center">
            <ListGroup className="w-100">
              <ListGroup.Item><FontAwesomeIcon icon={faLocationDot} size="lg" className="me-2 text-danger"/><span>Location Name</span>: <span className="text-info">{work.locationInfo?.pathNameOrLocationName}</span></ListGroup.Item>
              <ListGroup.Item><FontAwesomeIcon icon={faSun} size="lg" beat className="text-warning me-2"/><span >Lighting</span>: {work.locationInfo?.lighting}</ListGroup.Item>
              <ListGroup.Item><span className="text-warning">Info</span>: {work.locationInfo?.description}</ListGroup.Item>
              <ListGroup.Item ><FontAwesomeIcon icon={faShield} size="lg" className="me-2 text-success"/><span className="text-danger fa-md">Tips</span>: {work.locationInfo?.safetyTips.map((item, i)=>(<p key={i} className="ms-5">{item}</p>))}</ListGroup.Item>
              <ListGroup.Item><Link to={work.locationInfo?.redirectUrl} target="_blank"><FontAwesomeIcon icon={faLink} size="lg"/> View in Google Maps</Link></ListGroup.Item>
    </ListGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme="colored" autoClose={1500} position="top-center" />
    </div>
  );
}

export default Starting;
