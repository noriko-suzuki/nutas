import $ from 'jquery';
import preloader from 'preloader';

import { isSP } from './helpers';

const path = '/assets/img'

let images = isSP() ? [
  `${path}/index/mainvisual/sp/image.jpg`,

  `${path}/about/sp/heading.png`,
  `${path}/about/sp/image.jpg`,

  `${path}/news/sp/bnr_nutoritionist.png`
] : [
  `${path}/index/cover.jpg`,
  `${path}/index/mainvisual/image.jpg`,

  `${path}/about/heading.png`,
  `${path}/about/image.jpg`,
  `${path}/about/lead.png`,
  `${path}/about/lead_small.png`,

  `${path}/news/bnr_nutoritionist.png`
];

export default class {
  constructor(el) {
    this.$el = $(el);
    this.$progress = this.$el.find('.l-loading__progress');

    this.loader = preloader({
      xhrImages: false
    });

    this.loader.on('progress', (progress) => {
      this.$progress.css({
        width: `${progress * 100}%`
      });
    });

    this.loader.on('complete', () => {
      this.$progress.css({
        width: `100%`
      });

      $('html').addClass('is-loaded');
    });

    this.addDetailImages();

    this.load(images);
  }

  addDetailImages() {
    let spPath = isSP() ? 'sp/' : '';

    for(let i = 1; i < 8; i++) {
      let bg = `${path}/habit/detail/${spPath}${i}/bg.jpg`;
      let index = `${path}/habit/detail/${spPath}${i}/index.png`;
      let title = `${path}/habit/detail/${spPath}${i}/title.png`;
      let image = isSP() ? `${path}/habit/detail/${spPath}${i}/image.jpg` : '';

      if(isSP()) {
        images.push(bg, index, title, image);
      } else {
        images.push(bg, index, title);
      }
      
    }
  }

  load(images) {
    images.forEach((image) => {
      this.loader.add(image);
    });

    this.loader.load();
  }
}