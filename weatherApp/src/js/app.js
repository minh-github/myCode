function App() {
    let listElement = document.querySelector('.list')
    let sliderFather = document.querySelector('.sliderFather')

    let data = {
        location: '',
        currentDays:'',
        anotherDays: [],
    }

    function locatioToCity() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1fdccb5c5fmsh7ca432857173043p138c4cjsn58bca0d09991',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };
        fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?location=%2B21.5850%2B105.8172`, options)
            .then(response => response.json())
            .then(response => {
                let city = response.data[0].region
                toNonAccentVietnamese(city,getWeather)
            })
            .catch(err => console.error(err));
    }

    function toNonAccentVietnamese(str,callback) {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        callback(str)
  }

    function getCurentrLocation(){
       navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
        locatioToCity(position)
      }

    function getWeather(city) {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=4a058977ff3c4c6cbee111653221509&q=${city}&days=7&aqi=no&alerts=yes`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
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