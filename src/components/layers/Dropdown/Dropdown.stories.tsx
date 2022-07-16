import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Dropdown from "./Dropdown";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/layers/Dropdown",
  component: Dropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Dropdown>;

const Container = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "64px",
    }}
  >
    {children}
  </div>
);

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dropdown> = ({ content, target, ...args }) => {
  return (
    <Container>
      <Dropdown {...args} content={content || <p>Dropdown message</p>} target={target || <div>Click me!</div>} />
    </Container>
  );
};

export const Click = Template.bind({});

Click.args = {
  target: <span>Click me!</span>,
  closeOnClickOutside: true,
  trigger: "click",
};

export const Hover = Template.bind({});

Hover.args = {
  target: <span>Hover me!</span>,
  content: <p>Hover me too!</p>,
  trigger: "hover",
};
