import * as hmUI from "@zos/ui";
import * as hmRouter from "@zos/router";
import * as hmInteraction from "@zos/interaction";
import { getText } from "@zos/i18n";

import { AsyncStorage } from "@silver-zepp/easy-storage";
import { reactive, effect, computed } from "@x1a0ma17x/zeppos-reactive";

import { ScrollListPage } from "../../components/ScrollListPage";
import { ProgressArc } from "../../components/ui/progress-arc";

const arc = new ProgressArc();

const state = reactive({
  customTheme: 0xffffff,
  PageData: {},
});

const customThemes = [
  0xffffff, 0xec5d5e, 0xde51a8, 0x3b9eff, 0xffff57, 0xd4ff70, 0xa8f5e5,
  0xa8eeff,
];
Page({
  onInit() {
    arc.start();

    AsyncStorage.ReadJson("config.json", (err, config) => {
      if (!err) {
        state.customTheme = config.customTheme;
      }
    });
  },

  build() {
    setTimeout(() => {
      arc.stop();
      arc.destroy();

      state.PageData = computed(() => {
        return {
          title: getText("settings.selectTheme"),
          items: [
            ...customThemes.map((theme) => {
              return {
                title: getText("selectTheme.presetTheme") + (customThemes.indexOf(theme) + 1),
                description: this.colorToString(theme),
                icon:
                  state.customTheme === theme
                    ? "/image/checkbox-circle-fill@1x.png"
                    : "/image/checkbox-circle-empty@1x.png",
                action: () => {
                  state.customTheme = theme;
                },
                customStyles: {
                  SETTINGS_BUTTON_DESCRIPTION_STYLE: {
                    color: theme,
                  },
                },
              };
            }),
            {
              title: getText("selectTheme.customTheme"),
              description: !customThemes.includes(state.customTheme)
                ? this.colorToString(state.customTheme)
                : getText("selectTheme.enterYourColor"),
              icon: !customThemes.includes(state.customTheme)
                ? "/image/checkbox-circle-fill@1x.png"
                : "/image/checkbox-circle-empty@1x.png",
              action: () => {
                hmUI.keyboard.clearInput();
                hmUI.createKeyboard({
                  inputType: hmUI.inputType.CHAR,
                  onComplete: (_, result) => {
                    console.log("完成输入:", result.data);
                    state.customTheme =
                      this.StringToColor(result.data) || 0xffffff;
                    hmUI.deleteKeyboard();
                  },
                  onCancel: (_, result) => {
                    console.log("取消输入");
                    hmUI.deleteKeyboard();
                  },
                  text: this.colorToString(state.customTheme) || "",
                });
              },
            },
          ],
        };
      });

      const page = new ScrollListPage(state.PageData.value);
      effect(() => {
        state.customTheme;
        console.log("[state.customTheme] changed to:", state.customTheme);
        AsyncStorage.ReadJson("config.json", (err, config) => {
          if (!err) {
            config.customTheme = state.customTheme;
            AsyncStorage.WriteJson("config.json", config, (err, ok) => {
              if (ok) {
                page.updateUI(state.PageData.value);
              }
              if (err) {
                console.log("Error writing config:", err);
              }
            });
          }
        });
      });
    }, 700);
  },

  onDestroy() {},
  colorToString(color) {
    return `0x${color.toString(16).toUpperCase().padStart(6, "0")}`;
  },
  StringToColor(str) {
    return parseInt(str, 16);
  },
});
