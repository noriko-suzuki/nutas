import $ from 'jquery';

export default class {
  constructor() {
    $(document.body).on('click', '.js-hamburger', this.onClickHamburger.bind(this));
  }

  onClickHamburger(e) {
    e.preventDefault();

    $('html').toggleClass('is-navigation-open');
  }
}