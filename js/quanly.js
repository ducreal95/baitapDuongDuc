
function caculator() {
    var nameELM = document.querySelector('#name').value;
    var adressELM = document.querySelector('#address').value;
    var starELM = document.querySelector('#start').value;
    var endELM = document.querySelector('#end').value;
    var vatELM = document.querySelector('#vat').value;
    var today = new Date();
    var dayELM = ` ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    var valid = true;
    if (starELM == '' && starELM == 0) {
        document.querySelector('.message1').innerHTML = 'Vui lòng nhập trường này';
        valid = false;
    } else {
        document.querySelector('.message1').innerHTML = '';
        valid;
    }
    if (endELM == '' && endELM == 0) {
        document.querySelector('.message2').innerHTML = 'Vui lòng nhập trường này';
        valid = false;
    } else {
        document.querySelector('.message2').innerHTML = '';
        valid;
    }
    if (valid) {
        let info_electric = localStorage.getItem('info_electric') ? JSON.parse(localStorage.getItem('info_electric')) : [];
        info_electric.push({
            name: nameELM,
            address: adressELM,
            start_up: starELM,
            end: endELM,
            vat: vatELM,
            day: dayELM
        });
        localStorage.setItem('info_electric', JSON.stringify(info_electric));
        inELM();
    }
    
    document.querySelector('#name').focus();
}
let info_electric = localStorage.getItem('info_electric') ? JSON.parse(localStorage.getItem('info_electric')) : [];
let selec_page = document.querySelector('#select-listpage');
let perPage = 5;
let currPage = 1;
let startPage = 0;
let endPage = perPage
let totalPage = Math.ceil(info_electric.length / perPage);
function getpage() {
    startPage = (currPage - 1) * perPage;
    endPage = currPage * perPage;
}

function inELM() {
    let info_electric = localStorage.getItem('info_electric') ? JSON.parse(localStorage.getItem('info_electric')) : [];
    var table_info = '';
    info_electric.forEach(function (ELM, index) {
        index++;
        let id_user = index;
        if (index > startPage && index <= endPage && power == 'admin') {
            table_info +=
                `
        <tr> 
            <td>${index}</td>
            <td>${ELM.name}</td>
            <td>${ELM.address}</td>
            <td>${ELM.start_up}</td>
            <td>${ELM.end}</td>
            <td>${ELM.vat}</td>
            <td><i onclick = 'update(${id_user})' class="fa-solid fa-pen-to-square" id="update-1"></i> || <i onclick = 'conFirm_dele (${id_user})' class="fa-solid fa-trash-can delete-1"></i></td>
        </tr>
        `
        }
        if (index > startPage && index <= endPage && power == 'editer') {
            table_info +=
                `
        <tr> 
            <td>${index}</td>
            <td>${ELM.name}</td>
            <td>${ELM.address}</td>
            <td>${ELM.start_up}</td>
            <td>${ELM.end}</td>
            <td>${ELM.vat}</td>
            <td><i class="fa-solid fa-pen-to-square" id="update-1"></i> || <i class="fa-solid fa-trash-can delete-1"></i></td>
        </tr>
        `
        }
    });
    document.querySelector('#name').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#start').value = '';
    document.querySelector('#end').value = '';
    document.querySelector('#vat').value = '';
    document.querySelector('.table-infor_cacula').innerHTML = table_info;
}
function list_page() {
    var inList = '';
    for (let i = 1; i <= totalPage; i++) {
        inList += `
        <li class="page-item"><a class="page-link" href="#">${i}</a></li>
        `
    }
    document.querySelector('.list-page').innerHTML = inList
}
function clickList() {
    let cliPage = document.querySelectorAll('.list-page li');
    for (let i = 0; i < cliPage.length; i++) {
        cliPage[i].onclick = function () {
            currPage = i + 1;
            getpage();
            inELM()
        }
    }
}

selec_page.onchange = () => {
    currPage = 1;
    perPage = selec_page.value;
    totalPage = Math.ceil(info_electric.length / perPage);
    getpage(currPage);
    list_page();
    clickList()
    inELM();
}

let buttNext = document.querySelector('#next');
let buttPre = document.querySelector('#pre');
buttNext.onclick = () => {
    currPage++;
    if (currPage > totalPage) {
        currPage = totalPage;
    }
    getpage();
    inELM();
}
buttPre.onclick = () => {
    currPage--;
    if (currPage <= 1) {
        currPage = 1;
    }
    getpage();
    inELM();
}

function conFirm_dele(id_user) {
    document.querySelector('#index_del').value = id_user;
    document.querySelector('.deleteELM').classList.remove('ud_none')
    document.querySelector('.deleteELM').style.animation = 'fadeIndel ease 1s';
}
function delELM() {
    let info_electric = localStorage.getItem('info_electric') ? JSON.parse(localStorage.getItem('info_electric')) : [];
    id_user = document.querySelector('#index_del').value;
    info_electric.splice(id_user - 1, 1);
    document.querySelector('.deleteELM').style.animation = `fadeOutdel ease 1s forwards`;
    localStorage.setItem('info_electric', JSON.stringify(info_electric));
    deleteELM()
    inELM()
}

function update(id_user) {
    let info_electric = localStorage.getItem('info_electric') ? JSON.parse(localStorage.getItem('info_electric')) : [];
    document.querySelector('#name_ud').value = info_electric[id_user - 1].name;
    document.querySelector('#address_ud').value = info_electric[id_user - 1].address;
    document.querySelector('#start_ud').value = info_electric[id_user - 1].start_up;
    document.querySelector('#end_ud').value = info_electric[id_user - 1].end;
    document.querySelector('#vat_ud').value = info_electric[id_user - 1].vat;
    document.querySelector('#index').value = id_user;
    document.querySelector('.update_infor').classList.remove('ud_none');
    document.querySelector('.update_infor').style.animation = `fadeIn ease 1s`;
    document.querySelector('.caculator').style.animation = `fadeOutC ease 1s forwards`;
    document.querySelector('.update_infor').classList.remove('ud_none');
    document.querySelector('#name_ud').focus();
}

function change() {
    let info_electric = localStorage.getItem('info_electric') ? JSON.parse(localStorage.getItem('info_electric')) : [];
    var id_user = document.querySelector('#index').value;
    info_electric[id_user - 1] = {
        name: document.querySelector('#name_ud').value,
        address: document.querySelector('#address_ud').value,
        start_up: document.querySelector('#start_ud').value,
        end: document.querySelector('#end_ud').value,
        vat: document.querySelector('#vat_ud').value
    }
    console.log(info_electric);
    document.querySelector('#name_ud').focus();
    localStorage.setItem('info_electric', JSON.stringify(info_electric));
    // document.querySelector('.update_infor').classList.add('ud_none');
    document.querySelector('.caculator').classList.remove('ud_none');
    inELM()
}
document.querySelector('#clear').onclick = function () {
    document.querySelector('.message1').innerHTML = '';
    document.querySelector('.message2').innerHTML = '';
}
list_page();
clickList()
onload = function () {
    this.document.querySelector('#caculaor').onclick = caculator;
    this.document.querySelector('#cancel').onclick = function () {
        document.querySelector('.update_infor').style.animation = `fadeOut ease 1s forwards`;
        document.querySelector('.caculator').style.animation = `fadeInC ease 1s`
        document.querySelector('.caculator').classList.remove('ud_none');
        document.querySelector('#name').focus();
    }
    this.document.querySelector('#update').onclick = () => {
        document.querySelector('.update_infor').style.animation = `fadeOut ease 1s forwards`;
        document.querySelector('.update_infor').style.animation = `fadeOut ease 1s forwards`;
        document.querySelector('.caculator').style.animation = `fadeInC ease 1s`;
        success()
        change();
    }

    this.document.querySelector('#del_susses').onclick = delELM;

    this.document.querySelector('#del_cancel').onclick = function () {
        document.querySelector('.deleteELM').style.animation = `fadeOutdel ease 1s forwards`;
        // document.querySelector('.deleteELM').classList.add('ud_none');
        // document.querySelector('.update_infor').classList.add('ud_none');
        // document.querySelector('.caculator').classList.remove('ud_none');
    }

    this.document.querySelector('#name').focus();

    inELM()
}