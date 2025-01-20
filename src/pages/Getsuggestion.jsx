import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardBody, CardTitle, Col, Row } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTemperatureHigh, faWind, faClock, faLink } from '@fortawesome/free-solid-svg-icons';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import GoogleMapReact from 'google-map-react';
import { Link } from "react-router-dom";
// Function to center the map when the userlocation changes

function Starting() {

  const Activities={
    
      "success": true,
      "data": [
        {
          "id": 1,
          "activity": "Jogging",
          "description": "A light jog around the local park.",
          "groupSuitability": "Suitable for individuals and couples",
          "timeRequired": "60-90 min",
          "image": "https://www.eatthis.com/wp-content/uploads/sites/4/2022/11/fit-man-beach-jogging.jpg?quality=82&strip=1",
          "locationInfo": {
            "pathNameOrLocationName": "Promenade",
            "length": "3.0 km",
            "lighting": "Well-lit",
            "description": "A jogging loop around the main city park with excellent lighting.",
            "redirectUrl": "https://www.google.com/maps/dir/?api=1&destination=51.9625,7.6256&travelmode=walking",
            "safetyTips": [
              "Wear comfortable running shoes.",
              "Stretch before and after jogging.",
              "Carry a water bottle to stay hydrated."
            ]
          },
          "file_name": "small_group_warm_long",
          "tableHash": "6eabf1c39a814344c38e3befee1d6c9d"
        },
        {
          "id": 3,
          "activity": "Outdoor Yoga",
          "description": "A relaxing yoga session in the park.",
          "groupSuitability": "Best for individuals or groups up to 4 people",
          "timeRequired": "30-60 min",
          "image": "https://t3.ftcdn.net/jpg/10/14/34/96/360_F_1014349606_vnvZLp7AyBcQCD1uTV9iRmYelnvstIlj.jpg",
          "locationInfo": {
            "pathNameOrLocationName": "Aasee Park",
            "length": "N/A",
            "lighting": "Natural light",
            "description": "A peaceful area in the park ideal for yoga and meditation.",
            "redirectUrl": "https://www.google.com/maps/dir/?api=1&destination=51.949500,7.595000&travelmode=walking",
            "safetyTips": [
              "Bring your own yoga mat.",
              "Stay hydrated during the session.",
              "Choose a quiet time for a more peaceful experience."
            ]
          },
          "file_name": "small_group_warm_long",
          "tableHash": "6eabf1c39a814344c38e3befee1d6c9d"
        },
        {
          "id": 5,
          "activity": "Rock Climbing",
          "description": "Test your strength and endurance by climbing rocks or walls.",
          "groupSuitability": "Best for small groups or pairs",
          "timeRequired": "2-3 hours",
          "image": "https://media.istockphoto.com/id/527531592/photo/rock-climber-clinging-to-a-cliff.jpg?s=612x612&w=0&k=20&c=2AUDSQAWDVzyvTeWQ5rXTwQGGBqQ0eCJw4kk4S6r6OQ=",
          "locationInfo": {
            "pathNameOrLocationName": "DAV Boulderzentrum Münster",
            "length": "N/A",
            "lighting": "Well-lit",
            "description": "Indoor rock climbing facility with a variety of routes for all skill levels.",
            "redirectUrl": "https://www.google.com/maps/dir/?api=1&destination=51.960300,7.637900&travelmode=walking",
            "safetyTips": [
              "Always use a harness and belay system.",
              "Warm up before climbing.",
              "Be mindful of other climbers."
            ]
          },
          "file_name": "small_group_warm_long",
          "tableHash": "6eabf1c39a814344c38e3befee1d6c9d"
        },
        {
          "id": 6,
          "activity": "Picnic",
          "description": "Relax and enjoy food outdoors in a local park.",
          "groupSuitability": "Suitable for families and small groups",
          "timeRequired": "1-3 hours",
          "image": "https://media.istockphoto.com/id/966221022/photo/family-camping-by-lake-on-hiking-adventure-in-forest.jpg?s=612x612&w=0&k=20&c=jZ55xsvOxoVc6ejbCtz3LyCOeSbgPcExW3gjiID9suc=",
          "locationInfo": {
            "pathNameOrLocationName": "Botanischer Garten Münster",
            "length": "N/A",
            "lighting": "Partially shaded",
            "description": "A scenic park by the lake with plenty of picnic spots.",
            "redirectUrl": "https://www.google.com/maps/dir/?api=1&destination=51.963000,7.614500&travelmode=walking",
            "safetyTips": [
              "Bring blankets and comfortable seating.",
              "Avoid leaving food out in the heat.",
              "Pack insect repellent if needed."
            ]
          },
          "file_name": "small_group_warm_long",
          "tableHash": "6eabf1c39a814344c38e3befee1d6c9d"
        },
        {
          "id": 8,
          "activity": "Kayaking",
          "description": "Paddle down rivers or lakes while enjoying the serenity of nature.",
          "groupSuitability": "Suitable for pairs or small groups",
          "timeRequired": "1-3 hours",
          "image": "https://media.istockphoto.com/id/610864024/photo/couple-kayaking-together.jpg?s=612x612&w=0&k=20&c=zeioetaU5WM6uUnZAGoWBHnkilMeK1pexGX1ZitPU1o=",
          "locationInfo": {
            "pathNameOrLocationName": "Aasee Lake",
            "length": "N/A",
            "lighting": "Natural light",
            "description": "A calm lake ideal for kayaking and exploring nature.",
            "redirectUrl": "https://www.google.com/maps/dir/?api=1&destination=51.949500,7.595000&travelmode=walking",
            "safetyTips": [
              "Wear a life jacket at all times.",
              "Check the weather before heading out on the water.",
              "Stay aware of your surroundings."
            ]
          },
          "file_name": "small_group_warm_long",
          "tableHash": "6eabf1c39a814344c38e3befee1d6c9d"
        },
        {
          "id": 10,
          "activity": "Horseback Riding",
          "description": "Explore trails on horseback for a unique outdoor experience.",
          "groupSuitability": "Best for individuals or pairs",
          "timeRequired": "1-2 hours",
          "image": "https://media.istockphoto.com/id/1408512831/photo/woman-riding-horse-at-country-farm.jpg?s=612x612&w=0&k=20&c=UPKbFDZUSqgr7k4pQdp0Q1lGY6JlxRA1PaWAQss6cPE=",
          "locationInfo": {
            "pathNameOrLocationName": "Reitverein St. Georg Münster",
            "length": "5.0 km",
            "lighting": "Natural light",
            "description": "Ride through scenic trails on horseback, ideal for nature lovers.",
            "redirectUrl": "https://www.google.com/maps/dir/?api=1&destination=51.963800,7.672500&travelmode=walking",
            "safetyTips": [
              "Wear a helmet for safety.",
              "Be aware of your horse's behavior.",
              "Stay on marked trails."
            ]
          },
          "file_name": "small_group_warm_long",
          "tableHash": "6eabf1c39a814344c38e3befee1d6c9d"
        }
      ]
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  
  const [newUser,setNewuser]=useState(false)
  const [details,setDetails]=useState({
    members:[],
    time:"",
    calories:""
  })
  const [weather,setWeather]=useState({})
  const [full,setFull]=useState(false);
  const [users, setUsers] = useState([
    { age: "", gender: "", fitnessLevel: "" },
  ]);
  const theme = useTheme();
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
    setUsers([...users, { age: "", gender: "", fitnessLevel: "" }]);
    setCurrentIndex(currentIndex + 1);
    setFull(false)
    toast.info("Add the details of the new user");
    setNewuser(true)
  };

  const submitHandle = async() => {
    console.log(users);
    // console.log(personName);
    console.log(commonFields);
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
   
      setDetails({members:users,time:commonFields.timeToSpend,calories:commonFields.caloriesToBurn})
      setUsers([{ age: "", gender: "", fitnessLevel: "" },])
      setFull(true)
      setNewuser(false)
      // console.log(details);
      const {data}=await getWeather()
      console.log(data)
      setWeather(data)
      console.log(Activities.data)
      toast.success("Details submitted successfully!");
  };
  const [id,setId]= useState('')
  const [work,setWork]=useState({})
  const cardHandle=(id)=>{
    setId(id)
    handleShow()
    setWork(Activities.data[id])
  }
  const getWeather=async()=>{
    return await axios({
      method:'GET',
      url:`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lng}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`,
      data:'',
      headers:{"Content-Type":'application/json'}
    }).then((response)=>{return response}).catch((err)=>{return err})
  }
  let time=new Date()
  let timeStamp= new Intl.DateTimeFormat("en-GB",{year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(time)
  // console.log(timeStamp)
  //  console.log(details);
  //  console.log(work);
  return (
    <div className="w-100 d-md-flex align-items-center justify-content-center">
      {!full && <div className="border border-primary p-2 rounded w-75 mt-md-4" id="cont">
        {users.length>1 && <div className="d-flex align-items-center justify-content-center">{users.map((user,index)=>(
          user.age!='' &&
          <Card style={{ width: '18rem' }}>
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
          {/* <TextField
            label="Calories to Burn"
            variant="outlined"
            className="w-75 mt-4"
            color="dark"
            value={commonFields.caloriesToBurn}
            onChange={(e) =>
              handleCommonInputChange("caloriesToBurn", e.target.value)
            }
            focused
          /> */}
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
                value={user.age}
                onChange={(e) => handleInputChange(index, "age", e.target.value)}
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
      <div className="w-100 mb-2 d-flex align-items-center justify-content-center" style={{background:'url("https://i.gifer.com/SBMh.gif")',height:'200px', backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
      <Card style={{ width: '25rem' }} border="info">
      <ListGroup variant="flush">
        <ListGroup.Item className=" bg-dark text-light fs-3x text-shadow fa-lg-xl p-3">
        <FontAwesomeIcon icon={faTemperatureHigh} fade  className="me-5" size="xl"/>Temperature:   {weather?.current?.temperature_2m }{weather?.current_units?.temperature_2m}</ListGroup.Item>
        <ListGroup.Item className="text-primary fa-lg-xl p-3">
        <FontAwesomeIcon icon={faWind} fade className="me-5" size="xl"/>
          Wind Speed: {weather?.current?.
wind_speed_10m}{weather?.current_units?.
  wind_speed_10m}</ListGroup.Item>
    <ListGroup.Item className=" bg-dark text-light fs-3x text-shadow fa-lg-xl p-3">
    <FontAwesomeIcon icon={faClock} fade className="me-5" size="xl"/> 
      Time: {timeStamp}
    </ListGroup.Item>
      </ListGroup>
    </Card>     
      </div>
<div className="container w-100">
      <h3 className="text-center text-info">Suggested Activities</h3>
      <Row className="w-100 mt-3 ms-1">
        {Activities.data.map((activity,index)=>(
            <Col sm={12} lg={6} className="d-flex align-items-center justify-content-center p-3">
            <Card style={{ width: '100%' }} onClick={(e)=>cardHandle(index)}>
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
            <Col sm={12} lg={4} className="d-flex align-items-center justify-content-center">
              <img src={work.image} alt="" style={{width:'100%', height:'200px'}}/>
            </Col>
            <Col sm={12} lg={8} className="d-flex align-items-center justify-content-center">
            <ListGroup className="w-100">
              <ListGroup.Item><span>Location Name</span>: {work.locationInfo?.pathNameOrLocationName}</ListGroup.Item>
              <ListGroup.Item><span >Lighting</span>: {work.locationInfo?.lighting}</ListGroup.Item>
              <ListGroup.Item><span className="text-warning">Info</span>: {work.locationInfo?.description}</ListGroup.Item>
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
