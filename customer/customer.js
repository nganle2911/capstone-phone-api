import { Service } from "./controller/index.js";
import { Product } from "./controller/product.js";
import { CartProduct } from "./controller/cartProduct.js";

const getEle = (id) => document.getElementById(id);

let service = new Service();
let cart= [];


// Function display the list of products
const renderList = (data) => {
  let content = "";
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
};

// Loop through the product list
let listProductToCart = (listProduct) => {
  return listProduct.map((ele) => {
    console.log("ele", ele);
    console.log("cart", cart);

    let item = cart.filter((cartEle) => ele.id === cartEle.product.id);
    console.log("item", item);

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
    
    return new CartProduct(product);
  });
};

// Call api to get list of products 
const getList = () => {
  service
    .getListAPI()
    .then((result) => {
      let currentCart = listProductToCart(result.data);
      console.log("currentCart", currentCart);
      renderList(currentCart);
    })
    .catch((error) => {
      console.log(error);
    })
};

// Display the list of products
getList();