// src/components/organisms/Header.ts
import { LitElement, html,css,unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import "../../Molecules/SearchForm/SearchForm";
import "../../Atoms/ButtonComponent/ButtonComponent";
import styles from './menu-output.css?inline';

export class Menu extends LitElement {

  readonly styles = css`${unsafeCSS(styles)}`

  @property({ type: String }) logoText = "MiApp";
  @property({ type: Boolean }) showUserMenu = false;


  render() {
    return html`
      <header class="header">
        <div class="header__container">
          <div class="header__bar">
            <div class="header__logo">
              <h1>${this.logoText}</h1>
            </div>
            <div class="header__search">
              <ui-search-form
                placeholder="Buscar..."
                variant="primary"
                label="Buscar"
              ></ui-search-form>
            </div>
            <button-component variant="primary" class="header__button btn-small"></button-component>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("ui-header", Menu);