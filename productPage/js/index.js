function getEle(id) {
  return document.getElementById(id);
}
let productList = [];
let cart = [];

class Service {
  arr = [];

  getListAPI() {
    return axios({
      url: "https://62bc4dc0eff39ad5ee2238c0.mockapi.io/api/Product",
      method: "GET",
    });
  }
  getProductById = (id) => {
    return axios({
      url: `https://62bc4dc0eff39ad5ee2238c0.mockapi.io/api/Product/${id}`,
      method: "GET",
    });
  };
}
let service = new Service();
const getListProduct = () => {
  return new Promise((resolve, reject) =>
    resolve(
      service
        .getListAPI()
        .then((result) => {
          productList = [...result.data];
          let currentCart = listProductToCart(result.data);
          renderProduct(currentCart);
        })
        .catch((error) => {
          console.log(error);
        })
    )
  );
};
getListProduct();
let setLocalStorage = (data) => {
  const str = JSON.stringify(data);
  localStorage.setItem("Phone_List", str);
  console.log(data);
};

let filterByType = () => {
  let e = getEle("select");
  let res = e.options[e.selectedIndex].text;
  if (res === "All") {
    renderProduct(listProductToCart(productList));
  } else {
    var resArr = [];
    for (var i = 0; i < productList.length; i++) {
      if (productList[i].type === res) {
        resArr.push(productList[i]);
      }
    }
    renderProduct(listProductToCart(resArr));
  }
};

let renderProduct = (data) => {
  var contentHTML = "";

  data.forEach((ele) => {
    contentHTML += `
    <div class = "col-lg-3 col-md-4 col-sm-6 col-xs-12 d-flex align-items-stretch">
      <div class="card">
          <img
          src="${ele.product.img}"
          class="img-fluid py-5"
          style="width: 100%"
          alt=""
          />
          <div class="card-body" id="card_body${ele.product.id}">
            <h5 class="card-title">${ele.product.name}</h5>
            <div class="card-text pb-4">
                <p id="demo-${ele.product.id}">
                <span class="descText">Camera sau:</span> ${ele.product.backCamera} <br />
                <span class="descText">Camera trước: </span>${ele.product.frontCamera} <br />
                <span class="descText">Màn hình: </span>${ele.product.screen} <br />
                <span class="descText"></span>${ele.product.desc}
                </p>
            </div>
          </div>
          <div class=" card-footer d-flex justify-content-between footer_item bg-transparent ">
              <span>$${ele.product.price}  </span>
              <button class="btn btn-success ml-2" id="btnAdd${ele.product.id}" onclick="addProduct(${ele.product.id})">ADD</button>
              <div class="" style="display:none;" id="qty_${ele.product.id}">
                <div class="item-row flus-minus d-flex align-items-center">
                  <a class="btn add-btn d-flex align-items-center" onclick="decrQty('${ele.product.id}')">
                    -
                  </a>
                  <span id="qtyItem_${ele.product.id}">${ele.quantity}</span>
                  <a class="btn minus-btn d-flex align-items-center" onclick="incrQty('${ele.product.id}')">
                    +
                  </a>
                </div>
              </div>
            </div>
      </div>
    </div>
    `;
  });
  getEle("productList").innerHTML = contentHTML;
  data.forEach((ele) => {
    if (ele.quantity > 0) {
      getEle(`qty_${ele.product.id}`).style.display = "block";
      getEle(`btnAdd${ele.product.id}`).style.display = "none";
    }
  });
};

let listProductToCart = (listProduct) => {
  //check current quantity
  return listProduct.map((ele) => {
    let item = cart.filter((cartEle) => ele.id === cartEle.product.id);
    let quantity = 0;
    const {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
    } = ele;
    var product = new Product(
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type
    );
    if (item.length > 0) {
      quantity = item[0].quantity;
    }
    return new CartItem(product, quantity);
  });
};

let calcTotalQty = (cart) => cart.reduce((pre, ele) => pre + ele.quantity, 0);
let calcTotalPrice = (cart) => {
  let totalPrice = 0;
  if (cart.length > 0) {
    totalPrice = cart.reduce(
      (pre, ele) => pre + ele.product.price * ele.quantity,
      0
    );
  }
  return totalPrice;
};
let renderCart = (cart) => {
  let content = "";
  cart.forEach((ele) => {
    content += `
    <div class="item-product mt-2" id="cartItem_${ele.product.id}">
      <div class="item-row">
        <img class="img-fluid" src="${ele.product.img}" alt="" />
      </div>
      <div class="item-row">${ele.product.name}</div>
      <div class="item-row flus-minus d-flex align-items-center">
        <a class="btn add-btn d-flex align-items-center" onclick="decrQty('${
          ele.product.id
        }')">
          -
        </a>
        <span id="qtyCartItem_${ele.product.id}">${ele.quantity}</span>
        <a class="btn minus-btn d-flex align-items-center" onclick="incrQty('${
          ele.product.id
        }')">
          +
        </a>
      </div>
      <div class="item-row">$ <span class="priceItem">${
        ele.product.price * ele.quantity
      }</span></div>
      <div class="item-row">
        <a type="button" class="clear-product" onclick="removeCartItem('${
          ele.product.id
        }')">
        </a>
      </div>
    </div>
    `;
  });
  getEle("itemProduct").innerHTML = content;
  cart.forEach((ele) => {
    getEle(`qtyCartItem_${ele.product.id}`).innerHTML = ele.quantity;
  });
  let totalPrice = calcTotalPrice(cart);
  getEle("totalPrice").innerHTML = totalPrice;

  document.querySelector(".total-qty").innerHTML = calcTotalQty(cart);

  setLocalStorage(cart);
  return getListProduct();
};

let getLocalStorage = (container, key) => {
  const str = localStorage.getItem(key);
  container = str ? JSON.parse(str) : [];
  if (container.length > 0) {
    container = container.map((ele) => {
      const {
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type,
      } = ele.product;
      const _quantity = ele.quantity;
      const _product = new Product(
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
      );
      return new CartProduct(_product, _quantity);
    });
    console.log(container);
    renderCart(container);
  }
  return container;
};
getListProduct().then((result) => {
  cart = getLocalStorage(cart, "Phone_List");
  cart.forEach((ele) => {
    if (ele.quantity) {
      getEle(`qty_${ele.product.id}`).style.display = "block";
      getEle(`btnAdd${ele.product.id}`).style.display = "none";
    }
  });
});
window.addProduct = (id) => {
  //push cart
  addCart(id, 1).then((result) => {
    let currentItem = cart[cart.length - 1];
    renderCart(cart).then(() => {
      getEle(`btnAdd${id}`).style.display = "none";
      getEle(`qty_${id}`).style.display = "block";
    });
  });
};

let addCart = (id, quantity) => {
  return new Promise((resolve, reject) => {
    resolve(
      service.getProductById(id).then((result) => {
        let cartItem = new CartItem(result.data, quantity);
        cart = [...cart, cartItem];
      })
    );
  });
};

window.incrQty = (id) => {
  let i = cart.findIndex((ele) => ele.product.id === id);
  cart[i].quantity++;
  console.log(cart);
  //renderCart
  renderCart(cart);
};

window.removeCartItem = (id) => {
  getEle(`btnAdd${id}`).style.display = "inline-block";
  getEle(`cartItem_${id}`).style.display = "none";
  getEle(`qty_${id}`).style.display = "none";
  //remove from cart
  cart = cart.filter((ele) => ele.product.id !== id);
  renderCart(cart);
};

window.decrQty = (id) => {
  let i = cart.findIndex((ele) => ele.product.id === id);
  console.log(cart[i].quantity);
  if (cart[i].quantity > 1) {
    cart[i].quantity--;
    renderCart(cart);
  } else {
    removeCartItem(id);
  }
};

window.clearCart = (isPurchase) => {
  cart.forEach((ele) => removeCartItem(ele.product.id));
  // renderCart(cart);
  if (isPurchase) alert("Đặt hàng thành công!");
};
