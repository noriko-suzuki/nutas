import $ from 'jquery';
import 'jquery-mousewheel';
// import Scrollify from './scrollify';
import { isSP } from './helpers';

let $html;

let y = 0;

export default class {
  constructor(el) {
    this.$el = $(el);

    $html = $('html');

    if(isSP()) {
      this.initSP();
    } else {
      if($(global).scrollTop() > 0) {
        this.slideOut();
        this.showMenus();
      }

      this.bind();
    }
  }

  bind() {
    
    $('.js-cover-trigger').on('click', this.onClickTrigger.bind(this));

    $(document.body).on('mousewheel', this.onMousewheel.bind(this));

    // $(global).on('scroll', (e) => {
    //   console.log('scroll')
    //   e.preventDefault();
    // });
  }

  onMousewheel(e) {
    let windowHeight = $(global).height();

    y += e.deltaY;

    if(y > 0) {
      y = 0;
    }

    if(y < -windowHeight / 4) {
      this.showMenus();
    }

    if(y < -windowHeight / 2) {
      this.slideOut();
    }

    global.requestAnimationFrame(() => {
      this.$el.css({
        transform: `translate3d(0, ${y}px, 0)`
      });
    });
  }

  onClickTrigger(e) {
    e.preventDefault();

    this.slideOut();
    this.showMenus();
  }

  showMenus() {
    // navigation表示
    $('.p-index__side').addClass('is-list-visible');
  }

  slideOut() {
    $html.addClass('is-cover-moved');

    let timer = setTimeout(() => {
      $html.addClass('is-cover-removed');
      $('.p-index__scroll--cover').hide();
      $('.p-index__scroll--content').show();

      if(!isSP()) {
        $.scrollify.enable();
      }

      clearTimeout(timer);
      timer = null;
    }, 1000);
    
    $(document.body).off('mousewheel');
  }

  initSP() {
    $html.addClass('is-cover-moved is-cover-removed');
    $('.p-index__scroll--cover').hide();
    $('.p-index__scroll--content').show();
    // $.scrollify.enable();
    $(document.body).off('mousewheel');
    this.showMenus();
  }
}