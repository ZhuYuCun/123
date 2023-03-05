let query = {};
let current = null;
$(function () {
  let locationSearch = location.search.replace('?', '');
  if (locationSearch && locationSearch.indexOf('=') != -1) {
    let queryArr = locationSearch.split('=');
    query.classify = queryArr[1];
  }

  search();
  $('#mobile-menu a')
    .mouseover(function () {
      $('#mobile-menu').find('a').removeClass('active');
      $('.nice-select').removeClass('open');
    })
    .mouseleave(function () {
      if (location.pathname === '/index.html' || location.pathname === '/') {
        $('#mobile-menu').find('a').eq(0).addClass('active');
      }
      if (location.pathname === '/sort.html') {
        $('#mobile-menu').find('a').eq(1).addClass('active');
      }
    });
  $('#sortId')
    .mouseover(function () {
      $('.sort-child').show();
      $('.mode').show();
    })
    .mouseleave(function () {
      $('.sort-child').hide();
      $('.mode').hide();
    });

  // 排序选择时候触发
  $('#sortSelect').change(function () {
    query.sort = $(this).val();
    search();
  });

  // $('.carousel').carousel({
  //   interval: 10000,
  // });
});

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

function search() {
  $.ajax({
    url: '/product',
    type: 'GET',
    data: query,
    success: function (row) {
      var resData = JSON.parse(row);
      var pathName = location.pathname;
      if (pathName.indexOf('sort') != -1) {
        renderSortPage(resData.data, query);
      }

      if (pathName.indexOf('index') != -1 || pathName.length < 2) {
        indexRender(resData.data);
      }

      if (pathName.indexOf('detail') != -1) {
        var id = location.search.split('=')[1];
        if (id) detailRender(location.search.split('=')[1], resData.data);
        // 详情页推荐;
      }
    },
  });
}
// 详情页渲染
function detailRender(id, allData) {
  $.ajax({
    url: `/product?id=${id}`,
    type: 'GET',
    success: function (data) {
      console.log('data', data);
      let id = data.id;
      current = data;

      $('#titleBrand').text(data.title);
      $('#productTitle').text(data.title);
      $('#introduct').text(data.describe);

      $('#v-pills-tab1').append(`
        <a class="nav-link show active" id="v-pills-home-tab1" data-toggle="pill" href="#v-pills-home1" role="tab" aria-controls="v-pills-home1" aria-selected="true">
          <img class="product-thumbnail" src="images/product/${data.cover}" alt="" />
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
          <div class="product-gallery-btn position-absolute right-site mr-4">
            <a href="images/product/${data.cover}" class="zoom-gallery dark-black-color bg-white d-block m-2" data-fancybox="images"
              ><i class="fas fa-compress"></i><img class="d-none width100" src="images/product/${data.cover}" alt=""
            /></a>
          </div>
          <div class="product-img">
            <img class="width100" src="images/product/${data.cover}" alt="" />
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

      detailRecmmodRender(allData);
    },
  });
}

// 分类页面数据
function renderSortPage(data) {
  if (query) {
    data = queryData(data, query);
  }

  $('#productNumber').text(data.length);

  $('#col-2').find('.row').empty();
  $('#col-3').find('.row').empty();
  $('#col-4').find('.row').empty();
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

// 首页数据
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

    // $('#recmmodIndex').append(model);
  });
}

// 详情页推荐 page
function detailRecmmodRender(data) {
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

  var classifyData = data.filter((item) => item.classify == current.classify);

  console.log('classifyData', classifyData);
  var recmmodlist = getRandomArrayElements(classifyData, 10);

  recmmodlist.forEach((item) => {
    console.log('item:', item);
    if (!item) return;
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

  $('.Sale-Products-active').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
}

// 排序 类型筛选 流行 时间排序
function queryData(data, query) {
  console.log('query', query);
  let resData = data;
  // 类型筛选
  if (query.classify) {
    resData = resData.filter((item) => item.classify === query.classify);
  }
  // 时间排序
  // 流行度排序
  let handleSort = function (prop) {
    return function (a, b) {
      const val1 = a[prop];
      const val2 = b[prop];

      if (prop === 'createTime') {
        // 时间排序
        return new Date(val2) - new Date(val1);
      }

      return val2 - val1;
    };
  };
  if (query.sort) {
    resData.sort(handleSort(query.sort));
  }

  return resData;
}
