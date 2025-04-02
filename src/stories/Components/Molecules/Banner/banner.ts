import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from './banner-output.css?inline';

/**
 * @element banner-component
 * @description Un componente de banner flexible con imagen y texto
 * @prop {String} imageSrc - URL de la imagen a mostrar
 * @prop {String} imageAlt - Texto alternativo para la imagen
 * @prop {String} title - Título del banner
 * @prop {String} description - Descripción o texto secundario del banner
 * @prop {String} imagePosition - Posición de la imagen ('left' o 'right')
 * @prop {String} theme - Tema de color ('light', 'dark', o 'emerald')
 * @prop {Boolean} rounded - Si el banner debe tener bordes redondeados
 * @prop {String} contentRatio - Porcentaje del ancho para el contenido (ej: '60')
 * @slot cta - Slot para botones o llamadas a la acción
 */
@customElement("banner-component")
export class BannerComponent extends LitElement {
  // Propiedades públicas
  @property({ type: String }) imageSrc = "https://picsum.photos/800/400?random=1";
  @property({ type: String }) imageAlt = "Imagen de banner";
  @property({ type: String }) title = "La Belleza de los Paisajes";
  @property({ type: String }) description =
    "Los paisajes naturales ofrecen una sensación de tranquilidad y asombro. Desde las montañas nevadas hasta los valles verdes, cada rincón del mundo nos regala vistas inolvidables que nos conectan con la naturaleza.";
  @property({ type: String }) imagePosition = "left";
  @property({ type: String }) theme = "emerald"; // light, dark, emerald
  @property({ type: Boolean }) rounded = true;
  @property({ type: String }) contentRatio = "50"; // Porcentaje para el contenido

  // Estados internos
  @state() private imageStatus = "loading"; // loading, loaded, error
  @state() private isMobile = false;

  static styles = css`${unsafeCSS(styles)}`;

  constructor() {
    super();
    this._checkResponsive = this._checkResponsive.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadImage();
    window.addEventListener('resize', this._checkResponsive);
    this._checkResponsive();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._checkResponsive);
  }

  firstUpdated() {
    console.log("BannerComponent montado en el DOM");
  }

  private _checkResponsive() {
    // Detectar si estamos en vista móvil (< 768px)
    this.isMobile = window.innerWidth < 768;
    this.requestUpdate();
  }

  private _loadImage() {
    this.imageStatus = "loading";
    const img = new Image();
    img.src = this.imageSrc;
    
    img.onload = () => {
      this.imageStatus = "loaded";
      this.requestUpdate();
    };
    
    img.onerror = () => {
      this.imageStatus = "error";
      this.requestUpdate();
      console.error(`Error al cargar la imagen: ${this.imageSrc}`);
    };
  }

  updated(changedProperties) {
    if (changedProperties.has('imageSrc')) {
      this._loadImage();
    }
  }

  // Renderizar la imagen con estados de carga/error
  renderImage() {
    const imageClasses = `banner__image ${this.rounded ? 'banner__image--rounded' : ''}`;
    
    return html`
      <div class="${imageClasses}">
        ${this.imageStatus === "loading" 
          ? html`<div class="banner__loading-indicator" aria-label="Cargando imagen">
                    <span class="loader"></span>
                 </div>` 
          : this.imageStatus === "error"
            ? html`<div class="banner__error" aria-label="Error al cargar la imagen">
                    <span>⚠️</span>
                    <p>No se pudo cargar la imagen</p>
                  </div>`
            : html`<img src="${this.imageSrc}" alt="${this.imageAlt}" />`
        }
      </div>
    `;
  }

  // Renderizar el contenido de texto
  renderContent() {
    return html`
      <div class="banner__content">
        <h2 class="banner__title">${this.title}</h2>
        <p class="banner__description">${this.description}</p>
        <slot name="cta"></slot>
      </div>
    `;
  }

  render() {
    // Construir las clases CSS para el contenedor
    const containerClass = `banner__container 
                           banner__container--${this.theme} 
                           ${this.rounded ? 'banner__container--rounded' : ''}
                           ${this.isMobile ? 'banner__container--mobile' : ''}`;

    // Estilo personalizado para la relación de tamaño
    const containerStyle = !this.isMobile ? 
      `--content-ratio: ${this.contentRatio}%` : '';

    // En móvil, siempre ponemos la imagen arriba y el contenido abajo
    if (this.isMobile) {
      return html`
        <div class="${containerClass}" style="${containerStyle}">
          ${this.renderImage()}
          ${this.renderContent()}
        </div>
      `;
    }

    // En desktop, respetamos la posición configurada
    return html`
      <div class="${containerClass}" style="${containerStyle}">
        ${this.imagePosition === "right"
          ? html`${this.renderContent()}${this.renderImage()}`
          : html`${this.renderImage()}${this.renderContent()}`
        }
      </div>
    `;
  }
}