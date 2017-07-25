import $ from 'jquery';

let data = [
  {
    url: '#',
    date: '2017.04.30',
    title: '大人の健康診断を甘く見ないで。結果から学ぶ自分のベストな状態大人の健康診断を甘く見ないで。結果から学ぶ自分のベストな状態'
  },
  {
    url: '#',
    date: '2017.06.30',
    title: '短いテキスト'
  },
  {
    url: '#',
    date: '2017.09.30',
    title: '大人の健康診断を甘く見ないで。結果から学ぶ自分のベストな状態大人の健康診断を甘く見ないで。結果から学ぶ自分のベストな状態大人の健康診断を甘く見ないで。結果から学ぶ自分のベストな状態大人の健康診断を甘く見ないで。結果から学ぶ自分のベストな状態'
  }
];

export default class {
  constructor(el) {
    this.$el = $(el);
    this.$list = null;

    if(this.$el[0]) {
      this.initialize();
    }
  }

  initialize() {
    this.$list = this.$el.find('.p-news__list');

    this.append(data);
    // this.fetch().done((data) => {
    //   this.append(data);
    // }).fail(() => {

    // });
  }

  fetch() {
    return $.ajax({
      url: '###',
      dataType: 'json'
    });
  }

  append(data) {
    let items = [];

    items = data.map((item) => {
      return `
        <li>
          <a href="${item.url}" target="_blank">
            <dl class="p-news__item">
              <dt>${item.date}</dt>
              <dd>${item.title}</dd>
            </dl>
          </a>
        </li>
      `
    });

    this.$list.html(items.join(''));
  }
}