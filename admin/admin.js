var idEdit = null;

// 1. gọi api lấy danh sách sp từ server
function fetchProductList() {
  turnOnLoading();
  axios({
    url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      renderProductList(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      turnOffLoading();
    });
}

fetchProductList();

// 2. xoá 1 sp trên server
function deleteProduct(id) {
  turnOnLoading();
  axios({
    url: `https://653cc7c7d5d6790f5ec84813.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      // gọi lại api lấy ds sp mới nhất từ server sau khi xoá thành công
      fetchProductList();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
    });
}

// 3. add new product 
function createProduct() {
  // console.log("yess");
  var product = getDataForm();

  axios({
    url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
    method: "POST",
    data: product,
  })
    .then(function (res) {
      console.log("product:", res.data)
      fetchProductList();
      // tắt modal sau khi thêm thành công
      // $("#myModal").modal("hide");
      // reset form sau khi thêm thành công
      document.getElementById("myForm").reset();
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

// 4. edit product 
function editProduct(id) {
  // show modal when pressing Edit button
  var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
  myModal.show(); 

  idEdit = id; 

  axios({
    url: `https://653cc7c7d5d6790f5ec84813.mockapi.io/product/${id}`,
    method: "GET"
  }).then((res) => {
    console.log("res", res.data);
    document.getElementById("name").value = res.data.name; 
    document.getElementById("price").value = res.data.price; 
    document.getElementById("screen").value = res.data.screen; 
    document.getElementById("backCam").value = res.data.backCamera; 
    document.getElementById("frontCam").value = res.data.frontCamera; 
    document.getElementById("link").value = res.data.img; 
    document.getElementById("desc").value = res.data.desc; 
    document.getElementById("brand").value = res.data.type; 

  }).catch((err) => {
    console.log("err", err);
  });
}

function sortProductsAscending() {
  console.log("Sorting products ascending");
  turnOnLoading();
  axios({
    url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      AsSorting(res.data);
      console.log(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      turnOffLoading();
    });

}

function sortProductsDescending() {
  console.log("Sorting products Descending");
  turnOnLoading();
  axios({
    url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      DesSorting(res.data);
      console.log(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      turnOffLoading();
    });

}