import { number } from '../utils/format'
import { t } from '../i18n'

export default (cart) => (
  <div class="products">
    {cart.allProducts().map((curr) => (
      <article class="product">
        <figure class="product__figure">
          <a href="#">
            <svg class="image" viewBox="0 0 1 1"></svg>
          </a>
        </figure>
        <div class="product__info">
          <h1>
            <a class="ul:hover" href="#">
              {curr.name}
            </a>
          </h1>
        </div>
        <div class="product__price">
          <div class="product__remove">
            <button
              class="button product__remove__button"
              aria-label="Remove Product"
              onclick={(e) => {
                e.preventDefault()
                cart.removeProduct(curr)
                cart.render()
              }}
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
              >
                <line x1="7" y1="9" x2="17" y2="9" />
                <line x1="12" y1="11" x2="12" y2="15" />
                <polygon points="9,9 9,17 15,17 15,9" fill="none" />
                <polygon points="10,9 11,7 13,7 14,9" fill="none" />
              </svg>
            </button>
          </div>
          <div class="product__price__total">{number(curr.total, 2)}</div>
          {curr.count > 1 && (
            <div class="product__price__unit">
              {t('price.unit', number(curr.price, 2))}
            </div>
          )}
        </div>
        <div class="product__actions">
          <div class="product__count">
            <button
              class="button product__count__decrease"
              aria-label="Decrease Count"
              onclick={(e) => {
                e.preventDefault()
                cart.decreaseProductCount(curr)
                cart.render()
              }}
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
              >
                <line x1="7" y1="12" x2="17" y2="12" />
              </svg>
            </button>
            <div class="product__count__value">{number(curr.count)}</div>
            <button
              class="button product__count__increase"
              aria-label="Increase Count"
              onclick={(e) => {
                e.preventDefault()
                cart.increaseProductCount(curr)
                cart.render()
              }}
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
              >
                <line x1="7" y1="12" x2="17" y2="12" />
                <line y1="7" x1="12" y2="17" x2="12" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    ))}
  </div>
)
