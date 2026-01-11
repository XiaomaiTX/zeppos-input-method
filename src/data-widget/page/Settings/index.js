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
  isKeyboardEnabled: false,
  isKeyboardSelected: false,
  selectedKeyboardType: "",
  customTheme: 0xffffff,
  PageData: {},
});

Page({
  onInit() {
    arc.start();
    state.isKeyboardEnabled = hmUI.keyboard.isEnabled();
    state.isKeyboardSelected = hmUI.keyboard.isSelected();
    AsyncStorage.ReadJson("config.json", (err, config) => {
      if (!err) {
        state.selectedKeyboardType = config.selectedKeyboardType;
        state.customTheme = config.customTheme;
      }
    });
    hmInteraction.onGesture({
      callback: (event) => {
        if (event === hmInteraction.GESTURE_RIGHT) {
          hmRouter.exit();
        }
        return true;
      },
    });
  },

  build() {
    setTimeout(() => {
      arc.stop();
      arc.destroy();

      setInterval(() => {
        state.isKeyboardEnabled = hmUI.keyboard.isEnabled();
        state.isKeyboardSelected = hmUI.keyboard.isSelected();
      }, 100);

      state.PageData = computed(() => {
        return {
          title: getText("settings.title"),
          items: [
            {
              title: getText("settings.tryItNow"),
              action: () => {
                hmRouter.push({
                  url: "page/Demo/index",
                });
              },
              customStyles: {
                SETTINGS_BUTTON_STYLE: {
                  color: 0xffffff,
                },
                SETTINGS_BUTTON_TITLE_STYLE: {
                  color: 0x000000,
                  align_h: hmUI.align.CENTER_H,
                },
              },
            },

            {
              title: getText("settings.keyboardEnableStatus"),
              description: state.isKeyboardEnabled ? getText("common.enabled") : getText("common.disabled"),
              icon: state.isKeyboardEnabled
                ? "image/checkbox-circle-fill@1x.png"
                : "image/close-circle-fill@1x.png",
              action: () => {
                hmUI.keyboard.gotoSettings();
              },
            },
            {
              title: getText("settings.keyboardSelectedStatus"),
              description: state.isKeyboardSelected
                ? getText("common.selected")
                : getText("common.notSelected"),
              icon: state.isKeyboardSelected
                ? "image/checkbox-circle-fill@1x.png"
                : "image/close-circle-fill@1x.png",
              action: () => {
                console.log(getText("debug.keyboardSelectedStatus"));
              },
            },
            {
              title: getText("settings.selectKeyboardType"),
              description: (() => {
                switch (state.selectedKeyboardType) {
                  case "EN":
                    return getText("selectKeyboard.english26Keys");
                  case "ZH_CN_PY":
                    return getText("selectKeyboard.chinese26KeysPinyin");
                  default:
                    return getText("selectKeyboard.unknown");
                }
              })(),
              icon: "image/arrow-right-double-fill@1x.png",
              action: () => {
                hmRouter.push({
                  url: "page/Settings/select-keyboard-type",
                });
              },
            },
            // {
            //   title: getText("settings.selectTheme"),
            //   description: `${this.colorToString(state.customTheme)}`,
            //   icon: "image/arrow-right-double-fill@1x.png",
            //   action: () => {
            //     hmRouter.push({
            //       url: "page/Settings/select-theme",
            //     });
            //   },
            //   customStyles: {
            //     SETTINGS_BUTTON_DESCRIPTION_STYLE: {
            //       color: state.customTheme,
            //     },
            //   },
            // },
            {
              title: getText("settings.about"),
              icon: "image/arrow-right-double-fill@1x.png",
              action: () => {
                hmRouter.push({
                  url: "page/About/index",
                });
              },
            },
          ],
        };
      });

      const page = new ScrollListPage(state.PageData.value);
      effect(() => {
        state.isKeyboardEnabled;
        state.isKeyboardSelected;
        state.selectedKeyboardType;
        state.customTheme;
        page.updateUI(state.PageData.value);
      });
    }, 700);
  },

  onDestroy() {},
  colorToString(color) {
    return `0x${color.toString(16).toUpperCase().padStart(6, "0")}`;
  },
});
