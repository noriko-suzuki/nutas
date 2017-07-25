import $ from 'jquery';
import 'jquery-scrollify';
import debounce from 'lodash.debounce';

import { isSP } from './helpers';

export default class {
  constructor(el) {
    this.$el = $(el);

    this.isPCView = isSP() ? false : true;

    this.isInitialized = false;

    this.options = {
      section: '.js-scrollify',
      // easing: "easeOutExpo",
      scrollSpeed: 600,
      offset : 0,
      scrollbars: true,
      standardScrollElements: "",
      setHeights: false,
      overflowScroll: true,
      updateHash: false,
      touchScroll:false,
      before:function() {},
      after:function() {},
      afterResize:function() {},
      afterRender:function() {}
    };

    if(this.$el[0]) {
      this.initialize();
    }
  }

  initialize() {
    if(!isSP()) {
      this.setup();
    }
    

    $(global).on('resize.scrollify', debounce(this.onResize.bind(this), 500));

    // $(document.body).on('click', '.js-move', this.onClickMove.bind(this));
  }

  setup() {
    $.scrollify(this.options);

    if(!this.isInitialized) {
      $.scrollify.disable();  
    }
    

    $('.js-scroll-trigger').on('click',  (e) => {
      e.preventDefault();

      $.scrollify.next();
    });

    this.isInitialized = true;

    global.scrollTo(0, 1);
  }

  onResize() {
    if(isSP()) {
      if(this.isPCView) {
        this.isPCView = false;
        $.scrollify.disable();
      }
    } else {
      if(!this.isPCView) {
        this.isPCView = true;

        if(!this.isInitialized) {
          this.setup();
        } else {
          $.scrollify.enable();
          $.scrollify.update();

          $(global).trigger('resize');
        }
      }
    }
  }

  // onClickMove(e) {
  //   console.log('move')
  //   let $eventTarget,
  //       id;

  //   e.preventDefault();

  //   $eventTarget = $(e.currentTarget);
  //   id = $eventTarget.attr('href');

  //   $.scrollify.move('#about');
  // }
}