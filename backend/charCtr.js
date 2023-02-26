let Character = class {
  constructor(id) {
    this.id = id;
    this.location = {
      x: 0,
      y: 0,
    };
    this.keyPress = {
      up: 0,
      down: 0,
      right: 0,
      left: 0,
    };
  }
};

const charList = [];

const createChar = (id) => {
  charList.push(new Character(id));
  console.log(charList);
};

const deleteChar = (id) => {
  charList.splice(
    charList.findIndex((char) => char.id === id),
    1
  );
  console.log(charList);
};

const moveChar = (id, location) => {
  if (!location) return;
  charList.find((char) => char.id === id).location = location;
  console.log(charList);
};

const updateKeyPress = (id, keyPress) => {
  if (!keyPress) return;
  charList.find((char) => char.id === id).keyPress = keyPress;
};

module.exports = {
  createChar,
  deleteChar,
  moveChar,
  updateKeyPress,
  charList,
};
