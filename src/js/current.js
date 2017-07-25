import $ from 'jquery';
global.jQuery = $;

export default class {
  constructor() {
    require('waypoints/lib/jquery.waypoints');

    $('.js-section').waypoint({
      handler(direction) {
        let section = '';

        if(direction === 'down') {
          section = $(this.element).attr('id');
        } else {
          section = $(this.element).data('prev');
        }

        $('html').attr('data-section', section);
      }
    });
  }
}