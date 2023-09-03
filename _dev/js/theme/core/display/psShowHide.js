import useToggleDisplay from '@js/theme/components/display/useToggleDisplay';

const psShowHide = () => {
  const { show, hide } = useToggleDisplay();

  document.querySelectorAll('.ps-shown-by-js').forEach(show);
  document.querySelectorAll('.ps-hidden-by-js').forEach(hide);
};

export default psShowHide;
