import $ from 'jquery';
import Scrollify from './scrollify';
import { isSP } from './helpers';

export default class {
  constructor() {
    $(document.body).on('click', '.js-anchor', this.onClick.bind(this));
    
  }

  onClick(e) {
    let $eventTarget,
        id;

    e.preventDefault();

    $eventTarget = $(e.currentTarget);
    id = $eventTarget.attr('href');
    

    $('html').removeClass('is-navigation-open');

    this.scrollTo(id);
  }

  

  scrollTo(id) {
    let delay = isSP() ? 500 : 0;
    let spacing = isSP() ? 65 : 0;

    let offset = $(id).offset().top;

    let scroll = () => {
      let timer = setTimeout(() => {
        $('html, body').animate({
          scrollTop: offset - spacing
        }, 600, () => {
          
        });

        clearTimeout(timer);
        timer = null;
      }, delay);
    };

    if(!isSP() && (id === '#frontline' || id === '#event' || id === '#wonder')) {
      let scrollTop = $(global).scrollTop();

      if(scrollTop < offset) {
        $.scrollify.setOptions({
          scrollSpeed: 300
        });

        $.scrollify.move('#special');

        $('html, body').animate({
          scrollTop: offset
        }, 300, () => {
          $.scrollify.setOptions({
            scrollSpeed: 600
          });
        });    
      } else {
        scroll();
      } 
    } else {
      scroll();
    }
  }
}