/* calendar built with the tutorial from https://liginc.co.jp/355474 */

let cardElement = document.querySelector(".card");

let back = document.querySelector('.backcontainer')


cardElement.addEventListener("click", flip);

function flip(){
  cardElement.classList.toggle("flipped")
}

var $window = document.querySelector('body');
var $month = document.querySelector('.js-month')
var $tbody = document.getElementById('js-calendar-body')

var weekday = new Array();
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var today = new Date();
var currentYear = today.getFullYear(),
    currentMonth = today.getMonth();

window.addEventListener('load',function(){
  calendarHeading(currentYear, currentMonth);
  calendarBody(currentYear, currentMonth, today);
  highLight(today.getDate());
  getWorkMark([1,2,3],'công nghệ phần mềm');
});

function calendarBody(year, month, today){
  var todayYMFlag = today.getFullYear() === year && today.getMonth() === month ? true : false;
  var startDate = new Date(year, month, 1);
  var endDate  = new Date(year, month + 1 , 0);
  var startDay = startDate.getDay();
  var endDay = endDate.getDate();
  var textSkip = true;
  var textDate = 1;
  var tableTd ='';
  var tableBody ='';
  
  for (var row = 0; row < 6; row++){
    var tr = '<tr class="whiteTr">';
    
    for (var col = 0; col < 7; col++) {
      if (row === 0 && startDay === col){
        textSkip = false;
      }
      if (textDate > endDay) {
        textSkip = true;
      }
      var addClass = todayYMFlag && textDate === today.getDate() && !textSkip ? 'is-today' : '';
      var textTh = textSkip ? '&nbsp;' : textDate++;
      var th = '<th class="'+addClass+'">'+textTh+'</th>';
      tr += th;
    }
    tr += '</tr>';
    tableBody += tr;
  }
  var wd = weekday[today.getDay()];
  var d  = (today.getDate());
  document.getElementById('day').innerHTML = wd;
  document.getElementById('date').innerHTML = d;

  $tbody.innerHTML = tableBody;
}

function calendarHeading(year, num){
  $month.innerHTML = month[num] + '/' + year
}

function highLight(value) {
    
    let days = document.querySelectorAll(".whiteTr th")

    for (const day of days) {
        day.className = '';
        if(day.innerHTML == value) {
            day.className = 'active';
        }
     }
}

function getWorkMark(value, content) {
  let days = document.querySelectorAll(".whiteTr th")

  value.forEach(element => {
    for (const day of days) {

      if(day.innerHTML == element) {
        day.className = 'dot';
        day.setAttribute('value', content)

        day.addEventListener("click", (flip) => {
            back.innerHTML = day.getAttribute('value')
        })
      }
     }
  });
}