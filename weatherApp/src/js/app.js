function App() {
    let listElement = document.querySelector('.list')
    let sliderFather = document.querySelector('.sliderFather')
    let city

    let data = {
        location: '',
        currentDays:'',
        anotherDays: [],
    }

    function getCurentrLocation(){
       navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
        city = position.coords.latitude.toString() + ','+ position.coords.longitude.toString()
        console.log(city);
        getWeather()
      }

    function getWeather() {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=4a058977ff3c4c6cbee111653221509&q=${city}&days=7&aqi=no&alerts=yes`)
            .then(response => response.json())
            .then(response => {
                data.location = response.location
                data.currentDays = response.current;
                response.forecast.forecastday.forEach(element => {
                    data.anotherDays.push(element);
                });
                // console.log(data.location);
                printCurrrentDay(data);
                printForecast(data);
            })
            .catch(err => console.error(err));
    }

    function printCurrrentDay(res) {
        sliderFather.innerHTML = `
        <div class="text-white">
        <div class="font-sans overflow-hidden bg-gray-800 shadow-lg sm:rounded-lg rounded-none h-96">
            <div class="current-weather flex items-center justify-between px-6 py-8 bg-gray-700">
                <div class="flex items-center">
                    <div>
                        <div class="font-semibold text-6xl py-5">${res.currentDays.temp_c}˚C</div>
                        <div>Feel like ${res.currentDays.feelslike_c}˚C</div>
                    </div>
                    <div class="mx-10 py-5">
                        <div>${res.currentDays.condition.text}</div>
                        <div> in 
                        <strong class="font-bold">
                            ${res.location.name}</div>
                        </strong>
                    </div>
                </div>
                <div>
                    <img src="${res.currentDays.condition.icon}" alt="" class="h-[120px]">
                </div>
            </div>
            <!-- end current-weather -->
        </div>
        <!-- end weather-container -->
    </div>`
    }

    function printForecast(res){
        const htmlsListDay = res.anotherDays.map(element =>{
            return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                <th scope="row" class="py-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white day">
                    ${element.date}
                </th>
                <td class="py-2 px-4 maxTemp text-xs">
                    ${element.day.maxtemp_c}˚C
                </td>
                <td class="py-2 px-4 minTemp">
                    ${element.day.mintemp_c}˚C
                </td>
                <td class="py-2 px-4 weather">
                    ${element.day.condition.text}
                </td>
                <td class="py-2 px-4 icon">
                    <img src="${element.day.condition.icon}">
                </td>
            </tr>`
        })
        listElement.innerHTML = htmlsListDay.join('')
    }
    getCurentrLocation()
}
App();