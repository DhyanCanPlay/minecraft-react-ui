import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Menu from "./Menu";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Menu",
  component: Menu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Menu>;

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
const Template: ComponentStory<typeof Menu> = (args) => {
  return (
    <Container>
      <Menu
        items={[
          { id: "1", label: "Text 1", onClick: () => console.log("Clicked 1") },
          { id: "2", label: "Text 2", onClick: () => console.log("Clicked 2") },
        ]}
      />
    </Container>
  );
};

export const MenuBasic = Template.bind({});

MenuBasic.args = {};
