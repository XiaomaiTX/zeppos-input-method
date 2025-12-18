import * as hmUI from "@zos/ui";
import { onGesture, GESTURE_UP } from "@zos/interaction";
import { InputMethod } from "../utils/inputMethod";

const prevText = hmUI.keyboard.getTextContext()

const inputMethod = new InputMethod({
  keyboard_type: InputMethod.KEYBOARD_TYPE.ENGLISH,
  inputbox_type: InputMethod.INPUTBOX_TYPE.NORMAL,
  text: prevText,
  title: "Keyboard",
});

DataWidget({
  state: {
    text: "Hello Zepp OS",
  },

  onInit() {
    console.log("onInit");
  },
  build() {
    console.log("build");
    console.log(this.state.text);
    inputMethod.start();
  },
  onDestroy() {
    console.log("onDestroy");
    hmUI.keyboard.clearInput()
    hmUI.keyboard.inputText(inputMethod.getText())
    inputMethod.delete();
  },
});
