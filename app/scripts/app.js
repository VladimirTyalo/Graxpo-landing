import svg4everybody from 'svg4everybody';
import $ from 'jquery';

import './smooth-scroll';
import './side-nav';
import {Slider} from '../blocks/slider/slider';

import '../blocks/categories-galery/categories';

$(() => {
	svg4everybody();

	const s = new Slider();
	s.init();

});

