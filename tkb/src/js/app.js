/* calendar built with the tutorial from https://liginc.co.jp/355474 */
import { objTest } from './log.js'

let cardElement = document.querySelector(".card");

let back = document.querySelector('.backcontainer')

back.addEventListener("click", function(){
  cardElement.classList.remove("flipped")
  $tag.classList.remove("slide")
})

var $window = document.querySelector('body');
var $month = document.querySelector('.js-month')
var $tbody = document.getElementById('js-calendar-body')
var $tag = document.querySelector('.banner')
var $tag_today = document.querySelector('.banner .banner-day')

var weekday = new Array();
weekday[0] =  "Chủ Nhật";
weekday[1] = "Thứ Hai";
weekday[2] = "Thứ Ba";
weekday[3] = "Thứ Tư";
weekday[4] = "Thứ Năm";
weekday[5] = "Thứ Sáu";
weekday[6] = "Thứ bảy";

var month = new Array();
month[0] = "THÁNG MỘT";
month[1] = "THÁNG HAI";
month[2] = "THÁNG BA";
month[3] = "THÁNG TƯ";
month[4] = "THÁNG NĂM";
month[5] = "THÁNG SÁU";
month[6] = "THÁNG BẢY";
month[7] = "THÁNG TÁM";
month[8] = "THÁNG CHÍN";
month[9] = "THÁNG MƯỜI";
month[10] = "THÁNG MƯỜI MỘT";
month[11] = "THÁNG MƯỜI HAI";

var today = new Date();
var currentYear = today.getFullYear(),
    currentMonth = today.getMonth();

function app(){
  calendarHeading(currentYear, currentMonth);
  calendarBody(currentYear, currentMonth, today);
  highLight(today.getDate());

};

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
      var th = '<th class="'+addClass+'" style="cursor: pointer">'+textTh+'</th>';
      tr += th;
    }
    tr += '</tr>';
    tableBody += tr;
  }
  var wd = weekday[today.getDay()];
  var d  = (today.getDate());
  document.getElementById('day').innerHTML = wd;
  document.getElementById('date').innerHTML = d;
  $tag_today.innerHTML = d
  $tbody.innerHTML = tableBody;
}

function calendarHeading(year, num){
  $month.innerHTML = month[num] + '/' + year
}

function highLight(value) {
    
    let days = document.querySelectorAll(".whiteTr th")
    for (const day of days) {
        day.classList.remove('active');
        if(day.innerHTML == value) {
            day.classList.add('active');
        }
     }
}

function getWorkMark(value, content) {
  let days = document.querySelectorAll(".whiteTr th")

  value.forEach((element,index) => {
    days.forEach(day =>{
      if(day.innerHTML == Number(element)) {
        day.classList.add('dot');

        let affter = ''
        content[index].forEach(item => {
          item = `<li style="margin-bottom: 12px">${item}</li>`
          affter += item
        });

        day.setAttribute('value', affter)  
        day.addEventListener("click", () => {
            cardElement.classList.add("flipped")
            $tag.classList.add("slide")
            $tag_today.innerHTML = element
            back.innerHTML = day.getAttribute('value')
        })
      }
    })
  });
}
app()
let bigData = []

document.querySelector('.logout').addEventListener("click", () => {
    localStorage.removeItem('fileRaw')
    location.reload();
});

if(localStorage.getItem('fileRaw')){
    let fileRaw = localStorage.getItem('fileRaw');
    GetTableFromExcel(fileRaw);
}
else{
document.querySelector('.overlay').classList.add('show')
document.querySelector('.blockInsert').classList.add('show')

document.querySelector('#fileUpload').addEventListener('change',UploadProcess)

// GetTableFromExcel(data, objTest)
function UploadProcess() {
    document.querySelector('.blockInsert').classList.remove('show')
    document.querySelector('.overlay').classList.remove('show')
        //Reference the FileUpload element.
        var fileUpload = document.getElementById("fileUpload");
        
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        localStorage.setItem('fileRaw', e.target.result);
                        GetTableFromExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        GetTableFromExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    };

}


    function GetTableFromExcel(data) {
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        var Sheet = workbook.SheetNames[0];

        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);

        let obj = []
        excelRows.forEach((element,index) => {
            // console.log(getObjKey(element, 'KHOA CÔNG NGHỆ THÔNG TIN - ĐHTN'));
            if(element['KHOA CÔNG NGHỆ THÔNG TIN - ĐHTN']/2){
                if(element.__EMPTY_2 == undefined){
                    element.__EMPTY_2 = excelRows[index-1].__EMPTY_2
                }
                obj.push(element.__EMPTY_2 + ' - ' + element.__EMPTY_6)
            };
        });
        let one = []

        obj.forEach(element_obj => {
            one.push(element_obj.split('Từ '));
        });
        one.forEach((element_one, index) => {
            let subData = {
                TenMonHoc:'',
                NgayBatDau:[],
                NgayKetThuc:[],
                CacNgay:[],
                Tiet:[],
                Thu:[],
                DiaDiem:[],
                LichHoc:[],
            }
            
            subData.TenMonHoc = element_one[0].replace(' - ', '');
            element_one.forEach((item) => {
                if(((item[0])+1)/2){
                    subData.LichHoc.push(item);
                }
            })

            subData.LichHoc.forEach((item,index) => {
                let diaDiemTemp = []
                let tietTemp = []
                let thuTemp = []
                
                if (item.split(':')[1].length < 2) {
                    // console.log(item);
                    // console.log('================================================================');
                    subData.Thu.push(thuTemp)
                    subData.DiaDiem.push(diaDiemTemp)
                    subData.Tiet.push(tietTemp)
                }

                item.split(':')[1].split('Thứ ').forEach((item_con,index) => {
                    if(item_con.length > 1 && item_con.search(' tiết')>0){ 
                        thuTemp.push(item_con.slice(0,1))
                        tietTemp.push(item_con.split(' tiết')[1].split(' tại')[0])
                        diaDiemTemp.push(item_con.split(' tại')[1])
                    }
                });
                
                if(thuTemp.length>0){subData.Thu.push(thuTemp)}
                if(diaDiemTemp.length>0){subData.DiaDiem.push(diaDiemTemp)}
                if(tietTemp.length>0){subData.Tiet.push(tietTemp)}
            });
    
            subData.LichHoc.forEach((element, index) => {
                
                if(element.length < 28){
                    let arr = element.split(':')
                    arr.splice(0,2)
                    element = ' '
                }
                    let from = element.split(':')[0].slice(0,10)
                    
                    if((from.slice(0,2)+1)/2){
                        subData.NgayBatDau.push(from)
                    }
                    
                    let to = element.split(':')[0].slice(15,25)
                    
                    
                    if((to.slice(0,2)+1)/2){
                        subData.NgayKetThuc.push(to)
                    }
                });
            
            bigData.push(subData);
        })

        bigData.forEach((subBigData, indexBig) =>{
            subBigData.NgayBatDau.forEach((day,index) =>{
                // console.log(day + ' đến ' + subData.NgayKetThuc[index]);
                fommatDate(day,subBigData.NgayKetThuc[index],subBigData.Thu[index],subBigData.TenMonHoc, indexBig, index, subBigData.Tiet[index],subBigData.DiaDiem[index])
            })
        });
        function getWorkDays(from,to, Thu, monHoc, iBig, i, tiet, diaDiem){
            let tietChuan = []
            let diaDiemChuan = []
            if(tiet.length > 0){
                tietChuan.push(tiet)
            }
            if(diaDiem.length != 0){
                diaDiemChuan.push(diaDiem)
            }

            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const firstDate = new Date(from);
            const secondDate = new Date(to);
            const diffDays = Math.round(Math.abs((firstDate - secondDate)/oneDay));
            
            
            for (let index = 1; index < diffDays+2; index++) {
                let dayTemp = {
                    diffDaysTemp: [],
                    checkHoc: []
                }

                let nextDay = (firstDate.getTime()/1000) + oneDay/1000*index - oneDay/1000;

                dayTemp.diffDaysTemp.push((new Date(nextDay*1000).toISOString().slice(0,10)))
    
                // console.log(new Date(nextDay*1000).toISOString().slice(0,10));
    
                let thu = new Date(nextDay*1000).getDay()
    
                Thu.forEach((a,index)=>{
                    if(thu == Number(a)-1){
                        dayTemp.checkHoc.push(monHoc + '</br> Tiết ' + tietChuan[0][index] + ' - ' + diaDiemChuan[0][index])
                    }
                })
                // console.log(tiet);
                // console.log(dayTemp.checkHoc);
                // console.log(bigData[i].TenMonHoc + ' ' + bigData[i].CacNgay);
                
                bigData[iBig].CacNgay.push(dayTemp)
            }
            // console.log(bigData[7].CacNgay);
            // console.log(bigData[i].CacNgay);
            // diffDaysTemp.forEach(dayTemp =>{
            //     bigData[i].CacNgay.push(dayTemp)
            // })
        }

        function fommatDate(firstDate, secondDate, Thu, monHoc, indexBig, index, tiet, diaDiem) {
            let from = firstDate.split("/").reverse().join("-");
            let to = secondDate.split("/").reverse().join("-");
            
            getWorkDays(from,to, Thu, monHoc, indexBig,index,tiet, diaDiem)
        }
        
        let days = []
        
        bigData.forEach(data =>{
            data.CacNgay.forEach(item =>{
                if(item.checkHoc.length > 0){
                    days.push(item)
                }
            })
        })

        let ngay = []
        let mon = []

        days.forEach(day =>{
            if(ngay.indexOf(day.diffDaysTemp.toString()) < 0){
                ngay.push(day.diffDaysTemp.toString())
            }
        })

        ngay.forEach(item => {
            let subMon = []
            days.forEach(day =>{
                if(day.diffDaysTemp.toString() == item.toString()){
                    subMon.push(day.checkHoc)
                }
            })
            mon.push(subMon)
        })

        let monHocT9 = []
        ngay.forEach((date, index) =>{
            if (date.slice(5,7) == today.getMonth()+1) {
                monHocT9.push({date: date, mon:mon[index]})
            }
        })
        let mark = []
        monHocT9.forEach(a =>{
            mark.push(a.date.slice(8,10))
        })
        
        let text = []
        monHocT9.forEach(a =>{
            text.push(a.mon)
        })
        // console.log(inner);
        getWorkMark(mark,text)

        // })
        // console.log(one);

        // one.forEach((element,index) => {
        //     element.forEach((item) => {
        //         if(item[index]/2){
        //             lichHoc.push(item);
        //         }
        //     })
        // });
        // lichHoc.forEach((item) => {
        //     let diaDiemTemp = []
        //     let tietTemp = []
        //     thu.push(item.slice(32,33));
        //     diaDiemTemp.push(item.split('tại'))
        //     tietTemp.push(diaDiemTemp[0][0].split('tiết'))

        //     diaDiem.push(diaDiemTemp[0][1])
        //     tiet.push(tietTemp[0][1])
        // });



        // console.log(tkb);
    };