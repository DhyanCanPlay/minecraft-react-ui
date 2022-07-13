import { create } from "@storybook/theming";

export default create({
  base: "dark",
  brandTitle: "Minecraft React UI",
  brandUrl: "https://minecraft-react-ui.vercel.app",
  brandImage:
    "https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg",
  brandTarget: "_self",

  fontBase: "minecraft",
  appBorderRadius: 0,
  inputBorderRadius: 0,

  appBg: "#23232a",
  appContentBg: "#23232a",
  barBg: "#484848",

  colorPrimary: "white",
  colorSecondary: "#3b8526",
});
