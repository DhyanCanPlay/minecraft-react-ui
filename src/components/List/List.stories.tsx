import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import List from "./List";
import FlexBox from "../FlexBox";
import Tag from "../Tag";
import type { MenuItemProps } from "../Menu/MenuItem";
import type {
  ListItemProps,
  ListSearchProps,
  ListMenuProps,
  Item,
} from "./types";

export default {
  title: "ReactComponentLibrary/List",
  component: List,
  argTypes: {},
} as ComponentMeta<typeof List>;

const menu: ListMenuProps = {
  items: (item?: Item) => {
    if (item) {
      const options = [];
      if (item.status === "pending") {
        options.push({
          label: "Cancel",
          onClick: console.log,
          id: `${item.id}-cancel`,
        });
      }
      if (item.status === "running") {
        options.push({
          label: "Abort",
          onClick: console.log,
          id: `${item.id}-abort`,
        });
      }
      if (item.status === "finished") {
        options.push({
          label: "View results",
          onClick: console.log,
          id: `${item.id}-results`,
        });
      }
      if (item.status === "aborted" || item.status === "canceled") {
        options.push({
          label: "Remove",
          onClick: console.log,
          id: `${item.id}-results`,
        });
      }
      return options;
    }
    return [
      {
        label: "Global option",
        onClick: console.log,
        id: `global-option`,
      },
    ];
  },
};

const selection: { [key: string]: any } = {
  itemDisabled: (item: MenuItemProps) => item.status === "deleted",
};

const search: ListSearchProps = {
  searchItem: (item, keywords) =>
    keywords &&
    (item.text.includes(keywords) || item.status.includes(keywords)),
};

const Execution = ({ item }: { item: ListItemProps["item"] }) => {
  return (
    <FlexBox align="center" justify="space-between">
      <div>{item.text}</div>
      <Tag>{item.status}</Tag>
    </FlexBox>
  );
};

const Template: ComponentStory<typeof List & { [key: string]: any }> = (
  args
) => {
  return (
    <List
      {...args}
      items={Array.from({ length: 1000 }, (_, i) => ({
        id: i.toString(),
        text: `Item ${i}`,
        type: i % 2 === 0 ? "odd" : "even",
        status: (() => {
          const seed = Math.round(Math.random() * 5);
          if (seed === 0) return "pending";
          if (seed === 1) return "running";
          if (seed === 2) return "finished";
          if (seed === 3) return "aborted";
          return "canceled";
        })(),
      }))}
      renderItem={Execution}
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
    searchItem: (item, keywords) => keywords && item.text.includes(keywords),
  },
  draggable: false,
};

export const Draggable = Template.bind({});

Draggable.args = {
  draggable: true,
};

export const Menu = Template.bind({});

Menu.args = {
  menu,
  draggable: true,
};

export const All = Template.bind({});

All.args = {
  menu,
  selection,
  search,
  draggable: true,
};
