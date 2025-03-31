import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./Card"; // Asegúrate de importar el componente
const meta: Meta = {
  title: "Molecule/Card",
  component: "card-component",
  argTypes: {
    alertMessage: { control: "text" },
    message: { control: "text" },
    readText: { control: "text" },
    markText: { control: "text" },
    readLink: { control: "text" },
    markLink: { control: "text" },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    alertMessage: "Nuevo Mensaje!",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac eros at metus tincidunt tincidunt.",
    readText: "Ver más",
    markText: "Marcar como leido",
    readLink: "#",
    markLink: "#",
  },
  render: (args) => html`
    <card-component
      alertMessage=${args.alertMessage}
      message=${args.message}
      readText=${args.readText}
      markText=${args.markText}
      readLink=${args.readLink}
      markLink=${args.markLink}
    ></card-component>
  `,
};
