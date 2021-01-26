import { t } from '../i18n'

export default (cart) => (
  <div class="emptycart">
    <p>{t('cart.empty')}</p>
    <p>
      <a
        class="ul"
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
