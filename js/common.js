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
    var slideToggle = (target, duration = 500) => {
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

const drop_menu_el = document.querySelectorAll('.drop-menu');

const drop_menu_hide = () => {
	let menu = document.querySelectorAll('.drop-menu');
	
	menu.forEach(e => {
		let menu_content = e.querySelector('.drop-menu-content');
		event_hide_not_target(e, menu_content);
	});
	
	
}

drop_menu_el.forEach(e => {
	e.addEventListener('click', () => e.classList.toggle('active'));
});
drop_menu_hide();


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

  const tabs = document.querySelector('.tab_wrap');
  const tabsBtn = document.querySelectorAll('.tab_btn');
  const tabsContent = document.querySelectorAll('.tab_content');

  if (tabs) {
    tabs.addEventListener('click', (e) => {
		e.preventDefault();

      if (e.target.classList.contains('tab_btn')) {
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
  	spaceBetween: 24,
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