import $ from 'jquery'
import Swiper from 'swiper';

export function Slider() {
	this.print = () => console.log('hi from slider');

	this.init = () => {
		var mySwiper = new Swiper('.swiper-container',
			{
				// Optional parameters
				paginationClickable: true,


				// If we need pagination
				pagination: '.swiper-pagination',

				// Navigation arrows
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev'
			});

	}
}
