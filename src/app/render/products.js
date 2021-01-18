import { number } from '../utils/format'
import { t } from '../i18n'
import renderProduct from './product'
import { handleCheckout } from '../actions/checkout'

export default (cart, state) => (
  <form
    class="form"
    method="post"
    onsubmit={(e) => {
      e.preventDefault()
      handleCheckout(cart, state)
    }}
  >
    <div class="products">
      {cart.allProducts().map((curr) => renderProduct(curr, cart, state))}
    </div>
    <div class="summary">
      <div class="dl">
        <div class="dt">{t('caption.total')}</div>
        <div class="dd">
          {t('price.currency', number(cart.productsTotal(), 2))}
        </div>
      </div>
      <div>
        <button
          type="submit"
          class={[
            'button',
            'button--primary',
            state.sending && 'button--loading',
          ]}
          disabled={state.sending}
        >
          <span class="button__label">{t('caption.checkout')}</span>
          <span class="button__loader"></span>
        </button>
      </div>
    </div>
  </form>
)
