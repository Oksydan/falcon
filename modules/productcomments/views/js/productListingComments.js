
DOMReady(() => {
    productListingComments.init();
    productListingComments.load();
});


const productListingComments = (() => {
    const data = {
        productIDs: [],
        commentsLoadingInProgress: false,
        ajaxIDsLimit: 50,
        ajaxUrl: ''
    }

    const DOMStrings = {
        productListReviewsContainer: '.product-list-reviews',
        productListReviewsNumberOfComments: '.comments-nb',
        productListReviewsStarsContainer: '.grade-stars',
        productContainer: '.js-product-miniature'
    };

    const DOMClasses =  {
        inProgress: 'reviews-loading',
        reviewsLoaded: 'reviews-loaded',
        hasReviews: 'has-reviews'
    };

    const setEvents = () => {
        prestashop.on('updatedProductList', () => {
            addProductsIDs();
        });
    }


    const setAjaxUrl = () => {
        if (data.ajaxUrl !== '')
            return;

        data.ajaxUrl = document.querySelector(DOMStrings.productListReviewsContainer)?.dataset?.url;
    }

    const getNewProductsReviewsElements = () => {
        return document.querySelectorAll(`
            ${DOMStrings.productContainer}:not(.${DOMClasses.reviewsLoaded}) ${DOMStrings.productListReviewsContainer},
            ${DOMStrings.productContainer}:not(.${DOMClasses.inProgress}) ${DOMStrings.productListReviewsContainer}
        `);
    }

    const addProductsIDs = () => {
        const productsList = getNewProductsReviewsElements();
        const seenIds = {};

        each(productsList, (product) => {
            seenIds[product.dataset.id] = true;
        });

        const IDsArray = Object.keys(seenIds);
        const prevDataIDs = data.productIDs.splice(0);
        data.productIDs = prevDataIDs.concat(IDsArray);

        if (!data.commentsLoadingInProgress) {
            loadProductsData();
        }
    }

    const loadProductsData = () => {
        if (data.productIDs.length === 0)
            return;

        data.commentsLoadingInProgress = true;

        const dataIDsCopy = data.productIDs.slice(0);
        const selectedProductIDs = dataIDsCopy.splice(0, data.ajaxIDsLimit);

        const { request } = useHttpRequest(data.ajaxUrl, {
          headers: {
            accept: '*/*',
          }
        });

        request
          .query({ 'id_products[]': selectedProductIDs })
          .get()
          .json((jsonData) => {
            if (!jsonData?.products) {
              return;
            }

            jsonData.products.forEach((productData) => {
              const {
                id_product,
                average_grade,
                comments_nb,
              } = productData;
              const productsReviewsContainer = document.querySelectorAll(`.product-list-reviews[data-id="${id_product}"]`);

              each(productsReviewsContainer, (productReviewsContainer) => {
                const productContainer = productReviewsContainer.closest(DOMStrings.productContainer);

                if (comments_nb > 0) {
                  starRating(productReviewsContainer.querySelector(DOMStrings.productListReviewsStarsContainer), average_grade);
                  const productReviewsNumberOfCommentsElement = productReviewsContainer.querySelector(DOMStrings.productListReviewsNumberOfComments);
                  productContainer?.classList.add(DOMClasses.hasReviews);

                  if (productReviewsNumberOfCommentsElement) {
                    productReviewsNumberOfCommentsElement.innerText = '(' + comments_nb + ')';
                  }

                  productReviewsContainer.style.visibility = 'visible';
                }

                productContainer?.classList.add(DOMClasses.reviewsLoaded);
                productContainer?.classList.remove(DOMClasses.inProgress);
              });

              data.productIDs.shift();
            });

            data.commentsLoadingInProgress = false;

            if (data.productIDs.length > 0) {
              loadProductsData();
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
