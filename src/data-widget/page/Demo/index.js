import * as hmUI from "@zos/ui";
import * as hmInteraction from "@zos/interaction";
import * as hmRouter from "@zos/router";

Page({
  build() {
    console.log("Data Widget Input Method Page build");
    hmUI.createKeyboard({
      inputType: hmUI.inputType.JSKB,
      onComplete: (_, result) => {
        console.log("输入内容:", result.data);
        hmRouter.back();
        hmUI.destroyKeyboard();
      },
      onCancel: (_, result) => {
        console.log("取消输入");
        hmRouter.back();
        hmUI.destroyKeyboard();
      },
      text: "", // 初始化文本
    });
  },
  onInit() {},

  onDestroy() {
    hmUI.destroyKeyboard();
  },
});
