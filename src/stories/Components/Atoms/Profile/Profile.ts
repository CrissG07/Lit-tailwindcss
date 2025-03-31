import { css, html, LitElement, unsafeCSS } from "lit";

import { property } from "lit/decorators.js";

import styles from './profile-output.css?inline';


export class ProfilePicture extends LitElement {
  static styles = css`${unsafeCSS(styles)}`

  @property({ type: String }) img = "https://i.imgur.com/0qYl6rA.jpg"; // Imagen de ejemplo
  @property({ type: String }) size = "medium";


  render() {
    return html`
      <div class="profile-picture__container">
        <img
          src="${this.img}"
          alt="Profile Picture"
          class="profile-picture__image ${this.size}"
        />
      </div>
    `;
  }
}

if (!customElements.get("profile-picture")) {
  customElements.define("profile-picture", ProfilePicture);
}