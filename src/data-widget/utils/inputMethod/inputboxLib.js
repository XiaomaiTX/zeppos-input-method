// 类中包含
// onCreate()
// onTouch(event, info) 若位置不在范围内event为MOVE_OUT 返回值为输入类型
// onDelete()

import * as hmUI from "@zos/ui";
import { Fx } from "@x1a0ma17x/zeppos-fx";
import { CURSOR_MOVE_ANIM, FINISH_BUTTON_COLOR_OUT_ANIM, FINISH_BUTTON_COLOR_IN_ANIM } from "./anim";
import { LINK_EVENT_TYPE, InputboxCondition } from "./enums";
import {
  BACKGROUD_WIDGET_STYLE,
  MASK_STYLE,
  BUTTON_TEXT_WIDGET_STYLE,
  TITLE_WIDGET_STYLE,
  INPUTBOX_TEXT_STYLE,
  INPUTBOX_FINISH_BUTTON_STYLE,
  INPUTBOX_BACKGROUND_IMG_STYLE,
} from "./styles";

// 光标类 用于控制光标的位置与动画
class Cursor {
  constructor({ border, line_width, locX, line_height, color }) {
    this.widget = null;
    this.border = border;
    this.line_width = line_width;
    this.locX = locX;
    this.line_height = line_height;
    this.color = color;
    this.fxInstance = null;
    this.flashTimer = null;
    this.flashShowing = true;
    this.offsetX = -2; //为了防止字符与光标重叠的偏移
  }
  setFlash(enable) {
    if (enable) {
      if (!this.flashTimer) {
        // 启动闪烁
        const startFlashing = () => {
          // 切换显示状态
          this.flashShowing = !this.flashShowing;
          this.widget.setProperty(hmUI.prop.VISIBLE, this.flashShowing);

          // 继续下一次闪烁
          this.flashTimer = setTimeout(startFlashing, 350);
        };

        // 初始延迟
        this.flashTimer = setTimeout(startFlashing, 150);
      }
    } else {
      // 停止闪烁
      if (this.flashTimer) {
        clearTimeout(this.flashTimer);
        this.flashTimer = null;
      }
      // 恢复显示
      this.widget.setProperty(hmUI.prop.VISIBLE, true);
      this.flashShowing = true;
    }
  }
  onCreate() {
    this.widget = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: this.border.x + this.locX + this.offsetX,
      y: this.border.y + (this.border.h - this.line_height) / 2,
      w: this.line_width,
      h: this.line_height,
      color: this.color,
      radius: px(2),
    });
    this.setFlash(true);
  }
  move(locX, useFx) {
    if (useFx) {
      this.setFlash(false);
      if (this.fxInstance) {
        this.fxInstance.setEnable(false);
      }
      this.fxInstance = new Fx({
        ...CURSOR_MOVE_ANIM,
        func: (percent) => {
          const x = this.locX + (locX - this.locX) * percent;
          this.widget.setProperty(
            hmUI.prop.X,
            x + this.border.x + this.offsetX,
          );
          this.locX = x;
        },
        onStop: () => {
          this.fxInstance = null;
          this.setFlash(true);
        },
      });
    } else {
      if (this.fxInstance) {
        this.fxInstance.setEnable(false);
      }
      this.locX = locX;
      this.widget.setProperty(hmUI.prop.X, locX + this.border.x + this.offsetX);
    }
  }
}
// 文字行类 用于控制文字的位置与动画
class TextLine {
  constructor({ text, border, text_size, color, beginSafetyDistance }) {
    text || (text = "");
    this.text = text;
    this.border = border;
    this.text_size = text_size;
    this.color = color;
    this.widget = null;
    this.beginSafetyDistance = beginSafetyDistance;
    this.locX = 0 - this.beginSafetyDistance; // 实际文字行的x坐标对文字框的相对x坐标
    this.textLength = text.length;
    this.charBegin = 0;
    this.charEnd = 0;
    this.offsetBegin = 0;
    this.offsetEnd = 0;
    this.offsetBegin = 0;
    this.offsetEnd = 0;
    this.textWList = new Array(this.textLength);
    this.textTotalWidth = 0;
    this.leftWidth = this.border.w - px(40); // safetyDistance
    this.textShow = text;
    for (let i = 0, width = 0; i < text.length; ++i) {
      const char = text.charAt(i);

      if (char === " ") {
        width = px(11);
      } else {
        width = hmUI.getTextLayout(char, {
          text_size,
          text_width: 0,
          wrapped: 0,
        }).width;
      }

      this.textWList[i] = width;
      this.textTotalWidth += width;
    }
  }
  onCreate() {
    this.widget = hmUI.createWidget(hmUI.widget.TEXT, {
      ...this.border,
      text_size: this.text_size,
      color: this.color,
      text: this.text,
      // align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
    });
  }
  getOffsetXFromIndex(index) {
    let absoluteX = 0;
    for (let i = 0; i < index; ++i) {
      absoluteX += this.textWList[i];
    }
    let res = absoluteX - this.locX;
    return res;
  }
  getIndexFromOffsetX(offsetX) {
    if (offsetX < 0 || offsetX > this.border.w) return -1;
    if (this.text.length == 0) return 0;

    let tempX = this.offsetBegin * -1;

    for (let i = this.charBegin; i < this.text.length; ++i) {
      const charWidth = this.textWList[i];
      tempX += charWidth;

      if (tempX >= offsetX) {
        console.log(`FOUND: i=${i}, tempX=${tempX} >= offsetX=${offsetX}`);
        return i;
      }
    }

    return this.text.length;
  }

  setText(text) {
    this.text = text;
    this.widget.setProperty(hmUI.prop.TEXT, text);

    this.textWList = [];
    this.textLength = text.length;
    this.textTotalWidth = 0;

    for (let i = 0, width = 0; i < text.length; ++i) {
      const char = text.charAt(i);
      if (char === " ") {
        width = px(11);
      } else {
        width = hmUI.getTextLayout(char, {
          text_size: this.text_size,
          text_width: 0,
          wrapped: 0,
        }).width;
      }
      console.log(`char '${char}' width: ${width}`);
      this.textWList[i] = width;
      this.textTotalWidth += width;
    }

    console.log("textTotalWidth:", this.textTotalWidth);

    this.charBegin = 0;
    this.charEnd = Math.min(this.textLength - 1, 0);
    this.offsetBegin = 0;
    this.offsetEnd = 0;

    this.setLocX(this.locX);
  }
  setLocX(locX) {
    let maxLocX = this.textTotalWidth - this.border.w + this.leftWidth;
    if (locX > maxLocX) locX = maxLocX;
    if (locX < 0 - this.beginSafetyDistance) {
      locX = 0 - this.beginSafetyDistance;
    }
    this.locX = locX;

    let tempX = 0;
    this.charBegin = 0;

    for (let i = 0; i < this.textLength; ++i) {
      tempX += this.textWList[i];
      if (tempX >= locX) {
        this.charBegin = i;
        break;
      }
    }

    this.offsetBegin = this.textWList[this.charBegin] - (tempX - locX);

    this.charEnd = this.charBegin;
    let displayWidth = tempX - locX;

    if (this.charEnd < this.textLength - 1) {
      for (let i = this.charBegin + 1; i < this.textLength; ++i) {
        displayWidth += this.textWList[i];
        if (displayWidth >= this.border.w) {
          this.charEnd = i;
          break;
        }
        this.charEnd = i;
      }
    }

    this.offsetEnd = displayWidth - this.border.w;
    if (this.offsetEnd < 0) this.offsetEnd = 0;

    this.textShow = this.text.substring(this.charBegin, this.charEnd + 1);

    this.widget.setProperty(hmUI.prop.MORE, {
      x: this.border.x - this.offsetBegin,
      w: this.border.w + this.offsetBegin + this.offsetEnd,
      text: this.textShow,
    });
  }
}

// link() inputbox和keyboard之间的通信事件处理
export const InputBoxLib = {
  NORMAL: class NORMAL {
    constructor({ text, father, title }) {
      this.father = father;
      this.text = text;
      this.backgroundWidget = null;
      this.inputboxBackgroundImg = null;
      this.inputboxMask = null;
      this.borderWidget = null;
      this.textWidget = null;
      this.btnBorderWidget = null;
      this.btnRectWidget = null;
      this.btnTextWidget = null;
      this.titleWidget = null;
      this.charAt = 0;
      this.beginSafetyDistance = px(18);
      this.safetyDistance = px(40); // 删除和输入时光标距离边框的最大水平距离 safetyDistance
      this.border = INPUTBOX_TEXT_STYLE;
      this.btnBorder = INPUTBOX_FINISH_BUTTON_STYLE;
      this.title = title ? title : "请输入";
      this.cursor = new Cursor({
        border: this.border,
        line_width: px(4),
        locX: this.beginSafetyDistance,
        line_height: px(40),
        color: 0x28c4ff,
      });
      this.textLine = new TextLine({
        border: this.border,
        text: this.text,
        text_size: px(45),
        color: 0xffffff,
        beginSafetyDistance: this.beginSafetyDistance,
      });
      this.condition = InputboxCondition.NORMAL;
      this.lastTouch = { x: 0, y: 0 };
    }
    onCreate() {
      this.backgroundWidget = hmUI.createWidget(
        hmUI.widget.IMG,
        BACKGROUD_WIDGET_STYLE,
      );
      this.inputboxBackgroundImg = hmUI.createWidget(
        hmUI.widget.IMG,
        INPUTBOX_BACKGROUND_IMG_STYLE,
      );
      this.textLine.onCreate();
      this.cursor.onCreate();
      this.inputboxMask = hmUI.createWidget(hmUI.widget.IMG, MASK_STYLE);
      this.btnTextWidget = hmUI.createWidget(
        hmUI.widget.TEXT,
        BUTTON_TEXT_WIDGET_STYLE,
      );
      this.titleWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        ...TITLE_WIDGET_STYLE,
        text: this.title,
      });
    }
    onTouch(event, info) {
      switch (event) {
        case hmUI.event.CLICK_DOWN:
          if (
            info.x >= this.border.x &&
            info.x <= this.border.w + this.border.x &&
            info.y >= this.border.y &&
            info.y <= this.border.y + this.border.h
          ) {
            // TextLine
            this.condition = InputboxCondition.PRESS;
            // this.condition &= ~InputboxCondition.MOVE
            if (this.condition & InputboxCondition.MOVE) {
              this.condition -= InputboxCondition.MOVE;
            }
            this.lastTouch = { x: info.x, y: info.y };
          } else {
            console.log("click Finish");
            new Fx({
              ...FINISH_BUTTON_COLOR_OUT_ANIM,
              func: (res) =>
                this.btnTextWidget.setProperty(
                  hmUI.prop.COLOR,
                  Fx.getMixColor(FINISH_BUTTON_COLOR_OUT_ANIM.startColor, FINISH_BUTTON_COLOR_OUT_ANIM.endColor, res),
                ),
              onStop: () => {
                new Fx({
                  ...FINISH_BUTTON_COLOR_IN_ANIM,
                  func: (res) =>
                    this.btnTextWidget.setProperty(
                      hmUI.prop.COLOR,
                      Fx.getMixColor(FINISH_BUTTON_COLOR_IN_ANIM.startColor, FINISH_BUTTON_COLOR_IN_ANIM.endColor, res),
                    ),
                  onStop() {},
                });
              },
            });
            return { type: LINK_EVENT_TYPE.FINISH };
          }
          break;
        case hmUI.event.CLICK_UP:
          // TextLine
          if (
            (this.condition & InputboxCondition.MOVE) == 0 &&
            info.x >= this.border.x &&
            info.x <= this.border.x + this.border.w &&
            info.y >= this.border.y &&
            info.y <= this.border.y + this.border.h
          ) {
            this.charAt = this.textLine.getIndexFromOffsetX(
              info.x - this.border.x,
            );
            this.cursor.move(
              this.textLine.getOffsetXFromIndex(this.charAt),
              true,
            );
          }
          break;
        case hmUI.event.MOVE_IN:
        case hmUI.event.MOVE_OUT:
          break;
        case hmUI.event.MOVE:
          if (this.condition & InputboxCondition.PRESS) {
            this.condition |= InputboxCondition.MOVE;
            this.textLine.setLocX(
              this.textLine.locX - info.x + this.lastTouch.x,
            );
            this.cursor.move(
              this.textLine.getOffsetXFromIndex(this.charAt),
              false,
            );

            this.lastTouch.x = info.x;
            this.lastTouch.y = info.y;
          }
          break;
      }
    }
    link(res) {
      switch (res.event) {
        case LINK_EVENT_TYPE.INPUT:
          this.text =
            this.text.substring(0, this.charAt) +
            res.data +
            this.text.substring(this.charAt, this.text.length);
          ++this.charAt;
          break;
        case LINK_EVENT_TYPE.DELETE:
          if (this.text.length) {
            this.text =
              this.text.substring(0, this.charAt - 1) +
              this.text.substring(this.charAt, this.text.length);
            --this.charAt;
          } else {
            console.log("inputBox: text is empty");
          }
          break;
        case LINK_EVENT_TYPE.CHANGE:
          if (this.text.length) {
            this.text =
              this.text.substring(0, this.charAt - 1) +
              res.data +
              this.text.substring(this.charAt, this.text.length);
          } else {
            console.log("inputBox: text is empty");
          }
      }
      this.textLine.setText(this.text);
      let offset = this.textLine.getOffsetXFromIndex(this.charAt);
      if (
        offset < this.safetyDistance &&
        this.textLine.textTotalWidth > this.safetyDistance
      ) {
        this.textLine.setLocX(
          this.textLine.locX + offset - this.safetyDistance,
        );
        offset = this.safetyDistance;
      } else if (offset > this.border.w - this.safetyDistance) {
        this.textLine.setLocX(
          this.textLine.locX + offset - this.border.w + this.safetyDistance,
        );
        offset = this.border.w - this.safetyDistance;
      }
      this.cursor.move(offset, true);
    }
    onDelete() {}
  },
};
