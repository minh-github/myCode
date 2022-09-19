import { getCurentrLocation } from "./getLocation.js"
import { getWeather } from "./getWeather.js"

function App(){
    let data = 
        {
            location: 
                {
                    latitude:'',
                    longitude:'',
                    city:''
                },
            currentDays:{},
            anotherDays: []
        }
    getCurentrLocation(data, getWeather)
}
App()