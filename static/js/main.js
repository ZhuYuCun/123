(function ($) {
    "use strict";
    
    //quantity input arrow
    //---------------------------------------------------------------------------      
    $('#quantity-input').inputarrow({
        renderPrev: function(input) {
            return $('<span class="custom-prev"><i class="fas fa-chevron-up"></i></span>').insertBefore(input);
        },
        renderNext: function(input) {
            return $('<span class="custom-next"><i class="fas fa-chevron-down"></i></span>').insertAfter(input);
        },
        disabledClassName: 'enable'
    });
    //quantity input arrow
    //---------------------------------------------------------------------------      
    $('.quantity-input-2').inputarrow({
        renderPrev: function(input) {
            return $('<span class="custom-prev"><i class="fas fa-chevron-up"></i></span>').insertBefore(input);
        },
        renderNext: function(input) {
            return $('<span class="custom-next"><i class="fas fa-chevron-down"></i></span>').insertAfter(input);
        },
        disabledClassName: 'enable'
    });


    // preloader
    //---------------------------------------------------------------------------
    $(window).load(function(){
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
    });
    

    //sticky menu
    //---------------------------------------------------------------------------
    var wind = $(window);
    var sticky = $("#header-sticky");
    wind.on('scroll', function () {
       var scroll = $(wind).scrollTop();
       if (scroll < 10) {
    	//  sticky.removeClass("sticky-menu");
       } else {
    	 $("#header-sticky").addClass("sticky-menu");
       }
    });


    // mobile-menu-sidebar
    //---------------------------------------------------------------------------
    $(".mobile-menubar").on("click", function(){
        $(".side-mobile-menu").addClass('open-menubar');
        $(".body-overlay").addClass("opened");
    });
    $(".close-icon").click(function(){
        $(".side-mobile-menu").removeClass('open-menubar');
        $(".body-overlay").removeClass("opened");
    });

    $(".body-overlay").on("click", function () {
		$(".side-mobile-menu").removeClass('open-menubar');
		$(".body-overlay").removeClass("opened");
	});

    //header-shopping-cart
    //---------------------------------------------------------------------------
    $(".header-shopping-cart").on("click",function(){
        $(".header-shopping-cart-details").addClass('open-shopping-info');
    });
    $(".close-icon").click(function(){
        $(".header-shopping-cart-details").removeClass('open-shopping-info');

    });


   //header-search
    //---------------------------------------------------------------------------
   $(".header-search").on("click",function(){
        $(".header-search-details").addClass('open-search-info');
    });
    $(".close-icon").click(function(){
        $(".header-search-details").removeClass('open-search-info');

    });

    //product-filter
    //---------------------------------------------------------------------------
    $(".product-filter").on('click',function(){
        $(".product-filter-details").toggle();
    });


    // background image
    //---------------------------------------------------------------------------
    $("[data-background]").each(function (){
        $(this).css("background-image","url(" + $(this).attr("data-background") + ")");
    });

  
    // slider - active
    //---------------------------------------------------------------------------
    function mainSlider() {
        var BasicSlider = $('.slider-active');

        BasicSlider.on('init', function (e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });

        BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });

        BasicSlider.slick({
            dots: true,
            fade: true,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            prevArrow:'<b><i class="l-a"><img src="images/slider/prev.png" alt=""></i></b>',
            nextArrow:'<b><i class="r-a"><img src="images/slider/next.png" alt=""></i></b>',
            responsive: [
                { breakpoint: 767, settings: {} }
            ]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();


 
 

    //blog active
    //---------------------------------------------------------------------------
    $('.blog-active').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    //blog-post-active
    //---------------------------------------------------------------------------
    $('.blog-post-active').slick({
        dots: false,
        arrows: true,
        infinite: true,
        prevArrow:'<b><i class="fas fa-chevron-left l-a"></i></b>',
        nextArrow:'<b><i class="fas fa-chevron-right r-a"></i></b>',
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    //blog-slider-active
    //---------------------------------------------------------------------------
    $('.blog-slider-active').slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        prevArrow:'<b><i class="fas fa-chevron-left l-a"></i></b>',
        nextArrow:'<b><i class="fas fa-chevron-right r-a"></i></b>',
    });

    //Sale-product-active
    //---------------------------------------------------------------------------
    $('.bestseller-product-active').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        autoplay:true,
        autoplaySpeed:2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});


//Sale-product-active
//---------------------------------------------------------------------------
$('.Sale-Products-active').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        autoplay:false,
        autoplaySpeed:2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});

//Sale-product-active
//---------------------------------------------------------------------------
$('.Sale-off-Products-active').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay:true,
    autoplaySpeed:2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
    {
        breakpoint: 1200,
        settings: {
            slidesToShow: 4,
        }
    },
    {
        breakpoint: 767,
        settings: {
            slidesToShow: 3,
        }
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
        }
    },
    {
        breakpoint: 550,
        settings: {
            slidesToShow: 1,
        }
    }
]
});

//brand active
//---------------------------------------------------------------------------
$('.brand-active').slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: '30px',
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});


//Sale-Products-home2-active
//---------------------------------------------------------------------------
$('.Sale-Products-home2-active').slick({
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});

    
//brand active
//---------------------------------------------------------------------------
$('.testimonial-active').slick({
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '30px',
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});

//p-modal-active
//---------------------------------------------------------------------------
$('.p-modal-active').slick({
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});

 
//product-carousel-active
//---------------------------------------------------------------------------
$('.product-carousel-active').slick({
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
});


// Countdown
//---------------------------------------------------------------------------
$('[data-countdown]').each(function() {
    var $this = $(this), finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function(event) {
        $this.html(event.strftime('<span class="cdown days"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hour</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>Min</p></span> <span class="cdown second"> <span><span class="time-count">%S</span> <p>Sec</p></span>'));
    });
});

// back top
//---------------------------------------------------------------------------
$(window).on("scroll", function () {
    $(window).scrollTop() > 350 ? $(".top").fadeIn(650) : $(".top").fadeOut(550);
}), $(".top").on("click", function () {
    $("html,body").animate({
        scrollTop: 0
    });
});
  

//lsotope----------------------------
var grid = $('.grid').isotope({
itemSelector: '.grid-item',
percentPosition: true,
masonry: {
    // use outer width of grid-sizer for columnWidth
    columnWidth: 2
}
});

    /* Price filter active */
//---------------------------------------------------------------------------
if ($("#slider-range").length) {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1140,
        values: [0,1140],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));


    $('#filter-btn').on('click', function () {
        $('.filter-widget').slideToggle(1000);
    });

}

    /* Price filter active 1*/
//---------------------------------------------------------------------------
if ($("#slider-range1").length) {
    $("#slider-range1").slider({
        range: true,
        min: 90,
        max: 1140,
        values: [90,1140],
        slide: function (event, ui) {
            $("#amount1").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount1").val("$" + $("#slider-range1").slider("values", 0) +
        " - $" + $("#slider-range1").slider("values", 1));


    $('#filter-btn').on('click', function () {
        $('.filter-widget').slideToggle(1000);
    });

}

    /* Price filter active 2*/
//---------------------------------------------------------------------------
if ($("#slider-range2").length) {
    $("#slider-range2").slider({
        range: true,
        min: 90,
        max: 1140,
        values: [90,1140],
        slide: function (event, ui) {
            $("#amount2").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount2").val("$" + $("#slider-range2").slider("values", 0) +
        " - $" + $("#slider-range2").slider("values", 1));


    $('#filter-btn').on('click', function () {
        $('.filter-widget').slideToggle(1000);
    });

}

// nice selection-----------------------------------
$('select').niceSelect();

//mobile-menu(mean-menu)
//---------------------------------------------------------------------------
//mean menu -- mobile menu
$("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "1201"
});
// for show menu----------
$('.mean-nav ul:first-child').css('display','block');
// $('.mean-nav ul:first-child').show();



})(jQuery);	  

