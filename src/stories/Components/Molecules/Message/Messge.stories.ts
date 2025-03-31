import { Meta, StoryObj } from "@storybook/web-components";
import "./Message";

export default {
  title: "Molecule/Notification",
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    color: { control: "color" },
    type:{control:"select", options:["blue","yellow","green","red"]
    }
  },
} as Meta;

const Template = ({ title, message, color,type }: { title: string; message: string; color: string;type:string }) => {
  return `<div style="width: 100%; max-width: 400px; margin: auto;">
            <notification-component title="${title}" message="${message}" color="${color}" type="${type}"></notification-component>
          </div>`;
};

export const Success: StoryObj = Template.bind({});
Success.args = {
  title: "Success!",
  message: "El post ha sido publicado con exito",
  color: "#66cdaa",
  type:"green"
};

export const Warning: StoryObj = Template.bind({});
Warning.args = {
  title: "Warning!",
  message: "Esta acción puede tener consecuencias",
  color: "#ffcc00",
  type:"yellow"
};

export const Error: StoryObj = Template.bind({});
Error.args = {
  title: "Error!",
  message: "Algo malo esta ocurriendo.",
  color: "#ff4d4d",
  type:"red"
};

export const Info: StoryObj = Template.bind({});
Info.args = {
  title: "Info",
  message: "Este es un mensaje de informacion.",
  color: "#499de7",
  type:"blue"
};
