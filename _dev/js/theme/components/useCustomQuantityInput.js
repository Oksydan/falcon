
const useCustomQuantityInput = (spinnerElement, {
    spinnerInitializedClass = 'js-custom-qty-spinner-initialized',
    spinnerInputClass = 'js-custom-qty-spinner-input',
    spinnerBtnClassUp = 'js-custom-qty-btn-up',
    spinnerBtnClassDown = 'js-custom-qty-btn-down',
    defaultMinQty = 1,
    defaultMaxQty = 1000000,
    timeout = 500,
    onQuantityChange = () => {}
}) => {
    let timeoutId = null;
    let startValue = null;
    let minQty = null;
    let maxQty = null;
    let currentQty = null;
    let DOMElements = null;

    const getDOMElements = () => (DOMElements || setDOMElements());

    const setDOMElements = () => {
        const elements = {
            input: spinnerElement?.querySelector(`.${spinnerInputClass}`),
            btnUp: spinnerElement?.querySelector(`.${spinnerBtnClassUp}`),
            btnDown: spinnerElement?.querySelector(`.${spinnerBtnClassDown}`),
        };

        DOMElements = elements;

        return elements;
    };

    const resetDomElements = () => {
        DOMElements = null;
    }

    const setQty = (qty) => {
        const { input } = getDOMElements();

        currentQty = qty;
        input.value = qty;

        dispatchChange();
    }

    const handleClickUp = (e) => {
        e.preventDefault();

        let newQty = parseInt(currentQty, 10) + 1;

        if (newQty >= maxQty) {
            newQty = maxQty;
        }

        setQty(newQty);
    };

    const handleClickDown = (e) => {
        e.preventDefault();

        let newQty = parseInt(currentQty, 10) - 1;

        if (newQty < minQty) {
            newQty = minQty;
        }

        setQty(newQty);
    };

    const handleInputChange = (e) => {
        const { input } = getDOMElements();
        let newQty = parseInt(input.value, 10);

        if (Number.isNaN(newQty) || newQty < minQty) {
            newQty = minQty;
        }

        if (newQty > maxQty) {
            newQty = maxQty;
        }

        setQty(newQty);
    };

    const shouldDispatchChange = () => currentQty !== startValue;

    const getOperationType = () => {
        if (currentQty > startValue) {
            return 'increase';
        }

        return 'decrease';
    }

    const getQtyDifference = () => {
        return Math.abs(currentQty - startValue);
    }

    const dispatchChange = () => {
        clearTimeout(timeoutId);

        if (!shouldDispatchChange()) {
            return;
        }

        timeoutId = setTimeout(() => {
            onQuantityChange({
                startValue,
                qty: currentQty,
                operation: getOperationType(),
                qtyDifference: getQtyDifference(),
            });

            setInitialValue();
        }, timeout);
    }

    const setInitialValue = () => {
        const { input } = getDOMElements();
        startValue = input.value ? parseInt(input.value, 10) : defaultMinQty;
        currentQty = startValue;
        minQty = input.getAttribute('min') ? parseInt(input.getAttribute('min'), 10) : defaultMinQty;
        maxQty = input.getAttribute('max') ? parseInt(input.getAttribute('max'), 10) : defaultMaxQty;
    }

    const setInitializedClass = () => {
        spinnerElement?.classList.add(spinnerInitializedClass);
    }

    const removeInitializedClass = () => {
        spinnerElement?.classList.remove(spinnerInitializedClass);
    }

    const detachEvents = () => {
        const { input, btnUp, btnDown } = getDOMElements();

        removeInitializedClass();

        btnUp?.removeEventListener('click', handleClickUp);
        btnDown?.removeEventListener('click', handleClickDown);
        input?.removeEventListener('keyup', handleInputChange);
        input?.removeEventListener('blur', handleInputChange);
    }

    const attachEvents = () => {
        const { input, btnUp, btnDown } = getDOMElements();

        setInitializedClass();

        btnUp?.addEventListener('click', handleClickUp);
        btnDown?.addEventListener('click', handleClickDown);
        input?.addEventListener('keyup', handleInputChange);
        input?.addEventListener('blur', handleInputChange);
    };

    const init = () => {
        destroy();
        setInitialValue();
        detachEvents();
        attachEvents();
    }

    const destroy = () => {
        detachEvents();
        resetDomElements();
    }

    return {
        init,
        destroy,
        getDOMElements,
    }
};

export default useCustomQuantityInput;
