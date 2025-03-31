import type { Meta, StoryObj } from "@storybook/web-components";
import "./ButtonComponent";

export default {
  title: "Atoms/Button",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "big"],
    },
    disabled: { control: "boolean" },
  },
  parameters:{
    backgrounds:{
      values:[
        {name:"black", value:"#000"},
        {name:"dark", value:"#222"},
        {name:"light", value:"#ddd"},
        {name:"white", value:"#fff"},
      ]
    }
  }
} as Meta;

const Template = ({
  label,
  variant,
  size,
  disabled,
}: {
  label: string;
  variant: string;
  size: string;
  disabled: boolean;
}) => {
  return `<button-component label="${label}" variant="${variant}" size="${size}" ${
    disabled ? "disabled" : ""
  }></button-component>`;
};

export const Primary: StoryObj = Template.bind({});
Primary.args = {
  label: "Ver más",
  variant: "primary",
  size: "medium",
  disabled: false,
};

export const Secondary: StoryObj = Template.bind({});
Secondary.args = {
  label: "Botón secundario",
  variant: "secondary",
  size: "medium",
  disabled: false,
};

export const Danger: StoryObj = Template.bind({});
Danger.args = {
  label: "Botón peligro",
  variant: "danger",
  size: "medium",
  disabled: false,
};

export const Small: StoryObj = Template.bind({});
Small.args = {
  label: "Pequeño",
  variant: "primary",
  size: "small",
  disabled: false,
};

export const Big: StoryObj = Template.bind({});
Big.args = {
  label: "Grande",
  variant: "primary",
  size: "big",
  disabled: false,
};

export const Disabled: StoryObj = Template.bind({});
Disabled.args = {
  label: "Botón deshabilitado",
  variant: "primary",
  size: "medium",
  disabled: true,
};
