import { InputMethod } from "../utils/inputMethod/inputMethod";

const inputMethod = new InputMethod({
    keyboard_type: [2],
    inputbox_type: [0],
    text: "",
    title: "输入法",
});

Page({
    build() {
        console.log("Data Widget Input Method Page build");
        inputMethod.start();
    },
    onInit() {},

    onDestroy() {
        // 取消注册手势监听
        inputMethod.delete();
    },
});
