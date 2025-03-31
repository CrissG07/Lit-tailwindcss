import { LitElement, html, css, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import styles from './banner-output.css?inline';

export class BannerComponent extends LitElement {
  @property({ type: String }) imageSrc = "https://picsum.photos/800/400?random=1";
  @property({ type: String }) title = "La Belleza de los Paisajes";
  @property({ type: String }) description =
    "Los paisajes naturales ofrecen una sensación de tranquilidad y asombro. Desde las montañas nevadas hasta los valles verdes, cada rincón del mundo nos regala vistas inolvidables que nos conectan con la naturaleza.";
  @property({ type: String }) imagePosition = "left";

  static styles = css`${unsafeCSS(styles)}`


  render() {
    const isImageRight = this.imagePosition === "right";

    return html`
      <div class="banner__container">
        ${isImageRight
          ? html`
              <div class="banner__content">
                <h2 class="banner__title">${this.title}</h2>
                <p class="banner__description">${this.description}</p>
              </div>
              <div class="banner__image">
                <img src="${this.imageSrc}" alt="Paisaje hermoso">
              </div>
            `
          : html`
              <div class="banner__image">
                <img src="${this.imageSrc}" alt="Paisaje hermoso">
              </div>
              <div class="banner__content">
                <h2 class="banner__title">${this.title}</h2>
                <p class="banner__description">${this.description}</p>
              </div>
            `}
      </div>
    `;
  }
}

if (!customElements.get("banner-component")) {
  customElements.define("banner-component", BannerComponent);
}