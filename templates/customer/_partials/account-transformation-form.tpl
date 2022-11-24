{block name='account_transformation_form'}
  <div class="card">
   <div class="card-header">
      <h5 class="card-title mb-0">
        {l s='Registration' d='Shop.Istheme'}
      </h5>
    </div>

    <div class="card-body">
      <h6>
        {l s='Save time on your next order, sign up now' d='Shop.Theme.Checkout'}
      </h6>
      <ul class="mb-3 font-sm">
        <li> - {l s='Personalized and secure access' d='Shop.Theme.Customeraccount'}</li>
        <li> - {l s='Fast and easy checkout' d='Shop.Theme.Customeraccount'}</li>
        <li> - {l s='Easier merchandise return' d='Shop.Theme.Customeraccount'}</li>
      </ul>
      <form method="post" class="mb-0">
        <div class="form-group">
          <label class="form-label required" for="field-email">
            {l s='Set your password:' d='Shop.Forms.Labels'}
          </label>
          <input type="password" class="form-control" data-validate="isPasswd" required name="password" value="">
        </div>
        <footer class="form-footer">
          <input type="hidden" name="submitTransformGuestToCustomer" value="1">

          <div class="text-center mt-3">
            <button class="btn btn-primary d-none d-md-inline-block" type="submit">
              {l s='Create account' d='Shop.Theme.Actions'}
            </button>
            <button class="btn btn-primary btn-block d-block d-md-none" type="submit">
              {l s='Create account' d='Shop.Theme.Actions'}
            </button>
          </div>
        </footer>
      </form>
    </div>
  </div>
{/block}
