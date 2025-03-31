import { LitElement, html, css, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import styles from './card-output.css?inline';

export class CardComponent extends LitElement {
  @property({ type: String }) alertMessage = "Nuevo Mensaje!";
  @property({ type: String }) message =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
  @property({ type: String }) readText = "Ver";
  @property({ type: String }) markText = "Marcar como leído";
  @property({ type: String }) readLink = "#";
  @property({ type: String }) markLink = "#";

  static styles = css`${unsafeCSS(styles)}`;

  render() {
    return html`
      <div class="card">
        <div class="card__header">
          <span class="card__icon">
            <svg class="card__icon-svg" fill="currentColor" viewBox="0 0 20 20">
              <path clip-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fill-rule="evenodd"></path>
            </svg>
          </span>
          <p class="card__alert-message">
            ${this.alertMessage}
          </p>
        </div>
        <p class="card__message">
          ${this.message}
        </p>
        <div class="card__actions">
          <a class="card__link card__link--primary" href="${this.readLink}">
            ${this.readText}
          </a>
          <a class="card__link card__link--secondary" href="${this.markLink}">
            ${this.markText}
          </a>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("card-component")) {
  customElements.define("card-component", CardComponent);
}
