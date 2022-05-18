import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ButtonGroup from "./ButtonGroup";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/ButtonGroup",
  component: ButtonGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ButtonGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonGroup> = (args) => {
  const [value, setValue] = React.useState("option-1");

  const handleChange = (value: string): void => {
    console.log("Template.handleChange", value);

    setValue(value);
    args.onChange(value);
  };
  return <ButtonGroup value={value} {...args} onChange={handleChange} />;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  onChange: (value) => {
    console.log("Default.args.onChange", value);
  },
  options: [
    {
      label: "Option 1",
      value: "option-1",
    },
    {
      label: "Option 2",
      value: "option-2",
    },
    {
      label: "Option 3",
      value: "option-3",
    },
  ],
};
