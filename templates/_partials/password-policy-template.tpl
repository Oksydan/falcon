<template id="password-feedback">
  <div
    class="password-strength-feedback mt-1"
    style="display: none;"
  >
    <div class="progress-container">
      <div class="progress mb-1">
        <div class="progress-bar" role="progressbar" value="50" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
    <script type="text/javascript" class="js-hint-password">
      {if !empty($page['password-policy']['feedbacks'])}
        {$page['password-policy']['feedbacks']|@json_encode nofilter}
      {/if}
    </script>

    <div class="password-strength-text"></div>
    <div class="password-requirements">
      <p class="password-requirements-length font-sm d-flex align-items-center my-2" data-translation="{l s='Enter a password between %s and %s characters' d='Shop.Theme.Customeraccount'}">
        <i class="material-icons mr-1 font-size-lg">check_circle</i>
        <span></span>
      </p>
      <p class="password-requirements-score font-sm d-flex align-items-center my-2" data-translation="{l s='The minimum score must be: %s' d='Shop.Theme.Customeraccount'}">
        <i class="material-icons mr-1 font-size-lg">check_circle</i>
        <span></span>
      </p>
    </div>
  </div>
</template>
