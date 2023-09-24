class Input {
  static pressedKeys = {};
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

  static addListeners = () => {
    window.addEventListener("keydown", Input.onKeyDown);
    window.addEventListener("keyup", Input.onKeyUp);
  };

  static removeListeners = () => {
    window.removeEventListener("keydown", Input.onKeyDown);
    window.removeEventListener("keyup", Input.onKeyUp);
  };
}
