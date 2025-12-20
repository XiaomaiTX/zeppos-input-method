# ZeppOS InputMethod

一个适用于 ZeppOS 的灵活、强大、美观的输入法组件。

[EN](./README.md) | 中文文档

## 特点

- 多种使用方式
  - 直接从 Zepp Store 下载，点开即可使用
  - 以组件的形式嵌入到 ZeppOS 的应用中
- 支持滑动输入
- 支持中文拼音输入
- 面向对象式的高性能设计，任意拓展成你想要的输入法
- 多机型适配、多语言支持
- 基于 [zeppos-fx](https://github.com/XiaomaiTX/zeppos-fx) 的优质流畅的动画体验
- 可编辑多种自定义风格主题颜色，可自定义背景图片

## 注意事项

- 仅支持 ZeppOS API 4.2 以上的设备
- 当前仍有小问题需要等待官方 ZppOS API 修复 [Ref #8](https://github.com/XiaomaiTX/zeppos-input-method/issues/8)

## 使用方法

### 通过 Zepp Store 下载

即将上线，敬请期待

### 以组件的形式嵌入到 ZeppOS 的应用中

```js
import { InputMethod } from "../utils/inputMethod";

const inputMethod = new InputMethod({
    keyboard_type: InputMethod.KEYBOARD_TYPE.ENGLISH,
    inputbox_type: InputMethod.INPUTBOX_TYPE.NORMAL,
    text: "",
    title: "Keyboard",
});

inputMethod.start();
inputMethod.delete();
```

## 开发指南

### 基于BaseKeyboard开发新的键盘

可参考`ZH_CN_PY`键盘的实现，自行修改

```js
export const KeyBoardLib = {
  EN: class EN extends BaseKeyboard {},
  NUM: class NUM {},
  ZH_CN_PY: class ZH_CN_PY extends BaseKeyboard {
  chooseWord(inputText) {},
  updateChooseWord(event, info) {},
  extractPinyin(inputText) {},
  // ...
  }
};
```

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

XiaomaiTX - <Me@xiaomaitx.com>
