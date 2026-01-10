import { px } from "@zos/utils";
import { Fx } from "@x1a0ma17x/zeppos-fx";
import { BOUNDARY_Y, FUNCTION_BAR_H } from "./styles";

// 键盘功能栏显示动画配置
export const KEYBOARD_FUNCTION_BAR_ANIM = {
  begin: px(400 - FUNCTION_BAR_H),
  end: px(190),
  fps: 60,
  time: 0.2,
  style: Fx.Styles.EASE_IN_QUAD,
  enabled: true,
};

// 键盘背景显示动画配置
export const KEYBOARD_BACKGROUND_ANIM = {
  begin: px(400),
  end: BOUNDARY_Y + FUNCTION_BAR_H,
  fps: 60,
  time: 0.2,
  style: Fx.Styles.EASE_IN_QUAD,
  enabled: true,
};

// 按钮释放颜色动画配置
export const BUTTON_RELEASE_COLOR_ANIM = {
  begin: 0,
  end: 1,
  fps: 30,
  time: 0.1,
  style: Fx.Styles.EASE_OUT_QUAD,
  enabled: true,
  startColor: 0xee6666,
  endColor: 0x555555,
};

// 光标移动动画配置
export const CURSOR_MOVE_ANIM = {
  begin: 0,
  end: 1,
  fps: 60,
  time: 0.1,
  style: Fx.Styles.EASE_IN_QUAD,
  enabled: true,
};

// 完成按钮颜色淡出动画配置
export const FINISH_BUTTON_COLOR_OUT_ANIM = {
  begin: 0,
  end: 1,
  fps: 60,
  time: 0.2,
  style: Fx.Styles.EASE_OUT_QUAD,
  enabled: true,
  startColor: 0xfff1a6,
  endColor: 0x666142,
};

// 完成按钮颜色淡入动画配置
export const FINISH_BUTTON_COLOR_IN_ANIM = {
  begin: 0,
  end: 1,
  fps: 60,
  time: 0.2,
  style: Fx.Styles.EASE_IN_QUAD,
  enabled: true,
  startColor: 0x666142,
  endColor: 0xfff1a6,
};
