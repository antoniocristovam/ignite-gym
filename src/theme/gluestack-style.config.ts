import { createConfig } from "@gluestack-style/react";

export const config = createConfig({
  aliases: {
    bg: "backgroundColor",
    bgColor: "backgroundColor",
    rounded: "borderRadius",
    h: "height",
    w: "width",
  },
  tokens: {
    colors: {
      green700: "#00875F",
      green500: "#00B37E",
      gray700: "#121214",
      gray600: "#202024",
      gray500: "#29292E",
      gray400: "#323238",
      gray300: "#7C7C8A",
      gray200: "#C4C4CC",
      gray100: "#E1E1E6",
      white: "#FFFFFF",
      red500: "#F75A68",
    },
    letterSpacings: {
      md: 0,
    },
    sizes: {
      size14: 56,
      size33: 148,
    },
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    },
    mediaQueries: {
      sm: "@media (min-width: 480px)",
      md: "@media (min-width: 768px)",
    },
  },
} as const);

type ConfigType = typeof config;

declare module "@gluestack-style/react" {
  interface ICustomConfig extends ConfigType {}
}
