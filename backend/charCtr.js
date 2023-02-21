let Character = class {
  constructor(id) {
    this.id = id;
    this.location = {
      x: 0,
      y: 0,
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

module.exports = {
  createChar,
  deleteChar,
  moveChar,
  charList,
};
