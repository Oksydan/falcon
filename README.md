# PrestaShop Modern Starter Theme


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
  * [Smarty functions](#smarty-functions)
* [Support project](#support-project)
* [Contribution](#contribution)

## About The Theme

**Modern prestashop starter theme** is made with modern tools such as webpack 5.53, webpack dev server with HMR :fire::fire: and latest bootstrap 4.6.
This theme was created to deliver starter theme with latest developers tools and frameworks. You are able to create enterprise level prestashop theme that is easy to maintain. Made for developers, **if you are merchant don't download it!**

#### List of changes compared to classic theme:
1. Bootstrap updated to **4.6** from **4.0.0-alpha.5** - backwards compatibility included.
2. Updated webpack to **4.46** from **2.2.1** with whole new webpack config.
3. Removed **tether** - not used anymore with bootstrap 4.6 - **popper.js** added.
4. Removed **velocity-animate**, **jquery.scrollbox.js** and **jquery-touchswipe** - replaced with **swiper**.
5. Removed **bootstrap-filestyle.js** - replaced with bootstrap [custom file input](https://getbootstrap.com/docs/4.6/components/input-group/#custom-file-input)
6. Removed **jquery.ui** from `ps_searchbar`, new module `is_searchbar` included.
7. Removed **jquery.ui** from `ps_facetedsearch` - replaced with **nouislider**. (`ps_facetedsearch` assets unregistered in `is_themecore` module).
8. Added **jquery-nice-select** to make selects looks better.

#### Main features:
1. Webpack config working properly with webpack dev server and HMR. Watcher also observe changes on `.tpl` templates files and module `.css/.js/.tpl` files and make page full reload. You don't need to refresh your webpage anymore to inspect results.
2. Module `is_themecore` adds structured data with proper `JSON-LD` format for **WebPage**, **Product**, **Organization** and **BreadcrumbList**. Also support **OpenGraph** and **Twitter:card**. Module add missing breadcrumbs for pages: **cart**, **404**, **stores**, **sitemap**.
3. Dynamic importing boostrap components. You are able to load `.js/.css` file dynamicly with **DynamicImportHandler** class. There is no docs yet, example of use available in `_dev/js/components/dynamic-bootstrap-components.js`.
4. [Lazyload](https://github.com/verlok/vanilla-lazyload) for images added.
5. Modified version of `ps_imageslider` included. You are able to upload different images for mobile and desktop.
6. Multiple entry point for webpack, files separated per view. There are 4 output `js/css` files **theme**, **product**, **checkout**, **listing** and you are able to add more with ease. If you need rich cms pages with a lot of styles included in it. You don't have to include them everywhere with **theme** output file. You are able to create another entry e.g. **cms** and just include it in `ThemeAssets` class in module `is_themecore` that handle theme assets.
7. List/grid listing display. You are able to choose default listing display type. With only few lines of `.js` code. All template changes are handle in `.tpl` file. It is also easy to add another list type.
8. Specific `.scss` file structure that help you maintain your code.
9. Automatic generated preload links for theme fonts. You don't have to care about manually preloading fonts inside template. Webpack generates `.html` file that is included inside head. Fonts fileNames are `contentHashed` so client side caching problems after fonts changes are resolved (especially useful for icomoon generated icon fonts.).
10. High dpi images support added. With just simple call of smarty function `generateImageSources` you are able to handle whole image sources logic - `srcset` for high dpi images option enabled.

### Online demo

Want to check it online in action before downloading? Demo available [here](https://mpst.dev/).<br>
Demo hosted by our technical partner [Wrapnet](https://wrapnet.pl/).

### Performance

Performance results based on PageSpeed Insights: 

#### Desktop

![psi_desktop](https://user-images.githubusercontent.com/25306716/137646511-661c58bf-3a29-4696-a58b-5a46e9667459.jpg)

#### Mobile 

![psi_mobile](https://user-images.githubusercontent.com/25306716/137646514-6e584e10-9ca4-4c92-9199-07e55c01a647.jpg)

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

### Installation

1. Go to [releases](https://github.com/Oksydan/modern-prestashop-starter-theme/releases/) and download latest version `starter.zip` file not source code.

2. Download required modules and place them into `{shop_dir}/modules/` folder. Make sure that folder name of module don't contain branch name.

3. Unzip theme file and place it inside `{shop_dir}/themes/`.

4. If you want to change theme name unzip file. Change folder name e.g. `your-theme-name` then go to `config/theme.yml` and change:
```yml
name: starter
display_name: display
```
to:

```yml
name: your-theme-name
display_name: my theme display name
```
Name in `theme.yml` must be equal folder name.

5. If you changed theme name you have to go to `is_themecore` module. Find `hookActionFrontControllerSetMedia` method and change:
```php
$themeAssetsObject  = new ThemeAssets($pageName, 'starter', $this->context);
```
to:
```php
$themeAssetsObject  = new ThemeAssets($pageName, 'your-theme-name', $this->context);
```

6. Open in terminal directory `your-theme-name/_dev` and run:
- for `npm` :
```
npm install
```
- for `yarn` :
```
yarn install
```

7. Go to `your-theme-name/_dev/webpack` and find `.env-example`. Copy file and rename it with `.env`. Replace example value with proper one based on your setup.

8. Now try to run:
- for `npm` :
```
npm run build
```
- for `yarn` :
```
yarn build
```

9. Go in BO to Design->Theme & Logo and turn on theme. Now starter should be displayed correctly in FO and modules should be installed.

10. Now try to run:
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
`webpack.vars.js`  | Webpack dev server config that comes from `.env` file and entry point, output file setup. To add another entry point just add another element to `entriesArray`, remember to add files `/js/{entry_name}.js` and `/css/{entry_name}.scss`.
`webpack.parts.js`  | Contains loaders and plugins setup.
`webpack.commons.js`  | Config that runs on both production and development.
`webpack.development.js`  | Config that runs on development.
`webpack.production.js`  | Config that runs on production.
`purge-safelist.js`  | Starter theme comes with support for [purgecss](https://purgecss.com/), but safelist is not included.

### Working with npm/yarn

script  | description
------------- | -------------
`build`  | Script run production config with assets optimization and chunks names hashing.
`build-purge`  | Script run production config with assets optimization, chunks hashing also runs `purgecss` to remove not used styles. **Not recomended to use yet, create safelist before use**.
`watch`  | watch is an alias for `npm run dev`. **Assets optimization not included**.
`dev`  | Script that run `webpack dev server` that watch for changes in files and loading them w/o page reload. Script will open your store in browser with port in url, you have to remove it and refresh page. **Assets optimization not included**.
`scss-fix`  | Script that run `stylelint` and fix minor issues in code.
`eslint-fix`  | Script that run `eslint` and fix minor issues in code.


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
    loading="lazy"
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
    loading="lazy"
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

## Support project

If you like this project, buy me a cup of coffee. [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=JCSU5Z2AZV2UA)


## Contribution

Any kind of contribution is welcome.
Make pull request on develop branch but make sure to create an issue before submitting.
