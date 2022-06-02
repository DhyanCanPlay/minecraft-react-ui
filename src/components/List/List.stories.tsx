import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import List from "./List";

export default {
  title: "ReactComponentLibrary/List",
  component: List,
  argTypes: {},
} as ComponentMeta<typeof List>;

const Container = ({ children }) => (
  <div
    style={{
      width: "100%",
      padding: "32px",
      height: "100vh",
    }}
  >
    {children}
  </div>
);

const Template: ComponentStory<typeof List> = (args) => {
  return (
    <Container>
      <List
        {...args}
        virtualized
        items={Array.from({ length: 1000 }, (_, i) => ({
          id: i.toString(),
          text: `Item ${i}`,
        }))}
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

export const Selectable = Template.bind({});

Selectable.args = {
  selectable: true,
};
