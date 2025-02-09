let rootElement = document.documentElement;

const genRanHex = size => [...Array(size)].map(() => Math.floor(10 + Math.random() * 6).toString(16)).join('');

rootElement.style.setProperty('background-color', `#${genRanHex(2)}${genRanHex(2)}${genRanHex(2)}`);

function changeColor() {
    rootElement.style.setProperty('background-color', `#${genRanHex(6)}`);
    setTimeout(changeColor, 2000);
};

changeColor();