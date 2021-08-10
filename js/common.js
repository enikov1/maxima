'use strict';

let slideUp = (target, duration=500) => {

        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout( () => {
              target.style.display = 'none';
              target.style.removeProperty('height');
              target.style.removeProperty('padding-top');
              target.style.removeProperty('padding-bottom');
              target.style.removeProperty('margin-top');
              target.style.removeProperty('margin-bottom');
              target.style.removeProperty('overflow');
              target.style.removeProperty('transition-duration');
              target.style.removeProperty('transition-property');
              //alert("!");
        }, duration);
    }

    /* SLIDE DOWN */
    let slideDown = (target, duration=500) => {

        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout( () => {
          target.style.removeProperty('height');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
        }, duration);
    }

    /* TOOGLE */
    let slideToggle = (target, duration = 500) => {
        if (window.getComputedStyle(target).display === 'none') {
          return slideDown(target, duration);
        } else {
          return slideUp(target, duration);
        }
    }

const event_hide_not_target = (target, elem) => {
	window.addEventListener('click', (event) => {
		if(!target.contains(event.target) && !elem.contains(event.target)) target.classList.remove('active');
	});
}

const event_sort_hide_not_target = (target, elem) => {
	window.addEventListener('click', (event) => {
		if(!target.contains(event.target) && !elem.contains(event.target)) target.parentNode.classList.remove('active');
	});
}

const drop_menu_el = document.querySelectorAll('.drop-menu');
const filter_drop_menu_el = document.querySelectorAll('.filter_dropmenu_target');
const filter_drop_menu_sort_wrap = document.querySelector('.filter_wrap__sort');

const smart_button_drop_menu = document.querySelector('.header__nav-button');

const drop_menu_hide = () => {
	
	drop_menu_el.forEach(e => {
		let menu_content = e.querySelector('.drop-menu-content');
		event_hide_not_target(e, menu_content);
	});
}

const filter_drop_menu_hide = () => {	
	filter_drop_menu_el.forEach(e => {
		let menu_content = e.querySelector('.filter_dropmenu');

		event_hide_not_target(e, menu_content);
	});
}

const filter_drop_sort_hide = () => {	
	let elem = filter_drop_menu_sort_wrap.querySelector('.select_target');
	let menu_content = filter_drop_menu_sort_wrap.querySelector('.filter_sort_drop');
	event_sort_hide_not_target(elem, menu_content);
}

if(drop_menu_el) {
	drop_menu_el.forEach(e => {
		e.addEventListener('click', (event) => {
			event.preventDefault();

			e.classList.toggle('active');
		});
	});

	drop_menu_hide();
}

if(smart_button_drop_menu) {

	const smart_drop_menu = document.querySelector('#smart_drop_menu');

	smart_button_drop_menu.addEventListener('click', function(event){
		event.preventDefault();

		smart_drop_menu.classList.add('active');
	});

	event_hide_not_target(smart_drop_menu, smart_button_drop_menu);
}

if(filter_drop_menu_el) {
	filter_drop_menu_el.forEach(e => {
		e.addEventListener('click', (event) => {
			event.preventDefault();

			if(event.target.className == 'link') {
				e.classList.toggle('active');
			}

		});
	});

	filter_drop_menu_hide();
}

if(filter_drop_menu_sort_wrap) {
	filter_drop_menu_sort_wrap.querySelector('.select_target').addEventListener('click', (event) => {
		event.preventDefault();

		filter_drop_menu_sort_wrap.classList.toggle('active');
	});

	filter_drop_sort_hide();
}

// aside filters

const aside_item = document.querySelectorAll('.aside__item');
const aside_child_item = document.querySelectorAll('.aside__item-content .item');

if(aside_item != null) {
	aside_item.forEach(e => {
		e.querySelector('.aside__item-header').addEventListener('click', (event) => {
			event.preventDefault();

			event.target.classList.toggle('active');

			if(event.target.classList.contains('active')) {
				slideDown(e.querySelector('.aside__item-content'), 250);
			} else {
				slideUp(e.querySelector('.aside__item-content'), 250);
			}
			
		});
	});
}

if(aside_child_item != null) {
	aside_child_item.forEach(e => {
		let tg = e.querySelector('.title');

		if(tg != null) {
			tg.addEventListener('click', (event) => {
				event.preventDefault();

				event.target.classList.toggle('active');

				if(event.target.classList.contains('active')) {
					slideDown(e.querySelector('.content'), 250);
				} else {
					slideUp(e.querySelector('.content'), 250);
				}

			});
		}
		
	});
}


// tabs

  const tabs = document.querySelector('.tab--wrap');
  const tabsBtn = document.querySelectorAll('.tab--btn');
  const tabsContent = document.querySelectorAll('.tab--content');

  if (tabs) {
    tabs.addEventListener('click', (e) => {
		e.preventDefault();

      if (e.target.classList.contains('tab--btn')) {
        const tabsPath = e.target.dataset.tabsPath;
        tabsBtn.forEach(el => {el.classList.remove('active')});
        document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('active');
        tabsHandler(tabsPath);
      }
    });
  }

  const tabsHandler = (path) => {
    tabsContent.forEach(el => {el.classList.remove('active')});
    document.querySelector(`[data-tabs-target="${path}"]`).classList.add('active');
  };

// accordion

const accordion = document.querySelector('.accordion__item');
const accordion_tab = document.querySelectorAll('.accordion__item-header');

if(accordion) {
	accordion_tab.forEach(e => {
		e.addEventListener('click', (event) => {
			event.preventDefault();

			e.parentNode.classList.toggle('active');

			if(e.parentNode.classList.contains('active')) {
				slideDown(e.parentNode.querySelector('.accordion__item-text'), 250);
			} else {
				slideUp(e.parentNode.querySelector('.accordion__item-text'), 250);
			}
		})
	});
}


// scroll top

let t;
const up = () => {
	let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	if(top > 0) {
		window.scrollBy(0,-100);
		t = setTimeout('up()',20);
	} else clearTimeout(t);
	return false;
}

const button_scroll_to_top = document.querySelector('#scroll_top');

button_scroll_to_top.addEventListener('click', (event) => {
	event.preventDefault();

	up();
});

// mask inputs

const phone = document.querySelector('.mask--phone');

if(phone) {
	let phoneMask = IMask(
	phone, {
		mask: '+{7} (000) 000-00-00',
		placeholderChar: '.',
		lazy: false,
	});
}



// calc

// let itemIndex = 1;

const form_calc = document.querySelector('.form_calc');
const form_calc1 = document.querySelector('#form_calc_1');
const form_calc2 = document.querySelector('#form_calc_2');
const form_calc_title = document.querySelector('#calc_stage_header');

const form_calc_bar = !form_calc || form_calc.querySelector('.bar');
const form_calc_bar_count = !form_calc || form_calc_bar.querySelectorAll('li');
const form_calc_count_page = !form_calc || form_calc.querySelector('.bar_count');
const form_calc_tab = !form_calc || form_calc.querySelectorAll('.form_calc__right-tab');

const form_calc_stage = !form_calc || form_calc.querySelectorAll('[data-stage]');
const form_calc_stage_reset = !form_calc || form_calc.querySelectorAll('[data-stage-reset]');

const form_calc_header_1 = ['Выберите форму кухни', 'Введите размеры кухни', 'Материал фасада'];
const form_calc_header_2 = ['Куда планируете поставить шкаф?', 'Форма шкафа', 'Сколько дверей нужно для шкафа?', 'Укажиет размеры шкафа', 'Материал фасада шкафа'];

if(form_calc_stage != null && form_calc != null) {

	form_calc.querySelectorAll('.tab-1 input').forEach(e => {
		e.addEventListener('change', () => {
			form_calc.querySelector('#button_1').classList.remove('disabled');

			form_calc.querySelector('#checked_name1').innerHTML = e.getAttribute('data-name');
		});
	});

	if(form_calc1) {
		form_calc1.querySelectorAll('.tab-2 input').forEach(e => {
			e.addEventListener('input', (event) => {
				// console.log(e.value);
				if(e.value > 0 || e.checked) form_calc.querySelector('#button_2').classList.remove('disabled');
				else form_calc.querySelector('#button_2').classList.add('disabled');
			});
		});
	}

	if(form_calc2) {
		form_calc2.querySelectorAll('.tab-2 input').forEach(e => {
			e.addEventListener('change', () => {
				form_calc.querySelector('#button_2').classList.remove('disabled');

				form_calc.querySelector('#checked_name2').innerHTML = e.getAttribute('data-name');
			});
		});

		form_calc2.querySelectorAll('.tab-3 input').forEach(e => {
			e.addEventListener('change', () => {
				form_calc.querySelector('#button_3').classList.remove('disabled');

				form_calc.querySelector('#checked_name3').innerHTML = e.getAttribute('data-name');
			});
		});

		form_calc2.querySelectorAll('.tab-4 input').forEach(e => {
			e.addEventListener('input', (event) => {
				// console.log(e.value);
				if(e.value > 0 || e.checked) form_calc.querySelector('#button_4').classList.remove('disabled');
				else form_calc.querySelector('#button_4').classList.add('disabled');
			});
		});
	}

	let arr = [];

	if(form_calc1) {
		form_calc.querySelectorAll('.tab-3 input').forEach(e => {
			e.addEventListener('change', () => {
				form_calc.querySelector('#button_3').classList.remove('disabled');

				
				
				if(e.checked) {
					arr.push(e.getAttribute('data-name'));
					form_calc.querySelector('#checked_name1').innerHTML = arr.join(', ');
				}

				form_calc.querySelector('#checked_name2').innerHTML = e.getAttribute('data-name');
			});
		});
	}

	if(form_calc2) {
		form_calc2.querySelectorAll('.tab-5 input').forEach(e => {
			e.addEventListener('change', () => {
				form_calc2.querySelector('#button_5').classList.remove('disabled');

				
				
				if(e.checked) {
					arr.push(e.getAttribute('data-name'));
					form_calc2.querySelector('#checked_name4').innerHTML = arr.join(', ');
				}

			});
		});
	}	

	

	form_calc_stage.forEach(e => {
		e.addEventListener('click', function(event) {
			event.preventDefault();

			if(this.getAttribute('data-stage') == '1') {
				// form_calc_stage_status(0);
				form_calc_bar.querySelector('.bar-1').classList.add('active');
				form_calc.querySelector('.tab-1').classList.add('active');

				form_calc_bar.querySelector('.bar-2').classList.remove('active');
				form_calc.querySelector('.tab-2').classList.remove('active');
				form_calc.querySelector('.tab-3').classList.remove('active');
				form_calc.querySelector('.tab-end').classList.remove('active');

				form_calc_count_page.querySelector('.first').innerHTML = 1;

				if(form_calc1) {
					form_calc_title.innerHTML = form_calc_header_1[0];
				} else if(form_calc2) {
					form_calc_title.innerHTML = form_calc_header_2[0];
				}


			}

			if(this.getAttribute('data-stage') == '2') {
				form_calc_bar.querySelector('.bar-2').classList.add('active');
				form_calc_bar.querySelector('.bar-3').classList.remove('active');

				form_calc.querySelector('.tab-1').classList.remove('active');
				form_calc.querySelector('.tab-3').classList.remove('active');

				form_calc.querySelector('.tab-2').classList.add('active');

				form_calc_count_page.querySelector('.first').innerHTML = 2;

				if(form_calc1) {
					form_calc_title.innerHTML = form_calc_header_1[1];
				} else if(form_calc2) {
					form_calc_title.innerHTML = form_calc_header_2[1];
				}
			}

			if(this.getAttribute('data-stage') == '3') {
				form_calc_bar.querySelector('.bar-3').classList.add('active');

				form_calc.querySelector('.tab-2').classList.remove('active');
				form_calc.querySelector('.tab-3').classList.add('active');

				if(form_calc1) {
					form_calc.querySelector('.tab-end').classList.remove('active');
				}

				if(form_calc2) {
					form_calc_bar.querySelector('.bar-4').classList.remove('active');
					form_calc.querySelector('.tab-4').classList.remove('active');
				}

				form_calc_count_page.querySelector('.first').innerHTML = 3;

				if(form_calc1) {
					form_calc_title.innerHTML = form_calc_header_1[2];
				} else if(form_calc2) {
					form_calc_title.innerHTML = form_calc_header_2[2];
				}
			}

			if(this.getAttribute('data-stage') == '4') {
				form_calc_bar.querySelector('.bar-4').classList.add('active');
				

				form_calc.querySelector('.tab-3').classList.remove('active');
				
				form_calc.querySelector('.tab-4').classList.add('active');

				if(form_calc2) {
					form_calc_bar.querySelector('.bar-5').classList.remove('active');
					form_calc.querySelector('.tab-5').classList.remove('active');
				}

				form_calc_count_page.querySelector('.first').innerHTML = 4;

				if(form_calc1) {
					form_calc_title.innerHTML = form_calc_header_1[2];
				} else if(form_calc2) {
					form_calc_title.innerHTML = form_calc_header_2[3];
				}
			}

			if(this.getAttribute('data-stage') == '5') {
				form_calc_bar.querySelector('.bar-5').classList.add('active');

				form_calc.querySelector('.tab-4').classList.remove('active');
				form_calc.querySelector('.tab-5').classList.add('active');

				form_calc_count_page.querySelector('.first').innerHTML = 5;

				if(form_calc2) {
					form_calc_title.innerHTML = form_calc_header_2[4];
				}
			}

			if(this.getAttribute('data-stage') == 'end') {
				// form_calc_bar.querySelector('.bar-4').classList.add('active');

				form_calc.classList.add('form_calc--finish');

				if(form_calc1) {
					form_calc.querySelector('.tab-3').classList.remove('active');
					
				}
				

				if(form_calc2) {
					form_calc.querySelector('.tab-5').classList.remove('active');
				}

				form_calc.querySelector('.tab-end').classList.add('active');
			}

			if(this.getAttribute('data-stage-reset') == 'true') {
				form_calc.classList.remove('form_calc--finish');
			}
		})
	});
}


// popup

const button_target_modal = document.querySelectorAll('[data-modal-target]');
const modal_close = document.querySelectorAll('.modal_close');

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el.classList.remove('active');
}

if(modal_close) {
	modal_close.forEach(e => {
		e.addEventListener('click', function(event) {
			event.preventDefault();

			findAncestor(this, 'modal_content');
		});
	});
}

if(button_target_modal) {
	button_target_modal.forEach(e => {
		e.addEventListener('click', function(event) {
			event.preventDefault();

			let data_event = this.getAttribute('data-modal-target');

			document.querySelector(`#${data_event}`).classList.add('active');
			
		});
	});
}




// sliders

const slider_main = new Swiper('#slider_main', {
	slidesPerView: 1,
  	spaceBetween: 20,
	autoplay: {
		delay: 6500,
		disableOnInteraction: false,
	},

	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},

	navigation: {
		nextEl: '.swiper-nav-next',
		prevEl: '.swiper-nav-prev',
	}
});

const slider_review = new Swiper('#slider_review', {
	slidesPerView: 3,
	slidesPerGroup: 3,
  	spaceBetween: 20,
	autoplay: {
		delay: 6500,
		disableOnInteraction: false,
	},

	breakpoints: {
		0: {
			slidesPerView: 1.1,
			slidesPerGroup: 1.1,
			spaceBetween: 28,
		},
		540: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 3,
			slidesPerGroup: 3
		},
		1050: {
			spaceBetween: 24,
		}
	},

	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},

	navigation: {
		nextEl: '.swiper-nav-next',
		prevEl: '.swiper-nav-prev',
	}
});

const slider_item_view = new Swiper('#slider_item_view', {
	slidesPerView: 3,
	slidesPerGroup: 3,
  	spaceBetween: 24,

	autoplay: {
		delay: 6500,
		disableOnInteraction: false,
	},

	breakpoints: {
		0: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 24,
		}
	},

	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},

	navigation: {
		nextEl: '.swiper-nav-next',
		prevEl: '.swiper-nav-prev',
	}
});

const slider_item_related = new Swiper('#slider_item_related', {
	slidesPerView: 3,
	slidesPerGroup: 3,
  	spaceBetween: 24,
	watchSlidesProgress: true,
    watchSlidesVisibility: true,

	autoplay: {
		delay: 6500,
		disableOnInteraction: false,
	},

	breakpoints: {
		0: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 24,
		}
	},

	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},

	navigation: {
		nextEl: '.swiper-nav-next',
		prevEl: '.swiper-nav-prev',
	}
});

const slider_page_product = new Swiper("#slider_page_product", {
        spaceBetween: 14,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,

		breakpoints: {
			0: {
				slidesPerView: 3,
				spaceBetween: 14,
			},
			540: {
				slidesPerView: 5,
			}
		},
      });
const slider_page_product2 = new Swiper("#slider_page_product2", {
	spaceBetween: 10,
	navigation: {
		nextEl: "#slider_page_product2 .swiper-nav-next",
		prevEl: "#slider_page_product2 .swiper-nav-prev",
	},
	thumbs: {
		swiper: slider_page_product,
	},
});

const reviews_items = document.querySelectorAll('.reviews_items__item');

if(reviews_items) {
	reviews_items.forEach(e => {

		let thumb = e.querySelector('.right__slider-thumbs');
		let main = e.querySelector('.right__slider-main');

		let slider_page_review = new Swiper(thumb, {
				spaceBetween: 14,
				slidesPerView: 3,
				freeMode: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
			});
		let slider_page_review2 = new Swiper(main, {
			spaceBetween: 14,
			// navigation: {
			// 	nextEl: "#slider_page_review2 .swiper-button-next",
			// 	prevEl: "#slider_page_review2 .swiper-button-prev",
			// },
			thumbs: {
				swiper: slider_page_review,
			},
		});
	});
}