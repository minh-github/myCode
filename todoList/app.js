document.querySelector('#myText').addEventListener('keypress',function(e){
    if (e.key === 'Enter') {
        myFuntion()
      }
})

function myFuntion(){
    let x = document.querySelector('#myText')
    if(x.value.length == 0){
        alert('bạn chưa nhập việc cần làm')
    }
    else{
        Render(x.value)
    }
}

function Render(x){
    document.querySelector('.lists ul').innerHTML +=`
        <li class="list">${x}<div class="close"><i class="fa-solid fa-xmark times"></i></div></li>
    `
    Clear()
    Remove()
}

function Clear(){
    document.querySelector('#myText').value = ''
}

function Remove(){
    let Delete = document.querySelectorAll('.close')
    let option = 'bạn có chắc chắn xóa'
    for (const item of Delete) {
        item.addEventListener('click',function(){
            if(confirm(option))
            item.parentNode.parentNode.removeChild(item.parentNode)
        })
    }
}