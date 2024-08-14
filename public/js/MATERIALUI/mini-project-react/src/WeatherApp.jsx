import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";

export default function WeatherApp(){
    let [weatherInfo, setWeatherInfo]=useState({
        city:"pune",
        feelslike:24.5,
        humidity:93,
        temp:23.65,
        tempMax:23.65,
        tempMin: 23.65,
        weather:"overcast clouds"
    });
    let updateInfo = (newInfo)=>{
        setWeatherInfo(newInfo);
    };

    return(
        <div style={{textAlign:"center"}}>
            <h1>Weather App by Delta</h1>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}