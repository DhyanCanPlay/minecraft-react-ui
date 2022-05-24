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
  const [value, setValue] = React.useState(args.value);
  const handleChange = (value: number) => {
    setValue(value);
  };

  return (
    <div style={{ padding: "32px" }}>
      <Slider {...args} value={value} onChange={handleChange} />
    </div>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Primary.args = {
  value: 1,
  min: 1,
  max: 5,
};
