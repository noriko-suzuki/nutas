import $ from 'jquery';
global.jQuery = $;

export default class {
  constructor(el) {
    require('waypoints/lib/jquery.waypoints');

    this.$el = $(el);

    this.initialize();
  }

  initialize() {
    this.$el.waypoint({
      handler(direction) {
        let section = '';

        if(direction === 'down') {
          $(this.element).addClass('is-animated');
          this.destroy();
        }
      },
      offset: '80%'
    });
  }
}