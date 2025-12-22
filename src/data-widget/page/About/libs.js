import * as hmUI from "@zos/ui";
import * as hmRouter from "@zos/router";
import * as hmInteraction from "@zos/interaction";

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
      state.PageData = computed(() => {
        return {
          title: "3rd Libs",
          items: [
            {
              title: "@x1a0ma17x/zeppos-fx",
            },
            {
              title: "@x1a0ma17x/zeppos-reactive",
            },
            {
              title: "@silver-zepp/easy-storage",
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
