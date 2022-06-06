import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import List from "./List";

export default {
  title: "ReactComponentLibrary/List",
  component: List,
  argTypes: {},
} as ComponentMeta<typeof List>;

const Container = ({ children }: { children: React.ReactNode }) => (
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

const Template: ComponentStory<typeof List> = (args) => {
  return (
    <List
      {...args}
      items={Array.from({ length: 1000 }, (_, i) => ({
        id: i.toString(),
        text: `Item ${i}`,
        type: i % 2 === 0 ? "odd" : "even",
      }))}
      renderItem={({ item }) => <>{item.text}</>}
    />
  );
};

export const SimpleList = Template.bind({});

SimpleList.args = {};

export const Selectable = Template.bind({});

Selectable.args = {
  selection: {
    itemDisabled: () => false,
  },
  draggable: false,
};

export const Filter = Template.bind({});

Filter.args = {
  search: {
    searchItem: (item, keywords) => item.text.includes(keywords),
  },
  draggable: false,
};

export const Draggable = Template.bind({});

Draggable.args = {
  selection: {
    itemDisabled: () => false,
  },
  draggable: true,
};

export const Menu = Template.bind({});

Menu.args = {
  menu: {
    items: (item) => {
      if (item) {
        return item.type === "odd"
          ? [
              {
                label: "Odd option",
                onClick: console.log,
                id: `${item.id}-option-odd`,
              },
            ]
          : [
              {
                label: "Even option",
                onClick: console.log,
                id: `${item.id}-option-odd`,
              },
            ];
      }
      return [
        {
          label: "Global option",
          onClick: console.log,
          id: `global-option`,
        },
      ];
    },
  },
  draggable: true,
};
