import { t } from '../i18n'
import renderProducts from './products'
import renderSummary from './summary'
import renderEmpty from './empty'

export default (cart, state) => (
  <div class="container">
    <div class="header">
      <div class="close">
        <button
          class="button close__button"
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
      <h1 class="header__title">{t('caption.basket')}</h1>
    </div>
    {cart.hasProducts()
      ? [renderProducts(cart, state), renderSummary(cart, state)]
      : renderEmpty(cart, state)}
  </div>
)
