import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Checkbox from "./Checkbox";
import type { CheckboxProps } from "./Checkbox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Checkbox",
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
  },
} as ComponentMeta<typeof Checkbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Checkbox> = (args: CheckboxProps) => {
  const [value, setValue] = React.useState<boolean>(
    (args.value as boolean) || false
  );
  const handleChange = (
    value: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValue(value);
    args.onChange(value, event);
  };

  return <Checkbox {...args} value={value} onChange={handleChange} />;
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
  onChange: (value) => {
    console.log(value);
  },
};

export const DisabledChecked = Template.bind({});

DisabledChecked.args = {
  disabled: true,
  value: true,
  onChange: (value) => {
    console.log(value);
  },
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
  readOnly: true,
  value: true,
  onChange: (value) => {
    console.log(value);
  },
};

export const Checked = Template.bind({});

Checked.args = {
  value: true,
  onChange: (value) => {
    console.log(value);
  },
};
