function detail_use() {
    let info_electric = localStorage.getItem('info_electric') ? JSON.parse(localStorage.getItem('info_electric')) : [];
    let tab_infor = '';
    info_electric.forEach(function (a) {
        if (document.querySelector('#search--info').value == a.name) {
            let dien_tt = a.end - a.start_up;
            let cap_1;
            let cap_2;
            let cap_3;
            if (dien_tt <= 50) {
                cap_1 = dien_tt;
                cap_2 = 0;
                cap_3 = 0;
            } else if (dien_tt <= 100) {
                cap_1 = 50;
                cap_2 = dien_tt - cap_1;
                cap_3 = 0;
            } else {
                cap_1 = 50;
                cap_2 = 50;
                cap_3 = dien_tt - 100
            }
            let tien_cap1 = cap_1 * 1480;
            let tien_cap2 = cap_2 * 1500;
            let tien_cap3 = cap_3 * 1800;
            let total = tien_cap1 + tien_cap2 + tien_cap3;
            function vnd(n) {
                return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            };
            let docTien = new DocTienBangChu();

            tab_infor = `
            <div class="col-12 col-md-2"></div>
                <div class="col-12 col-md-8 table_info_money">
                    <div class="row">
                        <div class="col-12">
                            <div class="col-12 heading-infor">tổng công ty điện lực thành phố Đà Nẵng</div>
                        </div>
                        <div class="col-12">
                            <div class="col-md-4">
                                <span class="infor_user-1">Địa chỉ: <strong>Hải Châu - Đà Nẵng</strong></span>
                            </div>
                        </div>
                        <div class="col-12 nhacc">
                            <div class=" col-md-4"><span class="infor_user-1">Điện thoại: <strong>0395285566</strong></span></div>
                            <div class=" col-md-3"><span class="infor_user-1">MST:</span></div>
                            <div class=" col-md-3"><span class="infor_user-1">ĐT sửa chữa: <strong style="color: red;">0977748469</strong></span></div>
                            <div class=" col-md-2"></div>
                        </div>
                        <div class="col-12 name-user">
                            <div class="col-md-4 name_usser">
                                <span class="infor_user-1">Tên khách hàng: ${a.name}</span>
                                <span class="infor_user-1">Địa chỉ: ${a.address}</span>
                            </div>
                        </div>
                        <div class="col-12 if_user">
                            <div class="col-md-4 user_info">
                                <span class="infor_user-1">Điện thoại:</span>
                                <span class="infor_user-1">Mã KH: <strong style="color: red;">DN12345678</strong> </span>
                                <span class="infor_user-1">Mã Trạm: 1</span>
                                <span class="infor_user-1">Mã giá:</span>
                            </div>
                            <div class="col-md-3 user_info">
                                <span class="infor_user-1">MST:</span>
                                <span class="infor_user-1">Mã T.toán: <strong style="color: red;">DN12345678</strong></span>
                                <span class="infor_user-1">Cấp ĐA: </span>
                            </div>
                            <div class="col-md-3 user_info">
                                <span class="infor_user-1">Số công tơ:</span>
                                <span class="infor_user-1">Mã NN: :</span>
                                <span class="infor_user-1">Số GCS: </span>
                            </div>
                            <div class="col-md-2 user_info">
                                <span class="infor_user-1">Số hộ:</span>
                                <span class="infor_user-1">Mã tổ:</span>
                                <span class="infor_user-1">P.GCS: </span>
                            </div>
                        </div>
                        
                        <div class="col-12 col-md-12">
                            <table class="table table-success table-striped table_infor tien_dien">
                                <thead>
                                    <tr>
                                        <th>Bộ CS</th>
                                        <th>chỉ số mới</th>
                                        <th>Chỉ số cũ</th>
                                        <th>hs nhân</th>
                                        <th>đn tiêu thụ</th>
                                        <th>đn trực tiếp</th>
                                        <th>đn trừ phụ</th>
                                        <th>đn thực tế</th>
                                        <th>đơn giá</th>
                                        <th>thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody class="table-infor_user">
                                    <tr>
                                        <td>KT</td>
                                        <td>${a.end}</td>
                                        <td>${a.start_up}</td>
                                        <td>1</td>
                                        <td>${dien_tt}</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>${dien_tt}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                        <p>${cap_1}</p>
                                        <p>${cap_2}</p>
                                        <p>${cap_3}</p></td>
                                        <td><p>1.480</p>
                                        <p>1.500</p>
                                        <p>1.800</p></td>
                                        <td>
                                            <p> ${vnd(tien_cap1)}</p>
                                            <p> ${vnd(tien_cap2)}</p>
                                            <p> ${vnd(tien_cap3)}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="7">Cộng</td>
                                        <td><p><strong>${dien_tt}</strong></p></td>
                                        <td></td>
                                        <td><p><strong>${vnd(total)}</strong></p></td>
                                    </tr>
                                    <tr>
                                        <td colspan="7">Thuế suất GTGT: <strong>${a.vat}%</strong></td>
                                        <td colspan="2">Thuế GTGT:</td>
                                        <td><p><strong>${vnd(total * a.vat / 100)}</strong></p></td>
                                    </tr>
                                    <tr>
                                        <td colspan="9">Tổng cộng tiền thanh toán:</td>
                                        <td><p><strong>${vnd(total + total * a.vat / 100)}</strong></p></td>
                                    </tr>
                                    <tr>
                                        <td colspan="10">Số tiền bằng chữ: <strong><i>${docTien.doc(total + total * a.vat / 100)}</i></strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="10" class="ky_ten">
                                            <p><strong>Ngày ký: ${a.day} </strong> </p>
                                            <p><strong>Người ký: (Ông/Bà) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></p>
                                            <p>&nbsp;</p>
                                            <p>&nbsp;</p>
                                            <p>&nbsp;</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-2"></div>
            `
            document.querySelector('.show_infor').innerHTML = tab_infor;
        }
    })
}
function search() {
    let info_electric = localStorage.getItem('info_electric') ? JSON.parse(localStorage.getItem('info_electric')) : [];
    if (info_electric) {
        let inTK = '';
        info_electric.forEach(function (a) {
            inTK += `
            <option value="${a.name}">
        `
        })
        document.querySelector('#timten').innerHTML = inTK;
    }

}
search()
let info_electric = localStorage.getItem('info_electric') ? JSON.parse(localStorage.getItem('info_electric')) : [];

function timKiem() {
    let ipsearch = document.querySelector('#search--info').value;
    for (let i = 0; i < info_electric.length; i++) {
        if(ipsearch===''){
            document.querySelector('.timkiemten').innerHTML = 'Vui lòng nhập thông tin tìm kiếm';
        }
        else if (ipsearch === info_electric[i].name) {
            detail_use();
            document.querySelector('.timkiemten').innerHTML = '';
            break
        }
        else {
            document.querySelector('.timkiemten').innerHTML = `Không tồn tại thông tin khách hàng: ${ipsearch} !`;
            document.querySelector('.show_infor').innerHTML =''
        }
    }
}
document.querySelector('#search--info').onfocus = function () {
    document.querySelector('.timkiemten').innerHTML = ''
}
document.querySelector('#search').onclick = function () {
    timKiem()
}
let a = document.querySelector('.heading--1');
setInterval(() => {
    a.classList.toggle('heading--1')
}, 1000)
setInterval(() => {
    a.classList.toggle('red')
}, 1000)
