import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./banner.ts"; // Asegúrate de importar el componente

const meta: Meta = {
  title: "Molecule/Banner",
  component: "banner-component",
  tags: ["autodocs"],
  argTypes: {
    imageSrc: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    imagePosition: { control: "radio", options: ["left", "right"] },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    imageSrc: "https://picsum.photos/800/400?random=1",
    title: "La Belleza Infinita de los Paisajes Naturales",
    description:
      "Los paisajes naturales nos regalan vistas impresionantes que reflejan la majestuosidad del mundo. Desde imponentes montañas cubiertas de nieve hasta extensas playas de arena dorada, cada rincón del planeta esconde una maravilla única. Los bosques frondosos, los desiertos de tonos cálidos y los ríos cristalinos crean escenarios que nos invitan a la contemplación y la aventura.",
    imagePosition: "left",
  },
  render: (args) => html`
    <banner-component
      .imageSrc=${args.imageSrc}
      .title=${args.title}
      .description=${args.description}
      .imagePosition=${args.imagePosition}
    ></banner-component>
  `,
};
