/**
 * 2007-2019 PrestaShop SA and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */


$(document).ready(function() {
    productListingComments.init();
    productListingComments.load();
});


var productListingComments = (function () {

    var data = {
        productIDs: [],
        commentsLoadingInProgress: false,
        ajaxIDsLimit: 50,
        ajaxUrl: ''
    }

    var DOMStrings = {
        productListReviewsContainer: '.product-list-reviews',
        productListReviewsNumberOfComments: '.comments-nb',
        productListReviewsStarsContainer: '.grade-stars',
        productContainer: '.js-product-miniature'
    };

    var DOMClasses =  {
        inProgress: 'reviews-loading',
        reviewsLoaded: 'reviews-loaded',
        hasReviews: 'has-reviews'
    };

    function setEvents() {
        prestashop.on('updateProductList', function() {
            addProductsIDs();
        });
    }


    function setAjaxUrl() {
        if (data.ajaxUrl !== '')
            return;

        var url = $(DOMStrings.productListReviewsContainer).first().data('url');
        data.ajaxUrl = url;
    }

    function getNewProductsReviewsElements() {
        var $productListReviews = $(DOMStrings.productContainer)
            .not('.' + DOMClasses.reviewsLoaded + ', .' + DOMClasses.inProgress)
            .addClass(DOMClasses.inProgress)
            .find(DOMStrings.productListReviewsContainer);

        return $productListReviews;
    }

    function addProductsIDs() {

        var $productsList = getNewProductsReviewsElements(),
            seenIds = {};

        $productsList.each(function () {
            var id = $(this).data('id');
            seenIds[id] = true;
        });


        var IDsArray = Object.keys(seenIds);
        var prevDataIDs = data.productIDs.splice(0);
        data.productIDs = prevDataIDs.concat(IDsArray);

        if (!data.commentsLoadingInProgress) {
            loadProductsData();
        }
    }

    function loadProductsData() {
        if (data.productIDs.length === 0)
            return;

        data.commentsLoadingInProgress = true;

        var dataIDsCopy = data.productIDs.slice(0);
            selectedProductIDs = dataIDsCopy.splice(0, data.ajaxIDsLimit);


        $.get(data.ajaxUrl, { id_products: selectedProductIDs }, function (jsonData) {
            if (jsonData) {
                $.each(jsonData.products, function(i, elem) {
                    var productData = elem;
                    var $productsReviewsContainer = $('.product-list-reviews[data-id="' + productData.id_product + '"]');

                    $productsReviewsContainer.each(function () {
                        var $self = $(this);

                        if (productData.comments_nb > 0) {
                            $self.find(DOMStrings.productListReviewsStarsContainer).rating({ grade: productData.average_grade, starWidth: 16 });
                            $self.find(DOMStrings.productListReviewsNumberOfComments).text('(' + productData.comments_nb + ')');
                            $self.closest(DOMStrings.productContainer).addClass(DOMClasses.hasReviews);
                            $self.css('visibility', 'visible');
                        }

                        $self.closest(DOMStrings.productContainer).addClass(DOMClasses.reviewsLoaded);
                        $self.closest(DOMStrings.productContainer).removeClass(DOMClasses.inProgress);

                    });
                    data.productIDs.shift();
                });

                data.commentsLoadingInProgress = false;
                if (data.productIDs.length > 0) {
                    loadProductsData();
                }

            }
        });
    }


    return {
        load: function () {
            addProductsIDs();
        },
        init: function () {
            setAjaxUrl();
            setEvents();
        }
    }
})();
