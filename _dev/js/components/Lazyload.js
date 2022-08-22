import LazyLoad from 'vanilla-lazyload';

class PageLazyLoad {
  constructor({ selector = '.lazyload' } = {}) {
    this.selector = selector;
    this.lazyLoadInstance = null;
    this.init();
  }

  init() {
    this.lazyLoadInstance = new LazyLoad({
      elements_selector: this.selector,
    });
  }

  update() {
    this.lazyLoadInstance.update();
  }
}

export default PageLazyLoad;
