import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ButtonGroup from "./ButtonGroup";
import type { ButtonGroupProps } from "./ButtonGroup";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/ButtonGroup",
  component: ButtonGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ButtonGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonGroup> = (
  args: ButtonGroupProps
) => {
  const [value, setValue] = React.useState<string>("option-1");

  const handleChange = (newValue: string): void => {
    console.log("Template.handleChange", newValue);

    setValue(newValue);
    args.onChange && args.onChange(newValue);
  };
  return <ButtonGroup {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  onChange: (value: string) => {
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
