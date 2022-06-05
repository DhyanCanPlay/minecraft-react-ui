import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DropdownMenu from "./DropdownMenu";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/DropdownMenu",
  component: DropdownMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof DropdownMenu>;

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
const Template: ComponentStory<typeof DropdownMenu> = (args) => {
  return (
    <Container>
      <DropdownMenu
        items={[
          { id: "1", label: "Text 1", onClick: () => console.log("Clicked 1") },
          { id: "2", label: "Text 2", onClick: () => console.log("Clicked 2") },
        ]}
      />
    </Container>
  );
};

export const DropdownMenuBasic = Template.bind({});

DropdownMenuBasic.args = {};
