import * as hmUI from "@zos/ui";
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from "@zos/device";
const { width, screenShape } = getDeviceInfo();

export const BOUNDARY_Y = px(190); // InputBox和Keyboard分界线y坐标
export const FUNCTION_BAR_H = px(50); // 预留给选词和工具区域的高度

// inputMethod.js
export const CONTROL_PLANE_TEXT_STYLE = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  text: "",
};

// keyboardLib.js
export const BUTTON_LINE_SAFETY_DISTANCE = [10, 33, 79, null];
export const BUTTON_LINE_NUM = 4;
export const BUTTON_CAPSLOCK_UP_IMG = "Skins/Earth/keyboardEN_button_UP_Earth.png";
export const BUTTON_CAPSLOCK_DOWN_IMG = "Skins/Earth/keyboardEN_button_Earth.png";
export const FUNCTION_BAR_IMG_STYLE = {
  x: px(0),
  y: px(400),
  w: px(480),
  h: px(480) - BOUNDARY_Y,
  pos_x: 0,
  pos_y: 0 - px(400),
  src: "Skins/Earth/functionBar_Earth.png",
};
export const BACKGROUND_IMG_STYLE = {
  x: px(0),
  y: px(400),
  w: px(480),
  h: px(480) - BOUNDARY_Y - FUNCTION_BAR_H,
  pos_x: 0,
  pos_y: 0 - px(400),
  src: "Skins/Earth/keyboard_bgd_Earth.png",
};
export const BUTTON_IMG_STYLE = {
  x: px(0),
  y: px(400),
  w: px(480),
  h: px(240),
  src: "Skins/Earth/keyboardEN_button_Earth.png",
};
export const PRESS_MASK_STYLE = {
  x: px(500),
  y: px(0),
  w: px(42),
  h: px(50),
  color: 0xee6666,
  line_width: px(3),
  radius: 6,
};
export const CHOOSE_WORD_TEXT_STYLE = {
  x: 0,
  y: px(190),
  w: px(480),
  h: BOUNDARY_Y,
  color: 0xffffff,
  text_size: px(30),
};

// inputboxLib.js

export const INPUTBOX_TEXT_STYLE = {
  x: px(50),
  y: px(100),
  w: px(285),
  h: px(70),
};
export const INPUTBOX_FINISH_BUTTON_STYLE = {
  x: px(336),
  y: px(105),
  w: px(79),
  h: px(55),
};
export const BACKGROUD_WIDGET_STYLE = {
  x: px(0),
  y: px(0),
  src: "Skins/Earth/backgroud_Earth.png",
};

export const INPUTBOX_BACKGROUND_IMG_STYLE = {
  x: px(0),
  y: px(0),
  src: "Skins/Earth/inputbox_bgd.png",
};
export const MASK_STYLE = {
  x: px(0),
  y: px(0),
  src: "Skins/Earth/inputbox_mask_Earth.png",
};
export const BUTTON_TEXT_WIDGET_STYLE = {
  x: px(335),
  y: px(105),
  w: px(80),
  h: px(55),
  text: "完成",
  text_size: px(35),
  color: 0xfff1a6,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
};
export const TITLE_WIDGET_STYLE = {
  x: px(110),
  y: px(25),
  w: px(260),
  h: px(40),
  color: 0xeeeeee,
  text_size: px(38),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
};

export const QWERT_LAYOUT = {
  // QWERT键盘
  NumberAndSymbol: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "!",
    "@",
    "#",
    "-",
    "%",
    "&",
    "*",
    "(",
    ")",
    "~",
    "/",
    ".",
    ",",
    ":",
    ";",
    "?",
  ],
  Letters: {
    Capital: [
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
    ],
    LowerCase: [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
    ],
  },
};
export const QWERT_LAYOUT_STYLE = {
  KEY_WIDTH: 38,
  KEY_HEIGHT: 50,
  KEY_SPACING: 46,
  KEY_PADDING: 4,

  ROW_START_Y: BOUNDARY_Y + FUNCTION_BAR_H,
  ROW1_OFFSET_Y: 5,
  ROW2_OFFSET_Y: 65,
  ROW3_OFFSET_Y: 125,
  ROW4_OFFSET_Y: 425,

  KEYS_PER_ROW1: 10,
  KEYS_PER_ROW2: 9,
  KEYS_PER_ROW3: 7,

  CAPSLOCK_WIDTH: 92,
  CAPSLOCK_HEIGHT: 48,
  SPACE_WIDTH: 120,
  SPACE_HEIGHT: 47,
  DELETE_WIDTH: 92,
  DELETE_HEIGHT: 48,

  CAPSLOCK_X: 83,
  SPACE_X: 180,
  DELETE_X: 305,
};
