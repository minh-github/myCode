<template>
    <div class="text-white">
        <form >
            <input type="text" class="w-full text-gray-800 border-none outline-none p-2" v-model="location.city">
        </form>
        <div class="weather-container font-sans max-w-lg overflow-hidden bg-gray-900 shadow-lg mt-4 sm:rounded-lg rounded-none">
            <div class="current-weather flex items-center justify-between px-6 py-8">
                <div class="flex items-center">
                    <div>
                        <div class="md:text-6xl font-semibold text-3xl">{{ currentTemp.actual }}ºC</div>
                        <div>Feel like {{ currentTemp.feels }}ºC</div>
                    </div>
                    <div class="mx-5">
                        <div class="font-semibold">{{ currentTemp.summary }}</div>
                        <div>{{ currentTemp.city }}, {{ currentTemp.country }}</div>
                    </div>
                </div>
                <div>
                    <img v-bind:src="currentTemp.icon" alt="">
                </div>
            </div>
            <!-- end current-weather -->
            <div class="future-weather text-sm bg-gray-800 px-6 py-8 overflow-hidden">
                <div

                 v-for="(day, index) in daily"
                 :key="day.time"
                 class="flex items-center"
                 :class="{'mt-8':index > 0}"

                 >
                    <div class="w-1/6 text-lg text-gray-200">{{ todayOfWeek(day.date_epoch) }}</div>
                    <div class="w-4/6 px-4 flex items-center">
                        <div><img v-bind:src="day.day.condition.icon" alt=""></div>
                        <div class="ml-3">{{ day.day.condition.text }}</div>
                    </div>
                    <div class="w-1/6 text-right">
                        <div>{{ day.day.maxtemp_c }}ºC</div>
                        <div>{{ day.day.mintemp_c }}ºC</div>
                    </div>
                </div>
            </div>
            <!-- end future-weather -->
        </div>
        <!-- end weather-container -->
    </div>
</template>

<script>
export default{
    mounted(){
        this.fetchData()
    },
    watch:{
        location:{
            handler(){
                this.fetchData()
            },
            deep: true
        }
    },
    test(){
        console.log('hefa');
    },
    change(){
        console.log(this.location.name);
        this.location.name = 'Hanoi'
    },
    data(){
        return{
            currentTemp: {
                actual: '',
                feels: '',
                summary: '',
                icon: '',
                city: '',
                country: '',
            },
            daily: [

            ],
            location: {
                city: 'Thai Nguyen',
            },
        }
    },
    methods:{
        fetchData(){
            fetch(`/api/weather?location=${this.location.city}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                this.currentTemp.actual = data.current.temp_c
                this.currentTemp.feels = data.current.feelslike_c
                this.currentTemp.summary = data.current.condition.text
                this.currentTemp.icon = data.current.condition.icon
                this.currentTemp.city = data.location.name
                this.currentTemp.country = data.location.country

                this.daily = data.forecast.forecastday
            })
        },
        todayOfWeek(timestamp){
            const newDate = new Date(timestamp*1000)
            return newDate.toString().slice(0,4).toUpperCase()
        },
    }
}
</script>
