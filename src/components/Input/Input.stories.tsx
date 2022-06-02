import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Input from "./Input";
import type { InputProps } from "./Input";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/inputs/Input",
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: {
      control: { type: "text" },
    },
  },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args: InputProps) => {
  const [value, setValue] = React.useState<string>(
    (args.value as string) || ""
  );
  const handleChange = (value: string): void => {
    console.log(value);
    setValue(value);
    args.onChange(value);
  };

  return <Input {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  placeholder: "Placeholder",
  onChange: (value) => {
    console.log(value);
  },
};

export const Secondary = Template.bind({});

Secondary.args = {
  placeholder: "Placeholder",
  onChange: (value) => {
    console.log(value);
  },
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  placeholder: "Placeholder",
  onChange: (value) => {
    console.log(value);
  },
};

export const WithValue = Template.bind({});

WithValue.args = {
  value: "Value from storybook",
  placeholder: "Placeholder",
  onChange: (value) => {
    console.log(value);
  },
};
