import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from './login-output.css?inline';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

/**
 * @element login-component
 * @description Componente de inicio de sesión con validación y gestión de estado
 * @prop {String} title - Título del formulario
 * @prop {String} titleHighlight - Texto resaltado del título
 * @prop {String} theme - Tema de color ('light' o 'dark')
 * @prop {Boolean} rounded - Si el formulario debe tener bordes redondeados
 */
@customElement('login-component')
export class LoginComponent extends LitElement {
  // Propiedades públicas
  @property({ type: String }) title = "LOREM";
  @property({ type: String }) titleHighlight = "IPSUM";
  @property({ type: String }) theme = "dark";
  @property({ type: Boolean }) rounded = true;

  // Estados internos
  @state() private showPassword = false;
  @state() private formData: LoginFormData = {
    email: '',
    password: '',
    remember: false
  };
  @state() private formErrors: Partial<LoginFormData> = {};

  static styles = css`${unsafeCSS(styles)}`;

  private togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const { name, value, type, checked } = input;
    
    this.formData = {
      ...this.formData,
      [name]: type === 'checkbox' ? checked : value
    };

    // Limpiar error cuando el usuario empieza a escribir
    if (this.formErrors[name as keyof LoginFormData]) {
      this.formErrors = {
        ...this.formErrors,
        [name]: undefined
      };
    }
  }

  private validateForm(): boolean {
    const errors: Partial<LoginFormData> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(this.formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!this.formData.password) {
      errors.password = 'Password is required';
    } else if (this.formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    this.formErrors = errors;
    return Object.keys(errors).length === 0;
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    try {
      // Aquí iría la lógica de autenticación
      console.log('Form submitted:', this.formData);
      
      // Ejemplo de llamada a API
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(this.formData)
      // });
      
      // Dispatch event on successful login
      this.dispatchEvent(new CustomEvent('login-success', {
        detail: { email: this.formData.email },
        bubbles: true,
        composed: true
      }));
    } catch (error) {
      console.error('Login error:', error);
      this.dispatchEvent(new CustomEvent('login-error', {
        detail: { error },
        bubbles: true,
        composed: true
      }));
    }
  }

  private renderHeader() {
    return html`
      <div class="login__header">
        <h2 class="login__title">
          ${this.title} 
          <span class="login__title-highlight">${this.titleHighlight}</span>
        </h2>
      </div>
    `;
  }

  private renderPasswordToggle() {
    return html`
      <button 
        type="button" 
        @click=${this.togglePasswordVisibility} 
        class="login__toggle-password"
        aria-label=${this.showPassword ? 'Hide password' : 'Show password'}
      >
        <span class="iconify" data-icon=${this.showPassword ? 'mdi:eye-off' : 'mdi:eye'}></span>
      </button>
    `;
  }

  render() {
    const containerClass = `login__container 
                          login__container--${this.theme} 
                          ${this.rounded ? 'login__container--rounded' : ''}`;

    return html`
      <div class="login">
        ${this.renderHeader()}
        <div class="${containerClass}">
          <form class="login__form" @submit=${this.handleSubmit}>
            <div class="login__form-header">
              <h3 class="login__form-title">Log In</h3>
            </div>

            <div class="login__form-group">
              <label class="login__label" for="email">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                .value=${this.formData.email}
                @input=${this.handleInputChange}
                class="login__input ${this.formErrors.email ? 'login__input--error' : ''}"
                placeholder="Enter your email"
                autocomplete="email"
                required
              >
              ${this.formErrors.email ? html`
                <span class="login__error-message">${this.formErrors.email}</span>
              ` : ''}
            </div>

            <div class="login__form-group">
              <label class="login__label" for="password">Password</label>
              <div class="login__password-container">
                <input 
                  type=${this.showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  .value=${this.formData.password}
                  @input=${this.handleInputChange}
                  class="login__input ${this.formErrors.password ? 'login__input--error' : ''}"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  required
                >
                ${this.renderPasswordToggle()}
              </div>
              ${this.formErrors.password ? html`
                <span class="login__error-message">${this.formErrors.password}</span>
              ` : ''}
            </div>

            <div class="login__remember">
              <label class="login__checkbox-label">
                <input 
                  type="checkbox"
                  name="remember"
                  .checked=${this.formData.remember}
                  @change=${this.handleInputChange}
                  class="login__checkbox"
                >
                <span>Remember Me</span>
              </label>
            </div>

            <div class="login__actions">
              <a class="login__forgot-password" href="/forgot-password">
                Forgot your password?
              </a>
              <button type="submit" class="login__button">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
