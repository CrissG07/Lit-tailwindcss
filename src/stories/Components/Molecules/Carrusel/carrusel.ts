class CarouselComponent extends HTMLElement {
  private images: string[] = [];
  private currentIndex: number = 0;
  private intervalId: number | null = null;

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.render();
    this.autoSlide();
  }

  disconnectedCallback(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }

  set imagesList(value: string[]) {
    this.images = value;
    this.render();
  }

  private render(): void {
    this.innerHTML = `
      <div class="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
        <div class="carousel relative flex">
          ${this.images
            .map(
              (src, index) => `
              <img src="${src}" class="w-full transition-opacity duration-500 ${
                index === 0 ? "opacity-100" : "opacity-0 absolute"
              }" />
            `
            )
            .join("")}
        </div>
        <button id="prev" class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full">
          ❮
        </button>
        <button id="next" class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full">
          ❯
        </button>
      </div>
    `;

    const prevButton = this.querySelector("#prev") as HTMLElement;
    const nextButton = this.querySelector("#next") as HTMLElement;

    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => this.showSlide(this.currentIndex - 1));
      nextButton.addEventListener("click", () => this.showSlide(this.currentIndex + 1));
    }
  }

  private showSlide(index: number): void {
    const images = this.querySelectorAll(".carousel img");
    if (images.length === 0) return;

    images[this.currentIndex].classList.replace("opacity-100", "opacity-0");
    images[this.currentIndex].classList.add("absolute");

    this.currentIndex = (index + this.images.length) % this.images.length;

    images[this.currentIndex].classList.replace("opacity-0", "opacity-100");
    images[this.currentIndex].classList.remove("absolute");
  }

  private autoSlide(): void {
    this.intervalId = setInterval(() => this.showSlide(this.currentIndex + 1), 3000);
  }
}

customElements.define("carousel-component", CarouselComponent);
