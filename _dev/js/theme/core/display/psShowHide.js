import useToggleDisplay from '@js/theme/components/display/useToggleDisplay';

/**
 * Toggle the display of elements with the 'ps-shown-by-js' and 'ps-hidden-by-js' classes.
 */
const psShowHide = () => {
  const { show, hide } = useToggleDisplay();

  document.querySelectorAll('.ps-shown-by-js').forEach(show);
  document.querySelectorAll('.ps-hidden-by-js').forEach(hide);
};

export default psShowHide;
