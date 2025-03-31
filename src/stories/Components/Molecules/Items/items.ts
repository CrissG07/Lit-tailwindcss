import { LitElement, html,css ,unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./items-output.css?inline";

@customElement("items-component")
export class ItemsComponents extends LitElement {

  static styles = css`${unsafeCSS(styles)}`;

  @property({ type: String }) title = "Gran video";
  @property({ type: String }) views = "1.2M views";
  @property({ type: String }) color = "blue"; 
  @property({ type: String }) date: string = "2000-01-02"; // Se recibe como string

  private get formattedDate(): string {
    const parsedDate = new Date(this.date); // Convertir string a Date
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    return new Intl.DateTimeFormat("es-ES", options).format(parsedDate);
  }
  render() {
    return html`
      <div class="items">
        <div class="items__card">
          <div class="items__thumbnail items__thumbnail--${this.color}"></div>
          <div class="items__content">
            <h2 class="items__title">${this.title}</h2>
            <div class="items__views">${this.views}</div>
            <div class="items__date">${this.formattedDate}</div>
          </div>
        </div>
      </div>
    `;
  }

}