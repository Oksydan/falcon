import DOMReady from '../utils/DOMReady';
import useBootstrapComponentDynamicImport from '../utils/dynamicImports/useBootstrapComponentDynamicImport';

DOMReady(() => {
  /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "import" }] */

  const { init: initDynamicImportForModal } = useBootstrapComponentDynamicImport(
    () => [
      import('bootstrap/js/src/modal'),
      import('@css/dynamic/modal/_index.scss'),
    ],
    {
      events: [
        {
          name: 'click',
          selector: '[data-bs-toggle="modal"]',
        },
      ],
      componentName: 'Modal',
    },
  );

  initDynamicImportForModal();

  // const modal = new bootstrap.Modal('#testModal', {
  //   keyboard: false,
  // });
  //
  // const handleTestModal = () => {
  //   modal.toggle();
  //   console.log('toggle');
  //   setTimeout(handleTestModal, 4000);
  // }
  //
  // handleTestModal();

  const { init: initDynamicImportForOffcanvas } = useBootstrapComponentDynamicImport(
    () => [
      import('bootstrap/js/src/offcanvas'),
      import('@css/dynamic/offcanvas/_index.scss'),
    ],
    {
      events: [
        {
          name: 'click',
          selector: '[data-bs-toggle="offcanvas"]',
        },
      ],
      componentName: 'Offcanvas',
    },
  );

  initDynamicImportForOffcanvas();

  const { init: initDynamicImportForDropdown } = useBootstrapComponentDynamicImport(
    () => [
      import('bootstrap/js/src/dropdown'),
      import('@css/dynamic/dropdown/_index.scss'),
    ],
    {
      events: [
        {
          name: 'click',
          selector: '[data-bs-toggle="dropdown"]',
        },
      ],
      componentName: 'Dropdown',
    },
  );

  initDynamicImportForDropdown();

  const { init: initDynamicImportForCollapse } = useBootstrapComponentDynamicImport(
    () => [
      import('bootstrap/js/src/collapse'),
    ],
    {
      events: [
        {
          name: 'click',
          selector: '[data-bs-toggle="collapse"]',
        },
      ],
      componentName: 'Collapse',
    },
  );

  initDynamicImportForCollapse();

  const { init: initDynamicImportForPopover } = useBootstrapComponentDynamicImport(
    () => [
      import('bootstrap/js/src/popover'),
      import('@css/dynamic/popover/_index.scss'),
    ],
    {
      componentName: 'Popover',
      events: [
        {
          name: 'click',
          selector: '[data-bs-toggle="popover"]',
        },
      ],
    },
  );

  initDynamicImportForPopover();

  const { init: initDynamicImportForToast } = useBootstrapComponentDynamicImport(
    () => [
      import('bootstrap/js/src/toast'),
      import('@css/dynamic/toast/_index.scss'),
    ],
    {
      componentName: 'Toast',
    },
  );

  initDynamicImportForToast();

  const { init: initDynamicImportForTooltip } = useBootstrapComponentDynamicImport(
    () => [
      import('bootstrap/js/src/tooltip'),
      import('@css/dynamic/tooltip/_index.scss'),
    ],
    {
      componentName: 'Tooltip',
      events: [
        {
          name: 'mouseenter',
          selector: '[data-bs-toggle="tooltip"]',
        },
      ],
    },
  );

  initDynamicImportForTooltip();
});
