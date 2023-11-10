import { Service } from "./controller/index.js";
import { Product } from "./controller/product.js";
import { CartProduct } from "./controller/cartProduct.js";

const getEle = (id) => document.getElementById(id);

let service = new Service();
let cart = [];

let setLocalStorage = (data) => {
  const str = JSON.stringify(data);
  localStorage.setItem("Phone_List", str);
  console.log("setLocalStorage", str);
};

const renderList = (data) => {
  // console.log(data);
  let content = "";
  // let id = 0;
  // cart.forEach((ele) => {

  // });

  data.forEach((ele) => {
    // id += 1;
    content += `
        <div class="card col-3">
            <img
            src="${ele.product.img}"
            class="img-fluid py-5"
            style="width: 15.625em"
            alt=""
            />
            <div class="card-body" id="card_body${ele.product.id}">
              <h3 class="card-title">${ele.product.name}</h3>
              <div class="card-text pb-4">
                 <span class="descText">Camera sau:</span> ${ele.product.backCamera} <br />
                  <span class="descText">Camera trước: </span>${ele.product.frontCamera} <br />
                  <span class="descText">Màn hình: </span>${ele.product.screen} <br />
                  <span class="descText">Là một sản phẩm có </span>${ele.product.desc}
              </div>
              <div class="d-flex justify-content-between">
                <span>$${ele.product.price}  </span>
                <button class="btn btn-success ml-2" id="btnAdd${ele.product.id}" onclick="addProduct(${ele.product.id})">ADD</button>

                <div class="bg-dark" style="color:white; display:none;" id="qty_${ele.product.id}">
                  <div class="item-row flus-minus d-flex align-items-center">
                    <a class="btn add-btn d-flex align-items-center" onclick="decrQty('${ele.product.id}')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                        <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
                      </svg>
                    </a>
                    <span id="qtyItem_${ele.product.id}">${ele.quantity}</span>
                    <a class="btn minus-btn d-flex align-items-center" onclick="incrQty('${ele.product.id}')">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                        <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </div>
        `;
  });
  getEle("listSP").innerHTML = content;

  data.forEach((ele) => {
    console.log("ele.quantity", ele.quantity);
    if (ele.quantity > 0) {
      getEle(`qty_${ele.product.id}`).style.display = "block";
      getEle(`btnAdd${ele.product.id}`).style.display = "none";
    }
  });
};

// lấy API sản phẩm
const getList = () => {
  return new Promise((resolve, reject) =>
    resolve(
      service
        .getListAPI()
        .then((result) => {
          let currentCart = listProductToCart(result.data);
          console.log(currentCart);
          renderList(currentCart);
        })
        .catch((error) => {
          console.log(error);
        })
    )
  );
};

// getList();

//Map listProduct -> cart []
let listProductToCart = (listProduct) => {
  //check current quantity
  return listProduct.map((ele) => {
    let item = cart.filter((cartEle) => ele.id === cartEle.product.id);
    let quantity = 0;
    const { id, name, price, screen, backCamera, frontCamera, img, desc, type } = ele;
    const product = new Product(
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
    return new CartProduct(product, quantity);
  });
};

// select option
window.OnChangePhone = (option) => {
  service
    .getListAPI()
    .then((result) => {
      let arrOpt = result.data;
      arrOpt = listProductToCart(arrOpt);
      // console.log({ arrOpt });
      if (option !== "all") {
        arrOpt = arrOpt.filter((ele) => ele.product.type === option);
      }
      console.log({ arrOpt });
      renderList(arrOpt);
    })
    .catch((error) => {
      console.log(error);
    });
};

//Input: cart
//Output: totalPrice = Tong(priceItem);
// TH1: cart.length === 0:
// totalPrice = 0;
// TH2: cart.length > 0:
//  totalPrice = cart.reduce((pre, ele) => pre + ele.product.price * ele.quantity, 0);
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path
              d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
            />
          </svg>
        </a>
        <span id="qtyCartItem_${ele.product.id}">${ele.quantity}</span>
        <a class="btn minus-btn d-flex align-items-center" onclick="incrQty('${
          ele.product.id
        }')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path
              d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
            />
          </svg>
        </a>
      </div>
      <div class="item-row">$ <span class="priceItem">${
        ele.product.price * ele.quantity
      }</span></div>
      <div class="item-row">
        <a type="button" class="clear-product" onclick="removeCartItem('${
          ele.product.id
        }')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
            />
          </svg>
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
  return getList();
};

let getLocalStorage = (container, key) => {
  const str = localStorage.getItem(key);
  container = str ? JSON.parse(str) : [];
  if (container.length > 0) {
    container = container.map((ele) => {
      const { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
        ele.product;
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

getList().then((result) => {
  cart = getLocalStorage(cart, "Phone_List");
  cart.forEach((ele) => {
    if (ele.quantity) {
      getEle(`qty_${ele.product.id}`).style.display = "block";
      getEle(`btnAdd${ele.product.id}`).style.display = "none";
    }
  });
});

