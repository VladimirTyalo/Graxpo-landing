import $ from 'jquery';
import urls from './galery.json';

const $tabMenu = $('.categories-galery__tabs');
const $tabs = $('.categories-galery__tab');
const $categories = $('.categories-galery');


$tabMenu.on('click', ev => {
	const target = ev.target;

	// set active tab
	$tabs.each( (i, el) => {
		if(el == target) {
			target.classList.add('categories-galery__tab_active');
		} else {
			el.classList.remove('categories-galery__tab_active');
		}
	});

	$categories.find('div').remove();

	function appendItems(list) {
		list.forEach(name => {
			const el = makeGaleryItem(name, 'assets/images/');
			$categories.append(el);
		});
	}

	switch (target.innerText.toLowerCase()) {
		case 'print': {
			appendItems(urls.print);
			break;
		}
		case 'identity': {
			appendItems(urls.identity);
			break;
		}
		case 'branding': {
			appendItems(urls.branding);
			break;
		}
		case 'web': {
			appendItems(urls.web);
			break;
		}
		default: {
			const list = Object.keys(urls).reduce((acc, key) => {
				return acc.concat(urls[key]);
			}, []);

			appendItems(list);

		}
	}

});


function makeGaleryItem(name, path) {
	const src = path + name;
	return $(`<div class="mosaicflow__item"><img src='${src}'/></div>`);
}



