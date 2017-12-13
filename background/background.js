// light theme
const defaultTheme = {
  images: {
    headerURL: ""
  },
  colors: {
    accentcolor: "#d7d7db",
    textcolor: "#0c0c0d",
    // tab_text: "#444444",
    toolbar: "#f9f9fa",
    toolbar_text: "#5a5b5c",
    toolbar_field: "#ffffff",
    toolbar_field_text: "#000000",
    toolbar_bottom_separator: "#cccccc",
    toolbar_vertical_separator: "#d4d4d4"
  }
}

let currentColor = defaultTheme.colors.accentcolor;

// default "hybrid" theme
// using this results in blurry bookmarks bar
// const defaultTheme = {
//   images: {
//     headerURL: ""
//   },
//   colors: {
//     accentcolor: "#252525",
//     textcolor: "#ffffff",
//     // tab_text: "#444444",
//     toolbar: "#F9F9FA",
//     toolbar_text: "#4A4A4B",
//     toolbar_field: "#ffffff",
//     toolbar_field_text: "#000000",
//     toolbar_bottom_separator: "#E1E1E2",
//     toolbar_vertical_separator: "#D4D4D4"
//   }
// }

function setNewRandomColor(windowId, colorsArr) {

  const filtered = colorsArr.filter(x => x !== currentColor);
  const newColor = filtered[Math.floor(Math.random()*filtered.length)];
  currentColor = newColor;

  let newTheme = Object.assign({}, defaultTheme);
  newTheme.colors.accentcolor = newColor;

  browser.theme.update(windowId, newTheme);
}

async function onWindowCreate(window) {

  let {options} = await browser.storage.sync.get("options");

  if (!options || !options.colors || options.colors == []) {
    init();
  } else {
    setNewRandomColor(window.id, options.colors);
  }
}

browser.windows.onCreated.addListener(onWindowCreate);

async function init() {

  let {options} = await browser.storage.sync.get("options");

  const defaultColors = ["#7095B2", "#FF7775", "#BAE0FF", "#C9CC80", "#B1B28E"];

  if (!options) {
    options = {colors: defaultColors};
  } else if (!options.colors || options.colors == []) {
    options.colors = defaultColors;
  }

  browser.storage.sync.set({options})

  const window = await browser.windows.getCurrent();
  setNewRandomColor(window.id, options.colors);
  
}

init();
