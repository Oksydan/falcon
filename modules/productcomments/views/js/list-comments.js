
DOMReady(() => {
  const DOM_SELECTORS = {
    PRODUCT_COMMENTS_LIST: '#product-comments-list',
    EMPTY_PRODUCT_COMMENT: '#empty-product-comment',
    PRODUCT_COMMENTS_LIST_PAGINATION: '#product-comments-list-pagination',
    UPDATE_COMMENT_POST_ERROR_MODAL: '#update-comment-usefulness-post-error',
    UPDATE_COMMENT_POST_ERROR_MESSAGE: '#update-comment-usefulness-post-error-message',
    REPORT_COMMENT_POST_ERROR_MODAL: '#report-comment-post-error',
    REPORT_COMMENT_POST_ERROR_MESSAGE: '#report-comment-post-error-message',
    REPORT_COMMENT_POSTED_MODAL: '#report-comment-posted',
    REPORT_COMMENT_CONFIRMATION_MODAL: '#report-comment-confirmation',

  };
  const commentsList = document.querySelector(DOM_SELECTORS.PRODUCT_COMMENTS_LIST);
  const emptyProductComment = document.querySelector(DOM_SELECTORS.EMPTY_PRODUCT_COMMENT);
  const updateCommentPostErrorModal = document.querySelector(DOM_SELECTORS.UPDATE_COMMENT_POST_ERROR_MODAL);
  const reportCommentPostedModal = document.querySelector(DOM_SELECTORS.REPORT_COMMENT_POSTED_MODAL);
  const reportCommentPostErrorModal = document.querySelector(DOM_SELECTORS.REPORT_COMMENT_POST_ERROR_MODAL);
  const confirmAbuseModal = document.querySelector(DOM_SELECTORS.REPORT_COMMENT_CONFIRMATION_MODAL);
  const productCommentUpdatePostErrorMessage = document.querySelector(DOM_SELECTORS.UPDATE_COMMENT_POST_ERROR_MESSAGE);
  const productCommentAbuseReportErrorMessage = document.querySelector(DOM_SELECTORS.REPORT_COMMENT_POST_ERROR_MESSAGE);
  const productCommentPagination = document.querySelector(DOM_SELECTORS.PRODUCT_COMMENTS_LIST_PAGINATION);
  const commentsListUrl = commentsList.dataset?.listCommentsUrl;
  const updateCommentUsefulnessUrl = commentsList.dataset?.updateCommentUsefulnessUrl;
  const reportCommentUrl = commentsList.dataset?.reportCommentUrl;
  const commentPrototype = commentsList.dataset?.commentItemPrototype;

  hide(emptyProductComment);

  each('.comments-note .grade-stars', starRating);

  prestashop.on('updatedProduct', function() {
    each('.product-comments-additional-info .grade-stars', starRating);
  })

  document.addEventListener('updateRating', function() {
    each('.comments-note .grade-stars', starRating);
  });

  const buildPagination = (paginationElement, {
    onePageClick = () => {},
    currentPage = null,
    items = null,
    itemsOnPage = null,
  }) => {
    if (!paginationElement || !items || !itemsOnPage || !currentPage) {
      throw new Error('Invalid pagination configuration');
    }

    const prevText = '<span class="material-icons font-reset align-middle">chevron_left</span>';
    const nextText = '<span class="material-icons font-reset align-middle">chevron_right</span>';

    const calculateNumberOfPages = () => Math.ceil(items / itemsOnPage);
    const shouldShowPagination = () => calculateNumberOfPages() > 1;
    const shouldPrevBeActive = () => currentPage > 1;
    const shouldNextBeActive = () => currentPage < calculateNumberOfPages();

    const buildPaginationList = () => {
      const paginationList = document.createElement('ul');
      paginationList.classList.add('pagination', 'mb-0');
      let paginationItems = '';
      paginationItems += buildPaginationPrev();

      for (let i = 1; i <= calculateNumberOfPages(); i++) {
        paginationItems += buildPaginationItem(i);
      }

      paginationItems += buildPaginationNext();

      paginationList.innerHTML = paginationItems;

      return paginationList;
    }

    const buildPaginationItem = (page) => `
      <li class="page-item ${page === currentPage ? 'active' : ''}">
        <a class="page-link js-page" href="#" role="button" data-page="${page}">${page}</a>
      </li>
    `;

    const buildPaginationPrev = () => `
      <li class="page-item ${shouldPrevBeActive() ? '' : 'disabled'}">
        <a class="page-link js-prev" href="#" role="button"  data-page="${currentPage - 1}">${prevText}</a>
      </li>
    `;

    const buildPaginationNext = () => `
      <li class="page-item ${shouldNextBeActive() ? '' : 'disabled'}">
        <a class="page-link js-next" href="#" role="button" data-page="${currentPage + 1}" >${nextText}</a>
      </li>
    `;

    const attachPaginationEvents = () => {
      const pageElements = paginationElement.querySelectorAll('.js-page, .js-prev, .js-next');

      each(pageElements, (pageElement) => {
        eventHandlerOn(pageElement, 'click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          onePageClick(parseInt(pageElement.dataset.page));
        });
      });
    }

    const init = () => {
      if (shouldShowPagination()) {
        const paginationList = buildPaginationList();
        paginationElement.innerHTML = '';
        paginationElement.append(paginationList);

        attachPaginationEvents();
      }
    }

    init();
  }

  const showUpdatePostCommentErrorModal = (errorMessage) => {
    productCommentUpdatePostErrorMessage.innerHTML = errorMessage;
    bootstrap.Modal.getOrCreateInstance(updateCommentPostErrorModal).show();
  }

  const showReportCommentErrorModal = (errorMessage) => {
    productCommentAbuseReportErrorMessage.innerHTML = errorMessage;
    bootstrap.Modal.getOrCreateInstance(reportCommentPostErrorModal).show();
  }


  const updateCommentUsefulness = (comment, commentId, usefulness) => {
    const { request } = useHttpRequest(updateCommentUsefulnessUrl, {
      headers: {
        accept: '*/*',
      }
    });

    request
      .query({
        id_product_comment: commentId,
        usefulness: usefulness
      })
      .post()
      .json((jsonData) => {
        if (jsonData) {
          if (jsonData.success) {
            const useFulValue = comment.querySelector('.js-useful-review-value');
            const notUseFulValue = comment.querySelector('.js-not-useful-review-value');

            if (useFulValue) {
              useFulValue.innerText = jsonData.usefulness;
            }

            if (notUseFulValue) {
              notUseFulValue.innerText = jsonData.total_usefulness - jsonData.usefulness;
            }
          } else {
            showUpdatePostCommentErrorModal(`<div class="alert alert-danger">${jsonData.error}</div>`);
          }
        } else {
          showUpdatePostCommentErrorModal(`<div class="alert alert-danger">${productCommentUpdatePostErrorMessage}</div>`);
        }
      })
      .catch(() => {
        showUpdatePostCommentErrorModal(`<div class="alert alert-danger">${productCommentUpdatePostErrorMessage}</div>`);
      });
  }

  const confirmCommentAbuse = (commentId) => {
    bootstrap.Modal.getOrCreateInstance(confirmAbuseModal).show();

    eventHandlerOne(confirmAbuseModal, 'modal:confirm', (event) => {
      const { confirm = false } = event;

      if (!confirm) {
        return;
      }

      const { request } = useHttpRequest(reportCommentUrl, {
        headers: {
          accept: '*/*',
        }
      });

      request
        .query({
          id_product_comment: commentId,
        })
        .post()
        .json((jsonData) => {
          if (jsonData) {
            if (jsonData.success) {
              bootstrap.Modal.getOrCreateInstance(reportCommentPostedModal).show();
            } else {
              showReportCommentErrorModal(jsonData.error);
            }
          } else {
            showReportCommentErrorModal(productCommentAbuseReportErrorMessage);
          }
        });

    });
  }

  const addComment = (comment) => {
    let commentTemplate = commentPrototype;
    let customerName = comment.customer_name;

    if (!customerName) {
      customerName = comment.firstname+' '+comment.lastname;
    }

    commentTemplate = commentTemplate.replace(/@COMMENT_ID@/, comment.id_product_comment);
    commentTemplate = commentTemplate.replace(/@PRODUCT_ID@/, comment.id_product);
    commentTemplate = commentTemplate.replace(/@CUSTOMER_NAME@/, customerName);
    commentTemplate = commentTemplate.replace(/@COMMENT_DATE@/, comment.date_add);
    commentTemplate = commentTemplate.replace(/@COMMENT_TITLE@/, comment.title);
    commentTemplate = commentTemplate.replace(/@COMMENT_COMMENT@/, comment.content);
    commentTemplate = commentTemplate.replace(/@COMMENT_USEFUL_ADVICES@/, comment.usefulness);
    commentTemplate = commentTemplate.replace(/@COMMENT_NOT_USEFUL_ADVICES@/, (comment.total_usefulness - comment.usefulness));
    commentTemplate = commentTemplate.replace(/@COMMENT_TOTAL_ADVICES@/, comment.total_usefulness);

    const commentElement = parseToHtml(commentTemplate);
    const commentStars = commentElement.querySelector('.grade-stars');

    starRating(commentStars, comment.grade);

    const btnUsefulReview = commentElement.querySelector('.js-useful-review');
    const btnNotUsefulReview = commentElement.querySelector('.js-not-useful-review');
    const btnReportAbuse = commentElement.querySelector('.js-report-abuse');

    if (btnUsefulReview) {
      eventHandlerOn(btnUsefulReview, 'click', (e) => {
        e.preventDefault();
        updateCommentUsefulness(commentElement, comment.id_product_comment, 1);
      });
    }

    if (btnNotUsefulReview) {
      eventHandlerOn(btnNotUsefulReview, 'click', (e) => {
        e.preventDefault();
        updateCommentUsefulness(commentElement, comment.id_product_comment, 0);
      });
    }

    if (btnReportAbuse) {
      eventHandlerOn(btnReportAbuse, 'click', (e) => {
        e.preventDefault();
        confirmCommentAbuse(comment.id_product_comment);
      });
    }

    commentsList.append(commentElement);
  }

  const populateComments = (comments) => {
    commentsList.innerHTML = '';
    comments.forEach(addComment);
  }

  const paginateComments = (page) => {
    const { request } = useHttpRequest(commentsListUrl, {
      headers: {
        accept: '*/*',
      }
    });

    request
      .query({ page })
      .get()
      .json((jsonResponse) => {
        if (jsonResponse.comments && jsonResponse.comments.length > 0) {
          populateComments(jsonResponse.comments);
          if (jsonResponse.comments_nb > jsonResponse.comments_per_page) {
            buildPagination(productCommentPagination, {
              onePageClick: paginateComments,
              currentPage: page,
              items: jsonResponse.comments_nb,
              itemsOnPage: jsonResponse.comments_per_page,
            });
          } else {
            hide(productCommentPagination);
          }
        } else {
          commentsList.innerHTML = '';
          show(emptyProductComment);
          commentsList.append(emptyProductComment);
        }
      })
  }

  paginateComments(1);
});
