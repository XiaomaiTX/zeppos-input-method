import * as hmUI from "@zos/ui";
import * as hmRouter from "@zos/router";

import { AsyncStorage } from "@silver-zepp/easy-storage";

import { TextTyper } from "../components/ui/text-typer";
import { ProgressArc } from "../components/ui/progress-arc";
const arc = new ProgressArc();

Page({
  onInit() {
    arc.start();
    const initConfig = { isFirstRun: true, selectedKeyboardType: "EN" };
    AsyncStorage.ReadJson("config.json", (err, config) => {
      if (!err) {
        if (config.isFirstRun) {
          config.isFirstRun = false;
          AsyncStorage.WriteJson("config.json", config, (err) => {
            if (err) {
              console.log("Error writing config:", err);
            }
          });
        }
      } else {
        AsyncStorage.WriteJson("config.json", initConfig, (err) => {
          if (err) {
            console.log("Error writing config:", err);
          }
        });
      }
    });
  },

  build() {
    console.log("is enable:", hmUI.keyboard.isEnabled() ? "true" : "false");
    setTimeout(() => {
      arc.stop();
      arc.destroy();

      if (hmUI.keyboard.isEnabled()) {
        hmRouter.push({ url: "page/Settings/index" });
      } else {
        const guideImg = hmUI.createWidget(hmUI.widget.IMG, {
          x: px(480 - 440) / 2,
          y: px(80),
          src: "image/guide@1x.png",
        });
        const guideText = hmUI.createWidget(hmUI.widget.TEXT, {
          x: px(20),
          y: px(290),
          w: px(440),
          h: px(100),
          text_size: px(36),
          text_style: hmUI.text_style.WRAP,
          color: 0xffffff,
          align_h: hmUI.align.CENTER_H,
          align_v: hmUI.align.CENTER_V,
          text: "Please toggle on keyboard in Settings",
        });

        const gotoSettingsButton = hmUI.createWidget(hmUI.widget.BUTTON, {
          x: px(480 - 300) / 2,
          y: px(400),
          w: px(300),
          h: px(50),
          radius: 12,
          normal_color: 0x202020,
          press_color: 0x171717,
          color: 0xffffff,
          text_size: px(28),
          text: "Go to Settings",
          click_func: () => {
            hmUI.keyboard.gotoSettings();
          },
        });
        const finishButton = hmUI.createWidget(hmUI.widget.BUTTON, {
          x: px(480 - 300) / 2,
          y: px(470),
          w: px(300),
          h: px(50),
          radius: 12,
          normal_color: 0xe5e5e5,
          press_color: 0xcfcfcf,
          color: 0x000000,
          text_size: px(28),
          text: "Finish",
          click_func: () => {
            hmRouter.replace({ url: "page/Settings/index" });
          },
        });
      }
    }, 700);
  },

  onDestroy() {},
});
