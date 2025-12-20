import * as hmUI from "@zos/ui";
import * as hmRouter from "@zos/router";
import * as hmInteraction from "@zos/interaction";

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
          title: "Settings",
          items: [
            {
              title: "Keyboard Enable Status",
              description: state.isKeyboardEnabled ? "Enabled" : "Disabled",
              icon: state.isKeyboardEnabled
                ? "/image/checkbox-circle-fill@1x.png"
                : "image/close-circle-fill@1x.png",
              action: () => {
                hmUI.keyboard.gotoSettings();
              },
            },
            {
              title: "Keyboard Selected Status",
              description: state.isKeyboardSelected
                ? "Selected"
                : "Not Selected",
              icon: state.isKeyboardSelected
                ? "/image/checkbox-circle-fill@1x.png"
                : "image/close-circle-fill@1x.png",
              action: () => {
                console.log("Keyboard Selected Status");
              },
            },
            {
              title: "Select Keyboard Type",
              description: state.selectedKeyboardType,
              action: () => {
                hmRouter.push({
                  url: "page/Settings/select-keyboard-type",
                });
              },
            },
            {
              title: "Select Theme",
              description: `${this.colorToString(state.customTheme)}`,
              action: () => {
                hmRouter.push({
                  url: "page/Settings/select-theme",
                });
              },
              customStyles: {
                SETTINGS_BUTTON_DESCRIPTION_STYLE: {
                  color: state.customTheme,
                },
              },
            },
            {
              title: "Try It Now!",
              action: () => {
                hmRouter.push({
                  url: "page/Demo/index",
                });
              },
            },
            {
              title: "Clean Data",
              action: () => {
                AsyncStorage.RemoveFile("config.json", (err, ok) => {
                  if (err) {
                    console.log("Error deleting config:", err);
                  } else if (ok) {
                    console.log("Config deleted successfully");
                    hmRouter.exit();
                  }
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
