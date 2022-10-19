let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];
let name__1 = sessionStorage.getItem('session_use');
let power = sessionStorage.getItem('power');
if (name__1) {
    document.querySelector('.nameuser').innerHTML = 'Xin chào ' + name__1;
} else {
    document.querySelector('.nameuser').innerHTML = 'Vui lòng đăng nhập';
}
function getlink() {
    document.querySelector('#timkiem').onclick = function () {
        window.location.href = "tracuu.html";
    }
    document.querySelector('#quanly').onclick = function () {
        window.location.href = "quanly.html";
    }
    document.querySelector('#home').onclick = function () {
        window.location.href = "index.html";
    }
}
if (power == 'user') {
    getlink();
    document.querySelector('#quanly').style.display = 'none';
}
if (power == 'editer' || power == 'admin') {
    
    getlink();
}

if (!power) {
    document.querySelector('#timkiem').onclick = function () {
        error();
    }
    document.querySelector('#quanly').onclick = function () {
        error();
    }
    document.querySelector('#home').onclick = function () {
        error();
    }
    document.querySelector('#logined').style.display ='none';
    document.querySelector('#home').style.display ='none';
    document.querySelector('#logout').style.display ='none';
} else {
    document.querySelector('#logouted').style.display ='none';
}
document.querySelector('#logout').onclick=()=>{
    document.querySelector('.nameuser').innerHTML = 'Vui lòng đăng nhập';
    sessionStorage.removeItem('session_use');
    sessionStorage.removeItem('power');
    window.location.replace('index.html')
}