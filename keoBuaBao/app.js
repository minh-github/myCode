
var player = -1
var cpu = -1

function app(){
    let arr = document.querySelectorAll('.player .choose')
    for (const item of arr) {
        item.addEventListener('click',()=>{
            player = item.getAttribute('data-index')

            removeActive(arr)
            addActive(item)
        })
    }
    function removeActive(arr){
        for (const item of arr) {
            item.classList.remove('active')
        }
    }
    
    function addActive(item){
        item.classList.add('active')
        let i = item.querySelector('i').getAttribute('class')
        board(i)
    }
    function board(i){
        document.querySelector('.player .board').innerHTML = `
        <i class="${i}"></i>
        `
    }
    let btn = document.querySelector('.button')
    
    btn.addEventListener('click',()=>{
        let random = Math.floor(Math.random()*3)
        cpu = random
        let cpuArr = document.querySelectorAll('.CPU .choose')
        let i = cpuArr[random].querySelector('i').getAttribute('class')
        document.querySelector('.CPU .board').innerHTML = `<i class="${i}"></i>`
        removeActive(cpuArr)
        addActiveCPU(cpuArr[random])
        let may = 'máy thắng'
        let nguoi = 'người thắng'
        let hoa = 'hòa'
        if(player == 0 && cpu == 1 || player == 1 && cpu == 2 || player == 2 && cpu == 0){
            inKetQua(may)
        }
        if(player == 0 && cpu == 2 || player == 1 && cpu == 0 || player == 2 && cpu == 1){
            inKetQua(nguoi)
        }
        if(player == cpu){
            inKetQua(hoa)
        }

    })

    function addActiveCPU(item){
        item.classList.add('active')
    }

    function inKetQua(value){
        document.querySelector('.text ul').innerHTML += `<li>${value}</li>`
    }
}

window.onload = app


