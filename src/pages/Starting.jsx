import React, { useState, useEffect, useRef } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// Function to center the map when the userlocation changes
const CenterMapOnLocation = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 13);
    }
  }, [location, map]);
  return null;
};

async function Starting(){
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
    const [details,setDetails]=useState({
        age:'',
        gender:'',
        weight:'',
        height:'',
        Mode:'',
        time:''
    });
    const handleChange = (event) => {
      setDetails({...details,Mode:event.target.value})
    }
    const handleChange1 = (event) => {
      setDetails({...details,gender:event.target.value})
    }
    const [full,setFull]=useState(false);
    const submitHandle=()=>{
        console.log(details);    
        const {age,gender,weight,height,time} = details
        if(!age || !gender || !weight || !height || !time){
            toast.warning('Please fill the form Completely!')
            setFull(false)
        }
       else if(!(!!age.match(/^[0-9]*$/))){
        toast.info("Age should be a number!") 
        setFull(false)  
       }
       else if(!(!!weight.match(/^[0-9]*$/))){
        toast.info("Weight should be a number!")  
        setFull(false) 
       }
       else if(!(!!height.match(/^[0-9]*$/))){
        toast.info("Height should be a number!") 
        setFull(false)  
       }
       else if(!(!!time.match(/^[0-9]*$/))){
        toast.info("Time should be a number!") 
        setFull(false)  
       }
       else{
        toast.success("Details added Successfully")
        setFull(true)
        setDetails({
          age:'',
          gender:'',
          weight:'',
          height:'',
          Mode: '',
          time:''
        })
       }     
    }
    let reqConfig={
      method:'GET',
      url:`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=6cbb72c1f565f747adff7a726ba881fc`,
      data:'',
      headers:{"Content-Type":'application/json'}
    }
    const result=await axios(reqConfig)
  return (
    <div className='w-100 d-md-flex align-items-center justify-content-center'>
        {!full && <div className='border border-primary p-2 rounded w-75 mt-md-4' id='cont'> 
            <p className='fs-5x text-center text-warning'>Please fill in the following Details</p>
            <Box className='d-flex align-items-center justify-content-center flex-column text-light'
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" value={details.age || ''} label="Age" variant="outlined" className='w-75 mt-3' color='dark' onChange={(e)=>setDetails({...details,age:e.target.value})} focused/>
      <FormControl className='w-75 mt-3' focused>
        <InputLabel id="demo-simple-select-autowidth-label" color='dark' variant="outlined">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={details.gender}
          onChange={handleChange1}
          label="Gender"
          variant="outlined"
          color='dark'
        >
          <MenuItem value={'Male'} className='bg-dark'>Male</MenuItem>
          <MenuItem value={'Female'} className='bg-warning'>Female</MenuItem>
          <MenuItem value={'Other'} className='bg-dark'>Other</MenuItem>
        </Select>
      </FormControl>
      <TextField id="outlined-basic" value={details.weight || ''} label="Weight(in kg)" variant="outlined" className='w-75 mt-3' color='dark' onChange={(e)=>setDetails({...details,weight:e.target.value})} focused/>
      <TextField id="outlined-basic" value={details.height || ''} label="Height(in cm)" variant="outlined" className='w-75 mt-3' color='dark' onChange={(e)=>setDetails({...details,height:e.target.value})} focused/>
      <FormControl className='w-75 mt-3' focused>
        <InputLabel id="demo-simple-select-autowidth-label" color='dark' variant="outlined">Mode</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={details.Mode}
          onChange={handleChange}
          label="Mode"
          variant="outlined"
          color='dark'
        >
          <MenuItem value={'Individual'} className='bg-warning'>Individual</MenuItem>
          <MenuItem value={'Group'} className='bg-dark'>Group</MenuItem>
        </Select>
      </FormControl>
      <TextField id="outlined-basic" value={details.time || ''} label="Time for Activity(in min)" variant="outlined" className='w-75 mt-3 mb-3' color='dark' onChange={(e)=>setDetails({...details,time:e.target.value})} focused/>
    </Box>
        <div className='d-flex align-items-center justify-content-center mb-3'>
        <Button variant="warning" onClick={submitHandle}>Submit</Button>
        <Link to={'/Getsuggestion'} className='ms-3'><Button variant="warning">Test File</Button></Link>
        {/* { full && <Link to={'/Getsuggestion'}><Button variant="primary" className='ms-3'>Get Started</Button></Link>} */}
        </div>
        </div>}
        {full && <div className="w-100 mt-4 p-3 border border-info rounded">
      
      <div className="d-flex w-100 align-items-center justify-content-center mb-3 ms-md-2">
            <form className="w-100 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faLocationDot}
                size="lg"
                className="text-danger me-1"
              />
              <input
                type="text"
                placeholder="Location to visit"
                className="form-control w-75 me-1"
              />
              <Button variant="primary">Go</Button>
            </form>
          </div>
        <div id="map" style={{ height: '60vh' }} className="w-100 p-3">
          <MapContainer 
            center={location ? [location.lat, location.lng] : [51.505, -0.50]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {location && (
              <>
                <CenterMapOnLocation location={location} />
                <Marker position={[location.lat, location.lng]}>
                  <Popup>🫵Your Current Location</Popup>
                </Marker>
              </>
            )}
          </MapContainer>
        </div>
    </div>}
        <ToastContainer theme='colored' autoClose={1500} position='top-center'/>
    </div>
  )
}

export default Starting