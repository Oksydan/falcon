import Swiper, {
  Navigation, Pagination, Lazy, Autoplay
} from 'swiper';

import SliderEventEmitter from './SliderEventEmitter';
import DynamicImportSwiperModule from './DynamicImportSwiperModule';

const dynamicModulesMap = {
  'thumbs': new DynamicImportSwiperModule(
    () => [
      import('../../../node_modules/swiper/modules/thumbs/thumbs.js'),
    ]
  ),
  'virtual': new DynamicImportSwiperModule(
    () => [
      import('../../../node_modules/swiper/modules/virtual/virtual.js'),
      import('../../../node_modules/swiper/modules/virtual/virtual.scss'),
    ]
  ),
  'keyboard': new DynamicImportSwiperModule(
    () => [
      import('../../../node_modules/swiper/modules/keyboard/keyboard.js'),
    ]
  ),
  'mousewheel': new DynamicImportSwiperModule(
    () => [
      import('../../../node_modules/swiper/modules/mousewheel/mousewheel.js'),
    ]
  ),
  'mousewheel': new DynamicImportSwiperModule(
    () => [
      import('../../../node_modules/swiper/modules/scrollbar/scrollbar.js'),
      import('../../../node_modules/swiper/modules/scrollbar/scrollbar.scss'),
    ]
  ),
  'parallax': new DynamicImportSwiperModule(
    () => [
      import('../../../node_modules/swiper/modules/parallax/parallax.js'),
    ]
  ),
  'zoom': new DynamicImportSwiperModule(
    () => [
      import('../../../node_modules/swiper/modules/zoom/zoom.js'),
      import('../../../node_modules/swiper/modules/zoom/zoom.scss'),
    ]
  ),
  'freeMode': new DynamicImportSwiperModule(
    () => [
      import('../../../node_modules/swiper/modules/free-mode/free-mode.js'),
      import('../../../node_modules/swiper/modules/free-mode/free-mode.scss'),
    ]
  ),
};

const defaultModules = [ Navigation, Pagination, Lazy, Autoplay ];

class SwiperSlider {
  constructor(target, options) {
    this.target = target;
    this.options = options;
    this.modules = defaultModules;
    this._modulesToFetch = [];
    this.SwiperInstance = null;
    this.SliderEventEmitter = new SliderEventEmitter();

    this.initSlider();
  }

  on(eventName, callback) {
    this.SliderEventEmitter.on(eventName, callback);
  }

  async initSlider() {
    this.findNeededModulesToFetch();
    await this.fetchNeededModules();
    await this.initSwiper();
  }

  initSwiper() {
    this.SliderEventEmitter.emit('beforeInitSlider', {
      object: this,
      eventName: 'beforeInitSlider'
    });

    this.SwiperInstance = new Swiper(this.target, {
      ...this.options,
      modules: this.modules
    });

    this.SliderEventEmitter.emit('afterInitSlider', {
      object: this,
      eventName: 'afterInitSlider'
    });
  }

  async fetchNeededModules() {
    this.SliderEventEmitter.emit('startFetchingModules', {
      object: this,
      eventName: 'startFetchingModules'
    });

    if (this._modulesToFetch.length > 0) {
      const modulesPromisesArray = [];

      for (const module of this._modulesToFetch) {
        modulesPromisesArray.push(module.getFiles());
      }

      const allPromises = Promise.all(
        modulesPromisesArray.map((innerModulesPromisesArray) => Promise.all(innerModulesPromisesArray))
      );

      return allPromises.then(arrayOfModules => {
        for (const moduleImported of arrayOfModules) {
          for (const module of moduleImported) {
            if (typeof module.default !== 'undefined') {
              this.modules = [...this.modules, module.default];
            }
          }
        }

        this.SliderEventEmitter.emit('endFetchingModules', {
          object: this,
          eventName: 'endFetchingModules'
        });
      })
    } else {

      this.SliderEventEmitter.emit('endFetchingModules', {
        object: this,
        eventName: 'endFetchingModules'
      });
      return true;
    }
  }

  findNeededModulesToFetch() {
    for (const dynamicModuleProp in dynamicModulesMap) {
      if (dynamicModulesMap.hasOwnProperty(dynamicModuleProp) && typeof this.options[dynamicModuleProp] !== 'undefined') {
        this._modulesToFetch.push(dynamicModulesMap[dynamicModuleProp])
      }
    }
  }
}

export default SwiperSlider;
