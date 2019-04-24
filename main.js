const apiKey = '9e9acc8cee8b84e4d5af6f3c8a1f5439';

let longitude = 0;
let latitude = 0;

let h2Tag = document.getElementById('sky');
let tempDiv = document.getElementById('temp');

function GetLocation() {
  function Location(position){
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    let apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid='+apiKey;
    console.log(apiURL);
    fetch(apiURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        for(let i=0; i<data.list.length; i+=8) {
          subset = data.list.slice(i, i+8);
          let contDiv = document.createElement('div');
          let dateDiv = document.createElement('div');
          let dateSep = subset[0].dt_txt;
          let date = dateSep.split(" ");
          let sky = subset[0].weather[0].main;
          let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          let dayTem = new Date(date[0]);
          let day = dayTem.getDay();
          dateDiv.innerHTML += "<strong>" + days[day] + "</strong>" + "<br>" + sky;
          dateDiv.setAttribute('class', 'column panel-block is-active has-text-centered');
          contDiv.append(dateDiv);
          contDiv.setAttribute('id', 'day');
          contDiv.setAttribute('class', 'panel');
          for(let j=0; j<subset.length; j++) {
            let dayDiv = document.createElement('div');
            dayDiv.setAttribute('id', j);
            dayDiv.setAttribute('class', 'column panel-block has-text-centered')
            let timeSep = subset[j].dt_txt;
            let time = timeSep.split(" ");
            let tempToF = ((subset[j].main.temp) - 273.15) * 9/5 + 32;
            dayDiv.innerHTML = time[1].slice(0, -3) + " " + Math.round(tempToF) + "°";
            contDiv.append(dayDiv);
          }
          tempDiv.append(contDiv);
        }
      })
  }

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(Location);
  } else {
    console.log('Geolocation not supported.');
  }
}

GetLocation();