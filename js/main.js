function conFirm(option) {
    var form_register = document.querySelector(option.form);
    var getRules = {};
    if (form_register) {
        form_register.onsubmit = function (e) {
            e.preventDefault();
            option.rules.forEach(function (get) {
                var ipELM = form_register.querySelector(get.chonse);
                kiemtra(ipELM, get);
            })
        }
        option.rules.forEach(function (get) {
            if (Array.isArray(getRules[get.chonse])) {
                getRules[get.chonse].push(get.test);
            } else {
                getRules[get.chonse] = [get.test];
            }
            var ipELM = form_register.querySelector(get.chonse);
            if (ipELM.value == '') {
                ipELM.onblur = function () {
                    kiemtra(ipELM, get);
                }
                ipELM.onfocus = function () {
                    var erELM = ipELM.parentElement.querySelector(option.errorMess);
                    erELM.innerHTML = '';
                    ipELM.classList.remove('invalid');
                }
            }
        })
    }
    function kiemtra(ipELM, get) {
        var erELM = ipELM.parentElement.querySelector(option.errorMess);
        var mess;
        var rules = getRules[get.chonse];
        for (var i = 0; i < rules.length; i++) {
            mess = rules[i](ipELM.value);
            if (mess) break;
        }
        if (mess) {
            erELM.innerHTML = mess;
            ipELM.classList.add('invalid');
        } else {
            erELM.innerHTML = '';
            ipELM.classList.remove('invalid');
        }
        return mess;
    }
}

conFirm.nameELM = function (chonse, message) {
    return {
        chonse: chonse,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập thông tin'
        }
    }
}

conFirm.email = function (chonse) {
    return {
        chonse: chonse,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng định dạng email'
        }
    }
}
conFirm.phone = function (chonse) {
    return {
        chonse: chonse,
        test: function (value) {
            var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,5}$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập số điện thoại'
        }
    }
}
conFirm.passWord = function (chonse, min) {
    return {
        chonse: chonse,
        test: function (value) {
            return value.length >= min ? undefined : `Mật khẩu phải chứa ít nhất ${min} ký tự`
        }
    }
}
conFirm.login_email = function (chonse) {
    return {
        chonse: chonse,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng định dạng email'
        }
    }
}
conFirm.login_pass = function (chonse, min) {
    return {
        chonse: chonse,
        test: function (value) {
            return value.length >= min ? undefined : ` Mật khẩu phải chứa ít nhất ${min} ký tự`
        }
    }
}
function saveInfomation() {
    var nameEL = document.querySelector('#name').value;
    var mailEL = document.querySelector('#mail').value;
    var phoneEL = document.querySelector('#phone').value;
    var passEL = document.querySelector('#pass').value;
    let power = '';

    if (document.querySelector('#user_1').checked) {
        power = 'user'
    }
    if (document.querySelector('#user_2').checked) {
        power = 'editer'
    }
    if (document.querySelector('#user_3').checked) {
        power = 'admin'
    }
    let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];
    if (nameEL != '' && mailEL != '' && phoneEL != '' && passEL.length >= 6) {
        userInfo.push({
            name: nameEL,
            mail: mailEL,
            phone: phoneEL,
            pass: passEL,
            power: power
        });
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        sessionStorage.setItem('session_use', nameEL);
        sessionStorage.setItem('power', power);
        window.location.href = "index.html"
    }
}
function loginELM() {
    var mail_login = document.querySelector('#login_email').value;
    var pass_login = document.querySelector('#login_pass').value;
    let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];
    if (userInfo) {
        for (let i = 0; i <= userInfo.length; i++) {
            if (mail_login == userInfo[i].mail && pass_login == userInfo[i].pass) {
                document.querySelector('#form-2').submit();
                sessionStorage.setItem('session_use', userInfo[i].name);
                sessionStorage.setItem('power', userInfo[i].power);
                document.querySelector('.log-err').innerHTML = ''   
                window.location.href = "index.html";
            } else if (mail_login !== userInfo[i].mail || pass_login !== userInfo[i].pass){
                document.querySelector('.log-err').innerHTML = 'Thông tin tài khoản không đúng';    
            }
            if (mail_login =='' || pass_login.length < 6){
                document.querySelector('.log-err').innerHTML = ''   
            }
        }

    }
};
function regis() {
    document.querySelector('.register__form').classList.remove('form_none');
    document.querySelector('.register__form').style.animation = `fadeIn ease 1s`;
    document.querySelector('.login__form').style.animation = `fadeOutlogin ease 1s forwards`;
    // document.querySelector('.login #form-2').style.display = 'none';
    // document.querySelector('#name').focus();

}
function login() {
    document.querySelector('.login__form').classList.remove('form_none');
    document.querySelector('.login__form').style.animation = `fadeInlogin ease 1s`;
    document.querySelector('.register__form').style.animation = `fadeOut ease 1s forwards`;
    // document.querySelector('.register #form-1').style.display = 'none';
    // document.querySelector('#login_email').focus();

}
onload = function () {
    this.document.querySelector('#registe').onclick = regis;
    this.document.querySelector('#login').onclick = login;
    this.document.querySelector('#save').onclick = saveInfomation;
    this.document.querySelector('#dangnhap').onclick = loginELM;
    document.querySelector('#cancel').onclick = function () {
        document.querySelector('.register__form').style.animation = `fadeOut ease 1s forwards`;
        // document.querySelector('.login__form').style.animation = `fadeOutlogin ease 1s forwards`;
        // document.querySelector('.register__form').classList.add('form_none');
    }
    document.querySelector('#cancel-log').onclick = function () {
        document.querySelector('.login__form').style.animation = `fadeOutlogin ease 1s forwards`;
    }
}
