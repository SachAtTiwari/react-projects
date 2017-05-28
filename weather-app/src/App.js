import React, { Component } from 'react';
import './App.css';
import $  from 'jquery'
/* eslint-disable */


function AddIcon(props){
    const nature = props.nature;
    if(nature === 'Haze'){
        return <i className="wi wi-day-haze icon"></i>;
    }
    if(nature === 'Drizzle'){
        return <i className="wi wi-day-showers icon"></i>;
    }
    if(nature === 'Clouds'){
        return <i className="wi wi-day-cloudy icon"></i>;
    }
    if(nature === 'Rain'){
        return <Haze />;
        return <i className="wi wi-day-rain icon"></i>;
    }
    if(nature === 'Snow'){
        return <i className="wi wi-day-snow icon"></i>;
    }
    if(nature === 'Clear'){
        return <i className="wi wi-day-sunny icon"></i>;
    }
    if(nature === 'thunderstorm'){
        return <i className="wi wi-day-thunderstorm icon"></i>;
    }
    return null;
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data : [{location:'', temp:'', nature:''}]};
    this.results = [];
    var self = this;
    this.fah = 0;
    this.cen = 0;
    $.ajax({                                                                                                                                                           
      url: "http://ipinfo.io/json?callback=callbackjsonp",
      jsonp: "callback",
      jsonpCallback: "callbackjsonp",
      method: 'GET',
      dataType: "jsonp",
      success: function( response ) {
         var url = "http://api.openweathermap.org/data/2.5/weather?q=";
         var city = response.city;
         //var appid = "&APPID=061f24cf3cde2f60644a8240302983f2";
         var appid = "&APPID=404037b80a348078b6739976c5c56fec";
         var units = "&units=metric";
         var cb = "&callback=callbackjsonp";
         //console.log("url is 5", url);
         var urlmain = url + city + units + appid + cb;
         //console.log("url is ", urlmain);
         $.ajax({                                                                                                                                                             
            url: urlmain,
            jsonp: "callback",
            jsonpCallback: "callbackjsonp",
            method: 'GET',
            dataType: "jsonp",
            success: function( resp ) {
               //console.log("res is 1", response);
               //console.log("res ", resp);
               self.results = [];
               var temp = resp.main.temp
               self.results.push({location:response.city + ', ' + response.country, temp:temp.toString(), nature:resp.weather[0].main});
               self.setState({data:self.results});
            }
         });
      }
    });
  }
 
  callbackjsonp = (data) => {
     console.log("data is", data);
  };
  
  changeTemp = (event) => {
     this.results = [];
     if (event.target.innerHTML === "C"){
         this.fah = Math.round( (this.state.data[0].temp * 9)/5 + 32 );
         event.target.innerHTML = "F";
         this.results.push({location:this.state.data[0].location, temp:this.fah.toString(), nature:this.state.data[0].nature});
     }else if (event.target.innerHTML === "F") {
         this.cen = Math.round( (this.state.data[0].temp - 32) * 5/9 );
         event.target.innerHTML = "C";
         this.results.push({location:this.state.data[0].location, temp:this.cen.toString(), nature:this.state.data[0].nature});
     }
     this.setState({data:this.results});
      
  };


  render() {
//    console.log("in render,", this.state.data[0].nature);
    return (
      <div className="weather_main">
        <div className="report-check">
          <h1 className="main_heading" >Weather Report</h1>
          <h4 className="location" >{this.state.data[0].location}</h4>
          <h4 className="temp" >{this.state.data[0].temp} &#176;<button onClick={this.changeTemp}>C</button></h4>
          <h4 className="status" >{this.state.data[0].nature}</h4>
          <AddIcon nature={this.state.data[0].nature} />
        </div>
      </div>
    );
  }
}

export default App;
