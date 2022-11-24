<template id="password-feedback">
  <div
    class="js-password-strength-feedback password-strength-feedback mt-1"
    style="display: none;"
  >
    <div class="progress-container">
      <div class="progress mb-1">
        <div class="progress-bar js-password-policy-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
    <script type="text/javascript" class="js-hint-password">
      {if !empty($page['password-policy']['feedbacks'])}
        {$page['password-policy']['feedbacks']|@json_encode nofilter}
      {/if}
    </script>

    <div class="js-password-strength-text password-strength-text"></div>
    <div class="password-requirements">
      <p class="js-password-requirements-length password-requirements-length font-sm d-flex align-items-center my-2" data-translation="{l s='Enter a password between %s and %s characters' d='Shop.Theme.Customeraccount'}">
        <i class="material-icons mr-1 font-size-lg">check_circle</i>
        <span></span>
      </p>
      <p class="js-password-requirements-score password-requirements-score font-sm d-flex align-items-center my-2" data-translation="{l s='The minimum score must be: %s' d='Shop.Theme.Customeraccount'}">
        <i class="material-icons mr-1 font-size-lg">check_circle</i>
        <span></span>
      </p>
    </div>
  </div>
</template>
