import $ from 'jquery';
import { isSP } from './helpers';

let $body;

export default class {
  constructor(el) {
    this.$el = $(el);
    this.$inner = this.$el.find('.p-detail__inner');
    this.$list = this.$el.find('.p-habit__list');
    this.$items = this.$list.find('li');

    $body = $('.l-body');

    this.bind();
  }

  bind() {
    this.$el.on('mouseenter', '.js-habit', this.onMouseenter.bind(this));
    this.$el.on('mouseleave', '.js-habit', this.onMouseleave.bind(this));
    this.$el.on('click', '.js-habit', this.onClick.bind(this));
    this.$el.on('click', '.js-detail-close', this.onClickClose.bind(this));
    $('.js-detail').on('touchmove.habit', (e) => {
      e.stopPropagation();
    });
  }

  onMouseenter(e) {
    let index = $(e.currentTarget).data('index');

    this.$el
      .attr('data-index', index)
      .addClass('is-bg-visible');

    this.$items.filter((i) => {
      return (i + 1) !== Number(index);
    }).addClass('is-inactive');
  }

  onMouseleave() {
    this.$el.removeClass('is-bg-visible');

    this.$list.find('.is-inactive').removeClass('is-inactive');
  }

  onClick(e) {
    e.preventDefault();

    let index = $(e.currentTarget).data('index');

    $(`.p-detail--${index}`).addClass('is-detail-visible');
    $body.on('touchmove.habit', (e) => {
      e.preventDefault();
    });
  }


  onClickClose(e) {
    e.preventDefault();

    $('.is-detail-visible').removeClass('is-detail-visible').scrollTop(0);
    $body.off('touchmove.habit');
  }
}