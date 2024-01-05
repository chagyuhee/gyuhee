// gnb
$('.gnb').children('.sub').hide();
$('.sub').hide();
var $header = $('.wrapGnb');
var $gnb = $('.gnb>ul');
var $gnb_li = $gnb.children('li');
var $gnb_li_a = $gnb_li.children('a');
var $gnb_li_ul = $gnb_li.children('ul');
var $gnb_li_ul_li_a = $gnb_li_ul.find('a');

var ht_arr = [];
var ht_max = 0;
var ht_header = $header.height();
var bgColor = $gnb_li_ul_li_a.css('background-color');
var speed = 500;

getSubMaxHeight();

$gnb.on('mouseenter', openSub);

$gnb.on('mouseleave', closeSub);

$gnb_li_a.on('focusin', openSub);
$gnb_li.last().find('a').last().on('focusout', closeSub);

$gnb_li.on('mouseenter', function () {
	$(this).children('a').addClass('on');
});
$gnb_li.on('mouseleave', function () {
	$(this).children('a').removeClass('on');
});

function getSubMaxHeight() {
	$gnb_li.each(function (i) {
		ht_arr.push($(this).children('ul').height());
		ht_max = Math.max(ht_max, ht_arr[i]);
	});
}

function openSub() {
	var isBgGnb = $('.sub').length;

	if (!isBgGnb) {
		$gnb.prepend(
			$('<div class=".sub">').css({
				width: '100%',
				height: ht_max,
				backgroundColor: bgColor,
				position: 'fixed',
				top: ht_header,
				left: '0px',
				zIndex: '10',
				display: 'none',
			})
		);
	}
	$gnb_li_ul.stop().slideDown(speed);
	$('.bgGnb').stop().slideDown(speed);
}

function closeSub() {
	$gnb_li_ul.slideUp(0);
	$('.bgGnb').slideUp(speed - 500, function () {
		$(this).remove();
	});
}