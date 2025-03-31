// src/components/molecules/SearchForm.ts
import { LitElement, html,css,unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import "../../Atoms/ButtonComponent/ButtonComponent";
import styles from './search-output.css?inline';


export class SearchForm extends LitElement {

  static styles = css`${unsafeCSS(styles)}`

  @property({ type: String }) placeholder = "Search...";
  @property({ type: String }) variant: "primary" | "secondary" | "danger" = "primary"
  @property({ type: String }) label = "Buscar";
  @property({ type: Boolean }) isButtonRight = false;

  render() {
    return html`
      <div class="search">
        ${this.isButtonRight
          ? html`
              <input 
                type="text" 
                class="search__input"
                placeholder=${this.placeholder}
              >
              <button-component
                .label=${this.label}
                .variant=${this.variant}
                size="medium"
              ></button-component>
            `
          : html`
              <button-component
                .label=${this.label}
                .variant=${this.variant}
                size="medium"
              ></button-component>
              <input 
                type="text" 
                class="search__input"
                placeholder=${this.placeholder}
              >
            `}
      </div>
    `;
  }
}

customElements.define("ui-search-form", SearchForm);