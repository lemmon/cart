import { t } from '../i18n'
import renderProducts from './products'

const renderEmpty = (cart) => (
  <div>
    <p>{t('cart.empty')}</p>
    <p>
      <a
        class="cart__ul"
        href="#"
        onclick={(e) => {
          e.preventDefault()
          cart.hide()
        }}
      >
        {t('action.close')}
      </a>
    </p>
  </div>
)

export default (cart, state) => (
  <div
    class={[
      'cart',
      state.open ? 'cart--open' : 'cart--closed',
      cart.hasProducts() ? 'cart--products' : 'cart--empty',
    ]}
  >
    <div class="cart__overlay" onclick={cart.hide}></div>
    <div class="cart__container">
      <div class="cart__header">
        <div class="cart__close">
          <button
            class="cart__button cart__close__button"
            aria-label="Close"
            onclick={cart.hide}
          >
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              fill="none"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y2="6" x2="18" y1="18" />
            </svg>
          </button>
        </div>
        <h1 class="cart__header__title">{t('caption.basket')}</h1>
      </div>
      <div class="cart__content">
        {cart.hasProducts()
          ? renderProducts(cart, state)
          : renderEmpty(cart, state)}
      </div>
    </div>
  </div>
)
