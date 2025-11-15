import * as zosGesture from "@zos/interaction";
import { getTextLayout } from "@zos/ui";

import { InputMethod } from "../utils/inputMethod/inputMethod";

const inputMethod = new InputMethod({
  keyboard_type: "EN",
  inputbox_type: "NORMAL",
  text: "",
  title: "输入法",
});

Page({
  build() {
    console.log("Data Widget Input Method Page build");

    function debugSpaceWidthsRecursive(maxLength, currentLength = 1) {
      if (currentLength > maxLength) {
        return;
      }

      const spaceChar = " ".repeat(currentLength);
      const { width, height } = getTextLayout(spaceChar, {
        text_size: 45,
        text_width: 0,
        wrapped: 0,
      });

      console.log(
        `空格长度: ${currentLength
          .toString()
          .padStart(3)}, 字符: "${spaceChar}", 宽度: ${width}`,
      );

      debugSpaceWidthsRecursive(maxLength, currentLength + 1);
    }

    debugSpaceWidthsRecursive(20);

    zosGesture.onGesture({
      callback: (event) => {
        if (event === zosGesture.GESTURE_UP) {
          console.log("up");
        }
        if (event === zosGesture.GESTURE_DOWN) {
          console.log("up");
        }
        if (event === zosGesture.GESTURE_LEFT) {
          console.log("up");
        }
        if (event === zosGesture.GESTURE_RIGHT) {
          console.log("up");
        }
        return true;
      },
    });
    inputMethod.start();
  },
  onInit() {},

  onDestroy() {
    // 取消注册手势监听
    inputMethod.delete();
  },
});
