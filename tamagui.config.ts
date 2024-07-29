import { config as configBase } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";
import * as Customthemes from "@/constants/Theme";

export const config = createTamagui({
  ...configBase,
  themes: Customthemes,
  defaultTheme: "light",
});

export default config;

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
