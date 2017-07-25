import $ from 'jquery';
global.jQuery = $;

export default class {
  constructor(el) {
    this.$el = $(el);

    if($('html').hasClass('is-modern')) {
      return;
    }

    this.bind();
  }

  bind() {
    this.$el.on('click', this.onClickTrigger.bind(this));
  }

  onClickTrigger() {
    this.$el.toggleClass('is-active');
  }
}