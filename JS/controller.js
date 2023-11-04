function renderProductList(productArr) {
    var contentHTML = "";
    for (var i = 0; i < productArr.length; i++) {
      var product = productArr[i];
      var trString = `
      <tr>
                  <td>${product.id}</td>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td>${product.img}</td>
                  <td>${product.desc}</td>
                  <td>
  
                          <button
                          onclick=editProduct(${product.id})
                          class="btn btn-warning">Edit</button>
  
                          <button
                          onclick=deleteProduct(${product.id})
                          class="btn btn-danger">Delete</button>
  
                  </td>
                  
      </tr>
      `;
      contentHTML += trString;
    }
    document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
  }

  function turnOnLoading() {
    document.getElementById("spinner").style.display = "block";
  }
  function turnOffLoading() {
    document.getElementById("spinner").style.display = "none";
  }
  function getDataForm() {
    var ten = document.getElementById("name").value;
    var gia = document.getElementById("price").value;
    var hinhAnh = document.getElementById("link").value;
    var moTa = document.getElementById("desc").value;
    return {
      name: ten,
      price: gia,
      img: hinhAnh,
      desc: moTa,
    };
  }


  function AsSorting(productArr) {
    var contentHTML = "";
    productArr.sort((a, b) =>a.price - b.price);
    for (var i = 0; i < productArr.length; i++) {
      var product = productArr[i];
      var trString = `
      <tr>
                  <td>${product.id}</td>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td>${product.img}</td>
                  <td>${product.desc}</td>
                  <td>
  
                          <button
                          onclick=editProduct(${product.id})
                          class="btn btn-warning">Edit</button>
  
                          <button
                          onclick=deleteProduct(${product.id})
                          class="btn btn-danger">Delete</button>
  
                  </td>
                  
      </tr>
      `;
      contentHTML += trString;
    }
    document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
  }

  function DesSorting(productArr) {
    var contentHTML = "";
    productArr.sort((a, b) =>b.price - a.price);
    for (var i = 0; i < productArr.length; i++) {
      var product = productArr[i];
      var trString = `
      <tr>
                  <td>${product.id}</td>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td>${product.img}</td>
                  <td>${product.desc}</td>
                  <td>
  
                          <button
                          onclick=editProduct(${product.id})
                          class="btn btn-warning">Edit</button>
  
                          <button
                          onclick=deleteProduct(${product.id})
                          class="btn btn-danger">Delete</button>
  
                  </td>
                  
      </tr>
      `;
      contentHTML += trString;
    }
    document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
  }
