// plugin https://github.com/sapegin/jquery.mosaicflow
import $ from 'jquery';
import urls from './galery.json';
import {throttle} from 'lodash';

const $tabMenu = $('.categories-galery__tabs');
let $mosaic = $('.categories-galery__galery');
const $tabs = $('.categories-galery__tab');

let category = '';


$tabMenu.on('click', ev => {
	const target = ev.target;
	// set active tab
	$tabs.each((i, el) => {
		if (el == target) {
			target.classList.add('categories-galery__tab_active');
		} else {
			el.classList.remove('categories-galery__tab_active');
		}
	});

	reorganizeImages(target.innerText.toLowerCase());

});

function reorganizeImages(cat) {
	$mosaic.empty();

	makeColums($mosaic);

	switch (cat) {
		case 'print': {
			appendItems(urls.print);
			category = 'print';
			break;
		}
		case 'identity': {
			appendItems(urls.identity);
			category = 'identity';
			break;
		}
		case 'branding': {
			appendItems(urls.branding);
			category  = 'branding';
			break;
		}
		case 'web': {
			appendItems(urls.web);
			category = 'web';
			break;
		}
		default: {
			category = 'all';
			const list = Object.keys(urls).reduce((acc, key) => {
				return acc.concat(urls[key]);
			}, []);
			appendItems(list);
		}
	}
}

function getWidth(bp1, bp2, bp3) {
	let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (width > bp1) return 100 / 3;
	if (width > bp2) return 100 / 2;
	if (width > bp3) return 100;
	return 100;
}

window.addEventListener('resize', throttle(() => {
		const width = getWidth(1000, 600, 400);
		$mosaic.find('.mosaicflow__column').attr('style', `width: ${width}%`);
		reorganizeImages(category);
	}
	, 300
));


$tabMenu.find('.categories-galery__tab:first-child').trigger('click')

function appendItems(list) {
	list.forEach(name => {
		const el = makeGaleryItem(name, 'assets/images/');
		const $column = getLowestColumn($mosaic);
		$column.append(el);
	});
}

function makeColums($el) {
	const width = getWidth(1000, 600, 400);
	let numberOfColumns = Math.ceil($el[0].offsetWidth / ($el[0].offsetWidth * width / 100));
	for (let i = 0; i < numberOfColumns; i++) {
		$el.append(`<div class='mosaicflow__column' style="width:${width}%"></div>`);
	}
}

function getLowestColumn($el) {
	var $result = null;
	var minHeight = Infinity;
	$el.find('.mosaicflow__column').each((index, el) => {
		const height = el.offsetHeight;
		if (height < minHeight) {
			minHeight = height;
			$result = $(el);
		}
	});
	return $result;
}


function makeGaleryItem(name, path) {
	const src = path + name;
	return $(`<div class="mosaicflow__item"
								 data-item-selector=".item"
								 data-min-item-width="300"><img src='${src}'/></div>`);
}



