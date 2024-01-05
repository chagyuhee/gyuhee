// gnb
// $('#gnb').children('.sub').hide();

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

//popup//
const popup = document.querySelector('.popup');
const btnClose = popup.querySelector('.close');
const btnDel = document.querySelector('.del');
const isCookie = document.cookie.indexOf('today=done');
console.log(isCookie);

if (isCookie == -1) {
	console.log('쿠키없음');
	popup.style.display = 'block';
} else {
	console.log('쿠키 있음');
	popup.style.display = 'none';
}

btnDel.addEventListener('click', (e) => {
	e.preventDefault();
	setCookie('today', 'done', 0);
});
btnClose.addEventListener('click', (e) => {
	e.preventDefault();
	let isChecked = popup.querySelector('input[type=checkbox]').checked;
	if (isChecked) setCookie('today', 'done', 1);

	popup.style.display = 'none';
});
function setCookie(name, value, due) {
	const today = new Date();

	const date = today.getDate();

	today.setDate(date + due);
	const dueDate = today.toGMTString();

	document.cookie = `${name}=${value}; path="/";expires=${dueDate}`;
}

// menu//
const btnMetro = document.querySelectorAll('#menu ul > li > a');
const boxMetro = document.querySelectorAll('#tab section');
console.log(boxMetro);
btnMetro.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		for (let el of btnMetro) el.classList.remove('on');
		btnMetro[index].classList.add('on');

		for (let el of boxMetro) el.classList.remove('on');
		boxMetro[index].classList.add('on');

		setTimeout(() => {
			for (let el of boxMetro) el.classList.remove('active');
			boxMetro[index].classList.add('active');
		}, 0);
	});
});

var $panel_li = $('#slide .frame li');
var $navi_li = $('.gu>li');
var $navi_li_a = $navi_li.children('a');

var $next = $('.next');
var $prev = $('.prev');
var len = $panel_li.length;
console.log(len);
var active_index = 0;
console.log($panel_li);
$next.on('click', function (e) {
	e.preventDefault();

	var current_index = $('.frame li.on').index();
	console.log(current_index);
	var next_index;

	if (current_index != len - 1) {
		next_index = current_index + 1;
	} else {
		next_index = 0;
	}

	active_index = next_index;
	console.log(active_index);
	show_next(active_index);
});

function show_next(index) {
	$panel_li
		.filter('.on')
		.stop()
		.animate({ left: '-100%' }, 500, function () {
			$(this).removeClass('on');
		});
	$panel_li
		.eq(index)
		.show()
		.css({ left: '100%' })
		.animate({ left: '0%' }, 500, function () {
			$(this).addClass('on');
		});

	$navi_li.removeClass('on');
	$navi_li.eq(index).addClass('on');
}

$prev.on('click', function (e) {
	e.preventDefault();
	var current_index = $('.frame li.on').index();
	var prev_index;
	if (current_index !== 0) {
		prev_index = current_index - 1;
	} else {
		prev_index = len - 1;
	}
	active_index = prev_index;
	show_prev(active_index);
});

function show_prev(index) {
	$panel_li
		.filter('.on')
		.stop()
		.animate({ left: '100%' }, 500, function () {
			$(this).removeClass('on');
		});
	$panel_li
		.eq(index)
		.show()
		.css({ left: '-100%' })
		.animate({ left: '0%' }, 500, function () {
			$(this).addClass('on');
		});

	$navi_li.removeClass('on');
	$navi_li.eq(index).addClass('on');
}

//네비버튼으로 이동할수있게하는 코드

$navi_li.on('click', function (e) {
	e.preventDefault();
	var current_index = $panel_li.filter('.on').index();

	var target_index = $(this).index();
	active_index = target_index;

	if (active_index == current_index) return;
	if (active_index > current_index) {
		show_next(active_index);
	}
	if (active_index < current_index) {
		show_prev(active_index);
	}
});
