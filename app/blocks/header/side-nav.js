import $ from 'jquery';
import {throttle} from 'lodash';


$(() => {
	const SIDE_MENU_CLASS = 'header__navigation_aside';
	const MENU_CLASS = 'header__navigation';
	const SCROLL_DOWN = 'scroll-button';
	const MENU_SHOW_SCROLL = 100;

	const $menu = $(`.${MENU_CLASS}`);
	const body = document.body;

	// images in header
	const things = $("[class*='__thing_']");
	// viewport height
	const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


	let lastScrollTop = body.scrollTop;

	let thingsTops = things.toArray().map(el => el.offsetTop);
	let thingsLefts = things.toArray().map(el => el.offsetLeft);
	let thingsDeltas = things.toArray().map(el => {
		const delta = (Math.random() > 0.5)? (2 + Math.random() * 10) : - (2 - Math.random() * 10);
		return parseInt(delta);
	});

	// remember initial positions of things
	const thingsInitialTops = thingsTops.slice();
	const thingsInitialLefts = thingsLefts.slice();



	window.addEventListener('scroll',
		throttle(function setSideMenu() {

				// 1. set side menu on scroll more then specific height
				const scrollTop = body.scrollTop;

				if (scrollTop > MENU_SHOW_SCROLL) {
					$menu.addClass(SIDE_MENU_CLASS)
				}
				else {
					$menu.removeClass(SIDE_MENU_CLASS);
				}
			}
			, 300, {trailing: true}));


	// scroll one page down

	$(`.${SCROLL_DOWN}`).on('click', ev => {
		ev.preventDefault();
		window.scroll({top: height, left: 0, behavior: 'smooth'});
	});

	// scroll by page on key up/down

	window.addEventListener('keydown', ev => {
		const key = ev.keyCode || ev.which;
		// if arrow up
		if (key == 38) {
			window.scrollBy({top: -height, left: 0, behavior: 'smooth'});
			return;
		}
		// if arrow down
		if (key == 40) {
			window.scrollBy({top: height, left: 0, behavior: 'smooth'});
			return;
		}
	})


});

