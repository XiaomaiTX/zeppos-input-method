import * as hmUI from "@zos/ui";
import { InputMethod } from "../utils/inputMethod";

const prevText = hmUI.keyboard.getTextContext()

const inputMethod = new InputMethod({
  keyboard_type: InputMethod.KEYBOARD_TYPE.ENGLISH,
  inputbox_type: InputMethod.INPUTBOX_TYPE.NORMAL,
  text: prevText,
  title: "输入法",
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
});
