import { printForecast } from "./render.js";

function handelAnotherDay(res, data) {
    let days = []
    let day = []

      res.forEach(element => {
          let temp = []
          day.push(element);
          if (day[day.length - 2] != undefined && element.timestamp_local.slice(0,10) != day[day.length - 2].timestamp_local.slice(0,10)) {
                day.forEach(element => {
                    temp.push(element);
                });
                days.push(temp);
                day = []
                temp = []
            }
      });

      for (const el of days) {
          let subData =
            {
              minTemp: el[0].temp,
              maxTemp: el[0].temp,
              date: new Date(el[0].timestamp_local.slice(0,10)).toUTCString().slice(5,16),
              text:el[2].weather.description,
              icon:el[2].weather.icon,
            }         
            for (const item of el) {
                if(item.temp > subData.maxTemp) subData.maxTemp = item.temp
                if(item.temp < subData.minTemp) subData.minTemp = item.temp
            }
            data.anotherDays.push(subData)
        }
      printForecast(data.anotherDays)
    }

export { handelAnotherDay }