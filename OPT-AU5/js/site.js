$(document).ready(function () {
    $(window).on("resize", function (e) {
        checkScreenSize();
    });

    checkScreenSize();

    function checkScreenSize(){
        var newWindowWidth = $(window).width();
        if (newWindowWidth < 767) {
            $('.filter .txt').click(function(){
				if($(this).hasClass("show")){
					$(".filter .list").stop(true, true).slideUp();
					$(this).stop(true, true).removeClass("show");
				}
				else {
					$(".filter .list").stop(true, true).slideDown("normal");
					$(this).stop(true, true).addClass("show");
				}
			});
        }
    }
});


$(function(){
	
	
	
	$(".btn_menu").click(function(){
		if($(this).hasClass("show")){
            $(".menu").stop(true, true).slideUp();
            $(this).stop(true, true).removeClass("show");
        }
        else {
            $(".menu").stop(true, true).slideDown("normal");
            $(this).stop(true, true).addClass("show");
        }
	});
	
	$(".menu a.open").click(function(){
		$("body").stop(true, true).addClass("noscroll");
		$(".rankings_work").stop(true, true).addClass("show");
		$(".rankings_work_inner").stop(true, true).addClass("show");
		return false;
	});
	
	$(document).keyup(function(e) {
		if (e.keyCode === 27) {
			$("body").stop(true, true).removeClass("noscroll");
			$(".rankings_work").stop(true, true).removeClass("show");
			$(".rankings_work_inner").stop(true, true).removeClass("show");
		}
	});
	
	$(document).click(function(e){
		if (!$(e.target).is(".rankings_work_inner, .rankings_work_inner *")) {
			$("body").stop(true, true).removeClass("noscroll");
			$(".rankings_work").stop(true, true).removeClass("show");
			$(".rankings_work_inner").stop(true, true).removeClass("show");
		}
	});
	
	$(".close_popup").click(function(){
		$("body").stop(true, true).removeClass("noscroll");
		$(".rankings_work").stop(true, true).removeClass("show");
		$(".rankings_work_inner").stop(true, true).removeClass("show");
		return false;
	});
	
	//Subscribe
	function validateEmail(email) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}
	$("#subcribe-btn").click(function(e){
		var $email = $(".subscribe input[type=text]").val();
		if(validateEmail($email)){
			$(".subscribe_message span.success").html("Now you are subscribed!");
			$(".subscribe_message span.error").html("")
			$email = "";
		} else{
			$(".subscribe_message span.success").html("");
			$(".subscribe_message span.error").html("Please enter a valid email address.");
		}
		$(".subscribe_message").fadeIn(1000).css("display","block").delay(2000).fadeOut(800);
		e.preventDefault();
	});
	
	//Filter
	var arr = [];
	var listLength = $(".casino_list tbody tr").length;
	
	$(".filter label").click(function() {
		var filterName = $(this).attr("data-type");
		var card = $(".casino_list tbody tr");
		
		if (filterName != "all") {
			$(".filter input#all").prop('checked', false);
		} else {
			$(".filter input").prop('checked', false);
		}

		if (filterName === "all") {
			card.fadeIn();
			arr = [];
		} else {
			card.fadeOut();
			var attr = $(this).attr("data-type");
			if (arr.includes(attr)) {
				if (arr.length == 1) {
					$(".filter input#all").prop('checked', true);
					card.fadeIn();
					arr = $.grep(arr, function(value) {
						return value != attr;
					});
				} else {
				arr = $.grep(arr, function(value) {
					return value != attr;
				});
				}
			} else {
				arr.push($(this).attr("data-type"));
			}
			for (var i = 0; i < listLength; i++) {
				var item = $(".casino_list tbody tr:nth-child(" + (i + 1) + ")").attr("filter");
				for (var j = 0; j < arr.length; j++) {
					if (item.includes(arr[j])) {
						$(".casino_list tbody tr:nth-child(" + (i + 1) + ")").fadeIn();
					}
				}
			}
		}
	});
	
});

function eqHeight(param, sizes) {
	if ($(param).length){
		var resizeTimer;
		$( window ).resize(function() {
			var width = $(window).width();
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(func, 500);
		});
		func()
	}

	function func(){
		var width = $(window).width();
		$(param).removeAttr('style');
		if (width < sizes){
			$(param).height("auto");
		}else{
			$(param).equalHeights();
		}
	}
}