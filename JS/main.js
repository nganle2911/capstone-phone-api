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
//   2. xoá 1 sp trên server

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
      turnOffLoading();
    });
}

function createProduct() {
    console.log("yess");
    var product = getDataForm();
    axios({
      url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
      method: "POST",
      data: product,
    })
      .then(function (res) {
        fetchProductList();
        // tắt modal sau khi thêm thành công
        // $("#myModal").modal("hide");
      })
      .catch(function (err) {});
}

  function sortProductsAscending(){
    console.log("Sorting products ascending");
    turnOnLoading();
    axios({
      url: "https://653cc7c7d5d6790f5ec84813.mockapi.io/product",
      method: "GET",
    })
      .then(function (res) {
        Sorting(res.data);
        console.log(res.data);
        turnOffLoading();
      })
      .catch(function (err) {
        turnOffLoading();
      });

  }