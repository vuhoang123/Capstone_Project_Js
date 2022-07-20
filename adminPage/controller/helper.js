let getEle = (id) => document.getElementById(id);
export class Helper {
  inpFields = [
    "name",
    "price",
    "screen",
    "backCam",
    "frontCam",
    "img",
    "desc",
    "type",
  ];
  demo = [
    "iphone 13 Pro Max",
    "999",
    "6.7″, All-screen OLED display¹ with ProMotion",
    "Pro camera system, Telephoto, Wide, Ultra Wide",
    "12 MP",
    "https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-gold-1-600x600.jpg",
    "Thiết kế đẳng cấp hàng đầu",
    "Iphone",
  ];

  getInputEle() {
    return this.inpFields.map((ele) => getEle(ele));
  }
  getInputValue() {
    return this.inpFields.map((ele) => getEle(ele).value);
  }
  prefill() {
    let fields = this.getInputEle();
    fields.forEach((ele, id) => {
      ele.value = this.demo[id];
    });
  }
}
