import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Dropdown from "./Dropdown";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Dropdown",
  component: Dropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Dropdown>;

const Container = ({ children }) => (
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
const Template: ComponentStory<typeof Dropdown> = (args) => {
  return (
    <Container>
      <Dropdown
        children={"Hover me!"}
        content={<p>Dropdown message</p>}
        trigger={"hover"}
        {...args}
      />
    </Container>
  );
};

export const Click = Template.bind({});
Click.args = {
  trigger: "click",
  children: "Click me!",
};

export const BottomStart = Template.bind({});
BottomStart.args = {
  placement: "bottom-start",
};

export const BottomEnd = Template.bind({});
BottomEnd.args = {
  placement: "bottom-end",
};

export const Bottom = Template.bind({});
Bottom.args = {
  placement: "bottom",
};

export const TopStart = Template.bind({});
TopStart.args = {
  placement: "top-start",
};

export const TopEnd = Template.bind({});
TopEnd.args = {
  placement: "top-end",
};

export const Top = Template.bind({});
Top.args = {
  placement: "top",
};
