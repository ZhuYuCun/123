$(function () {
  search();
});

// $('.carousel').carousel({
//   interval: 1000,
// });

// search
$('.header-search-details ul li').click(function () {
  $(this).find('a').addClass('active');
  $(this).siblings().find('a').removeClass('active');
});

// submit email
layui.use('layer', function () {
  var $ = layui.jquery,
    layer = layui.layer;

  $('#submit').on('click', function () {
    layer.open({
      title: 'SUBMITTED SUCCESSEULLY',
      area: ['390px', '160px'],
      content: '<div>THANK YOU FOR YOUR TRUST, WE WILL CONTACT YOUAS SOONAS POSSIBLE</div>',
      btn: null,
    });
  });
});

function search(query) {
  $.ajax({
    url: '/product',
    type: 'GET',
    data: query,
    success: function (row) {
      var resData = JSON.parse(row);
      var pathName = location.pathname;
      if (pathName.indexOf('sort') != -1) {
        renderSortPage(resData.data);
      }

      if (pathName.indexOf('index') != -1) {
        indexRender(resData.data);
      }

      if (pathName.indexOf('detail') != -1) {
        detailRecmmodRender(resData.data);
        var id = location.search.split('=')[1];
        if (id) detailRender(location.search.split('=')[1]);
      }
    },
  });
}

function detailRender(id) {
  $.ajax({
    url: `/product?id=${id}`,
    type: 'GET',
    success: function (data) {
      console.log('data', data);
      let id = data.id;

      $('#titleBrand').text(data.title);
      $('#productTitle').text(data.title);
      $('#introduct').text(data.describe);

      $('#v-pills-tab1').append(`
        <a class="nav-link show active" id="v-pills-home-tab1" data-toggle="pill" href="#v-pills-home1" role="tab" aria-controls="v-pills-home1" aria-selected="true">
          <img class="product-thumbnail" src="images/product/${id}-1.JPG" alt="" />
        </a>
        <a class="nav-link" id="v-pills-profile-tab1" data-toggle="pill" href="#v-pills-profile1" role="tab" aria-controls="v-pills-profile1" aria-selected="false">
          <img class="product-thumbnail" src="images/product/${id}-2.JPG" alt="" />
        </a>
        <a class="nav-link" id="v-pills-messages-tab1" data-toggle="pill" href="#v-pills-messages1" role="tab" aria-controls="v-pills-messages1" aria-selected="false">
          <img class="product-thumbnail" src="images/product/${id}-3.JPG" alt="" />
        </a>
        `);

      $('#v-pills-tabContent1').append(`
        <div class="tab-pane fade show active" id="v-pills-home1" role="tabpanel" aria-labelledby="v-pills-home-tab1">
          <div class="product-img">
            <img class="width100 height100" src="images/product/${id}-1.JPG" alt="" />
          </div>
        </div>
        <div class="tab-pane fade" id="v-pills-profile1" role="tabpanel" aria-labelledby="v-pills-profile-tab1">
          <div class="product-gallery-btn position-absolute right-site mr-4">
            <a href="images/product/${id}-2.JPG" class="zoom-gallery dark-black-color bg-white d-block m-2" data-fancybox="images"
              ><i class="fas fa-compress"></i><img class="d-none width100" src="images/product/${id}-2.JPG" alt=""
            /></a>
          </div>
          <div class="product-img">
            <img class="width100" src="images/product/${id}-2.JPG" alt="" />
          </div>
        </div>
        <div class="tab-pane fade" id="v-pills-messages1" role="tabpanel" aria-labelledby="v-pills-messages-tab1">
          <div class="product-gallery-btn position-absolute right-site mr-4">
            <a href="images/product/${id}-3.JPG" class="zoom-gallery dark-black-color bg-white d-block m-2" data-fancybox="images"
              ><i class="fas fa-compress"></i><img class="width100 d-none" src="images/product/${id}-3.JPG" alt=""
            /></a>
          </div>
          <div class="product-img">
            <img class="width100" src="images/product/${id}-3.JPG" alt="" />
          </div>
        </div>
      `);
    },
  });
}

// render sort page
function renderSortPage(data) {
  console.log('render sort page:', data);
  $('#productNumber').text(data.length);

  $('#col-2').find('.row').empty();
  data.forEach((item) => {
    // 渲染方式1
    var model1 = `
      <div class="col-xl-6 col-lg-6 col-md-4 col-sm-6 col-12 mb-40">
        <div class="single-product bg-white position-relative pb-30">
          <div class="single-product-img position-relative">
            <a href="detail.html?id=${item.id}"><img class="height100" src="images/product/${item.cover}" alt="" /></a>
          </div>
          <h5 class="product-name pt-20 pl-20">
            <a href="detail.html?id=${item.id}">${item.title}</a>
          </h5>
          <div class="product-price pl-20">${item.type}</div>
        </div>
      </div>
      `;
    // 渲染方式2
    var model2 = `
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-40">
            <div class="single-product bg-white position-relative pb-30">
              <div class="single-product-img position-relative">
                <a href="detail.html?id=${item.id}"><img class="height100" src="images/product/${item.cover}" alt="" /></a>
              </div>
              <h5 class="product-name pt-20 pl-20">
                <a href="detail.html?id=${item.id}">${item.title}</a>
              </h5>
              <div class="product-price pl-20">${item.type}</div>
            </div>
          </div>   
          `;
    // 渲染方式3
    var model3 = `
            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-40">
              <div class="single-product bg-white position-relative pb-30">
                <div class="single-product-img position-relative">
                  <a href="detail.html?id=${item.id}"><img class="height100" src="images/product/${item.cover}" alt="" /></a>
                </div>
                <h5 class="product-name pt-20 pl-20">
                  <a href="detail.html?id=${item.id}">${item.title}</a>
                </h5>
                <div class="product-price pl-20">${item.type}</div>
              </div>
            </div>
          `;

    $('#col-2').find('.row').append(model1);
    $('#col-3').find('.row').append(model2);
    $('#col-4').find('.row').append(model3);
  });
}

// render index page
function indexRender(data) {
  let recmmodlist = data.filter((item) => item.recommendIndex);
  console.log('render index page', recmmodlist);
  recmmodlist.forEach((item) => {
    // 渲染推荐
    var model = `
      <div class="col-sm-3 product">
        <div class="productInner row m0">
          <div class="row m0 imgHov">
            <a href="/detail.html?id=${item.id}">
              <img src="images/product/${item.cover}" alt="" />
            </a>
          </div>
        </div>
      </div>
      `;

    $('#recmmodIndex').append(model);
  });
}

// detail page
function detailRecmmodRender(data) {
  console.log('render detail page', recmmodlist);

  var getRandomArrayElements = function (arr, count) {
    let newArr = arr.slice(0);
    let i = arr.length;
    let min = i - count;
    let temp = null;
    let index = null;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = newArr[index];
      newArr[index] = newArr[i];
      newArr[i] = temp;
    }
    return newArr.slice(min);
  };

  var recmmodlist = getRandomArrayElements(data, 10);

  console.log('recmmodlist', recmmodlist);

  recmmodlist.forEach((item) => {
    // 渲染推荐
    var model = `
        <div class="row pl-10 pr-10 pt-25">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-40">
            <div class="single-product bg-white position-relative pb-30">
              <div class="single-product-img position-relative">
                <a href="detail.html?id=${item.id}"><img class="height100" src="images/product/${item.cover}" alt="" /></a>
              </div>
              <h5 class="product-name pt-20 pl-20">
                <a href="detail.html?id=${item.id}">${item.title}</a>
              </h5>
              <div class="product-price">${item.type}</div>
            </div>
          </div>
        </div>
      `;
    $('#related').append(model);
  });
}
