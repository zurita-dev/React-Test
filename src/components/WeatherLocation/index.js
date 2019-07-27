import React,{Component} from 'react';
import convert from 'convert-units';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';
import {
    SUN, 
} from './../../constants/weathers';

//https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY
//ca0f6440eaf453363e9c737cc5313414

const location = "Buenos Aires, ar";
const api_key = "ca0f6440eaf453363e9c737cc5313414";
const url_base_weather = "https://api.openweathermap.org/data/2.5/weather"; 

//const api_weather = `${url_base_weather}?q=${location}&appid=${api_key}&units=metric`;
const api_weather = `${url_base_weather}?q=${location}&appid=${api_key}`;

const data = {
    temperature: 5,
    weatherState: SUN,
    humidity: 10,
    wind: '10 m/s',
}


class  WeatherLocation  extends Component {

    constructor(){
        super();
        this.state = {
            city: "Buenos aires",
            data: data,
        };
    }

    getTemp = kelvin =>{
        return Number(convert(kelvin).from("K").to("C").toFixed(2));
        //return convert(kelvin).from("K").to("C");
    }
    
    getWeatherState = weather_data => {
        return SUN;
    }

    getData = weather_data => {
        const {humidity, temp } = weather_data.main;
        const {speed} = weather_data.wind;
        const weatherState = this.getWeatherState(weather_data);
        const temperature = this.getTemp(temp);

        const data = {
            humidity,
            temperature,
            weatherState,
            wind: `${speed} m/s`,
        }
        return data;
    }
   

    handleUpdateClick = () => {
        fetch(api_weather).then(resolve =>{
           
            return resolve.json();
        }).then(data => {
            const newWeather = this.getData(data);
            console.log(data);
            debugger;

            this.setState({
                data: newWeather
            })
           
        });
        
    }
    render(){
        const {city, data} = this.state;
        return (
            <div className="weatherLocationCont">
                <Location city={city}></Location>
                <WeatherData data={data}></WeatherData>
                <button onClick={this.handleUpdateClick}>Actualizar</button>
            </div>
        )
    }
}

export default WeatherLocation;
