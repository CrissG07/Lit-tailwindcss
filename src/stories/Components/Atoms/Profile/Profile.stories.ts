import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import './Profile'; // Asegúrate de importar el componente

const meta: Meta = {
  title: 'Atoms/Profile',  // Nombre del componente en Storybook
  component: 'profile-picture',
  tags: ['autodocs'],
  argTypes: {
    img: { control: 'text' },
    size: {
        control: "select",
        options: ["small", "medium", "large"],
    },
  },
};

export default meta;

type Story = StoryObj;

// Historia para el tamaño pequeño
export const Small: Story = {
  args: {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTslEmoU9j6xFyKqmwNPnsYbHRgmYw-SiuX1w&s',
    size: 'small',
  },
  render: (args) => html`
    <profile-picture 
      img="${args.img}" 
      size="${args.size}">
    </profile-picture>
  `,
};

// Historia para el tamaño mediano
export const Medium: Story = {
  args: {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTslEmoU9j6xFyKqmwNPnsYbHRgmYw-SiuX1w&s',
    size: 'medium',
  },
  render: (args) => html`
    <profile-picture 
      img="${args.img}" 
      size="${args.size}">
    </profile-picture>
  `,
};

// Historia para el tamaño grande
export const Large: Story = {
  args: {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTslEmoU9j6xFyKqmwNPnsYbHRgmYw-SiuX1w&s',
    size: 'large',
  },
  render: (args) => html`
    <profile-picture 
      img="${args.img}" 
      size="${args.size}">
    </profile-picture>
  `,
};
