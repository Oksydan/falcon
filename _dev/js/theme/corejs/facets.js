import prestashop from 'prestashop';
import useAlertToast from '@js/theme/components/useAlertToast';
import DOMReady from "@js/theme/utils/DOMReady";

const { danger } = useAlertToast();

const handleFacetsUpdate = async (url) => {
  try {
    const separator = url.indexOf('?') >= 0 ? '&' : '?';
    const newUrl = `${url}${separator}from-xhr`;

    const data = await prestashop.frontAPI.updateListingFacets(newUrl);

    prestashop.emit('updateProductList', data);
    window.history.pushState(data, document.title, data.current_url);
  } catch (error) {
    danger(prestashop.t.alert.genericHttpError);
  }
}

DOMReady(() => {
  prestashop.on('updateFacets', (url) => {
    handleFacetsUpdate(url);
  });
})
