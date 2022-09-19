function getCurentrLocation(data ,callback){
    navigator.geolocation.getCurrentPosition(success)

    function success(position){
        data.location.latitude = position.coords.latitude
        data.location.longitude = position.coords.longitude
        callback(data)
    }
 }
 export { getCurentrLocation } 