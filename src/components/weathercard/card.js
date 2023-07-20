
import './card.css';
import React, { useEffect } from 'react';

import {BsBookmarkFill,BsBookmark} from 'react-icons/bs';

function Card(props) {


  return (
    <>
    <div className="card-container">
        <div class="card" >
            <div class="card-body">
                {props.icon}
                <p class="card-title">{props.temp}&deg;C</p>
                <h6 class="card-city">{props.city}</h6>
                <div className='moreinfo'>
                    <div className='moreinfo-item'>
                        <p>Feels Like</p>
                        <p>{props.feels_like}&deg;C</p>
                    </div>
                    <div className='moreinfo-item'>
                        <p>Max. temp</p>
                        <p>{props.max_temp}&deg;C</p>
                    </div>
                    <div className='moreinfo-item'>
                        <p>Min. temp</p>
                        <p>{props.min_temp}&deg;C</p>
                    </div>
                    <div className='moreinfo-item'>
                        <p>Humidity</p>
                        <p>{props.humidity}%</p>
                    </div>
                    <div className='moreinfo-item'>
                        <p>Wind</p>
                        <p>{props.wind_speed}km/h</p>
                    </div>


                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Card;
