import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import styles from "./items-output.css?inline";

@customElement("items-component")
export class ItemsComponents extends LitElement {
  static readonly styles = css`${unsafeCSS(styles)}`;

  @property({ type: String }) title = "Gran video";
  @property({ type: String }) views = "1.2M views";
  @property({ type: String }) color = "blue";
  @property({ type: String }) date = new Date().toISOString().split('T')[0];
  @property({ type: String }) icon = "";
  @property({ type: Boolean }) clickable = true;
  @property({ type: String }) href = "";

  @state() private isHovered = false;
  @state() private isPressed = false;

  private get formattedDate(): string {
    try {
      const parsedDate = new Date(this.date);
      if (isNaN(parsedDate.getTime())) throw new Error('Fecha inválida');
      
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric"
      };
      return new Intl.DateTimeFormat("es-ES", options).format(parsedDate);
    } catch (error) {
      console.warn('Error al formatear fecha:', error);
      return this.date;
    }
  }

  private handleClick(e: MouseEvent) {
    if (!this.clickable) return;
    
    if (this.href) {
      e.preventDefault();
      window.location.href = this.href;
    }
    
    this.dispatchEvent(new CustomEvent('item-click', {
      detail: {
        title: this.title,
        date: this.date,
        views: this.views
      },
      bubbles: true,
      composed: true
    }));
  }

  private handleMouseEnter() {
    if (this.clickable) this.isHovered = true;
  }

  private handleMouseLeave() {
    this.isHovered = false;
    this.isPressed = false;
  }

  private handleMouseDown() {
    if (this.clickable) this.isPressed = true;
  }

  private handleMouseUp() {
    this.isPressed = false;
  }

  private renderIcon() {
    if (!this.icon) return null;
    return html`<div class="items__icon">${unsafeHTML(this.icon)}</div>`;
  }

  render() {
    const cardClasses = {
      'items__card': true,
      'items__card--hoverable': this.clickable,
      'items__card--hovered': this.isHovered,
      'items__card--pressed': this.isPressed
    };

    const content = html`
      <div class="${classMap(cardClasses)}"
           @click=${this.handleClick}
           @mouseenter=${this.handleMouseEnter}
           @mouseleave=${this.handleMouseLeave}
           @mousedown=${this.handleMouseDown}
           @mouseup=${this.handleMouseUp}>
        <div class="items__thumbnail items__thumbnail--${this.color}">
          ${this.renderIcon()}
        </div>
        <div class="items__content">
          <h2 class="items__title">${this.title}</h2>
          <div class="items__meta">
            <div class="items__views">${this.views}</div>
            <div class="items__date">${this.formattedDate}</div>
          </div>
        </div>
      </div>
    `;

    return this.href
      ? html`<a href=${this.href} class="items">${content}</a>`
      : html`<div class="items">${content}</div>`;
  }
}