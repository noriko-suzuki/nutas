import $ from 'jquery';
import 'waypoints/lib/noframework.waypoints';
import 'lazysizes';

import { isSP } from './helpers';

import Scrollify from './scrollify';
import News from './news';
import Current from './current';
import Anchor from './anchor';
import SpMenu from './sp_menu';
import Loading from './loading';
import Habit from './habit';
import Cover from './cover';
import AreaSelection from './area_selection';
import _Waypoint from './waypoint';
import Award from './award';
import SNSAction from './sns_action';

require('malihu-custom-scrollbar-plugin')($);

const _appVersion = navigator.appVersion.toLowerCase();

$(() => {
  new Scrollify('.js-scrollify');
  new News('.js-news');
  new Current();
  new Anchor();
  new SpMenu();
  new Loading('.l-loading');
  new Habit('.p-habit');
  new Cover('.js-cover');
  new AreaSelection('.l-area');
  new _Waypoint('.js-waypoint');
  new Award();
  new SNSAction('.js-sns-action');

  $('.js-scrollbar').mCustomScrollbar();
  $('.js-pagetop').on('click', (e) => {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: 0
    }, 600);
  });

  new Waypoint({
    element: document.body,
    // element: document.querySelector('.p-index'),
    handler: (direction) => {
      if(direction === 'down') {
        $('html').addClass('is-index-hidden');
      } else {
        $('html').removeClass('is-index-hidden');
      }
    },
    offset: () => {
      let spacing = isSP() ? 65 : 0;

      return -$(global).height() + spacing;
    }
  });

  $('.js-sns').on('click', (e) => {
    $('.p-sns--sp').toggleClass('is-sns-open');
  });

  if(_appVersion.match(/msie|trident/)) {
    $('html').addClass('is-ie');
  } else {
    $('html').addClass('is-modern');
  }
});