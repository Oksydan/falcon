import $ from 'jquery';

class PageLoader {
  constructor() {
    this.$body = $('body');
  }

  showLoader() {
    this.$body.addClass('page-loader-active');
  }

  hideLoader() {
    this.$body.removeClass('page-loader-active');
  }
}

export default PageLoader;
