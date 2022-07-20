let getEle = (id) => document.getElementById(id);

import { Phone } from "../model/phone.js";
import { PhoneList } from "../model/phoneList.js";
import { Helper } from "./helper.js";
import { Validation } from "./../model/validation.js";

let validation = new Validation();

let helper = new Helper();
let phoneList = new PhoneList();

let renderList = () => {
  phoneList
    .getPhone()
    .then((result) => {
      let content = "";
      result.data.forEach((ele, id) => {
        content += `
        <tr id="phone${ele.id}">
          <td>${id + 1}</td>
          <td>${ele.name}</td>
          <td>${ele.price}</td>
          <td class="phoneImg">
          <img src="${ele.img}">
          </td>
          <td>${ele.desc}</td>
          <td>
            <button class="btn btn-info" onclick="edit('${
              ele.id
            }')" data-toggle="modal" data-target="#myModal">Sửa</button>
            <button class="btn btn-danger" onclick="remove('${
              ele.id
            }')">Xoá</button>
          </td>
        </tr>
      `;
        // console.log(ele);
      });
      getEle("tblPhoneList").innerHTML = content;
    })
    .catch((error) => console.log(error));
};
window.onload = () => renderList();

getEle("btnThemSanPham").onclick = () => {
  getEle("btnAdd").style.display = "inline-block";
  getEle("btnUpdate").style.display = "none";
  helper.prefill();
};
getEle("btnAdd").onclick = () => {
  let inputs = helper.getInputValue();
  let phone = new Phone("", ...inputs);
  console.log(phone);
  phoneList
    .getPhone()
    .then((result) => {
      if (validation.isValid(result.data, phone)) {
        console.log('Valid -> Adding Phone');
        phoneList
          .addPhone(phone)
          .then(() => {
            renderList();
            document.querySelector(".close").click();
            location.href = `#phone${phone.id}`;
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
};

window.remove = (id) => {
  phoneList
    .removePhone(id)
    .then(() => renderList())
    .catch((error) => console.log(error));
};

window.edit = (id) => {
  getEle("btnUpdate").style.display = "inline-block";
  getEle("btnAdd").style.display = "none";

  phoneList
    .getPhoneById(id)
    .then((result) => {
      let currentPhone = result.data;
      let inputFields = helper.getInputEle();
      inputFields[0].value = currentPhone.name;
      inputFields[1].value = currentPhone.price;
      inputFields[2].value = currentPhone.screen;
      inputFields[3].value = currentPhone.backCamera;
      inputFields[4].value = currentPhone.frontCamera;
      inputFields[5].value = currentPhone.img;
      inputFields[6].value = currentPhone.desc;
      inputFields[7].value = currentPhone.type;
    })
    .catch((error) => console.log(error));
  getEle("btnUpdate").onclick = () => {
    let inputs = helper.getInputValue();
    let phone = new Phone(id, ...inputs);
    phoneList
      .getPhone()
      .then((result) => {
        if (validation.isValid(result.data, phone, true)) {
        console.log('Valid -> Updating Phone');
          update(phone);
        }
      })
      .catch((error) => console.log(error));
  };
};

let update = (phone) => {
  phoneList
    .updatePhone(phone)
    .then(() => {
      renderList();
      document.querySelector(".close").click();
      location.href = `#phone${phone.id}`;
    })
    .catch((error) => console.log(error));
};
