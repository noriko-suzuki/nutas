import $ from 'jquery';

export default class {
  constructor(el) {
    this.$el = $(el);
    this.$select = null;
    this.$trigger = null;

    if(this.$el[0]) {
      this.initialize();
    }
  }

  initialize() {
    this.$select = this.$el.find('.js-area-select');
    this.$trigger = this.$el.find('.js-area-trigger');

    this.bind();
  }

  bind() {
    this.$trigger.on('click', this.onClickTrigger.bind(this));

    $('body').on('click', '.js-area-toggle', this.onClickToggle.bind(this));
  }

  onClickToggle(e) {
    e.preventDefault();

    $('html').toggleClass('is-area-visible');
  }

  onClickTrigger(e) {
    e.preventDefault();

    let url = this.$select.find('option:selected').val();

    if(url) {
      global.location.href = url;  
    }
  }
}