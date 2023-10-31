DOMReady(() => {
  const DOM_SELECTORS = {
    BTN_POST_MODAL_BTN: '.js-post-product-comment',
    POST_COMMENT_MODAL: '#post-product-comment-modal',
    COMMENT_POSTED_MODAL: '#product-comment-posted-modal',
    COMMENT_POST_ERROR_MODAL: '#product-comment-post-error',
    COMMENT_POST_ERROR_MESSAGE: '#product-comment-post-error-message',
    POST_COMMENT_FORM: '#post-product-comment-form',
    POST_COMMENT_FORM_INPUTS: '#post-product-comment-form input[type="text"]',
    POST_COMMENT_FORM_TEXTAREA: '#post-product-comment-form textarea',
    POST_COMMENT_FORM_CRITERION_RATING: '#post-product-comment-form .criterion-rating input',
  };
  const postCommentModal = document.querySelector(DOM_SELECTORS.POST_COMMENT_MODAL);
  const commentPostedModal = document.querySelector(DOM_SELECTORS.COMMENT_POSTED_MODAL);
  const commentPostErrorModal = document.querySelector(DOM_SELECTORS.COMMENT_POST_ERROR_MODAL);
  const commentForm = document.querySelector(DOM_SELECTORS.POST_COMMENT_FORM);
  const getCommentPostModalInstance = () => bootstrap.Modal.getOrCreateInstance(postCommentModal);
  const getCommentPostedModalInstance = () => bootstrap.Modal.getOrCreateInstance(commentPostedModal);
  const getCommentPostErrorModalInstance = () => bootstrap.Modal.getOrCreateInstance(commentPostErrorModal);

  const clearPostCommentForm = () => {
    each(`${DOM_SELECTORS.POST_COMMENT_FORM_INPUTS}, ${DOM_SELECTORS.POST_COMMENT_FORM_TEXTAREA}`, (formElement) => {
      formElement.value = '';
      formElement.classList.remove('is-invalid');
    });
    each(DOM_SELECTORS.POST_COMMENT_FORM_CRITERION_RATING, (formElement) => {
      formElement.value = 5;

      const event = new Event('change');
      formElement.dispatchEvent(event);
    });
  }

  const showPostErrorModal = (errorMessage) => {
    getCommentPostedModalInstance()?.hide();
    getCommentPostModalInstance()?.hide();
    clearPostCommentForm();

    const errorMessageElement = document.querySelector(DOM_SELECTORS.COMMENT_POST_ERROR_MESSAGE);

    if (errorMessageElement) {
      errorMessageElement.innerHTML = errorMessage;
    }

    getCommentPostErrorModalInstance()?.show();
  }

  const showCommentPostedModal = () => {
    getCommentPostErrorModalInstance()?.hide();
    getCommentPostModalInstance()?.hide();
    getCommentPostedModalInstance()?.show();

    clearPostCommentForm();
  }

  const showPostCommentModal = () => {
    getCommentPostErrorModalInstance()?.hide();
    getCommentPostedModalInstance()?.hide();
    getCommentPostModalInstance()?.show();
  }

  const handleClickPostModalBtn = (e) => {
    e.preventDefault();
    showPostCommentModal();
  }

  const handlePostCommentModalHidden = () => {
    clearPostCommentForm();
  }

  const handlePostCommentModal = (url, formData) => {
    const { request } = useHttpRequest(url, {
      headers: {
        accept: '*/*',
      }
    });

    request
      .post(formData)
      .json((jsonData) => {
        if (jsonData) {
          if (jsonData.success) {
            clearPostCommentForm();
            showCommentPostedModal();
          } else if (jsonData.errors || jsonData.error) {
            if (jsonData.errors) {
              const { errors } = jsonData;
              const errorList = `
                <ul>
                  ${errors.map((error) => `<li>${error}</li>`).join('')}
                </ul>
              `;

              showPostErrorModal(errorList);
            } else if (jsonData.error) {
              showPostErrorModal(jsonData.error);
            }
          }
        } else {
          showPostErrorModal(`<p>${productCommentPostErrorMessage}</p>`);
        }
      })
      .catch(() => {
        showPostErrorModal(`<p>${productCommentPostErrorMessage}</p>`);
      });
  }

  const handleSubmitCommentForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const formDataArray = formSerializeArray(form);
    const formData = fromSerialize(form);
    const url = form.action;

    if (!validateFormData(formDataArray)) {
      return;
    }

    handlePostCommentModal(url, formData);
  }

  const validateFormData = (formData) => {
    let isValid = true;

    formData.forEach((formField) => {
      const fieldSelector = '[name="'+formField.name+'"]';
      const fieldElement = commentForm.querySelector(fieldSelector);

      if (!formField.value) {
        fieldElement.classList.add('is-invalid');
        isValid = false;
      } else {
        fieldElement.classList.remove('is-invalid');
      }
    });

    return isValid;
  }

  eventHandlerOn(document, 'click', DOM_SELECTORS.BTN_POST_MODAL_BTN, handleClickPostModalBtn);
  eventHandlerOn(postCommentModal, 'hidden.bs.modal', handlePostCommentModalHidden);
  eventHandlerOn(commentForm, 'submit', handleSubmitCommentForm);
});
