
import './saved.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {BsBookmarkFill,BsBookmark} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {getSaved} from '../../redux/slice/savedSlice';
import {removefromsaved} from '../../redux/slice/savedSlice';
import {Dropdown} from 'react-bootstrap';
import Card from '../weathercard/card';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
function Quicksearch() {

    const [weather, setWeather] = useState({});
    const [city, setCity] = useState("");
    const dispatch = useDispatch();
    const [savedCities,setSavedCities] = useState(useSelector(getSaved));
    const getWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/weather?city='+city,
            headers: { 'X-Api-Key': 'ty9QjplTez5tslZcOyr+2w==HahlVgnk6DJMUEJa'},
            contentType: 'application/json',
          };
          
          try {
              const response = await axios.request(options);
              setWeather(response.data);
              response.status === 200 ? console.log("City found") : console.log("City not found");
          } catch (error) {
              console.error(error);
              switch (error.response.status) {
                case 404:
                    alert("City not found");
                    break;
                case 403:
                    alert("forbidden");
                    break; 
                case 400:
                  console.log("Bad request");
                  break;       
                case 500:
                    alert("Server error");
                    break;
                default:
                    break;
              }
          } 
      }
   
    useEffect(() => {
        getWeather();
    }, [city])

    useEffect(() => {
    }, [savedCities]) 
    const handleCity = (C) => {
        setCity(C);
    }
    const isFound = savedCities.some(element => {
        if (element.payload === city) {
          return true;
        }
        return false;
      });
    const handleUnSave = () => {
        
        if (isFound === true){ 
            dispatch(removefromsaved({payload : city}));
            setSavedCities(savedCities.filter((ele) =>
            ele.payload.toLowerCase()  !== city.toLowerCase()));
            
            // saved= useSelector(getSaved);
            alert("City removed from saved");
        }
    }
  return (
    <>
    <div className="page-container">
   
    <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic">
        Saved Cities
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
            savedCities.map((ele) => {   
                // console.log(`ele in map: ${JSON.stringify(ele.payload)}`);
            return <Dropdown.Item onClick={()=>{setCity(ele.payload)}} >{ele.payload}</Dropdown.Item>
            })
        }
      </Dropdown.Menu>
    </Dropdown>
    <div className='city-card'>
        <Card city={city} feels_like={weather.feels_like} 
         temp={weather.temp}
         humidity={weather.humidity}
         min_temp={weather.min_temp}
         max_temp={weather.max_temp}
         wind_speed={weather.wind_speed}
         icon={<BsBookmarkFill className='saveicon' onClick={handleUnSave}/>}

         ></Card>
    </div>     
    </div>
    </>
  );
}

export default Quicksearch;
