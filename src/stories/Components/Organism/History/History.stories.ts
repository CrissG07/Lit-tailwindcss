import type { Meta, StoryObj } from '@storybook/web-components';
import './History';
import '../../Molecules/Items/items';

const meta: Meta<{ title: string, items: Array<{ title: string, color: string, views: string, date: Date }> }> = {
  title: "Organism/History",
  component: "history-component",
  argTypes: {
    title: { control: "text" },
    items: {
      control: "object",
      description: "Array de items con propiedades dinámicas (title, color, views, date)"
    }
  }
};
export default meta;

type Story = StoryObj<{ title: string, items: Array<{ title: string, color: string, views: string, date: Date }> }>;

// Historia de ejemplo con la propiedad 'date' incluida en cada item
export const OnlyFour: Story = {
  args: {
    title: "Historial",
    items: [
      { title: "Video tutorial de Storybook", color: "blue", views: "1M views", date: new Date("2000-11-20") },
      { title: "Otra clase de Storybook", color: "green", views: "3M views", date: new Date("2001-05-15") },
      { title: "Componente avanzado", color: "yellow", views: "500K views", date: new Date("2022-07-11") },
      { title: "Instalación básica", color: "red", views: "2M views", date: new Date("2019-03-22") }
    ]
  }
};

export const OnlyTwo: Story = {
  args: {
    title: "Historial de música",
    items: [
      { title: "Queen – Bohemian Rhapsody", color: "yellow", views: "1890M views", date: new Date("1975-10-31") },
      { title: "JESSE & JOY – ¡Corre! (Video Oficial)", color: "green", views: "1065M views", date: new Date("2020-02-10") },
    ]
  }
};
