const html = require('bel')
const bus = require('../../bus')
const css = require('../../utils/css')
const {
  findProductByHash,
  increaseProductCount,
  decreaseProductCount,
  removeProduct,
} = require('../products')

module.exports = (item) => html`
  <article class=${css('product')} data-hash=${item.hash}>
    <div class=${css('row')}>
      <div class=${css('p025')}>
        <figure class="image bg-black-20" style="width: 3rem;">
          <svg viewBox="0 0 3 4"></svg>
        </figure>
      </div>
      <div class=${css('span1')}>
        <div class=${css('row', 'justify-between')}>
          <div class=${css('span1')}>
            <div class=${css('p025', 'lh')}>${item.name}</div>
            <div class=${css('row', 'items-center')}>
              <a class=${css('anchor', 'gray', 'p025', 'lh')} href="#" onclick=${e => {
                e.preventDefault()
                decreaseProductCount(item)
                cart.render()
              }}>-</a>
              ${bus.numberFormat(item.count)}
              <a class=${css('anchor', 'gray', 'p025', 'lh')} href="#" onclick=${e => {
                e.preventDefault()
                increaseProductCount(item)
                cart.render()
              }}>+</a>
            </div>
          </div>
          <div class=${css('p025', 'lh', 'ar')}>
            <div class=${css('row', 'justify-end')}>
              <a class=${css('anchor', 'gray', 'remove', 'mr025')} href="#" onclick=${e => {
                e.preventDefault()
                removeProduct(item)
                cart.render()
              }}>╳</a>
              <div class=${css('bold')}>${bus.numberFormat(item.total, 2)}</div>
            </div>
            ${item.count > 1 && html`<div class=${css('small', 'gray')}>${bus.unitFormat(bus.numberFormat(item.price, 2))}</div>` || ``}
          </div>
        </div>
      </div>
    </div>
  </article>
`

/*
function findProductByEventTarget(target) {
  return findProductByHash(target.closest('[data-hash]').dataset.hash)
}
*/
