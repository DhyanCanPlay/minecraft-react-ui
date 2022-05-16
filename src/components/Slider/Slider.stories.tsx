import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Slider from "./Slider";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Slider",
  component: Slider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Slider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Slider> = (args) => {
  const [value, setValue] = React.useState(50);
  const handleChange = (value: number) => {
    console.log(value);
    setValue(value);
  };

  return <Slider {...args} value={value} onChange={handleChange} />;
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: "primary",
  children: "Hello world!",
};

export const Secondary = Template.bind({});

Secondary.args = {
  children: "Click me!",
};
