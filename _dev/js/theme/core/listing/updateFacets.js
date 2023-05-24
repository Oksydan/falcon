import prestashop from 'prestashop';
import useAlertToast from '@js/theme/components/useAlertToast';

const { danger } = useAlertToast();

const handleFacetsUpdate = async (url) => {
    try {
        const separator = url.indexOf('?') >= 0 ? '&' : '?';
        const slightlyDifferentURL = `${url + separator}from-xhr`;

        const data = await prestashop.frontAPI.updateListingFacets(slightlyDifferentURL);

        prestashop.emit('updateProductList', data);
        window.history.pushState(data, document.title, data.current_url);
    } catch (error) {
        console.log(error);
        danger(prestashop.t.alert.genericHttpError);
    }
}

const updateFacets = () => {
    prestashop.on('updateFacets', (url) => {
        handleFacetsUpdate(url);
    });
}

export default updateFacets;

