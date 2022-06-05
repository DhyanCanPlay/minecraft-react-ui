import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BaseList from "./List";

export default {
  title: "ReactComponentLibrary/List",
  component: BaseList,
  argTypes: {},
} as ComponentMeta<typeof List>;

const Container = ({ children }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {children}
  </div>
);

const Template: ComponentStory<typeof BaseList> = (args) => {
  return (
    <Container>
      <BaseList
        {...args}
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

export const List = Template.bind({});

List.args = {};

export const Selectable = Template.bind({});

Selectable.args = {
  selectable: true,
  draggable: false,
};

export const Draggable = Template.bind({});

Draggable.args = {
  selectable: true,
  draggable: true,
};
