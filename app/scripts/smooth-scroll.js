require('smoothscroll-polyfill').polyfill();
import $ from 'jquery';

$(() => {

	// ------------------  navigation scrolling ----------------------
	const idToElementMap = $('[id]').toArray().reduce((acc, el) => {
		acc[el.id] = el;
		return acc;
	}, {});

	const menu = $('.header__menu-items')[0];

	menu.addEventListener('click', ev => {
		if (!window.requestAnimationFrame) {
			return;
		}

		ev.preventDefault();
		const target = ev.target;

		// assume that inner text of menu-item equals to the corresponding section id
		const id = target.innerText.toLowerCase();
		idToElementMap[id] && idToElementMap[id].scrollIntoView({behavior: 'smooth'});
	});
});
