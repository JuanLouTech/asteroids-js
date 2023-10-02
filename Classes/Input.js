class Input {
  static pressedKeys = {};
  static pressedButtons = {};
  static gamePad1 = null;
  static gamePad2 = null;
  constructor() {}

  static initializeKeyboardInputs() {
    Input.removeListeners();
    Input.addListeners();
  }

  static onKeyDown = function (e) {
    Input.pressedKeys[e.key] = true;
  };

  static onKeyUp = function (e) {
    Input.pressedKeys[e.key] = false;
  };

  static onPadConnected = (e) => {
    if (e.gamepad.index === 0) {
      console.log("Pad 1 connected");
      Input.gamePad1 = e.gamepad;
    } else if (e.gamepad.index === 1) {
      Input.gamePad2 = e.gamepad;
    }
  };

  static onPadDisconnected = (e) => {
    if (e.gamepad.index === 0) {
      console.log("Pad 1 disconnected");
      Input.gamePad1 = null;
    } else if (e.gamepad.index === 1) {
      Input.gamePad2 = null;
    }
  };

  static addListeners = () => {
    window.addEventListener("keydown", Input.onKeyDown);
    window.addEventListener("keyup", Input.onKeyUp);
    window.addEventListener("gamepadconnected", Input.onPadConnected);
    window.addEventListener("gamepaddisconnected", Input.onPadDisconnected);
  };

  static removeListeners = () => {
    window.removeEventListener("keydown", Input.onKeyDown);
    window.removeEventListener("keyup", Input.onKeyUp);
    window.removeEventListener("gamepadconnected", Input.onPadConnected);
    window.removeEventListener("gamepaddisconnected", Input.onPadDisconnected);
  };

  static update() {
    Input.pressedButtons = { 0: {}, 1: {} };
    const pads = navigator.getGamepads()[0];
    for (const pad of navigator.getGamepads()) {
      if (!pad) continue;
      Input.getPadPressedButtons(pad);
    }
  }

  static getPadPressedButtons(pad) {
    Input.pressedButtons[pad.index].up =
      pad?.axes[PAD_CONTROLS.yAxis] < -0.5 ||
      pad?.buttons[PAD_CONTROLS.up].value > 0
        ? true
        : false;
    Input.pressedButtons[pad.index].down =
      pad?.axes[PAD_CONTROLS.yAxis] > 0.5 ||
      pad?.buttons[PAD_CONTROLS.down].pressed
        ? true
        : false;
    Input.pressedButtons[pad.index].fire =
      pad?.buttons[PAD_CONTROLS.fire].value > 0 ? true : false;
    Input.pressedButtons[pad.index].pause =
      pad?.buttons[PAD_CONTROLS.pause].value > 0 ? true : false;
    Input.pressedButtons[pad.index].left =
      pad?.axes[PAD_CONTROLS.xAxis] < -0.5 ||
      pad?.buttons[PAD_CONTROLS.left].pressed
        ? true
        : false;
    Input.pressedButtons[pad.index].right =
      pad?.axes[PAD_CONTROLS.xAxis] > 0.5 ||
      pad?.buttons[PAD_CONTROLS.right].pressed
        ? true
        : false;
    Input.pressedButtons[pad.index].thrust =
      pad?.buttons[PAD_CONTROLS.thrust].value > 0 ? true : false;
  }
}
