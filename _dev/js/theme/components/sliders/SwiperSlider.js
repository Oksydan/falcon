import Swiper, {
  Navigation, Pagination, Autoplay,
} from 'swiper';

import DynamicImportSwiperModule from '@js/theme/components/sliders/DynamicImportSwiperModule';

/* eslint-disable */
const dynamicModulesMap = {
  thumbs: new DynamicImportSwiperModule(
    () => [
      import('@node_modules/swiper/modules/thumbs/thumbs.js'),
    ],
  ),
  virtual: new DynamicImportSwiperModule(
    () => [
      import('@node_modules/swiper/modules/virtual/virtual.js'),
      import('@node_modules/swiper/modules/virtual/virtual.scss'),
    ],
  ),
  keyboard: new DynamicImportSwiperModule(
    () => [
      import('@node_modules/swiper/modules/keyboard/keyboard.js'),
    ],
  ),
  mousewheel: new DynamicImportSwiperModule(
    () => [
      import('@node_modules/swiper/modules/mousewheel/mousewheel.js'),
    ],
  ),
  scrollbar: new DynamicImportSwiperModule(
    () => [
      import('@node_modules/swiper/modules/scrollbar/scrollbar.js'),
      import('@node_modules/swiper/modules/scrollbar/scrollbar.scss'),
    ],
  ),
  parallax: new DynamicImportSwiperModule(
    () => [
      import('@node_modules/swiper/modules/parallax/parallax.js'),
    ],
  ),
  zoom: new DynamicImportSwiperModule(
    () => [
      import('@node_modules/swiper/modules/zoom/zoom.js'),
      import('@node_modules/swiper/modules/zoom/zoom.scss'),
    ],
  ),
  freeMode: new DynamicImportSwiperModule(
    () => [
      import('@node_modules/swiper/modules/free-mode/free-mode.js'),
      import('@node_modules/swiper/modules/free-mode/free-mode.scss'),
    ],
  ),
  controller: new DynamicImportSwiperModule(
      () => [
        import('@node_modules/swiper/modules/controller/controller.js'),
        import('@node_modules/swiper/modules/controller/controller.scss'),
      ],
  ),
};
/* eslint-enable */

const defaultModules = [Navigation, Pagination, Autoplay];

class SwiperSlider {
  constructor(target, options) {
    this.target = target;
    this.options = options;
    this.modules = defaultModules;
    this._modulesToFetch = [];
    this.SwiperInstance = null;
  }

  async initSlider() {
    this.findNeededModulesToFetch();
    await this.fetchNeededModules();
    await this.initSwiper();

    return this.SwiperInstance;
  }

  initSwiper() {
    this.SwiperInstance = new Swiper(this.target, {
      ...this.options,
      modules: this.modules,
    });
  }

  async fetchNeededModules() {
    if (this._modulesToFetch.length > 0) {
      const modulesPromisesArray = [];

      for (const module of this._modulesToFetch) {
        modulesPromisesArray.push(module.getFiles());
      }

      const allPromises = Promise.all(
        modulesPromisesArray.map((innerModulesPromisesArray) => Promise.all(innerModulesPromisesArray)),
      );

      return allPromises.then((arrayOfModules) => {
        for (const moduleImported of arrayOfModules) {
          for (const module of moduleImported) {
            if (typeof module.default !== 'undefined') {
              this.modules = [...this.modules, module.default];
            }
          }
        }
      });
    }

    return Promise.resolve();
  }

  findNeededModulesToFetch() {
    for (const dynamicModuleProp in dynamicModulesMap) {
      if (Object.prototype.hasOwnProperty.call(dynamicModulesMap, dynamicModuleProp)
          && typeof this.options[dynamicModuleProp] !== 'undefined') {
        this._modulesToFetch.push(dynamicModulesMap[dynamicModuleProp]);
      }
    }
  }
}

export default SwiperSlider;
