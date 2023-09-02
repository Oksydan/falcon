
const useToggleDisplay = () => {
    const D_NONE_CLASS = 'd-none';

    /**
     * Show element
     * @param element <HTMLElement> Element to show
     */
    const show = (element) => {
        element.style.display = '';
        element.classList.remove(D_NONE_CLASS);
    }

    /**
     * Hide element
     * @param element <HTMLElement> Element to hide
     */
    const hide = (element) => {
        element.style.display = '';
        element.classList.add(D_NONE_CLASS);
    }

    /**
     * Toggle element
     * @param element <HTMLElement> Element to toggle
     * @param display <bool> Display or hide
     */
    const toggle = (element, display) => {
        display ? show(element) : hide(element);
    }

    return {
        show,
        hide,
        toggle
    }
}

export default useToggleDisplay
