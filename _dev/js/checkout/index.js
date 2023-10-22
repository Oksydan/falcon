import prestashop from 'prestashop';
import useEvent from '../theme/components/event/useEvent';
import parseToHtml from '../theme/utils/parseToHtml';
import useHttpRequest from '../theme/components/http/useHttpRequest';
import { each } from '../theme/utils/DOMHelpers';
import DOMReady from '../theme/utils/DOMReady';

const { on } = useEvent();

function setUpCheckout() {
  const clickTermLinkHandler = async (event) => {
    event.preventDefault();
    const url = event.target.getAttribute('href');

    if (url) {
      const modal = document.querySelector(prestashop.selectors.modal);
      const urlObject = new URL(url);
      const searchParams = new URLSearchParams(urlObject.searchParams);
      searchParams.set('content_only', '1');
      urlObject.search = searchParams.toString();

      const { request } = useHttpRequest(urlObject.toString());

      try {
        const res = await request.get().res();
        const content = await res.text();

        const modalContent = modal.querySelector(prestashop.selectors.modalContent);
        const contentElement = parseToHtml(content);
        modalContent.innerHTML = contentElement.querySelector('.page-cms')?.innerHTML || '';

        const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modal);
        modalInstance.show();
      } catch (error) {
        prestashop.emit('handleError', { eventType: 'changeAddresses', error });
      }
    }
  };

  each(prestashop.selectors.checkout.termsLink, (link) => on(link, 'click', clickTermLinkHandler));

  const giftCheckbox = document.querySelector(prestashop.selectors.checkout.giftCheckbox);

  if (giftCheckbox) {
    on(giftCheckbox, 'change', ({ target }) => {
      const isChecked = target.checked;
      const giftBlock = document.querySelector('#gift');
      const collapseInstance = window.bootstrap.Collapse.getOrCreateInstance(giftBlock);

      collapseInstance.toggle(isChecked);
    });
  }
}

DOMReady(() => {
  if (prestashop.page.page_name === 'checkout') {
    setUpCheckout();
  }

  prestashop.on('updateDeliveryForm', (event) => {
    if (typeof event.deliveryOption === 'undefined' || event.deliveryOption === null) {
      return;
    }

    each(prestashop.selectors.checkout.deliveryOption, (element) => {
      element.classList.remove('selected');
    });

    event.deliveryOption.classList.add('selected');
  });

  prestashop.on('updatedDeliveryForm', (event) => {
    if (typeof event.deliveryOption === 'undefined' || event.deliveryOption === null) {
      return;
    }

    each(prestashop.selectors.checkout.carrierExtraContent, (element) => {
      element.classList.add('d-none');
    });

    event.deliveryOption.nextElementSibling.classList.remove('d-none');
  });
});
