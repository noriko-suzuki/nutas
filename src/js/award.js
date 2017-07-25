import $ from 'jquery';
import { isSP } from './helpers';

export default class {
  constructor() {
    this.isModalOpen = false;

    this.bind();
  }

  bind() {
    $('body').on('click', '.js-point-trigger', this.onClickTrigger.bind(this));
  }

  onClickTrigger(e) {
    e.preventDefault();

    if(!isSP()) {
      if(!this.isModalOpen) {
        let offset = $('.p-award__header').offset().top;

        $('.p-commendation').css({
          top: offset
        });
      }
    }

    $('html').toggleClass('is-commendation-visible');
  }
}