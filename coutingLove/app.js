function counting(){
    let startDate = new Date('Mar 24 2022')
    
    let endDate = new Date()
    
    function treatAsUTC(date) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }
     
    function daysBetween(startDate, endDate) {
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        let time = Math.floor((treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay)
        document.querySelector('.days').innerHTML = time
        console.log(time);
        let dem = 100 - time
        console.log('Còn ' + dem + ' ngày nữa là tròn 100 ngày rôi');
        document.querySelector('.days').style.opacity = 1
        document.querySelector('.warpper').style.width = '1000px'
        setTimeout(function(){
            document.querySelector('.box').style.opacity = 1
        },1000)
        
    }
    
    daysBetween(startDate,endDate)
}

setTimeout(counting,1000)
