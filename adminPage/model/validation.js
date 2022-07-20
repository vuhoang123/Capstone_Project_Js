let getEle = (id) => document.getElementById(id);
import { Helper } from "./../controller/helper.js";
let helper = new Helper();
export class Validation {
  numRegex = /^[0-9]+$/;
  letterRegex = /^[A-Za-z]+$/;
  getErroDiv() {
    return helper.inpFields.map((ele) => ele + "Error");
  }
  isFilled(field, errorDivId, message) {
    let result = field !== "";
    this.handleError(!result, errorDivId, message);
    return result;
  }
  isSelected(field, errorDivId, message) {
    let result = field !== "0";
    this.handleError(!result, errorDivId, message);
    return result;
  }
  isUnique(arr, field, errorDivId, message, isUpdate, objId) {
    let result = arr.filter((ele) => ele.name === field);
    if (result.length > 1) {
      result = false;
    } else if (result.length === 1) {
      result = result[0].id === objId;
    } else {
      result = true;
    }
    this.handleError(!result, errorDivId, message);
    return result;
  }
  isMatch(field, format, errorDivId, message) {
    let result = field.match(format) !== null;
    this.handleError(!result, errorDivId, message);
    return result;
  }
  handleError(isFalse, divId, message) {
    if (isFalse) {
      getEle(divId).style.display = "block";
      getEle(divId).innerHTML = message;
    } else {
      getEle(divId).style.display = "none";
      getEle(divId).innerHTML = "";
    }
  }
  isValid(arr, obj, isUpdate = false) {
    console.log("Validating!");
    let errorDivId = this.getErroDiv();
    let inputFields = helper.getInputEle();
    let valid = true;
    //name
    valid &=
      this.isFilled(
        obj.name,
        errorDivId[0],
        "(*) Vui lòng nhập tên sản phẩm"
      ) &&
      this.isUnique(
        arr,
        obj.name,
        errorDivId[0],
        "(*) Tên Sản Phẩm đã tồn tại",
        isUpdate,
        obj.id
      );
    //price
    valid &=
      this.isFilled(
        obj.price,
        errorDivId[1],
        "(*) Vui lòng nhập giá sản phẩm"
      ) &&
      this.isMatch(
        obj.price,
        this.numRegex,
        errorDivId[1],
        "(*) Giá sản phẩm chỉ chứa ký tự số"
      );
    //screen
    valid &= this.isFilled(
      obj.screen,
      errorDivId[2],
      "(*) Vui lòng nhập thông số màn hình"
    );
    //backCamera
    valid &= this.isFilled(
      obj.backCamera,
      errorDivId[3],
      "(*) Vui lòng nhập thông số camera sau"
    );
    //frontCamera
    valid &= this.isFilled(
      obj.frontCamera,
      errorDivId[4],
      "(*) Vui lòng nhập thông số camera trước"
    );
    //img
    valid &= this.isFilled(
      obj.img,
      errorDivId[5],
      "(*) Vui lòng nhập link hình sản phẩm"
    );
    //desc
    valid &= this.isFilled(
      obj.desc,
      errorDivId[6],
      "(*) Vui lòng nhập thông tin mô tả sản phẩm"
    );
    //type
    valid &= this.isSelected(
      obj.type,
      errorDivId[7],
      "(*) Vui lòng chọn loại sản phẩm"
    );
    return valid;
  }
}
