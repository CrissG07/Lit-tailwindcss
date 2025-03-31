import { LitElement, html,css,unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import styles from './message-output.css?inline';

export class Message extends LitElement {

  static styles = css`${unsafeCSS(styles)}`

    @property({ type: String }) title = "Success!";
    @property({ type: String }) message = "The post has been published.";
    @property({ type: String }) color = "#66cdaa";
    @property({ type: String }) type = "blue";

    render() {
        return html`
<div role="alert" class="alert alert--${this.type}">
  <svg
    stroke="${this.color}"
    viewBox="0 0 24 24"
    fill="none"
    class="alert__icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    ></path>
  </svg>
  <p class="alert__message">
    ${this.title} - ${this.message}
  </p>
</div>


    `;
    }
}

customElements.define("notification-component", Message);
