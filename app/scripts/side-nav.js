import $ from 'jquery';
import {throttle} from 'lodash';


$(() => {
		const SIDE_MENU_CLASS = 'header__navigation_aside';
		const MENU_CLASS = 'header__navigation';
		const SERVICE_ACTIVE_CLASS = 'service__img_active';
		const VIEWS_CLASS = 'views';
		const VIEWS_AMOUNT_CLASS = 'views__amount';
		const SCROLL_DOWN = 'scroll-button';
		const MENU_SHOW_SCROLL = 100;


		const $menu = $(`.${MENU_CLASS}`);
		const body = document.body;
		const view = $(`.${VIEWS_CLASS}`)[0];
		const $views = $(`.${VIEWS_AMOUNT_CLASS}`);
		let viewsHandlers = [];


		// viewport height
		const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		// section service images
		const $serviceImg = $('.service img');
		let prevMenuState = false;
		const BREAK_POINT = 902;

		setSideMenuOnCondition(() => width < BREAK_POINT);

		window.addEventListener('resize', throttle(() => {
				width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
				setSideMenuOnCondition(() => width < BREAK_POINT);
		}
			, 300
		));
		window.addEventListener('scroll', throttle(scrollHandler, 300, {trailing: true}));

		function sideMenuOnScroll() {
			const scrollTop = body.scrollTop;
			// if viewport width lower then 800px show side menu instead of main
			setSideMenuOnCondition(() => scrollTop > MENU_SHOW_SCROLL || width < 800);
		}

		function showImgOnScroll() {
			$serviceImg.each((index, img) => {
				// find image height
				const offsetHight = img.offsetHeight;

				// set bound trigger line inside the img at 1/2
				actionScrollTrigger(img, -offsetHight / 2,
					el => el.classList.add(SERVICE_ACTIVE_CLASS),
					el => el.classList.remove(SERVICE_ACTIVE_CLASS));
			});
		}

		function countViewsOnScroll() {

			actionScrollTrigger(view, 0, addCounter, removeCounter);

			function addCounter() {
				// if counter is already running return

				if (prevMenuState) {
					return;
				}
				$views.each((index, el) => {
					const to = Math.round(Math.random() * 1000) + 500;
					viewsHandlers[index] = countUp(index, el, 0, to, 0);
				});
				prevMenuState = true;
			}

			function removeCounter() {
				if (!prevMenuState) {
					return;
				}
				$views.each((index) => {
					// clearTimeout(viewsHandlers[index]);
					clearInterval(viewsHandlers[index]);
				});
				prevMenuState = false;

			}
		}

		function scrollHandler() {
			// 1. set side menu on scroll more then specific height
			sideMenuOnScroll();

			// 2. set service section images to move
			showImgOnScroll();

			// 3. views counters
			countViewsOnScroll();
		}

		function countUp(index, el, from, to) {
			const time = 0;
			let counter = from;
			let step = Math.round(Math.abs((to - from) / 100));

			viewsHandlers[index] = setInterval(function f() {
				if (counter > to * 0.8) {
					step = 1;
				}
				if (counter > to) {
					clearInterval(viewsHandlers[index]);
					return;
				}
				el.innerText = counter;
				counter += step;
			}, time);

			return viewsHandlers[index];
		}


		function actionScrollTrigger(el, actionYBuffer, addActionCb, removeActionCb) {
			// half way through the element
			const rect = el.getBoundingClientRect();

			const upperTriggerLine = rect.top - actionYBuffer;
			const lowerTriggerLine = rect.bottom + actionYBuffer;

			// the lower or the higher bound should be within viewport
			const shouldTrigger = lowerTriggerLine > 0 &&
				lowerTriggerLine < window.innerHeight ||
				upperTriggerLine < window.innerHeight &&
				upperTriggerLine > 0;

			if (shouldTrigger) {
				addActionCb(el);
				return true;
			} else {
				removeActionCb(el);
				return false;
			}
		}

		function setSideMenuOnCondition(predicate) {
			// if viewport width lower then 800px show side menu instead of main
			if (predicate()) {
				$menu.addClass(SIDE_MENU_CLASS);
			} else {
				$menu.removeClass(SIDE_MENU_CLASS);
			}
		}

		// scroll one page down on click mouse icon
		$(`.${SCROLL_DOWN}`).on('click', ev => {
			ev.preventDefault();
			window.scroll({top: height, left: 0, behavior: 'smooth'});
		});

		// scroll by page on key down
		window.addEventListener('keydown', ev => {
			const key = ev.keyCode || ev.which;
			// if arrow up
			if (key === 38) {
				window.scrollBy({top: -height, left: 0, behavior: 'smooth'});
				return;
			}
			// if arrow down
			if (key === 40) {
				window.scrollBy({top: height, left: 0, behavior: 'smooth'});
				return;
			}
		});


	}
);

