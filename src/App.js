import React from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherLocation from './components/WeatherLocation';


function App() {
  return (
    <div className="App">
      
        <img src={logo} className="App-logo" alt="logo" />
      <WeatherLocation></WeatherLocation>
    
    </div>
  );
}

export default App;
