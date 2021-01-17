import { number } from '../utils/format'
import { t } from '../i18n'
import renderProduct from './product'
import { handleCheckout } from '../actions/checkout'

export default (cart, state) => (
  <form
    class="cart__form"
    method="post"
    onsubmit={(e) => {
      e.preventDefault()
      handleCheckout(cart, state)
    }}
  >
    <div class="cart__products">
      {cart.allProducts().map((curr) => renderProduct(curr, cart, state))}
    </div>
    <div class="cart__summary">
      <div class="cart__dl">
        <div class="cart__dt">{t('caption.total')}</div>
        <div class="cart__dd">
          {t('price.currency', number(cart.productsTotal(), 2))}
        </div>
      </div>
      <div>
        <button
          type="submit"
          class={[
            'cart__button',
            'cart__button--primary',
            state.sending && 'cart__button--loading',
          ]}
          disabled={state.sending}
        >
          <span class="cart__button__label">{t('caption.checkout')}</span>
          <span class="cart__button__loader"></span>
        </button>
      </div>
    </div>
  </form>
)
