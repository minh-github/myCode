function printCurrrentDay(weather, location) {
    let sliderFather = document.querySelector('.sliderFather')

    let date = new Date(weather.timestamp_local.slice(0,10)).toUTCString().slice(0,16).toUpperCase()
    sliderFather.innerHTML 
    = `
        <div class="flex items-center">
            <div class="flex flex-col justify-between mr-4">
                <div class="font-semibold text-2xl text-orange-400">${date}</div>
                <div class="font-semibold text-6xl">${weather.temp}˚C</div>
            </div>
            <div class="flex ml-10 items-end h-[97px]">
                <div>
                    <div>${weather.weather.description}</div>
                    <div> in <strong class="font-bold">${location.city}</strong></div>
                </div>
            </div>
        </div>
        <div>
            <img src="../icons/${weather.weather.icon}.png" alt="" class="h-full">
        </div>
    `
}

export default function printForecast(data){

    let listElement = document.querySelector('.list')
    
    const htmlsListDay =  data.map(element =>
        {
            return `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                <th scope="row" class="py-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white day">
                    ${element.date}
                </th>
                <td class="py-2 px-4 maxTemp text-xs">
                    ${element.maxTemp}˚C
                </td>
                <td class="py-2 px-4 minTemp">
                    ${element.minTemp}˚C
                </td>
                <td class="py-2 px-4 weather">
                ${element.text}
                </td>
                <td class="py-2 px-4 icon">
                    <img src="../icons/${element.icon}.png" class="h-6">
                </td>
            </tr>
            `
        })
    listElement.innerHTML = htmlsListDay.join('')
}
export { printCurrrentDay, printForecast }