export class PhoneList {
  arr = [];
  getPhone() {
    return axios({
      url: "https://62bc4dc0eff39ad5ee2238c0.mockapi.io/api/Product",
      method: "GET",
    });
  }
  addPhone(phone) {
    return axios({
      url: "https://62bc4dc0eff39ad5ee2238c0.mockapi.io/api/Product",
      method: "POST",
      data: phone,
    });
  }
  removePhone(id) {
    return axios({
      url: `https://62bc4dc0eff39ad5ee2238c0.mockapi.io/api/Product/${id}`,
      method: "DELETE",
    });
  }
  getPhoneById(id) {
    return axios({
      url: `https://62bc4dc0eff39ad5ee2238c0.mockapi.io/api/Product/${id}`,
      method: "GET",
    });
  }
  updatePhone(phone) {
    return axios({
      url: `https://62bc4dc0eff39ad5ee2238c0.mockapi.io/api/Product/${phone.id}`,
      method: "PUT",
      data: phone,
    });
  }
}
