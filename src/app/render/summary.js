import { number } from '../utils/format'
import { t } from '../i18n'
import { handleCheckout } from '../actions/checkout'

export default (cart, state) => (
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
        onclick={() => {
          handleCheckout(cart, state)
        }}
      >
        <span class="button__label">{t('caption.checkout')}</span>
        <span class="button__loader"></span>
      </button>
    </div>
  </div>
)
