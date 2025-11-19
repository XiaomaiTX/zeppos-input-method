import * as hmUI from "@zos/ui";
import * as zosGesture from "@zos/interaction";
import { getTextLayout } from "@zos/ui";


Page({
  build() {
    console.log("Data Widget Input Method Page build");
    hmUI.createKeyboard({
      inputType: hmUI.inputType.JSKB,
      onComplete: (_, result) => {
        console.log('输入内容:', result.data)
        hmUI.destroyKeyboard()
      },
      onCancel: (_, result) => {
        console.log('取消输入')
        hmUI.destroyKeyboard()
      },
      text: '100' // 初始化文本
    })

  },
  onInit() {},

  onDestroy() {
    hmUI.destroyKeyboard()
  },
});
