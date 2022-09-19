import { handelAnotherDay } from "./handelAnotherDays.js";
import { printCurrrentDay } from "./render.js";

function getWeather(data) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1fdccb5c5fmsh7ca432857173043p138c4cjsn58bca0d09991',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    };

    fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${data.location.latitude}&lon=${data.location.longitude}`, options)
    // fetch('../js/Untitled-1.json')
        .then(response => response.json())
        .then(response => 
            {
                data.currentDays = response.data[0]
                data.location.city = response.city_name
                let fillter = response.data
                let days = []
                fillter.forEach(element => {

                    days.push(element.timestamp_local.slice(0,10))
                });

                // let uniqueDays = days.filter(onlyUnique);

                printCurrrentDay(data.currentDays, data.location)

                handelAnotherDay(response.data, data)
            })
        .catch(err => console.error(err));

        // function onlyUnique(value, index, self) {
        //     return self.indexOf(value) === index;
        //   }
    }

    export { getWeather }