// stories/molecules/SearchForm.stories.ts
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./SearchForm";

const meta: Meta = {
  title: "Molecule/SearchForm",
  component: "ui-search-form",
  tags:['autodocs'],
  argTypes: {
    placeholder: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"]
    },
    label: { control: "text" },
    isButtonRight: { control: "boolean" }
  },
  parameters: {
    layout: "centered"
  }
};

export default meta;

// 🔥 Corrección clave: Usar la función html de Lit
const Template = (args) => html`
  <ui-search-form
    placeholder=${args.placeholder}
    .variant=${args.variant}
    .label=${args.label}
    ?isButtonRight=${args.isButtonRight}
  ></ui-search-form>
`;

type Story = StoryObj;

export const Default: Story = {
  render: Template,
  args: {
    placeholder: "Search...",
    variant: "primary",
    label: "Search",
    isButtonRight: true
  }
};

export const ButtonLeft: Story = {
  render: Template,
  args: {
    ...Default.args,
    isButtonRight: false
  }
};