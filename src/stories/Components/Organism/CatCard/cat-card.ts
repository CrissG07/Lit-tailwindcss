import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from './cat-card-output.css?inline';

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

@customElement('cat-card')
export class CatCard extends LitElement {
  static styles = css`${unsafeCSS(styles)}`;

  @state() private loading: boolean = false;
  @state() private catImage: CatImage | null = null;
  @state() private error: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.fetchCatImage();
  }

  private async fetchCatImage() {
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      if (!response.ok) throw new Error('Failed to fetch cat image');
      
      const [data] = await response.json();
      this.catImage = data;
    } catch (err) {
      this.error = 'Failed to load cat image. Please try again.';
      console.error('Error fetching cat:', err);
    } finally {
      this.loading = false;
    }
  }

  private handleRefresh() {
    this.fetchCatImage();
  }

  render() {
    return html`
      <div class="cat-card">
        <div class="cat-card__content">
          ${this.loading ? html`
            <div class="cat-card__loading">
              Loading...
            </div>
          ` : this.error ? html`
            <div class="cat-card__error">
              ${this.error}
            </div>
          ` : this.catImage ? html`
            <img 
              src=${this.catImage.url} 
              alt="Random cat" 
              class="cat-card__image"
              @load=${() => this.dispatchEvent(new CustomEvent('image-loaded'))}
            />
          ` : ''}
        </div>
        
        <button 
          @click=${this.handleRefresh}
          class="cat-card__refresh"
          ?disabled=${this.loading}
        >
          New Cat
        </button>
      </div>
    `;
  }
}
