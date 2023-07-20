
import './quicksearch.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {BsBookmarkFill,BsBookmark} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {getSaved} from '../../redux/slice/savedSlice';
import {addtosaved} from '../../redux/slice/savedSlice';
import {Dropdown} from 'react-bootstrap';
import Card from '../weathercard/card';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
function Quicksearch() {

    const [weather, setWeather] = useState({});
    const [city, setCity] = useState("London");
    const dispatch = useDispatch();
    const saved = useSelector(getSaved);
    let cities1 = [];
    const [cities,setCities] = useState([]);
    const [buttonShow,setButtonShow] = useState(false);
    const getWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/weather?city='+city,
            headers: { 'X-Api-Key': 'ty9QjplTez5tslZcOyr+2w==HahlVgnk6DJMUEJa'},
            contentType: 'application/json',
          };
          
          try  {
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
    const getCities = async () => {
          try {
              const response = await axios.request("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json");
              response.data.map((city) => {
                   cities1.push(city.name);
                })
                setCities(cities1);
                cities1 = [];
          } catch (error) {
              console.error(error);
          }
    }
    
      useEffect(() => {
        getCities();
    }, [])

    // useEffect(() => {
    //     getWeather();
    // }, [city])

    React.useEffect(() => {
        const getWeather = setTimeout(async  () => {
            const options = {
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/weather?city='+city,
                headers: { 'X-Api-Key': 'ty9QjplTez5tslZcOyr+2w==HahlVgnk6DJMUEJa'},
                contentType: 'application/json',
        
              };
              
              try  {
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
        }, 2000)
    
        return () => clearTimeout(getWeather)
      }, [city])
      
    const handleCity = (e) => {
        setButtonShow(true);
        setCity(e.target.value);
    }
    const searchClick = (selected) => {
        setCity(selected);
        setButtonShow(!buttonShow);
    }
    const isFound = saved.some(element => {
        if (element.payload === city) {
          return true;
        }
        return false;
      });
    const handleSave = () => {
        console.log(saved.includes(city));
        if (isFound === true) {
            alert("City already saved");
            return;
        }else if (isFound === false){ 
            alert("City saved") ;
            dispatch(addtosaved({payload : city}));
        }
    }
  return (
    <>
    <div className="page-container">
        
        <div className="input-group  w-25 d-flex justify-content-center flex-column " >
            
            <input type="text" className="form-control w-100" onChange={handleCity} value={city} placeholder={"Search your city"} aria-label="City" aria-describedby="basic-addon1"/>
           { cities.filter((ele) => 
           ele.toLowerCase().startsWith(city.toLowerCase())).slice(0,4)

           .map((ele) => {

            return buttonShow && <button type="button" onClick={()=>{searchClick(ele)}} class="btn">{ele}</button>} )
            }
        </div>  
         
        <div className='city-card'>

        <Card onclick={handleSave} city={city} feels_like={weather.feels_like} 
         temp={weather.temp}
         humidity={weather.humidity}
         min_temp={weather.min_temp}
         max_temp={weather.max_temp}
         wind_speed={weather.wind_speed}
         icon={<BsBookmark className='saveicon' onClick={handleSave}/>}

         ></Card></div>
         
    </div>
    </>
  );
}

export default Quicksearch;
