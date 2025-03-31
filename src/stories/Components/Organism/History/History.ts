import { LitElement, html,css,unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import '../../Molecules/Items/items';
import styles from './history-output.css?inline';

@customElement("history-component")
export class HistoryComponent extends LitElement {

  static styles = css`${unsafeCSS(styles)}`

  @property({ type: String }) title = "Historial";



  render() {
    return html`
      <div class="history">
        <h1 class="history__title">${this.title}</h1>
        <slot></slot>
      </div>
    `;
  }
}

