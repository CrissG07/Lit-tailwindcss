import { LitElement, html, css, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import styles from "./card-img-output.css?inline";

export class CardImgComponent extends LitElement {
  @property({ type: String }) img = "https://picsum.photos/800/400?random=2";
  @property({ type: String }) title = "Producto";
  @property({ type: String }) description =
    "Descripción del producto que está en venta con su información clara";
  @property({ type: String }) label = "Comprar";
  @property({ type: Number }) price = 100000;
  @property({ type: Boolean }) reversed = false;

  static styles = css`${unsafeCSS(styles)}`;

  render() {
    return html`
      <div class="card-img">
        <div class="card-img__image">
          <img src="${this.img}" alt="${this.title}" />
        </div>
        <div class="card-img__content">
          <div class="card-img__title">${this.title}</div>
          <p class="card-img__description">${this.description}</p>
          <div class="card-img__footer ${this.reversed ? 'card-img__footer--reversed' : ''}">
            <span class="card-img__price">$${this.price}</span>
            <button class="card-img__button">
              <svg class="card-img__icon" viewBox="0 0 24 24">
                <path
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  stroke="currentColor" stroke-width="1.5" fill="none"
                  stroke-linejoin="round" stroke-linecap="round"
                />
              </svg>
              <span>${this.label}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("card-img")) {
  customElements.define("card-img", CardImgComponent);
}
