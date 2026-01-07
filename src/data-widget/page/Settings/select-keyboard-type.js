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
  selectedKeyboardType: "",
  PageData: {},
});

Page({
  onInit() {
    arc.start();

    AsyncStorage.ReadJson("config.json", (err, config) => {
      if (!err) {
        state.selectedKeyboardType = config.selectedKeyboardType;
      }
    });
  },

  build() {
    setTimeout(() => {
      arc.stop();
      arc.destroy();
      state.PageData = computed(() => {
        return {
          title: getText("selectKeyboard.page.title"),
          items: [
            {
              title: getText("selectKeyboard.english26Keys"),
              icon:
                state.selectedKeyboardType === "EN"
                  ? "/image/checkbox-circle-fill@1x.png"
                  : "/image/checkbox-circle-empty@1x.png",
              action: () => {
                state.selectedKeyboardType = "EN";
              },
            },
            {
              title: getText("selectKeyboard.chinese26KeysPinyin"),
              icon:
                state.selectedKeyboardType === "ZH_CN_PY"
                  ? "/image/checkbox-circle-fill@1x.png"
                  : "/image/checkbox-circle-empty@1x.png",
              action: () => {
                state.selectedKeyboardType = "ZH_CN_PY";
              },
            }
          ],
        };
      });

      const page = new ScrollListPage(state.PageData.value);
      effect(() => {
        state.selectedKeyboardType;
        AsyncStorage.ReadJson("config.json", (err, config) => {
          if (!err) {
            config.selectedKeyboardType = state.selectedKeyboardType;
            AsyncStorage.WriteJson("config.json", config, (err) => {
              if (err) {
                console.log("Error writing config:", err);
              }
            });
          }
        });
        page.updateUI(state.PageData.value);
      });
    }, 700);
  },

  onDestroy() {},
});
