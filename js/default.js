
    var HomePageSlider = angular.module("homepageslider", []);

    HomePageSlider.controller("slider", function ($scope) {
        $scope.CurrentPage = 1;//For direct access on pages
    $scope.windowWidth = $(window).width();
    $scope.windowHeight = $(window).height();
    $scope.elemCount = $(".section").length;
    $scope.contentWidth = (($scope.windowWidth * $scope.elemCount) + (17 * $scope.elemCount));
    $scope.margin = 0;
    $scope.scrollbar = 17;



	if ($.browser.msie && $.browser.version < "8.0") {
			$scope.margin = 10;
	} else {
			$scope.margin = 0;
	}
	
	
	 $scope.centerContainer = function () {

        //for all thumb containers
        jQuery(".forLiquidLayout").each(function () {
            var elementwidth = jQuery(this).width();
            var setleftmargin = 0;
            setleftmargin = ($scope.windowWidth / 2) - (elementwidth / 2);

            var elementheight = jQuery(this).height() - 68;
            var setTopmargin = 0;
            setTopmargin = ($scope.windowHeight / 2) - (elementheight / 2);

            jQuery(this).css("left", setleftmargin);
            jQuery(this).css("top", setTopmargin);
        });

    }
	
	$scope.knowmore = function(){
	$scope.homeHeight = $("#Home").height();
		$("body").stop().animate({
                    scrollTop: $scope.homeHeight + 'px'
        }, 1000, "easeInCirc");
	}

    $scope.init = function () {
        //set the width for each slide pages
        $(".section").css({
            width: (($scope.windowWidth + $scope.margin - $scope.scrollbar) + 'px')
        });

        //set the width for each contents of slider
        $(".content").css({
            width: $scope.contentWidth + 'px',
            left: 0
        });
        //set the height for each slider


        $scope.centerContainer();

        $("body").css('overflow-x', 'hidden');
        jQuery(".prev").css("display", "none");
    }

    $scope.init();


        $scope.slide = function (dir) {

        currPos = $(".content").css('left');
        currPos = currPos.substr(0, (currPos.length - 2));
        if (dir == 'prev') {
            if (currPos === '0') {
                return false;
            }
            else {
                $(".content").stop().animate({
                    left: ((currPos * 1) + ($scope.windowWidth + $scope.margin) - $scope.scrollbar) + 'px'
                }, 1000);
                $scope.CurrentPage--;
            }
        }
        else if (dir == 'next') {
            if ((currPos - ($scope.windowWidth + $scope.margin) + $scope.scrollbar) == (0 - $scope.contentWidth)) {
                return false;
            }
            else {
                $(".content").stop().animate({
                    left: (currPos - ($scope.windowWidth + $scope.margin) + $scope.scrollbar) + 'px'
                }, 1000);
                $scope.CurrentPage++;
            }
        }
        else {
            //for direct access to a page
            $(".content").stop().animate({
                left: -($scope.windowWidth * (dir - 1) + $scope.margin) + $scope.scrollbar + 'px'
            }, 1000, possionPopUp);
            $scope.CurrentPage = dir;

        }

        //set the rules for arrows
        if ($scope.CurrentPage <= 1) {
            jQuery(".prev").css("display", "none");
            jQuery(".next").css("display", "block");
        }
        else if ($scope.CurrentPage >= $scope.elemCount) {
            jQuery(".next").css("display", "none");
            jQuery(".prev").css("display", "block");
        }
        else {
            jQuery(".prev").css("display", "block");
            jQuery(".next").css("display", "block");
        }
        console.log($scope.CurrentPage);
        //set the stype for footer pages
        jQuery(".HomepageLinks li").removeClass("selected");
        jQuery("#page" + $scope.CurrentPage).addClass("selected");


    }


    //or resize of browser
    $scope.sizebrowser = function () {
      $(document).find(".HoverNavWrapper").css("display", "none");
        $scope.windowWidth = $(window).width();
        $scope.windowHeight = $(window).height();

        $scope.contentWidth = (($scope.windowWidth * $scope.elemCount) + (17 * $scope.elemCount));
        $(".section").css({
            width: (($scope.windowWidth + $scope.margin - $scope.scrollbar) + 'px')
        });


        $(".content").css({
            width: $scope.contentWidth + 'px',
            left: -($scope.windowWidth * ($scope.CurrentPage - 1) + $scope.margin) + $scope.scrollbar + 'px'
        });
        $scope.centerContainer();
        $("body").css('overflow-x', 'hidden');

        //transform the conents relative with browser when browser is too small
        if ($scope.windowWidth < 800 || $scope.windowHeight < 500) {
            var scale = 0;
            if ($scope.windowWidth > $scope.windowHeight) {
                scale = ($scope.windowHeight / 100) * (1.8 / 100) * 10;
            }
            else {
                scale = ($scope.windowWidth / 100) * (1.41 / 100) * 10;
            }
            if (scale > 1) {
                scale = 1;
            }
            /*console.log(scale + ":" + $scope.windowWidth);*/
            $scope.transform(scale);
        }
        else {
            $scope.transform(1);
        }

        //transform the getting started page relative with browser when browser is resized
        if ($(window).width() < 2000 || $(window).height() < 1000) {
            $scope.windowWidth = $(window).width();
            $scope.windowHeight = $(window).height();
            var scalehome = 0;
            if ($scope.windowWidth < 1200) {
                scalehome = ($scope.windowWidth / 100) * (0.7 / 100) * 10;
            }
            else if ($scope.windowWidth > $scope.windowHeight) {
                scalehome = ($scope.windowHeight / 100) * (1.5 / 100) * 10;
            }

            
            if (scalehome > 1) {
                scalehome = 1;
            }
            if (scalehome == 0) {
                scalehome = 0.5;
            }
            $scope.transformshome(scalehome);
        }
        else {
            $scope.transformshome(1);
        }

    }

    $scope.transformshome = function (scalehome) {
        $(".subscriptionHome").css({
            "-moz-transform": "scale(" + scalehome + ")",
            "-webkit-transform": "scale(" + scalehome + ")",
            "transform": "scale(" + scalehome + ")",
            "text-align": "center"
        });
    }

    $scope.transform = function (scale) {
        $(".thumbContainer").css({
            "-moz-transform": "scale(" + scale + ")",
            "-webkit-transform": "scale(" + scale + ")",
            "transform": "scale(" + scale + ")",
            "text-align": "center"
        });
        $(".prev, .next").css({
            "-moz-transform": "scale(" + scale + ")",
            "-webkit-transform": "scale(" + scale + ")",
            "transform": "scale(" + scale + ")",
            "text-align": "center"
        });
        $(".prev:hover, .next:hover").css({
            "-moz-transform": "scale(" + scale + ")",
            "-webkit-transform": "scale(" + scale + ")",
            "transform": "scale(" + scale + ")",
            "text-align": "center"
        });

    }

    $scope.GetCurrentPage = function (PageTitle) {
        //get page number depended on name
        for (i = 0; i < $scope.pages.length; i++) {
            if (angular.lowercase($scope.pages[i][0]) == angular.lowercase(PageTitle)) {
                $scope.slide($scope.pages[i][1]);
            }
        }
    }




    });

    document.addEventListener("DOMContentLoaded", tellAngular, false);

    window.onresize = tellAngular;


    function tellAngular() {
        var domElt = document.getElementById('holder');
        scope = angular.element(domElt).scope();



        scope.$apply(function () {
            scope.sizebrowser();
        });
    }






    $(document).ready(function () {
        //$('#body_wrapper').addClass('welcomescreen').fadeTo('slow',.6);
        $('#topslider').animate({ 'width': '50%' }, 2000).stop;
        $('#bottomslider').animate({ 'width': '50%' }, 2000);
        $('#logo').animate({ 'opacity': '1' }, 3500);


        $('#logo').click(function () {
            $('#topslider').animate({ 'width': '0px' }, 1000);
            $('#bottomslider').animate({ 'width': '0px' }, 1000);
            $('#logowrapper').animate({ 'opacity': '0' }, 1000, function () {
                $('#body_wrapper').css({ 'overflow': 'visible' });
                $('#navigation_bar').animate({ 'opacity': '1' }, 3500);
                $('#top_info_wrapper').animate({ 'opacity': '1' }, 3500);
                $('#footer').animate({ 'opacity': '1' }, 3500);
                $('#main_content').animate({ 'opacity': '1' }, 3500);
            });
        });

        $('.content_left').hover(function () {
            $(this).find('.contet_left_wrapper').stop().animate({ 'opacity': '1', 'height': '400px' }, 1000);
            $(this).stop().animate({ 'margin-left': '20px' }, 1000);
        },
		function () {
		    $(this).find('.contet_left_wrapper').stop().animate({ 'opacity': '0', 'height': '350px' }, 1000);
		    $(this).stop().animate({ 'margin-left': '-20px' }, 1000);
		});

        $('.content_right').hover(function () {
            $(this).find('.contet_right_wrapper').stop().animate({ 'opacity': '1', 'height': '400px' }, 1000);
            $(this).stop().animate({ 'margin-right': '20px' }, 1000);
        },
		function () {
		    $(this).find('.contet_right_wrapper').stop().animate({ 'opacity': '0', 'height': '350px' }, 1000);
		    $(this).stop().animate({ 'margin-right': '-20px' }, 1000);
		});

        $('#navigation_bar ul li').hover(function () {
            $(this).find('.navigation_hover').stop().animate({ 'margin-top': '-30px' }, 500);
        },
		function () {
		    $('.navigation_hover').stop().animate({ 'margin-top': '-60px' }, 300);
		});
		
		
	jQuery(".galleryThums li").hover(function(){

		jQuery(this).find(".topSlider").stop().animate({
                    top: '-71px'
        }, 200);
		jQuery(this).find(".bottomSlider").stop().animate({
                    top: '70px'
        }, 200);
		jQuery(this).find(".test").stop().animate({
                    top: '-60px'
        },500);
		jQuery(this).find("img").stop().animate({
                    "margin-left": '-5%'
        }, 200);
	},
	function(){
	jQuery(this).find(".topSlider").stop().animate({
                    top: '-1px'
        }, 100, "easeInCirc");
		jQuery(this).find(".bottomSlider").stop().animate({
                    top: '0'
        }, 100, "easeInCirc");
		jQuery(this).find(".test").stop().animate({
                    top: '0px'
        }, 500);
		jQuery(this).find("img").stop().animate({
                     "margin-left": '0px'
        }, 200);
	});


    });
