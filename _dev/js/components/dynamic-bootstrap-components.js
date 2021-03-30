import DynamicImportHandler from '../utils/DynamicImportHandler';

$(() => {
  const importModal = new DynamicImportHandler({
    jqueryPluginCover: 'modal',
    DOMEvents: 'click',
    DOMEventsSelector: '[data-toggle="modal"]',
    DOMEventsPreventDefault: true,
    files: () => [
      import('bootstrap/js/src/modal.js'),
      import('../../css/dynamic/modal/_index.scss'),
    ],
  });

  const importDropdown = new DynamicImportHandler({
    jqueryPluginCover: 'dropdown',
    DOMEvents: 'click',
    DOMEventsSelector: '[data-toggle="dropdown"]',
    DOMEventsPreventDefault: true,
    files: () => [
      import('bootstrap/js/src/dropdown.js'),
      import('../../css/dynamic/dropdown/_index.scss'),
    ],
  });

  const importCollapse = new DynamicImportHandler({
    jqueryPluginCover: 'collapse',
    DOMEvents: 'click',
    DOMEventsSelector: '[data-toggle="collapse"]',
    DOMEventsPreventDefault: true,
    files: () => [
      import('bootstrap/js/src/collapse.js'),
    ],
  });

  const importPopover = new DynamicImportHandler({
    jqueryPluginCover: 'popover',
    files: () => [
      import('bootstrap/js/src/popover.js'),
      import('../../css/dynamic/popover/_index.scss'),
    ],
  });

  const importScrollspy = new DynamicImportHandler({
    jqueryPluginCover: 'scrollspy',
    files: () => [
      import('bootstrap/js/src/scrollspy.js')
    ],
  });

  const importToast = new DynamicImportHandler({
    jqueryPluginCover: 'toast',
    files: () => [
      import('bootstrap/js/src/toast.js'),
      import('../../css/dynamic/toast/_index.scss'),
    ],
  });
})
