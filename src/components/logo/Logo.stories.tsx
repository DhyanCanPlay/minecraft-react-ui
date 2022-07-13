import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Logo from "./Logo";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Logo",
  component: Logo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Logo>;

const Container = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "64px",
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Logo> = (args) => {
  return (
    <Container>
      <Logo />
    </Container>
  );
};

export const LogoBasic = Template.bind({});

LogoBasic.args = {};
