import { themes } from "@storybook/theming";
import theme from "./theme";
import "../src/styles/minecraft-ui.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: {
      ...themes.dark,
      ...theme,
    },
  },
};
