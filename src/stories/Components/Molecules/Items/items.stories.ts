import type { Meta, StoryObj } from '@storybook/web-components';
import './items'; 

const meta: Meta<{ views: string, title: string, color: string,date:Date }> = {
    title: "Molecule/Items",
    component: "items-component",
    argTypes: {
        title: { control: "text" },
        views: { control: "text" },
        color: { 
            control: "select" ,
            options:["blue","yellow", "red","green"]}, 
        date:{control:"date"}

    }
};
export default meta;
type Story = StoryObj<{ views: string, title: string, color: string,date:Date }>;

// Definir la historia de ejemplo
export const Video: Story = {
    args: {
        title: "Primer video del canal",
        views: "12M views",
        date: new Date("1/12/2006"),
        color:"blue"
    }
};
