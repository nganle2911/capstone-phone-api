import { Service } from "./controller/Service.js";

let productsList = [];
let cart = [];
let service = new Service(); 

const getEle = (id) => document.getElementById(id);

// todo: Render list of products on UI - customer page 
const renderList = () => {
    let content = "";
    if (productsList.length > 0) {
        productsList.forEach((ele) => {
            // id += 1;
            content += `
            <div class="card-item col-3 mt-4">
              <div class="card">
                <div class="card-header">
                    <img
                    src="${ele.img}"
                    class="img-fluid py-3"
                    style="width: 15em"
                    alt=""
                    />
                  </div>
                  <div class="card-body" id="card_body${ele.id}">
                    <h3 class="card-title">${ele.name}</h3>
                    <div class="card-text pb-4">
                        <a data-bs-toggle="collapse" href="#collapseItem${ele.id}" role="button" aria-expanded="false" aria-controls="collapseExample">Click for more details</a>
                        <div class="collapse mt-2" id="collapseItem${ele.id}">
                            <div class="card card-body">
                                <span class="descText"><strong>Camera sau: </strong>${ele.backCamera}</span>
                                <span class="descText"><strong>Camera trước: </strong>${ele.frontCamera}</span>
                                <span class="descText"><strong>Màn hình: </strong>${ele.screen}</span>
                                <span class="descText"><strong>Mô tả: </strong>${ele.desc}</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>$${ele.price}</span>
                      <button class="btn btn-success ml-2" onclick="addToCart(${ele.id})">ADD</button>
                    </div>
                  </div>
              </div>
            </div>
          `;
        });

        // render on UI 
        getEle("listSP").innerHTML = content;
    }
};

// todo: Call api to get list of products and render on UI
const getListApi = () => {
    service.getListAPI().then((result) => {
        productsList = result.data; 
        console.log("productsList", productsList);

        // render products on UI
        renderList(); 

        // get cart from localStorage
        getCartFromLocalStorage();
    }).catch((err) => {
        console.log(err);
    });
};
// Display the list of products
getListApi();

// todo: Filter brand 
const fetchFilter = (nameType) => {
    service.getListAPI().then((result) => {
        productsList = result.data.filter((phone) => phone.type === nameType);
        console.log("productsList fetchFilter", productsList);

        // render products on UI
        renderList(); 

        // get cart from localStorage
        // getCartFromLocalStorage();
    }).catch((err) => {
        console.log(err);
    });
};

getEle("selectList").addEventListener("change", function () {
    if (getEle("selectList").value === "Apple") {
        fetchFilter("Apple");
    } else if (getEle("selectList").value === "Samsung") {
        fetchFilter("Samsung");
    } else {
        getListApi();
    }
});


// todo: add product to cart by clicking on "add" button on each product => product will be added to cart
window.addToCart = (product_id) => {
    console.log("product_id", product_id);
    // find the position of this item in cart array => to add quantity if product_id is the same 
    let itemPositionInCart = cart.findIndex((value) => {
        // console.log("value", value);
        return value.product_id === product_id; 
    });
    console.log("ItemPositionInCart", itemPositionInCart);

    // if cart array is empty => add item to cart
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (itemPositionInCart < 0) {
        // if cart has already items, and the item added does not exist in cart => push it in cart
        cart.push({
            product_id: product_id,
            quantity: 1
        })
    } else {
        // if this item already existed in cart => quantity of this item +1 
        cart[itemPositionInCart].quantity++; 
    }

    console.log("cart after adding items", cart);
    
    // render cart on UI 
    renderCart();
    saveCartToLocalStorage(); 
}

// todo: render cart on UI
const renderCart = () => {
    let listCartHTML = "";
    let totalQuantity = 0;
    let totalAmount = 0; 
    console.log("cartRender", cart);

    if (cart.length > 0) {
        // console.log("cart", cart);
        cart.map((itemCart) => {
            // console.log("itemCart", itemCart);
            totalQuantity += itemCart.quantity; 

            // console.log("productsList", productsList);
            // search in productsList array, get product.id == itemCart.product_id
            let product = productsList.find((product) => {
                return product.id == itemCart.product_id; 
            });
            // console.log("product", product);

            let amount = itemCart.quantity * product.price; 
            totalAmount += amount; 

            listCartHTML += `
                <tr id=item_${product.id}>
                    <td><img src=${product.img} alt="..." width="80px" /></td>
                    <td>
                    <h6 class="text-muted">${product.type}</h6>
                    <h6 class="text-black mb-0">${product.name}</h6>
                    </td>
                    <td>$${product.price}</td>
                    <td>
                    <div class="btn_quantity">
                        <span id="minus" onclick="decreaseQuantity(${product.id})"><i class="fa fa-minus"></i></span>
                        <span>${itemCart.quantity}</span>
                        <span id="plus" onclick="increaseQuantity(${product.id})"><i class="fa fa-plus"></i></span>
                    </div>
                    </td>
                    <td>$${amount}</td>
                    <td><i class="fa fa-trash-alt" onclick="removeItemInCart(${product.id})"></i></td>
                </tr>
            `;
        })
    }

    getEle("listCart").innerHTML = listCartHTML; 
    getEle("totalAmount").innerText = totalAmount; 
}

// todo: increase quantity of item in cart
window.increaseQuantity = (product_id) => {
    // find the position of item in cart
    let itemPositionCart = cart.findIndex((item) => {
        return item.product_id == product_id;
    });
    console.log("itemPositionCart", itemPositionCart);

    if (itemPositionCart >= 0) {
        cart[itemPositionCart].quantity++; 
    }

    renderCart();
    saveCartToLocalStorage();
}

// todo: decrease quantity of item in cart 
window.decreaseQuantity = (product_id) => {
    
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    

    if (positionItemInCart >= 0) {
        let itemQuan = cart[positionItemInCart].quantity - 1;

        if (itemQuan > 0) {
            cart[positionItemInCart].quantity = itemQuan;
        } else {
            cart.splice(positionItemInCart, 1);
        }
    }

    renderCart();
    saveCartToLocalStorage();
}

// todo: remove item from cart
window.removeItemInCart = (product_id) => {
    // remove item on UI
    document.getElementById(`item_${product_id}`).remove();

    // remove item in localStorage 
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    cart.splice(positionItemInCart, 1);

    renderCart();
    saveCartToLocalStorage();
}

// todo: clear cart when clicking on "Payment" button
window.handlePayment = () => {
    if (cart.length <= 0) {
        alert("Your cart is empty!");
    } else {
        let newCart = []; 
        cart = newCart; 

        renderCart();
        saveCartToLocalStorage(); 
    }
}

// todo: save cart to localStorage 
const saveCartToLocalStorage = () => {
    // convert data to json format
    let cartJson = JSON.stringify(cart); 
    // save to localStorage
    localStorage.setItem("CART_LOCAL", cartJson);
}

// todo: get cart from localStorage
const getCartFromLocalStorage = () => {
    // get cartJson saved in localStorage
    let cartJson = localStorage.getItem("CART_LOCAL", cart);
    // Check if cartJson is null => don't have data => can't parse 
    // Check if cartJson is not null => parse data 
    if (cartJson != null) {
        // convert cartJson to cart array
        cart = JSON.parse(cartJson);

        renderCart();
    }
}



