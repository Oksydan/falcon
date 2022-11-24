<p align="center">
<img width="300" alt="logo" src="https://user-images.githubusercontent.com/25306716/203443689-3a466ddb-c78c-4a13-9525-bd7265a08c74.png">
</p>

<h1 align="center">
Falcon theme
</h1>

* 🚀 super fast
* 💡 feature rich
* 🪶 lightweight
* ⭐️ up to date
* 🐧 prestashop theme

## Table of Contents

* [About the Theme](#about-the-theme)
  * [Online demo](#online-demo)
  * [Performance](#performance)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Support table](#support-table)
  * [Installation](#installation)
* [Usage](#usage)
  * [Working with webpack](#working-with-webpack)
  * [Working with npm/yarn](#working-with-npm/yarn)
  * [Falcon CLI](#falcon-cli)
  * [Smarty functions](#smarty-functions)
  * [Smarty blocks](#smarty-blocks)
  * [Register assets](#register-assets)
  * [Preloading fonts](#preloading-fonts)
* [Javascript Components](#javascript-components)
  * [PageSLider](#pageslider)
  * [SwiperSlider](#swiperslider)
* [Features](#features)
  * [Preloads/early hints](#preloads/early-hints)
  * [Webp](#webp)
  * [Webp nginx](#webp-nginx)
* [Troubleshooting](#troubleshooting)
  * [Sass performance issue](#sass-performance-issue)
* [Support project](#support-project)
* [Contribution](#contribution)

## About The Theme

**Falcon theme** is made with the latest tools such as Webpack 5.53, Webpack dev server with HMR :fire::fire:, and Bootstrap 4.6.
This theme was created to deliver a starter theme with the latest developers' tools and frameworks. You can create an enterprise-level PrestaShop theme that is easy to maintain.

Made for developers, and **if you are a merchant, you shouldn't download it.**

#### List of changes compared to classic theme:
1. Bootstrap updated to **4.6** from **4.0.0-alpha.5** - backwards compatibility included.
2. Updated Webpack to **4.46** from **2.2.1** with a whole new Webpack config.
3. Removed **tether** - not used anymore with Bootstrap 4.6 - **popper.js** added instead.
4. Removed **velocity-animate**, **jquery.scrollbox.js** and **jquery-touchswipe** - replaced with **Swiper**.
5. Removed **bootstrap-filestyle.js** - replaced with Bootstrap [custom file input](https://getbootstrap.com/docs/4.6/components/input-group/#custom-file-input)
6. Removed **jquery.ui** from `ps_searchbar`, a new module `is_searchbar` included.
7. Removed **jquery.ui** from `ps_facetedsearch` - replaced with **nouislider**. (`ps_facetedsearch` assets are unregistered inside `is_themecore` module that is required for the theme to work properly).

#### Main features:
1. Webpack config works properly with Webpack Dev server and HMR. Its watcher also observes changes on `.tpl` templates, and modules `.css/.js/.tpl` files and makes the page complete reload if needed. You don't need to refresh your webpage manually anymore to inspect results.
2. Module `is_themecore` adds structured data with proper `JSON-LD` format for **WebPage**, **Product**, **Organization** and **BreadcrumbList**. Also supports **OpenGraph** and **Twitter:card**. It adds missing breadcrumbs for pages: **cart**, **404**, **stores**, **sitemap**.
3. Dynamic importing of the Boostrap components. You can load `.js/.css` file dynamically with **DynamicImportHandler** class. There is no documentation yet, only an example of use available in `_dev/js/components/dynamic-bootstrap-components.js`.
4. [Lazyload](https://github.com/verlok/vanilla-lazyload) added for images that are below the fold.
5. Modified version of `ps_imageslider` included. You can upload images for mobile and desktop separately.
6. Multiple entry points for Webpack, files separated per view. There are 4 output `js/css` files **theme**, **product**, **checkout**, **listing** and you are able to add more with ease. If you need rich CMS pages with many styles, you don't have to include them everywhere with the **theme** output file. You can create another entry e.g. **cms** and modify the `assets.yml` file to include the new assets file.
7. List/grid switcher on the list. You are able to choose the default listing display type with only a few lines of `.js` code. All template changes are handled in `.tpl` file. It is also easy to add another list type.
8. Specific `.scss` file structure that helps you maintain your code over time.
9. Automatically generated preload links for theme fonts. You don't have to care about manually preloading fonts inside the template. Webpack generates `.html` file that is included inside the head. Fonts fileNames are `contentHashed` so client-side caching problems after fonts changes are resolved (especially useful for `icomoon` generated icon fonts.).
10. High DPI images support. With just a simple call of the Smarty function (`generateImageSources`), you are able to handle whole image sources logic - `srcset` for the High DPI images option enabled.
11. `SwiperSlider` wrapper class for `swiper.js` to fetch needed swiper modules lazily based on provided config.
12. WebP image format generated automatically on demand via `is_themcore` module.
13. `Early hints (103)` support via Cloudflare for css/image file.

### Online demo

Want to check it online in action before downloading? Demo available [here](https://falcon-theme.dev/) (page might not be avaliable on release date).<br>
Demo hosted by our technical partner [Wrapnet](https://wrapnet.pl/).

### Performance

Performance results based on PageSpeed Insights:

#### Desktop

<img width="700" alt="mpst_desktop" src="https://user-images.githubusercontent.com/25306716/185810465-f85146be-4beb-4a16-8e14-ceaa230e96cd.png">

#### Mobile

<img width="700" alt="mpst_mobile" src="https://user-images.githubusercontent.com/25306716/185810449-f652b86b-acc2-4046-8dd9-4ceeab224fe3.png">

## Getting started

### Prerequisites

#### Modules required

- [is_imageslider](https://github.com/Oksydan/is_imageslider)
- [is_searchbar](https://github.com/Oksydan/is_searchbar)
- [is_shoppingcart](https://github.com/Oksydan/is_shoppingcart)
- [is_themecore](https://github.com/Oksydan/is_themecore)


#### System requirements:
- [Prestashop requirements](https://devdocs.prestashop.com/1.7/basics/installation/system-requirements/),
- vhost setup, to work with starter theme it is required to setup your shop domain with vhost e.g. `starter.test`,
- starter tested only on macOS, create an issue if it isn't working with your system.

### Support table

Starter version |  PS version | node version
------------- | ------------- | -------------
v 1.X  | 1.7.7.X | >= 10
v 2.X  | 1.7.8.X | >= 14
v 3.X  | 8.0.0.X | >= 14

#### Module requirements

`is_themecore` version |  Theme version
------------- | -------------
 1.X.X  | 1.X.X
 2.X.X  | 2.X.X
 3.X.X  | 2.X.X

`is_imageslider` version |  Theme version
------------- | -------------
 1.X.X  | <= 2.X.X
 2.X.X  | 3.X.X

`is_searchbar` version |  Theme version
------------- | -------------
 1.X.X  | <= 2.X.X
 2.X.X  | 3.X.X

`is_shoppingcart` version |  Theme version
------------- | -------------
 1.X.X  | <= 2.X.X
 2.X.X  | 3.X.X

### Installation

1. Go to [releases](https://github.com/Oksydan/falcon/releases/) and download latest version `falcon.zip` file not source code.

2. Download required modules via github releases and place them into `{shop_dir}/modules/` folder. Make sure that you are downloading release package not source code of module. DON'T clone module repository. If you clone module repository, you will have to run `composer install` in root dir of downloaded module.

3. Unzip theme file and place it inside `{shop_dir}/themes/`.

4. If you want to change theme name unzip file. Change folder name e.g. `your-theme-name` then go to `config/theme.yml` and change:
```yml
name: falcon
display_name: Falcon theme
```
to:

```yml
name: your-theme-name
display_name: my theme display name
```
Name in `theme.yml` must be equal folder name.

5. Open in terminal directory `your-theme-name/_dev` and run:
- for `npm` :
```
npm install
```
- for `yarn` :
```
yarn install
```

6. Creating your `.env` file. You can setup you project by running `project-init` script.

<p align="center">
<img alt="Falcon CLI preview" src="https://user-images.githubusercontent.com/25306716/200955908-883c9e7b-4ebb-4b59-a842-4eb780e975fb.gif" width="800">
</p>

7. If you didn't build your theme in step 6. Just run:
- for `npm` :
```
npm run build
```
- for `yarn` :
```
yarn build
```

8. Go in BO to Design->Theme & Logo and turn on theme. Now starter should be displayed correctly in FO and modules should be installed.

9. Now try to run:
- for `npm` :
```
npm run dev
```
- for `yarn` :
```
yarn dev
```
If your `.env` file is correctly setup. Your browser will open FO of your store.

## Usage

### Working with webpack
Webpack config is available in `_dev/webpack` folder. Files are structured by their functions:

file  | description
------------- | -------------
`webpack.vars.js`  | Webpack dev server config that comes from `.env` file and entry point, output file setup. To add new entry just run `add-entry` script.
`webpack.parts.js`  | Contains loaders and plugins setup.
`webpack.commons.js`  | Config that runs on both production and development.
`webpack.development.js`  | Config that runs on development.
`webpack.production.js`  | Config that runs on production.
`purge-safelist.js`  | Starter theme comes with support for [purgecss](https://purgecss.com/), but safelist is not included.

### Working with npm/yarn

script  | description
------------- | -------------
`build`  | Script run production config with assets optimization and chunks names hashing, silent console output.
`build-analyze`  | Script run production config with assets optimization and chunks names hashing also display bundle-analyzer.
`build-purge`  | Script run production config with assets optimization, chunks hashing also runs `purgecss` to remove not used styles. **Not recomended to use yet, create safelist before use**.
`build-ci`  | Script used for github actions CI.
`watch`  | good old watch option good if you struggle to setup `webpack-dev-server` . **Assets optimization not included**.
`dev`  | Script that run `webpack dev server` that watch for changes in files and loading them w/o page reload. Script will open your store in browser with port in url, you have to remove it and refresh page. **Assets optimization not included**.
`scss-lint`  | Script that run `stylelint`. It finds issues in code.
`scss-lint-fix`  | Script that run `stylelint`. It finds issues in code and fix minor issues in code.
`js-lint`    | Script that run `eslint`. It finds issues in code.
`js-lint-fix`  | Script that run `eslint`. It finds issues in code and fix minor issues in code.

### Falcon CLI

Falcon CLI is simple tool to improve your development experience and speed you your work. We are lunching this tool with only two scripts.

#### Project init script

After installing your `node_modules` you are able to init you project without creating `.env` file by yourself.
You can run script `project-init` and answer few question to create `.env` file and build assets.

- for `npm` :
```
npm run project-init
```
- for `yarn` :
```
yarn project-init
```

#### Add entry script

New script `add-entry` simplify your process of adding new entry point to webpack configuration.
You can just run script and after inserting entry name, new entry point will be added to project.
Just remember to register your new entry in `/config/assets.yml` file.

- for `npm` :
```
npm run add-entry
```
- for `yarn` :
```
yarn add-entry
```


### Smarty functions

#### GenerateImagesSources

Function created to simplify adding images src with support for high DPI images.

parameter  | required | description
------------- | ------------- | -------------
`image` | `true` | Parameter must be a product image array for example `$product.default_image`.
`size` | `true` | Size of image defined in `theme.yml` file for example `home_default`.
`lazyload` | `false` | Optional parameter, default value is equal `true`. If `lazyload` is set to true it replace image `src` parameter to `data-src` (or `srcset` if high DPI images are turned on). To lazyload working properly it is required to add `lazyload` class to that img.

Example of usage:

```smarty
  <img
    class="rounded img-fluid lazyload"
    {generateImagesSources image=$product.default_image size='home_default' lazyload=true}
    width="{$product.default_image.bySize.home_default.width}"
    height="{$product.default_image.bySize.home_default.height}"
    />
```

It will output:

```html
  <img
    class="img-fluid rounded lazyload"
    data-srcset="http://domain.com/{id}-home_default/{product_name}.jpg,
                http://domain.com/{id}-home_default2x/{product_name}.jpg 2x"
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 1 1'%3E%3C/svg%3E"
    width="250"
    height="250"
    />
```

#### generateImageSvgPlaceholder

Function created to return simple svg placeholder with given sizes.

parameter  | required | description
------------- | ------------- | -------------
`width` | `true` | Width of an image.
`height` | `true` | Height of an image.

Example of usage:

```smarty
  <img
     src="{generateImageSvgPlaceholder width=100 height=150}"
    />
```

It will output:

```html
    <img
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='150' viewBox='0 0 1 1'%3E%3C/svg%3E"
    />
```

#### appendParamToUrl

Function created to append param to url.

parameter  | required | description
------------- | ------------- | -------------
`url` | `true` | URL addres.
`key` | `true` | Parameter variable
`value` | `true` | Parameter value, can by string or array
`replace` | `false` | Replace param with the same key (default false)

#### Example of usage 1:

```smarty
  {appendParamToUrl url='https://example.com?page=1' key='variable' value='value'}
```

It will output:

```html
    https://example.com?page=1&variable=value
```

#### Example of usage 2:

```smarty
  {appendParamToUrl url='https://example.com?var=value1' key='var' value='value2' replace=true}
```

It will output:

```html
    https://example.com?var=value2
```

#### Example of usage 3:

```smarty
  {appendParamToUrl url='https://example.com?family=font1' key='family' value=['font2', 'font3']}
```

It will output:

```html
    https://example.com?family=font1&family=font2&family=font3
```

### Smarty blocks

#### images_block

Smarty block that modify `<img>` tags inside block to picture tag with `webp` `<source>` that if webp option is enabled inside `is_themecore` module.
Module check if image extension is `png`, `jpeg`, `jpg`, `svg` or `gif` will be omitted.<br>
This block don't check if image is external resource, don't use it for external resource.

Example of usage:

```smarty
  {images_block webpEnabled=$webpEnabled}
    <img
      class="rounded img-fluid"
      {generateImagesSources image=$product.default_image size='large_default' lazyload=false}
      width="{$product.default_image.bySize.large_default.width}"
      height="{$product.default_image.bySize.large_default.height}"
      {if !empty($product.default_image.legend)}
        alt="{$product.default_image.legend}"
      {else}
        alt="{$product.name}"
      {/if}
      >
  {/images_block}
```

It will output:

```smarty
  <picture>
    <source
      type="image/webp"
      srcset="http://domain.com/2-large_default/hummingbird-printed-t-shirt.webp">
    <img
      class="rounded img-fluid"
      src="http://domain.com/2-large_default/hummingbird-printed-t-shirt.jpg"
      width="800"
      height="800"
      alt="Hummingbird printed t-shirt">
  </picture>
```

`$webpEnabled` is global variable provided from `is_themecore` module, this parameter isn't required.
Block can also contains multiple images inside and every image will be modified to `<picture>` tag.


#### cms_images_block

This smarty block is working the same like `images_block` but it will check if files are containing internal urls or cdn urls.
Every external image will be omitted.

Example of usage:

```smarty
  {cms_images_block webpEnabled=$webpEnabled}
    <img src="http://domain.com/img/cms/image.jpg"/>

    <h2>Title</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor porta nulla, nec elementum orci. Ut pellentesque lacus felis, non vestibulum nunc fermentum eget. Pellentesque gravida ante sed gravida ultricies.</p>

    <img src="http://externalurl.com/image.jpg"/>
  {/images_block}
```

It will output:

```smarty
  <picture>
    <source type="image/webp" srcset="http://domain.com/img/cms/image.webp">
    <img src="http://domain.com/img/cms/image.jpg"/>
  </picture>

  <h2>Title</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor porta nulla, nec elementum orci. Ut pellentesque lacus felis, non vestibulum nunc fermentum eget. Pellentesque gravida ante sed gravida ultricies.</p>

  <img src="http://externalurl.com/image.jpg"/>
```

Use this block instead of `images_block` only if you want to processed html content that can contains external urls for example cms pages/product description.
This block is a bit slower that `images_block` so make sure that you are using it properly.

#### display_mobile

Simple smarty block to display content only for mobile devices.

Example of usage:

```smarty
  {display_mobile}
    <p>
      It will be displayed only for mobile device (not existing in DOM for destkop devices)
    </p>
  {/display_mobile}
```

#### display_desktop

Simple smarty block to display content only for destkop devices.

Example of usage:

```smarty
  {display_desktop}
    <p>
      It will be displayed only for desktop (not existing in DOM for mobile devices)
    </p>
  {/display_desktop}
```

### Register assets

Since version 2.1.0 new `assets.yml` file has been added to theme config directory.
It is completely new way of registering assets inside theme w/o writing any of php code, fully based on `.yml` file.
You can find new file inside `main_shop_directory/themes/theme_name/config/assets.yml`.

**Working with `assets.yml`.**

#### 1. Css files:

```yml
css:
  product: # Asset id
    fileName: product.css # File name inside assets/css
    media: all # Media attribute, allowed you can find inside StylesheetManagerCore $valid_media
    priority: 200 # Priority (lower > higher inside document)
    include: # List of page names that assets will be included, if you don't add to it will be the same as * (everywhere)
      - product
```

#### 2. Js files:

```yml
js:
  product: # Asset id
    fileName: product.js # File name inside assets/js
    priority: 200 # Priority (lower > higher inside document)
    include: # List of page names that assets will be included, if you don't add to it will be the same as * (everywhere)
      - product
```

#### 3. Working with include:

You are able to use wildcard inside `include`, making it easy to register assets for multiple module pages

```yml
css:
  blog:
    fileName: blog.css
    media: all
    priority: 200
    include:
      - module_blog_name*
```

#### 4. Remote files:

You are able to register remote files.

```yml
css:
  example_remote_bootstrap:
    fileName: //cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css
    server: remote # required to set server: remote for remote file
    priority: 200

js:
  example_remote_bootstrap:
    fileName: //cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js
    server: remote # required to set server: remote for remote file
    priority: 200
```

### Preloading fonts

Fonts are preloaded automaticlly via `webpack-font-preload-plugin`. To preload selected font you have to add font file name to plugin configuration.
You can find function resposible for it in `_dev/webpack/webpack.parts.js`. Function is called `preloadFonts`.

```javascript
exports.preloadFonts = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'preload.html',
      templateContent: '{{{preloadLinks}}}',
      inject: false,
    }),
    new FontPreloadPlugin({
      index: 'preload.html',
      extensions: ['woff2'],
      filter: /(materialicons|roboto-v20-latin-ext_latin-regular|roboto-v20-latin-ext_latin-700|roboto-v20-latin-ext_latin-500|icomoon)/i,
      replaceCallback: ({ indexSource, linksAsString }) => {
        return indexSource.replace('{{{preloadLinks}}}', linksAsString);
      },
    }),
  ]
})
```

To preload font with name for example `my-font-name`. You have to modyfiy value of `filter` field:

```javascript
  filter: /(materialicons|roboto-v20-latin-ext_latin-regular|roboto-v20-latin-ext_latin-700|roboto-v20-latin-ext_latin-500|icomoon|my-font-name)/i,
```

You are able to create more advanced matching test with regex, thats just simple example.

## Javascript Components

### PageSLider

PageSlider automatically initialize sliders that are visible in viewport.
PageSlider instance is exposed with `prestashop` global object, you can access it with `prestashop.pageSlider`.

##### Excluding from automatic initialization
To exclude slider from automatic initialization, your slider `.swiper` element have to contain `swiper-custom` class.

##### Dynamic added sliders
If you add new sliders element for example via ajax, you can refresh `pageSlider` observer to include newly included sliders with calling `prestashop.pageSlider.refresh()`.

##### Example of template

PageSlider will automatically initialize that slider with config passed to `data-swiper` attribute.

```smarty
  {$sliderConfig = [
    'speed' => 500,
    'slidesPerView' => 2
  ]}

  <div class="swiper" data-swiper="{$sliderConfig|json_encode}">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        SLIDE 1
      </div>
      <div class="swiper-slide">
        SLIDE 2
      </div>
      <div class="swiper-slide">
        SLIDE 3
      </div>
    </div>
  </div>
```

##### Automatic handling navigation, pagination

PageSlider automatic handles navigation and pagination if they are available. PageSlider is searching one node element above `.swiper` that why it is important to adds wrapper to swiper to prevent bugs.

```smarty
  {$sliderConfig = [
    'speed' => 500,
    'slidesPerView' => 2
  ]}

  <div class="example-wrapper">

    <div class="swiper" data-swiper="{$sliderConfig|json_encode}">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          SLIDE 1
        </div>
        <div class="swiper-slide">
          SLIDE 2
        </div>
        <div class="swiper-slide">
          SLIDE 3
        </div>
      </div>
    </div>

    <div class="swiper-button-prev">
      PREV
    </div>
    <div class="swiper-button-next">
      NEXT
    </div>

    <div class="swiper-pagination">
    </div>

  </div>
```

##### Custom navigation, pagination

If pagination or navigation config exists inside swiper config automatic handling isn't executed. Classed for navigation and slider are just examples it is important that this selectors are unique. You can also make use of `id` or just any valid querySelector.

```smarty
  {$sliderConfig = [
    'speed' => 500,
    'slidesPerView' => 2,
    'navigation' => [
      'nextEl' => '.js-unique-button-next',
      'prevEl' => '.js-unique-button-prev',
    ],
    'pagination' => [
      'el' => '.js-unique-swiper-pagination',
      'type' => 'bullets',
    ]
  ]}

  <div class="example-wrapper">

    <div class="swiper" data-swiper="{$sliderConfig|json_encode}">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          SLIDE 1
        </div>
        <div class="swiper-slide">
          SLIDE 2
        </div>
        <div class="swiper-slide">
          SLIDE 3
        </div>
      </div>
    </div>

    <div class="js-unique-button-prev swiper-button-prev">
      PREV
    </div>
    <div class="js-unique-button-next swiper-button-next">
      NEXT
    </div>

    <div class="js-unique-swiper-pagination swiper-pagination">
    </div>

  </div>
```

## SwiperSlider

Swiper is splitted to multiple modules that are not included in initial javascript/css files. We don't have to include every module to make sure that needed module just for one slider will be available for us.
`SwiperSlider` is wrapper to `Swiper` that handles dynamic imports for modules. It reads passed config and looking for modules that have to be fetched.

#### Default modules

We have some modules that are commonly used and we are not fetching them dynamically `Navigation, Pagination, Lazy, Autoplay`.

#### How it is working

Example, passed config:

```javascript
{
  slidesPerView: 1,
  spaceBetween: 10,
  freeMode: {
    enabled: true,
    sticky: true,
  },
}
```

When we initialize this slider with `SwiperSlider` class it will search for needed module to fetch.
It finds `freeMode` in config and fetch `freeMode` module and include this module it to parameters.

#### Working with SwiperSlider

`SwiperSlider` constructor accepts two parameters just like `Swiper`.
First argument is selector or node element that contains `swiper` class.
Second argument is swiper config, you can read more about it in [swiper API documentation](https://swiperjs.com/swiper-api#parameters)

```javascript
  const exampleSlider = new prestashop.SwiperSlider('.js-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
  });

  const exampleSliderSwiperInstance = exampleSlider.initSwiper();
```

`SwiperSlider` constructor returns `SwiperSlider` object.
If you want to access swiper instance it will be available for (example above) via `exampleSlider.swiperInstance` or `exampleSliderSwiperInstance`.

#### Asynchronous nature of SwiperSlider

We know that `SwiperSlider` isn't initialize `Swiper` immediately since it is fetching needed modules asynchronous. `exampleSlider.swiperInstance` might not be available right after we create new `SwiperSlider` instance.
To solve this problem `initSwiper` is returning promise that resolved is returning us SwiperSlider instance.

Example with usage of `async/await` (recommended way, cleaner):

```javascript
  const exampleSlider = new prestashop.SwiperSlider('.js-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
  });

  const exampleSliderSwiperInstance = await exampleSlider.initSwiper();

  // exampleSliderSwiperInstance is Swiper instance created with SwiperSlider class
  exampleSliderSwiperInstance
```

Example with usage of `then`:

```javascript
    const exampleSlider = new prestashop.SwiperSlider('.js-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
  });

  exampleSlider.initSwiper().then(swiperInstance => {
    // swiperInstance is Swiper instance created with SwiperSlider class
    swiperInstance
  });
```

## Features

### Preloads/early hints

### Preload css

Preload css option inside `is_themecore` is only working when `CCC option for css` is enabled. Switching this option on will automatically add `preload` `<link>` to head with css file.

### Early hints

Enabled early hints option inside `is_themecore` module will append every image/style preload link to response head as `Link` header.
This option is requiring cloudflare and Early hints option enabled in your cloudflare dashboard. <br>
This option is still in beta stage, to read more about it [click here](https://developers.cloudflare.com/cache/about/early-hints/)

### Webp

In version `2.3.0` of `is_themecore` and `mpst` webp image format has been added.<br>
You are able to simply add webp image format by changing image extenstion to `.webp` from for example `.jpg` or `.png`. Module will automaticly find source file and convert it to `webp`.<br>
You don't have to create `<picture>` tag and change image src extenstion to `webp`. Two new smarty blocks has been added to handle needed template modyfication `images_block` and `cms_images_block`, you can read more about it in [smarty blocks section](#smarty-blocks). <br>
Module is adding specific rules to `.htaccess` file to handle `webp` files. To enable `webp` image format you have to enable it in `is_themecore` module configuration.
You are also able to set `quality` and `converter` that will be used to convert files to `webp` format. <br>

### Webp nginx

If you are using `nginx` you have to add manually some rules to your nginx configuration file.<br>
Configuration that is being used for `mpst.dev`:

```
location ~ ^/(\d)(-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.webp$ {
    try_files /img/p/$1/$1$2$3.webp /img/p/$1/$1$2$3.webp /modules/is_themecore/webp.php?source=$document_root/img/p/$1/$1$2$3.webp;
}

location ~ ^/(\d)(\d)(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.webp$ {
    try_files /img/p/$1/$2/$1$2$3$4.webp /img/p/$1/$2/$1$2$3$4.webp /modules/is_themecore/webp.php?source=$document_root/img/p/$1/$2/$1$2$3$4.webp;
}

location ~ ^/(\d)(\d)(\d)(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.webp$ {
    try_files /img/p/$1/$2/$3/$1$2$3$4$5.webp /img/p/$1/$2/$3/$1$2$3$4$5.webp /modules/is_themecore/webp.php?source=$document_root/img/p/$1/$2/$3/$1$2$3$4$5.webp;
}

location ~ ^/(\d)(\d)(\d)(\d)(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.webp$ {
    try_files /img/p/$1/$2/$3/$4/$1$2$3$4$5$6.webp /img/p/$1/$2/$3/$4/$1$2$3$4$5$6.webp /modules/is_themecore/webp.php?source=$document_root/img/p/$1/$2/$3/$4/$1$2$3$4$5$6.webp;
}

location ~ ^/(\d)(\d)(\d)(\d)(\d)(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.webp$ {
    try_files /img/p/$1/$2/$3/$4/$5/$1$2$3$4$5$6$7.webp /img/p/$1/$2/$3/$4/$5/$1$2$3$4$5$6$7.webp /modules/is_themecore/webp.php?source=$document_root/img/p/$1/$2/$3/$4/$5/$1$2$3$4$5$6$7.webp;
}

location ~ ^/(\d)(\d)(\d)(\d)(\d)(\d)(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.webp$ {
    try_files /img/p/$1/$2/$3/$4/$5/$6/$1$2$3$4$5$6$7$8.webp /img/p/$1/$2/$3/$4/$5/$6/$1$2$3$4$5$6$7$8.webp /modules/is_themecore/webp.php?source=$document_root/img/p/$1/$2/$3/$4/$5/$6/$1$2$3$4$5$6$7$8.webp;
}

location ~ ^/(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\-[_a-zA-Z0-9-]*)?(-[0-9]+)?/.+\.webp$ {
    try_files /img/p/$1/$2/$3/$4/$5/$6/$7/$1$2$3$4$5$6$7$8$9.webp /img/p/$1/$2/$3/$4/$5/$6/$7/$1$2$3$4$5$6$7$8$9.webp /modules/is_themecore/webp.php?source=$document_root/img/p/$1/$2/$3/$4/$5/$6/$7/$1$2$3$4$5$6$7$8$9.webp;
}

location ~ ^/c/([0-9]+)(\-[\.*_a-zA-Z0-9-]*)(-[0-9]+)?/.+\.webp$ {
    try_files /img/c/$1$2$3.webp /img/c/$1$2$3.webp /modules/is_themecore/webp.php?source=$document_root/img/c/$1$2$3.webp;
}

location ~ ^/c/([0-9]+)(\-[\.*_a-zA-Z0-9-]*)(-[0-9]+)?/.+\.webp$ {
    try_files /img/c/$1$2.webp /img/c/$1$2.webp /modules/is_themecore/webp.php?source=$document_root/img/c/$1$2.webp;
}

location ~ ^/(.*)\.webp$ {
    try_files /$1.webp /$1.webp /modules/is_themecore/webp.php?source=$document_root/$1.webp;
}
```

## Troubleshooting

### Sass performance issue

In version `2.4.0` `node-sass` has been replaced with dart implementation of `sass`. Your build times will surely increased since `sass` is slower that `node-sass` used in older version of starter. There is alterative package https://github.com/sass/embedded-host-node that will solve your performance issue. <br>
You are asking yourself. Why we are still using `sass` packages instead of `sass-embedded`? Well, not every linux distro is supporting `dart-lang` at this moment thats you have to implement it on your own. Starter theme have to be versatile and we should support as much OS versions as possible.<br>

1. First run:

```bash
  npm i sass-embedded --save
```

or

```bash
  yarn add sass-embedded
```

2. Go to `themes/theme_name/_dev/webpack/webpack.parts.js` and find `sass-loader` and replace:

```javascript
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
    },
  },
```

with:

```javascript
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass-embedded'),
    },
  },
```

3. Run your `dev` script and you should right now feel like your theme is building much faster.

## Support project

If you like this project, buy me a cup of coffee. [Become a sponsor](https://github.com/sponsors/Oksydan)


## Contribution

Any kind of contribution is welcome.
Make pull request on develop branch but make sure to create an issue before submitting.
