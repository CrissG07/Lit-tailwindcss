import { css, html, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import styles from "./button-output.css?inline"; // Importación con Vite y Tailwind CSS preprocesado

export class ButtonComponent extends LitElement {
  @property({ type: String }) label = "Ver más";
  @property({ type: String }) variant = "primary";
  @property({ type: String }) size = "medium";
  @property({ type: Boolean }) disabled = false;

  static readonly styles = css`${unsafeCSS(styles)}`; // Asignación de los estilos preprocesados

  get buttonClasses() {
    return `btn-${this.size} ${this.disabled ? `btn-${this.variant}-disabled` : `btn-${this.variant}`}`;
  }

  render() {
    return html`
      <button class="${this.buttonClasses}" ?disabled=${this.disabled}>
        ${this.label}
      </button>
    `;
  }
}

if (!customElements.get("button-component")) {
  customElements.define("button-component", ButtonComponent);
}