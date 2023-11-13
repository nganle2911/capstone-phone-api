import { Service } from "./controller/index.js";
import { Product } from "./controller/product.js";
import { CartProduct } from "./controller/cartProduct.js";

const getEle = (id) => document.getElementById(id);

let service = new Service();
let cart = [];


// todo: Render list of products on UI - customer page 
const renderList = (data) => {
  let content = "";
  data.forEach((ele) => {
    // id += 1;
    content += `
      <div class="card-item col-3 mt-4">
        <div class="card">
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