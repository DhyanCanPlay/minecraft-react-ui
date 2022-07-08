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
const Template: ComponentStory<typeof Dropdown> = (args) => {
  return (
    <Container>
      <Dropdown {...args} content={<p>Dropdown message</p>}>
        <div>Click me!</div>
      </Dropdown>
    </Container>
  );
};

export const Click = Template.bind({});
Click.args = {
  children: "Click me!",
};
