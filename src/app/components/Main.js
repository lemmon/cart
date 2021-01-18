import morph from 'nanomorph'
import cart from '../cart'
import render from '../render'
import state from '../state'
import style from '../../css/index.css'

export default class Main extends HTMLElement {
  constructor() {
    super()
    this._container = <div />
    this._root = this.attachShadow({ mode: 'open' })
    this._root.appendChild(<style>{style}</style>)
    this._root.appendChild(<div class="overlay" onclick={cart.hide} />)
    this._root.appendChild(this._container)
  }

  render() {
    this.toggleAttribute('open', state.open)
    morph(this._container, render(cart, state))
  }

  connectedCallback() {
    this.render()
  }
}
