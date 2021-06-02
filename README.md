# PrestaShop Modern Starter Theme


## Table of Contents

* [About the Theme](#about-the-theme)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
  * [Working with webpack](#working-with-webpack)
  * [Working with npm/yarn](#working-with-npm/yarn)
* [Contribution](#contribution)

## About The Theme

**Modern prestashop starter theme** is made with modern tools such as webpack 4.4, webpack dev server with HMR :fire::fire: and latest bootstrap 4.6.
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
- node >= 10v,
- starter tested only on macOS, create an issue if it isn't working with your system.

### Installation

1. Go to [releases](https://github.com/Oksydan/modern-prestashop-starter-theme/releases/) and download latest version `.zip` file not source code.
2. If you want to change theme name unzip file. Change folder name e.g. `your-theme-name` then go to `config/theme.yml` and change:
```yml
name: starter
display_name: display
```
to:

```yml
name: your-theme-name
display_name: my theme display name
```
Name in `theme.yml` must be equal folder name. Zip theme folder and install theme from prestashop BO.

3. If you changed theme name you have to go to `is_themecore` module. Find `hookActionFrontControllerSetMedia` method and change:
```php
$themeAssetsObject  = new ThemeAssets($pageName, 'starter', $this->context);
```
to:
```php
$themeAssetsObject  = new ThemeAssets($pageName, 'your-theme-name', $this->context);
```

4. Open in terminal directory `your-theme-name/_dev` and run:
- for `npm` :
```
npm install
```
- for `yarn` :
```
yarn install
```
5. Go to `your-theme-name/_dev/webpack` and find `.env-example`. Copy file and rename it with `.env`. Replace example value with proper one based on your setup.
6. Now try to run:
- for `npm` :
```
npm run dev
```
- for `yarn` :
```
yarn dev
```
If your `.env` file is correctly setup. Your browser will open front office of your store.

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

## Contribution

Any kind of contribution is welcome.
Make pull request on develop branch but make sure to create an issue before submitting.
