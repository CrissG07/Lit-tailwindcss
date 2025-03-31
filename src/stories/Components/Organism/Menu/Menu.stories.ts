// stories/organisms/Header.stories.ts
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import "./Menu";

const meta: Meta = {
  title: "Organism/Menu",
  component: "ui-header",
  argTypes: {
    logoText: { control: "text" },
    showUserMenu: { control: "boolean" }
  },
  parameters: {
    layout: "fullscreen"  // Importante para headers
  }
};

export default meta;


const Template = (args) => html`
  <ui-header
      logoText=${args.logoText}
      ?showUserMenu=${args.showUserMenu}
    ></ui-header>
`;


export const Default = Template.bind({});
Default.args = {
  logoText: "MiTienda",
  showUserMenu: true
};
