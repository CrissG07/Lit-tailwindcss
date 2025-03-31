import "./carrusel.ts";

export default {
  title: "Molecule/Carousel",
  component: "carousel-component",
  argTypes: {
    images: { control: "array" },
  },
};

const Template = ({ images }) => {
  const element = document.createElement("carousel-component") as CarouselComponent;
  element.imagesList = images;
  return element;
};

export const Default = Template.bind({});
Default.args = {
  images: [
    "https://picsum.photos/800/400?random=1",
    "https://picsum.photos/800/400?random=2",
    "https://picsum.photos/800/400?random=3",
  ],
};
