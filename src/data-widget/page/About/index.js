import * as hmUI from "@zos/ui";
import * as hmRouter from "@zos/router";
import * as hmInteraction from "@zos/interaction";

import { AsyncStorage } from "@silver-zepp/easy-storage";
import { reactive, effect, computed } from "@x1a0ma17x/zeppos-reactive";

import { ScrollListPage } from "../../components/ScrollListPage";
import { ProgressArc } from "../../components/ui/progress-arc";

const arc = new ProgressArc();

const state = reactive({
  PageData: {},
});

Page({
  onInit() {
    arc.start();
  },

  build() {
    setTimeout(() => {
      arc.stop();
      arc.destroy();

      this.cleanDataDialog = hmInteraction.createModal({
        content: "Are you sure you want to delete all data?",
        autoHide: false,
        show: false,
        onClick: (keyObj) => {
          const { type } = keyObj;
          if (type === hmInteraction.MODAL_CONFIRM) {
            console.log("confirm");
            AsyncStorage.RemoveFile("config.json", (err, ok) => {
              if (err) {
                console.log("Error deleting config:", err);
              } else if (ok) {
                console.log("Config deleted successfully");
                hmRouter.exit();
              }
            });
          } else {
            this.cleanDataDialog.show(false);
          }
        },
      });

      state.PageData = computed(() => {
        return {
          title: "About",
          items: [
            {
              title: "Developer",
              description: "@XiaomaiTX",
            },
            {
              title: "GitHub",
              description: "XiaomaiTX/zeppos-input-method",
            },
            {
              title: "License",
              description: "MIT",
            },
            {
              title: "3rd Party Libraries",
              icon: "image/arrow-right-double-fill@1x.png",
              action: () => {
                hmRouter.push({
                  url: "page/About/libs",
                });
              },
            },

            {
              title: "Version",
              description: "1.0.1",
            },
            {
              title: "Clean Data",
              action: () => {
                this.cleanDataDialog.show(true);
              },
              customStyles: {
                SETTINGS_BUTTON_STYLE: {
                  color: 0xff0000,
                },
                SETTINGS_BUTTON_TITLE_STYLE: {
                  color: 0xffffff,
                  align_h: hmUI.align.CENTER_H,
                },
              },
            },
          ],
        };
      });

      const page = new ScrollListPage(state.PageData.value);
      effect(() => {
        page.updateUI(state.PageData.value);
      });
    }, 700);
  },

  onDestroy() {},
});
