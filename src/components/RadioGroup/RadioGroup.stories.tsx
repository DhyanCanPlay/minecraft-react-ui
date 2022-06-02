import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RadioGroup from "./RadioGroup";
import type { RadioGroupProps } from "./RadioGroup";

const options = [
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
  {
    label: "Option 4",
    value: "option-4",
    disabled: true,
  },
  {
    label: "Option 5",
    value: "option-5",
  },
  {
    label: "Option 6",
    value: "option-6",
  },
  {
    label: "Option 7",
    value: "option-7",
  },
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/inputs/RadioGroup",
  component: RadioGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: {
      control: { options: options.map(({ value }) => value) },
    },
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
  },
} as ComponentMeta<typeof RadioGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RadioGroup> = ({
  value,
  onChange,
  ...args
}: RadioGroupProps) => {
  const [localValue, setValue] = React.useState<string>(
    (value as string) || []
  );
  const handleChange = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValue(value);
    onChange(value, event);
  };

  return (
    <RadioGroup
      options={options}
      {...args}
      value={localValue}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  name: "Default",
  onChange: (value) => {
    console.log(value);
  },
};

export const ShowSelectAll = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ShowSelectAll.args = {
  name: "ShowSelectAll",
  onChange: (value) => {
    console.log(value);
  },
  showSelectAll: true,
};

export const DirectionRow = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DirectionRow.args = {
  name: "DirectionRow",
  direction: "row",
  onChange: (value) => {
    console.log(value);
  },
  showSelectAll: true,
};
