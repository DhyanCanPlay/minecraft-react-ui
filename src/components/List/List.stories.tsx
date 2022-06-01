import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import List from "./List";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/List",
  component: List,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof List>;

const Container = ({ children }) => (
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
const Template: ComponentStory<typeof List> = (args) => {
  return (
    <Container>
      <List
        selectable
        items={[
          { id: "1", text: "Text 1" },
          { id: "2", text: "Text 2" },
        ]}
        renderItem={({ item }) => <>{item.text}</>}
        itemOptions={() => [
          {
            id: "1",
            label: "Option 1",
            onClick: () => console.log("Clicked 1"),
          },
          {
            id: "2",
            label: "Option 2",
            onClick: () => console.log("Clicked 2"),
          },
        ]}
      />
    </Container>
  );
};

export const Click = Template.bind({});
Click.args = {
  children: "Click me!",
};
