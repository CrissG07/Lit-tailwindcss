import type { Meta, StoryObj } from '@storybook/web-components';
import './Analytics'; 

const meta: Meta<{ label: string, title: string,disabled:boolean }> = {
    title: "Molecule/Analytic",
    component: "analytics-component",
    argTypes: {
        title: { control: "text" },
        label: { control: "text" }, 
        disabled: { control: "boolean" }, 

    }
};
export default meta;
type Story = StoryObj<{ label: string, title: string,disabled:boolean }>;

// Definir la historia de ejemplo
export const Analitic: Story = {
    args: {
        title: "Analísis de rendimiento",
        label: "Más detalles",
        disabled: false,
    }
};
